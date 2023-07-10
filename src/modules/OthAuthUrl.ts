import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";
import { BaseException } from "./BaseException";

export const OtpAuthUrl = {
  encode,
  decode,
}


function encode(authenticator: Authenticator): string {
  const userDomain = encodeURIComponent(`${authenticator.issuer}:${authenticator.name}`)
  return `otpauth://${authenticator.type}/${userDomain}?secret=${authenticator.secret}&issuer=${authenticator.issuer}`;
}

function decode(uriString: string): Authenticator {
  const urlString = decodeURIComponent(uriString);
  const url = new URL(urlString);
  const name = urlString.split(':')[2].split('?')[0] || '';
  const secret = url.searchParams.get('secret');
  const issuer = url.searchParams.get('issuer') || '';
  const type = url.host;
  if (!secret) {
    throw new BaseException('MissingSecret', {}, 'asldfb32yflajsdf');
  }
  return withDefaultAuthenticatorValues({
    type: type as any,
    issuer,
    name,
    secret,
  })
}

