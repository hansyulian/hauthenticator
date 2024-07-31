type AuthenticatorAlgorithms = "unspecified" | "sha1" | "sha256" | "sha512" | "md5";
type AuthenticatorType = "unspecified" | "hotp" | "totp";
type AuthenticatorDigitCount = "unspecified" | 6 | 8;
type Authenticator = {
  secret: string;
  name?: string;
  issuer?: string;
  algorithm: AuthenticatorAlgorithms;
  digits: AuthenticatorDigitCount;
  type: AuthenticatorType;
};
type AuthenticatorFormData = Partial<Authenticator> &
  Pick<Authenticator, "issuer" | "name" | "secret">;
type AuthenticatorExtended = {
  authenticator: Omit<Authenticator, "secret">;
  id: string;
  status: "ACTIVE" | "DELETED";
  encryptedSecret: string;
  isFavourite: boolean;
  createdAt: string;
  updatedAt: string;
};
type AuthenticatorExtendedFormData = Partial<AuthenticatorExtended> &
  Pick<AuthenticatorExtended, "authenticator" | "isFavourite">;

type SelectableAuthenticatorExtended = {
  isSelected: boolean;
  authenticatorExtended: AuthenticatorExtended;
};

type DuplicatedGroup = {
  entries: SelectableAuthenticatorExtended[];
};

type AuthenticatorImportForm = {
  authenticator: Authenticator;
  selected: boolean;
};

type AuthenticatorComparisonDetail = {
  issuer: string;
  name: string;
  secret: string;
  authenticatorExtended: AuthenticatorExtended;
};
