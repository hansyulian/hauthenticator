import { ButtonE } from "@components/ButtonE";
import { QRScanner } from "@components/QRScanner"
import { TextBox } from "@components/TextBox";
import { ViewE } from "@components/ViewE"
import { useNavigate } from "@hooks/useNavigate";
import { OtpMigration } from "@modules/OtpMigration";
import { pasteClipboard } from "@utils/pasteClipboard";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";

export type ImportScreenGoogleAuthenticatorProps = {

}

export const ImportScreenGoogleAuthenticator = (props: ImportScreenGoogleAuthenticatorProps) => {
  const [disableScanner, setDisableScanner] = useState(false);
  const [migrationString, setMigrationString] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [importRecords, setImportRecords] = useState<Authenticator[]>([]);
  const navigate = useNavigate();
  const canContinue = importRecords.length > 0;

  const onScan = (value: string) => {
    setMigrationString(value);
  }

  const validateString = useCallback(async (value: string) => {
    if (!value) {
      return;
    }
    try {
      const result = await OtpMigration.decode(value);
      setImportRecords(result);
      setErrors([]);
    } catch (err) {
      setImportRecords([]);
      setErrors(['Invalid authenticator migration'])
    }
  }, [])

  useEffect(() => {
    validateString(migrationString);
  }, [validateString, migrationString])

  const onPaste = async () => {
    const stringValue = await pasteClipboard();
    setMigrationString(stringValue)
  }

  const onContinue = () => {
    navigate('ImportConfirmation', {
      authenticators: importRecords,
    })
  }

  return <ViewE fullSize>
    <ScrollView>
      <ViewE padding>
        <ViewE marginBottom>
          <QRScanner onScan={onScan} disabled={disableScanner} onEnable={() => setDisableScanner(false)} />
        </ViewE>
        <TextBox errors={errors} value={migrationString} onChangeText={setMigrationString} label='Migration string' icon='content-paste' onIconPress={onPaste} />
        <ButtonE disabled={!canContinue} onPress={onContinue}>
          Continue
        </ButtonE>
      </ViewE>
    </ScrollView >
  </ViewE >
}
