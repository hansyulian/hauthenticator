import { ScreenLayout } from "@components/ScreenLayout";
import { SettingsScreenToggleRow } from "./SettingsScreen.ToggleRow";
import { useState } from "react";
import { useAppInfoContext } from "@hooks/useAppInfoContext";
import { useFocusedEffect } from "@hooks/useFocusedEffect";
import { useSetAppInfo } from "@hooks/useSetAppInfo";
import { SettingsScreenRow } from "./SettingsScreen.Row";
import ExpoConstants from "expo-constants";
import { TextE } from "@components/TextE";
import { SettingsScreenActionRow } from "./SettingsScreen.ActionRow";
import { useNavigate } from "@hooks/useNavigate";
import { useAuthenticate } from "@hooks/useAuthenticate";
import { useSyncContext } from "@hooks/useSyncContext";
import { GoogleDriveSync } from "@modules/GoogleDriveSync";
import { useSensitiveDataContext } from "@hooks/useSensitiveDataContext";

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
    if (!await authenticate()) {
      return;
    };
    navigate("ExportSelection", {});
  };

  const onGoogleDriveChange = async (value: boolean) => {
    if (value) {
      await GoogleDriveSync.initialize();
      const hasSaveFile = await GoogleDriveSync.hasSaveFile();
      if (!hasSaveFile){
        navigate("SetupBackupPassword", {});
      } else {
        navigate("RestoreSync",{})
      }
    }
    else {
      setSensitiveDataContext({
        backupPassword: "",
      });
      setAppInfo({
        googleDriveSyncEnabled: false,
      });
      syncContext.setEnabled(false);
    }

  };

  return <ScreenLayout headerText='Settings'>
    <SettingsScreenToggleRow icon='lock' text="Authentication" value={authentication} onChange={onAuthenticationChange} />
    <SettingsScreenToggleRow icon="link" text="Google drive sync" value={syncContext.enabled} onChange={onGoogleDriveChange} />
    <SettingsScreenActionRow icon='import' text="Import" onPress={() => navigate("Import", {})} />
    <SettingsScreenActionRow icon='export' text="Export" onPress={onExport} />
    <SettingsScreenRow justifyContent="space-between" row>
      <TextE>App version</TextE>
      <TextE>{ExpoConstants.manifest?.version || "-"}</TextE>
    </SettingsScreenRow>
  </ScreenLayout>;
};