import { withDefaultAuthenticatorValues } from "~/utils/withDefaultAuthenticatorValues";

import { BaseException } from "./BaseException";

export const OtpAuthUrl = {
  encode,
  decode,
};

function encode(authenticator: Authenticator): string {
  const userDomain = encodeURIComponent(`${authenticator.issuer}:${authenticator.name}`);
  return `otpauth://${authenticator.type}/${userDomain}?secret=${authenticator.secret}&issuer=${authenticator.issuer}`;
}

function decode(uriString: string): Authenticator {
  const urlString = decodeURIComponent(uriString);
  if (!urlString.startsWith("otpauth://")) {
    throw new BaseException("InvalidUri", {}, "nfdklb8ad89");
  }
  const url = new URL(urlString);
  const type = url.host;
  const name = urlString.replace(`otpauth://${type}/`, "").split("?")[0] || "";
  const secret = url.searchParams.get("secret") || "";
  const issuer = url.searchParams.get("issuer") || "";
  const missings = [];
  if (!type) {
    missings.push("type");
  }
  if (!secret) {
    missings.push("secret");
  }
  if (missings.length > 0) {
    throw new BaseException("MissingParams", {
      params: missings,
    });
  }
  return withDefaultAuthenticatorValues({
    type: type as AuthenticatorType,
    issuer,
    name,
    secret,
  });
}
