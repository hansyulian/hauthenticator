import { ButtonE } from "@components/ButtonE";
import { FloatingBottomContainer } from "@components/FloatingBottomContainer";
import { QRScanner } from "@components/QRScanner";
import { TextBox } from "@components/TextBox";
import { ViewE } from "@components/ViewE";
import { useNavigate } from "@hooks/useNavigate";
import { OtpMigration, ParsedMigrationPayload } from "@modules/OtpMigration";
import { pasteClipboard } from "@utils/pasteClipboard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chip } from "react-native-paper";
import { StyleSheet } from "react-native";

export type ImportScreenGoogleAuthenticatorProps = {};

export const ImportScreenGoogleAuthenticator = (props: ImportScreenGoogleAuthenticatorProps) => {
  const [migrationString, setMigrationString] = useState("");
  const [validatedMigrationPayloads, setValidatedMigrationPayloads] = useState<
    ParsedMigrationPayload[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const canContinue = validatedMigrationPayloads.length > 0;
  const stringReadCache = useRef<string[]>([]);

  const importDetails = useMemo(() => {
    if (validatedMigrationPayloads.length === 0) {
      return;
    }
    const total = validatedMigrationPayloads[0].batchSize;
    const state = new Array(total).fill(false);
    for (const validatedMigrationPayload of validatedMigrationPayloads) {
      state[validatedMigrationPayload.batchIndex] = true;
    }
    return {
      total,
      state,
    };
  }, [validatedMigrationPayloads]);

  const validateString = useCallback(
    (value: string) => {
      if (!value || stringReadCache.current.includes(value)) {
        return;
      }
      stringReadCache.current.push(value);
      try {
        const newMigrationPayload = OtpMigration.decode(value);
        let exists = false;
        for (const validatedMigrationPayload of validatedMigrationPayloads) {
          if (
            validatedMigrationPayload.batchId === newMigrationPayload.batchId &&
            validatedMigrationPayload.batchIndex === newMigrationPayload.batchIndex
          ) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          setValidatedMigrationPayloads([...validatedMigrationPayloads, newMigrationPayload]);
        }
        setMigrationString("");
        setErrors([]);
      } catch (err) {
        setErrors(["Invalid authenticator migration"]);
      }
    },
    [validatedMigrationPayloads]
  );

  useEffect(() => {
    if (migrationString) {
      validateString(migrationString);
    }
  }, [validateString, migrationString]);

  const onPaste = async () => {
    const stringValue = await pasteClipboard();
    setMigrationString(stringValue);
  };

  const onContinue = () => {
    const importRecords = [];
    for (const validatedMigrationPayload of validatedMigrationPayloads) {
      importRecords.push(...validatedMigrationPayload.otpParameters);
    }
    navigate("ImportConfirmation", {
      authenticators: importRecords,
    });
  };

  return (
    <>
      <ViewE fullSize padding>
        <ViewE>
          <ViewE marginBottom>
            <QRScanner onScan={setMigrationString} />
          </ViewE>
          <TextBox
            errors={errors}
            value={migrationString}
            onChangeText={setMigrationString}
            label="Migration string"
            icon="content-paste"
            onIconPress={onPaste}
          />
        </ViewE>
        {importDetails && (
          <ViewE row gap justifyContent="center" style={styles.chipContainer}>
            {importDetails.state.map((importState, index) => (
              <Chip
                key={`import-${index}`}
                icon={importState ? "check" : "minus"}
                mode={importState ? "flat" : "outlined"}>
                {index + 1}
              </Chip>
            ))}
          </ViewE>
        )}
      </ViewE>
      <FloatingBottomContainer padding>
        <ButtonE disabled={!canContinue} onPress={onContinue}>
          Continue
        </ButtonE>
      </FloatingBottomContainer>
    </>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexWrap: "wrap",
  },
});
