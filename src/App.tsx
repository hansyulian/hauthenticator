global.Buffer = global.Buffer || require('@craftzdog/react-native-buffer').Buffer;
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Navigation } from '@modules/Navigation';
import { SnackbarProvider } from '@modules/SnackbarContext';
import { ThemeProvider } from '@modules/ThemeProvider';
import { InitializationProvider } from '@modules/InitializationContext';
import { DataProvider } from '@modules/DataContext';
import { AuthenticationProvider } from '@modules/AuthenticationContext';

export function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <AuthenticationProvider>
          <SafeAreaProvider>
            <SnackbarProvider>
              <NavigationContainer>
                <InitializationProvider>
                  <Navigation />
                </InitializationProvider>
              </NavigationContainer>
            </SnackbarProvider>
          </SafeAreaProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    </DataProvider>
  );
}