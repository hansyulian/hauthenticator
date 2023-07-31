import { ScreenLayout } from "@components/ScreenLayout"
import { ImportScreenGoogleAuthenticator } from "./ImportScreen.GoogleAuthenticator"
import { ScrollViewE } from "@components/ScrollViewE"

export const ImportScreen = () => {
  return <ScreenLayout headerText='Import'>
    <ScrollViewE fullHeight>
      <ImportScreenGoogleAuthenticator />
    </ScrollViewE >
  </ScreenLayout>
} 