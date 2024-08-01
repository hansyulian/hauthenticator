import "react-native-url-polyfill/auto";

import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SyncProgressBar } from "~/components/SyncProgressBar";
import { AuthenticationProvider } from "~/modules/AuthenticationContext";
import { DataProvider } from "~/modules/DataContext";
import { DialogProvider } from "~/modules/DialogContext";
import { InitializationProvider } from "~/modules/InitializationContext";
import { MenuProvider } from "~/modules/MenuContext";
import { Navigation } from "~/modules/Navigation";
import { SnackbarProvider } from "~/modules/SnackbarContext";
import { SyncProvider } from "~/modules/SyncContext";
import { ThemeProvider } from "~/modules/ThemeProvider";

import { NavigationContainer } from "@react-navigation/native";

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = global.Buffer || require("@craftzdog/react-native-buffer").Buffer;

export function App() {
  return (
    <GestureHandlerRootView>
      <DataProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <DialogProvider>
              <AuthenticationProvider>
                <SyncProvider>
                  <SafeAreaProvider>
                    <MenuProvider>
                      <NavigationContainer>
                        <InitializationProvider>
                          <Navigation />
                          <SyncProgressBar />
                        </InitializationProvider>
                      </NavigationContainer>
                    </MenuProvider>
                  </SafeAreaProvider>
                </SyncProvider>
              </AuthenticationProvider>
            </DialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </DataProvider>
    </GestureHandlerRootView>
  );
}
