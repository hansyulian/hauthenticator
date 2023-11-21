import { Buffer } from "@craftzdog/react-native-buffer";
import protobuf from 'protobufjs';
import { BaseException } from "./BaseException";
import { uint8ArrayToBase32 } from "@utils/uint8ArrayToBase32";
import { base32ToUint8Array } from "@utils/base32ToUint8Array";
const jsonDescriptor = require('@assets/authenticatorProto.json');
const protobufRoot = protobuf.Root.fromJSON(jsonDescriptor);
const migrationPayload = protobufRoot.lookupType("MigrationPayload");

type OtpParameter = {
  secret: Uint8Array;
  name?: string;
  issuer?: string;
  algorithm: OtpParameterAlgorithm;
  digits: OtpParameterDigitCount;
  type: OtpParameterType;
}

export type MigrationPayload = {
  otpParameters: OtpParameter[];
  version: number;
  batchSize: number;
  batchIndex: number;
  batchId: number;
}

export type ParsedMigrationPayload = {
  otpParameters: Authenticator[];
  version: number;
  batchSize: number;
  batchIndex: number;
  batchId: number;
}
enum OtpParameterAlgorithm {
  "unspecified" = 0,
  "sha1" = 1,
  "sha256" = 2,
  "sha512" = 3,
  "md5" = 4,
};

enum OtpParameterDigitCount {
  "unspecified" = 0,
  'six' = 1,
  'eight' = 2,
};

enum OtpParameterType {
  "unspecified" = 0,
  "hotp" = 1,
  "totp" = 2,
};

export type AuthenticationMigrationProtobuf = {
  otpParameters: Authenticator[]
}

export const OtpMigration = {
  decode,
  encode,
}

function decode(sourceUrl: string) {
  if (sourceUrl.indexOf("otpauth-migration://offline") !== 0) {
    throw new BaseException('InvalidMigrationUrl');
  }
  const dataBase64 = new URL(sourceUrl).searchParams.get('data');
  if (!dataBase64) {
    throw new BaseException('MissingMigrationData');
  }
  const buffer = Buffer.from(dataBase64, "base64");
  const decodedOtpPayload = migrationPayload.decode(buffer) as unknown as MigrationPayload;
  const otpParameters: Authenticator[] = [];
  for (let otpParameter of decodedOtpPayload.otpParameters) {
    otpParameters.push({
      secret: uint8ArrayToBase32(otpParameter.secret as any),
      name: otpParameter.name,
      issuer: otpParameter.issuer,
      algorithm: OtpParameterAlgorithm[otpParameter.algorithm] as AuthenticatorAlgorithms,
      digits: parseDigitCount(otpParameter.digits),
      type: OtpParameterType[otpParameter.type] as AuthenticatorType,
    });
  }
  const parsed: ParsedMigrationPayload = {
    batchId: decodedOtpPayload.batchId,
    batchIndex: decodedOtpPayload.batchIndex,
    batchSize: decodedOtpPayload.batchSize,
    otpParameters,
    version: decodedOtpPayload.version,
  }
  return parsed;
}

function encode(payload: Partial<ParsedMigrationPayload>) {
  const {
    batchId = Math.ceil(Math.random() * 1000000),
    batchIndex = 1,
    batchSize = 1,
    version = 1,
    otpParameters: parsedOtpParameters = [],
  } = payload
  const otpParameters: OtpParameter[] = [];
  for (const parsedOtpParameter of parsedOtpParameters) {
    const otpParameter: OtpParameter = {
      secret: base32ToUint8Array(parsedOtpParameter.secret),
      algorithm: OtpParameterAlgorithm[parsedOtpParameter.algorithm],
      digits: serializeDigitCount(parsedOtpParameter.digits),
      type: OtpParameterType[parsedOtpParameter.type],
    };
    if (parsedOtpParameter.name) {
      otpParameter.name = parsedOtpParameter.name
    }
    if (parsedOtpParameter.issuer) {
      otpParameter.issuer = parsedOtpParameter.issuer
    }
    otpParameters.push(otpParameter)
  }
  const serializedPayload = {
    batchId,
    batchIndex,
    batchSize,
    version,
    otpParameters,
  }
  const message = migrationPayload.fromObject(serializedPayload)
  const encodedUint8Array = migrationPayload.encode(message).finish();
  const dataBase64 = encodeURIComponent(Buffer.from(encodedUint8Array).toString('base64'));
  const result = `otpauth-migration://offline?data=${dataBase64}`;
  return result;
}

function parseDigitCount(value: OtpParameterDigitCount): AuthenticatorDigitCount {
  switch (value) {
    case OtpParameterDigitCount.eight: return 8;
    case OtpParameterDigitCount.six: return 6;
    case OtpParameterDigitCount.unspecified: return 'unspecified';
  }
}

function serializeDigitCount(value: AuthenticatorDigitCount): OtpParameterDigitCount {
  switch (value) {
    case "unspecified": return OtpParameterDigitCount.unspecified;
    case 6: return OtpParameterDigitCount.six;
    case 8: return OtpParameterDigitCount.eight;
  }
}
