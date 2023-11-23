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

export function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <DialogProvider>
            <AuthenticationProvider>
              <SafeAreaProvider>
                <MenuProvider>
                  <NavigationContainer>
                    <InitializationProvider>
                      <Navigation />
                    </InitializationProvider>
                  </NavigationContainer >
                </MenuProvider>
              </SafeAreaProvider>
            </AuthenticationProvider>
          </DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </DataProvider>
  );
}