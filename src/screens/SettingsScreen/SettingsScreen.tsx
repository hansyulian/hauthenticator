import { ScreenLayout } from "@components/ScreenLayout"
import { SettingsScreenToggleRow } from "./SettingsScreen.ToggleRow"
import { useEffect, useState } from "react"
import { useAppInfoContext } from "@hooks/useAppInfoContext"
import { useFocusedEffect } from "@hooks/useFocusedEffect"
import { useSetAppInfo } from "@hooks/useSetAppInfo"
import { SettingsScreenRow } from "./SettingsScreen.Row"
import ExpoConstants from "expo-constants"
import { TextE } from "@components/TextE"
import { SettingsScreenActionRow } from "./SettingsScreen.ActionRow"
import { useNavigate } from "@hooks/useNavigate"
import { useAuthenticate } from "@hooks/useAuthenticate"
import { GoogleLogin } from "@modules/GoogleLogin"
import { GoogleDriveSync } from "@modules/GoogleDriveSync"

export const SettingsScreen = () => {
  const { data } = useAppInfoContext();
  const [authentication, setAuthentication] = useState(false);
  const [googleDriveSync, setGoogleDriveSync] = useState(false);
  const authenticate = useAuthenticate();
  const setAppInfo = useSetAppInfo();
  const navigate = useNavigate();

  useFocusedEffect(() => {
    if (!data) {
      return;
    }
    setAuthentication(data.authenticationEnabled);
    setGoogleDriveSync(data.googleDriveSyncEnabled);
  }, [data])

  const onAuthenticationChange = (value: boolean) => {
    setAppInfo({
      authenticationEnabled: value,
    })
  }
  const onExport = async () => {
    if (!await authenticate()) {
      return;
    };
    navigate('ExportSelection', {});
  }

  const onGoogleDriveChange = async (value: boolean) => {
    if (value) {
      const result = await GoogleLogin.login();
      await GoogleDriveSync.initialize(result.accessToken);
      await GoogleDriveSync.sync([]);
    }
    setAppInfo({
      googleDriveSyncEnabled: value,
    })
  }

  return <ScreenLayout headerText='Settings'>
    <SettingsScreenToggleRow icon='lock' text="Authentication" value={authentication} onChange={onAuthenticationChange} />
    <SettingsScreenToggleRow icon="link" text="Google drive sync" value={googleDriveSync} onChange={onGoogleDriveChange} />
    <SettingsScreenActionRow icon='import' text="Import" onPress={() => navigate('Import', {})} />
    <SettingsScreenActionRow icon='export' text="Export" onPress={onExport} />
    <SettingsScreenRow justifyContent="space-between" row>
      <TextE>App version</TextE>
      <TextE>{ExpoConstants.manifest?.version || '-'}</TextE>
    </SettingsScreenRow>
  </ScreenLayout>
}