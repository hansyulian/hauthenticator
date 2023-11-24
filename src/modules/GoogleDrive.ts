import { GDrive, MimeTypes } from "@robinbobin/react-native-google-drive-api-wrapper";
import { GoogleLogin } from "./GoogleLogin";

type GoogleDriveFileMetadata = {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
}

export class GoogleDrive {
  public driveInstance: GDrive;

  public static async initialize() {
    const result = await GoogleLogin.login();
    return new GoogleDrive(result.accessToken);
  }

  constructor(accessToken: string) {
    this.driveInstance = new GDrive();
    this.driveInstance.accessToken = accessToken;
  }

  public get accessToken() {
    return this.driveInstance.accessToken;
  }

  public set accessToken(value: string) {
    this.driveInstance.accessToken = value;
  }

  public async list() {
    return (await this.driveInstance.files.list({
      spaces: "appDataFolder",
    })).files as GoogleDriveFileMetadata[];
  }

  public async getFile(name: string) {
    const files = await this.list();
    return files.find(record => record.name === name);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFileContent<T = any>(name: string) {
    const file = await this.getFile(name);
    if (!file) {
      return undefined;
    }
    const result = await this.driveInstance.files.getJson(file.id);
    return result as T;
  }

  public async delete(name: string) {
    const file = await this.getFile(name);
    if (!file) {
      return false;
    }
    await this.driveInstance.files.delete(file.id);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async upsert(name: string, content: any) {
    console.log("upsert call");
    await this.delete(name);
    return this.driveInstance.files.newResumableUploader().setRequestBody({
      name: name,
      parents: ["appDataFolder"]
    }).setData(
      JSON.stringify(content), MimeTypes.JSON
    ).execute();
  }

}