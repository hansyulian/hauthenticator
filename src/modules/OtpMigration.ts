import { base32 } from "rfc4648";
import { Buffer } from "@craftzdog/react-native-buffer";
import protobuf from 'protobufjs';
import { BaseException } from "./BaseException";
const jsonDescriptor = require('@assets/authenticatorProto.json');
const protobufRoot = protobuf.Root.fromJSON(jsonDescriptor);
const migrationPayload = protobufRoot.lookupType("MigrationPayload");

const ALGORITHM: any = {
  0: "unspecified",
  1: "sha1",
  2: "sha256",
  3: "sha512",
  4: "md5",
};

const DIGIT_COUNT: any = {
  0: "unspecified",
  1: 6,
  2: 8,
};

const OTP_TYPE: any = {
  0: "unspecified",
  1: "hotp",
  2: "totp",
};
export type AuthenticationMigrationProtobuf = {
  otpParameters: Authenticator[]
}

export const OtpMigration = {
  decode,
  encode,
}

async function decode(sourceUrl: string) {
  if (sourceUrl.indexOf("otpauth-migration://offline") !== 0) {
    throw new BaseException('InvalidMigrationUrl');
  }
  const dataBase64 = new URL(sourceUrl).searchParams.get('data');
  if (!dataBase64) {
    throw new BaseException('MissingMigrationData');
  }
  const buffer = Buffer.from(dataBase64, "base64");
  const decodedOtpPayload: any = migrationPayload.decode(buffer);

  const otpParameters: Authenticator[] = [];
  for (let otpParameter of decodedOtpPayload.otpParameters) {
    otpParameters.push({
      secret: base32.stringify(otpParameter.secret),
      name: otpParameter.name,
      issuer: otpParameter.issuer,
      algorithm: ALGORITHM[otpParameter.algorithm] as AuthenticatorAlgorithms,
      digits: DIGIT_COUNT[otpParameter.digits] as AuthenticatorDigitCount,
      type: OTP_TYPE[otpParameter.type] as AuthenticatorType,
      counter: otpParameter.counter,
    });
  }

  return otpParameters;
}

async function encode(otpParameters: Authenticator[]) {
  throw new BaseException('Unimplemented')
}