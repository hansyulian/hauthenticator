import { ScreenLayout } from "~/components/ScreenLayout";

import { ImportScreenGoogleAuthenticator } from "./ImportScreen.GoogleAuthenticator";

export const ImportScreen = () => {
  return (
    <ScreenLayout headerText="Import">
      <ImportScreenGoogleAuthenticator />
    </ScreenLayout>
  );
};
