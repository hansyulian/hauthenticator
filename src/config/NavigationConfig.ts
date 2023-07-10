import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationParams = {
  AuthenticatorList: {},
  AuthenticatorAdd: {},
  AuthenticatorAddFormConfirmation: {
    form: AuthenticatorFormData;
  },
  Settings: {},
}
export type NavigationTargets = keyof NavigationParams;
export type NavigationProps<RouteName extends NavigationTargets> =
  NativeStackScreenProps<NavigationParams, RouteName>;
