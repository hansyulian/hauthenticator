import { useState } from "react";

import ExpoConstants from "expo-constants";
import { ScreenLayout } from "~/components/ScreenLayout";
import { TextE } from "~/components/TextE";
import { useAppInfoContext } from "~/hooks/useAppInfoContext";
import { useAuthenticate } from "~/hooks/useAuthenticate";
import { useFocusedEffect } from "~/hooks/useFocusedEffect";
import { useNavigate } from "~/hooks/useNavigate";
import { useSensitiveDataContext } from "~/hooks/useSensitiveDataContext";
import { useSetAppInfo } from "~/hooks/useSetAppInfo";
import { useSyncContext } from "~/hooks/useSyncContext";
import { GoogleDriveSync } from "~/modules/GoogleDriveSync";

import { SettingsScreenActionRow } from "./SettingsScreen.ActionRow";
import { SettingsScreenRow } from "./SettingsScreen.Row";
import { SettingsScreenToggleRow } from "./SettingsScreen.ToggleRow";

export const SettingsScreen = () => {
  const { data: appInfo } = useAppInfoContext();
  const [authentication, setAuthentication] = useState(false);
  const { set: setSensitiveDataContext } = useSensitiveDataContext();
  const syncContext = useSyncContext();
  const authenticate = useAuthenticate();
  const setAppInfo = useSetAppInfo();
  const navigate = useNavigate();

  useFocusedEffect(() => {
    if (!appInfo) {
      return;
    }
    setAuthentication(appInfo.authenticationEnabled);
  }, [appInfo]);

  const onAuthenticationChange = (value: boolean) => {
    setAppInfo({
      authenticationEnabled: value,
    });
  };
  const onExport = async () => {
    if (!(await authenticate())) {
      return;
    }
    navigate("ExportSelection", {});
  };

  const onGoogleDriveChange = async (value: boolean) => {
    if (value) {
      await GoogleDriveSync.initialize();
      const hasSaveFile = await GoogleDriveSync.hasSaveFile();
      if (!hasSaveFile) {
        navigate("SetupBackupPassword", {});
      } else {
        navigate("RestoreSync", {});
      }
    } else {
      setSensitiveDataContext({
        backupPassword: "",
      });
      setAppInfo({
        googleDriveSyncEnabled: false,
      });
      syncContext.setEnabled(false);
    }
  };
  return (
    <ScreenLayout headerText="Settings">
      <SettingsScreenToggleRow
        icon="lock"
        text="Authentication"
        value={authentication}
        onChange={onAuthenticationChange}
      />
      <SettingsScreenToggleRow
        icon="link"
        text="Google drive sync"
        value={syncContext.enabled}
        onChange={onGoogleDriveChange}
      />
      <SettingsScreenActionRow
        icon="content-copy"
        text="Process Duplicated Entries"
        onPress={() => navigate("ProcessDuplicated", {})}
      />
      <SettingsScreenActionRow icon="import" text="Import" onPress={() => navigate("Import", {})} />
      <SettingsScreenActionRow icon="export" text="Export" onPress={onExport} />
      <SettingsScreenRow justifyContent="space-between" row>
        <TextE>App version</TextE>
        <TextE>{ExpoConstants.expoConfig?.version || "-"}</TextE>
      </SettingsScreenRow>
    </ScreenLayout>
  );
};
