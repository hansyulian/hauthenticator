
type AuthenticatorAlgorithms = 'unspecified' | 'sha1' | 'sha256' | 'sha512' | 'md5';
type AuthenticatorType = 'unspecified' | 'hotp' | 'totp';
type AuthenticatorDigitCount = 'unspecified' | 6 | 8;
type Authenticator = {
  secret: string;
  name: string;
  issuer: string;
  algorithm: AuthenticatorAlgorithms;
  digits: AuthenticatorDigitCount;
  type: AuthenticatorType;
  counter: {
    low: number;
    high: number;
    unsigned: boolean;
  }
}
type AuthenticatorFormData = Partial<Authenticator> & Pick<Authenticator, 'issuer' | 'name' | 'secret'>;
