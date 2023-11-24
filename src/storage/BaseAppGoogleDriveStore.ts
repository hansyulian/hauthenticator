import { AppGoogleDrive } from "@modules/AppGoogleDrive";


export class BaseAppGoogleDriveStore {

  public fileName: string;
  private appGoogleDrive: AppGoogleDrive;

  constructor(accessToken: string, fileName: string) {
    this.appGoogleDrive = new AppGoogleDrive(accessToken);
    this.fileName = fileName;
  }

  public async saveFile(content: string) {
    return this.appGoogleDrive.saveFile(this.fileName, content);
  }

  public async getFile() {
    return this.appGoogleDrive.getFile(this.fileName);
  }

  public set accessToken(value: string) {
    this.appGoogleDrive.accessToken = value;
  }

  public get accessToken() {
    return this.appGoogleDrive.accessToken;
  }

  public async test() {
    return this.appGoogleDrive.test();
  }

}