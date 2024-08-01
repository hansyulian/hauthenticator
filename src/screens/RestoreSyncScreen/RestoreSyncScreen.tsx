import { ButtonE } from "@components/ButtonE";
import { FloatingBottomContainer } from "@components/FloatingBottomContainer";
import { ScreenLayout } from "@components/ScreenLayout";
import { TextBox } from "@components/TextBox";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { useAsyncCallback } from "@hooks/useAsyncCallback";
import { useBack } from "@hooks/useBack";
import { useConfirmationDialog } from "@hooks/useConfirmationDialog";
import { useNavigate } from "@hooks/useNavigate";
import { useSensitiveDataContext } from "@hooks/useSensitiveDataContext";
import { useSetAppInfo } from "@hooks/useSetAppInfo";
import { GoogleDriveSync } from "@modules/GoogleDriveSync";
import { useCallback, useState } from "react";

export const RestoreSyncScreen = () => {
  const [password, setPassword] = useState("");
  const confirmationDialog = useConfirmationDialog();
  const navigate = useNavigate();
  const setAppInfo = useSetAppInfo();
  const back = useBack();
  const sensitiveDataContext = useSensitiveDataContext();

  const onReset = () => {
    confirmationDialog({
      title: "Delete",
      content: "Are you sure? this action can't be undone",
      onConfirm: async () => {
        await GoogleDriveSync.reset();
        back();
        navigate("SetupBackupPassword", {});
      },
    });
  };

  const { callback: onContinue, loading: isContinueLoading } = useAsyncCallback(
    useCallback(async () => {
      await GoogleDriveSync.initialize();
      const testSuccess = await GoogleDriveSync.testPassword(password);

      await Promise.all([
        setAppInfo({
          googleDriveSyncEnabled: true,
        }),
        sensitiveDataContext.set({
          backupPassword: password,
        }),
      ]);
      back();
    }, [back, password, sensitiveDataContext, setAppInfo])
  );

  return (
    <ScreenLayout
      headerText="Restore Sync"
      bottomComponent={
        <ViewE padding>
          <ButtonE onPress={onContinue} loading={isContinueLoading}>
            Continue
          </ButtonE>
        </ViewE>
      }
      stickyBottomComponent>
      <ViewE gap="large" padding fullSize>
        <TextE>
          An encrypted backup has been detected in your google drive. Please enter the password used
          to encrypt the data to decrypt them. Please remember that there is no way to restore this
          password if you forget it
        </TextE>
        <TextBox
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}></TextBox>

        <ViewE gap="large" marginTop="large">
          <TextE>
            Alternatively, if you completely forgot your password, you may reset your data
          </TextE>
          <ButtonE onPress={onReset} type="danger">
            Reset
          </ButtonE>
        </ViewE>
      </ViewE>
    </ScreenLayout>
  );
};
