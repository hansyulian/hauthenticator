import { ScreenLayout } from "@components/ScreenLayout"
import { SettingsScreenToggleRow } from "./SettingsScreen.ToggleRow"
import { useState } from "react"
import { useAppInfoContext } from "@hooks/useAppInfoContext"
import { useFocusedEffect } from "@hooks/useFocusedEffect"
import { useSetAppInfo } from "@hooks/useSetAppInfo"
import { SettingsScreenRow } from "./SettingsScreen.Row"
import ExpoConstants from "expo-constants"
import { TextE } from "@components/TextE"

export const SettingsScreen = () => {
  const { data } = useAppInfoContext();
  const [authentication, setAuthentication] = useState(false);
  const setAppInfo = useSetAppInfo();

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
    <SettingsScreenToggleRow text="Authentication" value={authentication} onChange={setAuthenticationExtended} />
    <SettingsScreenRow justifyContent="space-between" row>
      <TextE>App version</TextE>
      <TextE>{ExpoConstants.manifest?.version || '-'}</TextE>
    </SettingsScreenRow>
  </ScreenLayout>
}