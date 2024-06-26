// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = global.Buffer || require("@craftzdog/react-native-buffer").Buffer;
import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Navigation } from "@modules/Navigation";
import { SnackbarProvider } from "@modules/SnackbarContext";
import { ThemeProvider } from "@modules/ThemeProvider";
import { InitializationProvider } from "@modules/InitializationContext";
import { DataProvider } from "@modules/DataContext";
import { AuthenticationProvider } from "@modules/AuthenticationContext";
import { MenuProvider } from "@modules/MenuContext";
import { DialogProvider } from "@modules/DialogContext";
import { SyncProvider } from "@modules/SyncContext";
import { SyncProgressBar } from "@components/SyncProgressBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
