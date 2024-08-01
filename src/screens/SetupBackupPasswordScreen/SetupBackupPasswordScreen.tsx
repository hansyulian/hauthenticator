import { useCallback, useState } from "react";

import { ButtonE } from "~/components/ButtonE";
import { ScreenLayout } from "~/components/ScreenLayout";
import { TextBox } from "~/components/TextBox";
import { TextE } from "~/components/TextE";
import { ViewE } from "~/components/ViewE";
import { useAsyncCallback } from "~/hooks/useAsyncCallback";
import { useBack } from "~/hooks/useBack";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import { useSensitiveDataContext } from "~/hooks/useSensitiveDataContext";
import { useSetAppInfo } from "~/hooks/useSetAppInfo";
import { useSync } from "~/hooks/useSync";
import { GoogleDriveSync } from "~/modules/GoogleDriveSync";
import { NavigationProps } from "~/modules/Navigation";

export const SetupBackupPasswordScreen = (props: NavigationProps<"SetupBackupPassword">) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const setAppInfo = useSetAppInfo();
  const sensitiveDataContext = useSensitiveDataContext();
  const back = useBack();
  const sync = useSync();
  const confirmationDialog = useConfirmationDialog();

  const isValid = password.length >= 8 && password === passwordConfirmation;

  const onSuccess = useCallback(async () => {
    sync();
    setIsWrongPassword(false);
    await Promise.all([
      setAppInfo({
        googleDriveSyncEnabled: true,
      }),
      sensitiveDataContext.set({
        backupPassword: password,
      }),
    ]);
    back();
  }, [back, password, sensitiveDataContext, setAppInfo, sync]);

  const { callback: onContinue, loading: isContinueLoading } = useAsyncCallback(
    useCallback(async () => {
      setIsWrongPassword(false);
      await GoogleDriveSync.initialize();
      const testSuccess = await GoogleDriveSync.testPassword(password);
      if (!testSuccess) {
        setIsWrongPassword(true);
        return;
      }
      onSuccess();
    }, [onSuccess, password])
  );

  const reset = useCallback(async () => {
    await GoogleDriveSync.initialize();
    await GoogleDriveSync.reset();
    onSuccess();
  }, [onSuccess]);

  const confirmResetAndReplace = async () => {
    confirmationDialog({
      type: "danger",
      title: "Reset Confirmation",
      content:
        "Are you sure want to reset and replace? This action will remove existing sync data and replace with your current list",
      onConfirm: async () => {
        await reset();
      },
    });
  };

  return (
    <ScreenLayout
      headerText="Setup Backup Password"
      bottomComponent={
        <ViewE padding gap>
          {isWrongPassword && (
            <ButtonE type="danger" onPress={confirmResetAndReplace}>
              Reset & Replace
            </ButtonE>
          )}
          <ButtonE
            onPress={onContinue}
            disabled={!isValid || isContinueLoading}
            loading={isContinueLoading}>
            Continue
          </ButtonE>
        </ViewE>
      }>
      <ViewE gap paddingHorizontal>
        <TextE>
          Setup a backup password to encrypt your data. This password will not be stored anywhere
          else, so if you forget this, you will not be able to recover your details
        </TextE>
        <ViewE gap="negativeSmall">
          <TextBox label="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <TextBox
            label="Password Confirmation"
            secureTextEntry
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />
        </ViewE>
        {isWrongPassword && (
          <ViewE gap>
            <TextE color="error">The existing sync has been set with different password</TextE>
          </ViewE>
        )}
      </ViewE>
    </ScreenLayout>
  );
};
