import { ScreenLayout } from "@components/ScreenLayout"
import { SettingsScreenToggleRow } from "./SettingsScreen.ToggleRow"
import { useState } from "react"
import { useAppInfoContext } from "@hooks/useAppInfoContext"
import { useFocusedEffect } from "@hooks/useFocusedEffect"
import { useSetAppInfo } from "@hooks/useSetAppInfo"
import { SettingsScreenRow } from "./SettingsScreen.Row"
import ExpoConstants from "expo-constants"
import { TextE } from "@components/TextE"
import { SettingsScreenActionRow } from "./SettingsScreen.ActionRow"
import { useNavigate } from "@hooks/useNavigate"

export const SettingsScreen = () => {
  const { data } = useAppInfoContext();
  const [authentication, setAuthentication] = useState(false);
  const setAppInfo = useSetAppInfo();
  const navigate = useNavigate();

  useFocusedEffect(() => {
    if (!data) {
      return;
    }
    setAuthentication(data.authenticationEnabled);
  }, [data])
  const setAuthenticationExtended = (value: boolean) => {
    setAppInfo({
      authenticationEnabled: value,
    })
  }
  return <ScreenLayout headerText='Settings'>
    <SettingsScreenToggleRow icon='lock' text="Authentication" value={authentication} onChange={setAuthenticationExtended} />
    <SettingsScreenActionRow icon='import' text="Import" onPress={() => navigate('Import', {})} />
    {/* <SettingsScreenActionRow icon='export' text="Export" onPress={()=>navigate()}/> */}
    <SettingsScreenRow justifyContent="space-between" row>
      <TextE>App version</TextE>
      <TextE>{ExpoConstants.manifest?.version || '-'}</TextE>
    </SettingsScreenRow>
  </ScreenLayout>
}