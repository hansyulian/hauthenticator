import { NavigationParams } from '@config/NavigationConfig';
import { config } from '@config/config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatorAddFormConfirmationScreen } from '@screens/AuthenticatorAddFormConfirmationScreen';
import { AuthenticatorAddScreen } from '@screens/AuthenticatorAddScreen';
import { AuthenticatorListScreen } from '@screens/AuthenticatorListScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import { FC, PropsWithChildren } from 'react';
const Stack = createNativeStackNavigator<NavigationParams>();

export const Navigation: FC<PropsWithChildren> = () => {
  return <Stack.Navigator initialRouteName={config.initialScreen} screenOptions={{
    header: () => null,
  }} >
    <Stack.Screen name='AuthenticatorList' component={AuthenticatorListScreen} />
    <Stack.Screen name='AuthenticatorAdd' component={AuthenticatorAddScreen} />
    <Stack.Screen name='AuthenticatorAddFormConfirmation' component={AuthenticatorAddFormConfirmationScreen} />
    <Stack.Screen name='Settings' component={SettingsScreen} />
  </Stack.Navigator>
}