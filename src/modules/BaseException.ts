export class BaseException extends Error {
  public type: string;
  public details: JsonData;
  public referenceCode?: string; // used if we want to know where in the code the error is thrown

  constructor(type: string, details: JsonData = {}, referenceCode?: string) {
    super();
    this.type = type;
    this.details = details || {};
    this.referenceCode = referenceCode;
  }

  public get message() {
    return JSON.stringify({ type: this.type, details: this.details, referenceCode: this.referenceCode });
  }
}
