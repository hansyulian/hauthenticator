import { validateAuthenticatorForm } from "./validateAuthenticatorForm";

describe("validateAuthenticatorForm", () => {
  it("should return false for undefined form", () => {
    const form: AuthenticatorFormData | undefined = undefined;
    const result = validateAuthenticatorForm(form);

    expect(result).toBe(false);
  });

  it("should return false for form with secret length less than 16", () => {
    const form: AuthenticatorFormData = {
      secret: "shortSecret",
    };
    const result = validateAuthenticatorForm(form);

    expect(result).toBe(false);
  });

  it("should return true for form with secret length equal to 16", () => {
    const form: AuthenticatorFormData = {
      secret: "1234567890123456",
    };
    const result = validateAuthenticatorForm(form);

    expect(result).toBe(true);
  });

  it("should return true for form with secret length greater than 16", () => {
    const form: AuthenticatorFormData = {
      secret: "longSecretMoreThan16Chars",
    };
    const result = validateAuthenticatorForm(form);

    expect(result).toBe(true);
  });

});
