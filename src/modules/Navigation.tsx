import { FC, PropsWithChildren } from "react";

import { config } from "@config/config";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticatorAddFormConfirmationScreen } from "@screens/AuthenticatorAddFormConfirmationScreen/AuthenticatorAddFormConfirmationScreen";
import { AuthenticatorAddScreen } from "@screens/AuthenticatorAddScreen/AuthenticatorAddScreen";
import { AuthenticatorDetailScreen } from "@screens/AuthenticatorDetailScreen/AuthenticatorDetailScreen";
import { AuthenticatorEditScreen } from "@screens/AuthenticatorEditScreen/AuthenticatorEditScreen";
import { AuthenticatorListScreen } from "@screens/AuthenticatorListScreen/AuthenticatorListScreen";
import { DevToolsScreen } from "@screens/DevToolsScreen/DevToolsScreen";
import { ExportScreen } from "@screens/ExportScreen/ExportScreen";
import { ExportSelectionScreen } from "@screens/ExportSelectionScreen/ExportSelectionScreen";
import { ImportConfirmationScreen } from "@screens/ImportConfirmationScreen/ImportConfirmationScreen";
import { ImportScreen } from "@screens/ImportScreen/ImportScreen";
import { ProcessDuplicatedScreen } from "@screens/ProcessDuplicatedScreen/ProcessDuplicatedScreen";
import { RestoreSyncScreen } from "@screens/RestoreSyncScreen/RestoreSyncScreen";
import { SettingsScreen } from "@screens/SettingsScreen/SettingsScreen";
import { SetupBackupPasswordScreen } from "@screens/SetupBackupPasswordScreen/SetupBackupPasswordScreen";

const Stack = createNativeStackNavigator<NavigationParams>();

const initialScreen = config.devTools ? "DevTools" : "AuthenticatorList";

export type NavigationParams = {
  AuthenticatorList: {};
  AuthenticatorAdd: {};
  AuthenticatorDetail: {
    authenticatorExtended: AuthenticatorExtended;
  };
  AuthenticatorAddFormConfirmation: {
    form: AuthenticatorFormData;
  };
  AuthenticatorEdit: {
    authenticatorExtended: AuthenticatorExtended;
  };
  Import: {};
  ExportSelection: {};
  Export: {
    authenticatorExtendeds: AuthenticatorExtended[];
  };
  ImportConfirmation: {
    authenticators: Authenticator[];
  };
  Settings: {};
  SetupBackupPassword: {};
  RestoreSync: {};
  DevTools: {};
  ProcessDuplicated: {};
};
export type NavigationTargets = keyof NavigationParams;
export type NavigationProps<RouteName extends NavigationTargets> = NativeStackScreenProps<
  NavigationParams,
  RouteName
>;

export const Navigation: FC<PropsWithChildren> = () => {
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="AuthenticatorList" component={AuthenticatorListScreen} />
      <Stack.Screen name="AuthenticatorAdd" component={AuthenticatorAddScreen} />
      <Stack.Screen name="AuthenticatorEdit" component={AuthenticatorEditScreen} />
      <Stack.Screen name="AuthenticatorDetail" component={AuthenticatorDetailScreen} />
      <Stack.Screen
        name="AuthenticatorAddFormConfirmation"
        component={AuthenticatorAddFormConfirmationScreen}
      />
      <Stack.Screen name="Import" component={ImportScreen} />
      <Stack.Screen name="ImportConfirmation" component={ImportConfirmationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ExportSelection" component={ExportSelectionScreen} />
      <Stack.Screen name="Export" component={ExportScreen} />
      <Stack.Screen name="SetupBackupPassword" component={SetupBackupPasswordScreen} />
      <Stack.Screen name="RestoreSync" component={RestoreSyncScreen} />
      <Stack.Screen name="ProcessDuplicated" component={ProcessDuplicatedScreen} />
      {config.isDevMode && <Stack.Screen name="DevTools" component={DevToolsScreen} />}
    </Stack.Navigator>
  );
};
