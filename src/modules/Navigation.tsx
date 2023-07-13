import { config } from '@config/config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatorAddFormConfirmationScreen } from '@screens/AuthenticatorAddFormConfirmationScreen/AuthenticatorAddFormConfirmationScreen';
import { AuthenticatorAddScreen } from '@screens/AuthenticatorAddScreen/AuthenticatorAddScreen';
import { AuthenticatorListScreen } from '@screens/AuthenticatorListScreen/AuthenticatorListScreen';
import { DevToolsScreen } from '@screens/DevToolsScreen/DevToolsScreen';
import { ImportConfirmationScreen } from '@screens/ImportConfirmationScreen/ImportConfirmationScreen';
import { ImportScreen } from '@screens/ImportScreen/ImportScreen';
import { SettingsScreen } from '@screens/SettingsScreen/SettingsScreen';
import { FC, PropsWithChildren } from 'react';
const Stack = createNativeStackNavigator<NavigationParams>();

const initialScreen = config.devTools ? 'DevTools' : 'AuthenticatorList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticatorEditScreen } from '@screens/AuthenticatorEditScreen/AuthenticatorEditScreen';

export type NavigationParams = {
  AuthenticatorList: {},
  AuthenticatorAdd: {},
  AuthenticatorAddFormConfirmation: {
    form: AuthenticatorFormData;
  },
  AuthenticatorEdit: {
    authenticatorExtended: AuthenticatorExtended;
  },
  Import: {},
  ImportConfirmation: {
    authenticators: Authenticator[],
  },
  Settings: {},
  DevTools: {},
}
export type NavigationTargets = keyof NavigationParams;
export type NavigationProps<RouteName extends NavigationTargets> =
  NativeStackScreenProps<NavigationParams, RouteName>;

export const Navigation: FC<PropsWithChildren> = () => {
  return <Stack.Navigator initialRouteName={initialScreen} screenOptions={{
    header: () => null,
  }} >
    <Stack.Screen name='AuthenticatorList' component={AuthenticatorListScreen} />
    <Stack.Screen name='AuthenticatorAdd' component={AuthenticatorAddScreen} />
    <Stack.Screen name='AuthenticatorEdit' component={AuthenticatorEditScreen} />
    <Stack.Screen name='AuthenticatorAddFormConfirmation' component={AuthenticatorAddFormConfirmationScreen} />
    <Stack.Screen name='Import' component={ImportScreen} />
    <Stack.Screen name='ImportConfirmation' component={ImportConfirmationScreen} />
    <Stack.Screen name='Settings' component={SettingsScreen} />
    {config.isDevMode && <Stack.Screen name='DevTools' component={DevToolsScreen} />}
  </Stack.Navigator>
}
