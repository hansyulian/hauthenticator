import { NavigationTargets } from "./NavigationConfig";

export const config = {
  isDevMode: false,
  initialScreen: 'AuthenticatorList' as NavigationTargets,

  // dev mode only
  authenticatorsDataReplacement: undefined as Authenticator[] | undefined,
}
export type Config = typeof config;
if (__DEV__) {
  console.log('development mode is enabled');
  try {
    config.isDevMode = true;
    const override: any = require('./config.override');
    override.default(config);
  } catch (err) {
    // console.log('override configuration not provided'); // we dont need this anyway
  }
}
