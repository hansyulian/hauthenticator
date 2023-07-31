import { ButtonE } from "@components/ButtonE";
import { DividerE } from "@components/DividerE";
import { FloatingBottomContainer } from "@components/FloatingBottomContainer";
import { IconE } from "@components/IconE";
import { LabelValuePair } from "@components/LabelValuePair";
import { QRScanner } from "@components/QRScanner"
import { TextBox } from "@components/TextBox";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE"
import { useDialog } from "@hooks/useDialog";
import { useNavigate } from "@hooks/useNavigate";
import { useSnackbar } from "@hooks/useSnackbar";
import { OtpMigration, ParsedMigrationPayload } from "@modules/OtpMigration";
import { pasteClipboard } from "@utils/pasteClipboard";
import { useCallback, useEffect, useState } from "react";

export type ImportScreenGoogleAuthenticatorProps = {

}

export const ImportScreenGoogleAuthenticator = (props: ImportScreenGoogleAuthenticatorProps) => {
  const [migrationString, setMigrationString] = useState('');
  const [validatedMigrationPayloads, setValidatedMigrationPayloads] = useState<ParsedMigrationPayload[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const navigate = useNavigate();
  const canContinue = validatedMigrationPayloads.length > 0;

  const validateString = useCallback((value: string) => {
    if (!value) {
      return;
    }
    try {
      const newMigrationPayload = OtpMigration.decode(value);
      let exists = false;
      for (const validatedMigrationPayload of validatedMigrationPayloads) {
        if (validatedMigrationPayload.batchId === newMigrationPayload.batchId && validatedMigrationPayload.batchIndex === newMigrationPayload.batchIndex) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        setValidatedMigrationPayloads([...validatedMigrationPayloads, newMigrationPayload]);
        snackbar.show(`Successfully parsed migration payload with id ${newMigrationPayload.batchId} and index ${newMigrationPayload.batchIndex + 1} from total of ${newMigrationPayload.batchSize}`)
      } else {
        snackbar.show(`Duplicated migration payload with id ${newMigrationPayload.batchId} and index ${newMigrationPayload.batchIndex + 1}`)
      }
      setMigrationString('');
      setErrors([]);
    } catch (err) {
      setErrors(['Invalid authenticator migration'])
    }
  }, [validatedMigrationPayloads])

  useEffect(() => {
    if (migrationString) {
      validateString(migrationString);
    }
  }, [validateString, migrationString])

  const onPaste = async () => {
    const stringValue = await pasteClipboard();
    setMigrationString(stringValue)
  }

  const showDeleteConfirmation = (migrationPayload: ParsedMigrationPayload) => {
    dialog.show({
      title: 'Delete confirmation',
      content: `Are you sure to delete ${migrationPayload.batchId} index ${migrationPayload.batchIndex}?`,
      buttons: [{
        text: 'Yes',
        icon: 'delete',
        onPress: () => {
          const filteredPayload = validatedMigrationPayloads.filter(record => record !== migrationPayload);
          setValidatedMigrationPayloads(filteredPayload);
        }
      }]
    })
  }

  const onContinue = () => {
    const importRecords = [];
    for (const validatedMigrationPayload of validatedMigrationPayloads) {
      importRecords.push(...validatedMigrationPayload.otpParameters);
    }
    navigate('ImportConfirmation', {
      authenticators: importRecords,
    })
  }

  return <>
    <ViewE fullSize>
      <ViewE padding>
        <ViewE marginBottom>
          <QRScanner onScan={setMigrationString} />
        </ViewE>
        <TextBox errors={errors} value={migrationString} onChangeText={setMigrationString} label='Migration string' icon='content-paste' onIconPress={onPaste} />
      </ViewE>
      {validatedMigrationPayloads.length > 0 && <ViewE padding gap>
        <ViewE marginBottom>
          <TextE type='paragraphHeader'>Imported details</TextE>
        </ViewE>
        {validatedMigrationPayloads.map(migrationPayload => <ViewE gap key={`${migrationPayload.batchId}-${migrationPayload.batchIndex}`}>
          <ViewE row>
            <ViewE gap flex>
              <LabelValuePair label='Batch ID'>
                {migrationPayload.batchId}
              </LabelValuePair>
              <LabelValuePair label='Batch Index'>
                {`${migrationPayload.batchIndex + 1} of ${migrationPayload.batchSize}`}
              </LabelValuePair>
            </ViewE>
            <IconE icon='delete' color='error' onPress={() => showDeleteConfirmation(migrationPayload)} />
          </ViewE>
          <DividerE />
        </ViewE>
        )}
      </ViewE>
      }
    </ViewE >
    <FloatingBottomContainer padding>
      <ButtonE disabled={!canContinue} onPress={onContinue}>
        Continue
      </ButtonE>
    </FloatingBottomContainer>
  </>
}
