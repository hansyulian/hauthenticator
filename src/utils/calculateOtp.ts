import { totpToken, totpOptions, KeyEncodings, TOTPOptions } from '@otplib/core';
import { createDigest } from '@otplib/plugin-crypto-js';
import { keyDecoder } from '@otplib/plugin-base32-enc-dec';

export function calculateOtp(secret: string, options: Partial<TOTPOptions> = {}) {
  return totpToken(keyDecoder(secret, KeyEncodings.HEX), totpOptions({
    createDigest,
    encoding: KeyEncodings.HEX,
    ...options,
  }));
}