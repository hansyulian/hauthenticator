import { NavigationTargets } from "@modules/Navigation";

export const config = {
  isDevMode: false,

  // dev mode only
  authenticatorsDataReplacement: undefined as AuthenticatorExtended[] | undefined,
  devTools: false,
  devInitialScreen: '' as NavigationTargets,
  devInitialScreenParams: {} as any,
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
