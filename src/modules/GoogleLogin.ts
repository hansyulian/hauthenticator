import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.appdata"],
});

export const GoogleLogin = {
  login,
  getTokens,
};

async function getTokens() {
  return GoogleSignin.getTokens();
}

async function login() {
  if (!(await GoogleSignin.isSignedIn())) {
    await GoogleSignin.signIn();
  }
  const userInfo = await GoogleSignin.getCurrentUser();
  const { email, familyName, givenName, id, name } = userInfo!.user;
  const tokens = await GoogleSignin.getTokens();
  const accessToken = tokens.accessToken;
  return {
    id,
    name,
    email,
    familyName,
    givenName,
    accessToken,
  };
}
