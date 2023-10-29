import { GoogleLogin } from './GoogleLogin';
import { GDrive, MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';
const saveFileName = 'hauthenticator.json';

let gDrive: GDrive;

export const GoogleDriveSync = {
  initialize,
  backup,
  restore,
  sync,
  clear,
}

async function clear() {
  const { files } = await gDrive.files.list({
    spaces: 'appDataFolder',
  });
  for (const file of files) {
    gDrive.files.delete(file.id);
  }
}

async function initialize(accessToken: string) {
  gDrive = new GDrive();
  gDrive.accessToken = accessToken;
  await clear();
}

async function sync(authenticators: AuthenticatorExtended[]) {
  const saveFileContent = await getSaveFileContent();
  console.log(saveFileContent);
}

async function backup(authenticators: AuthenticatorExtended[]) {

}

async function restore() {

}

async function getSaveFileMetadata() {
  const filesResponse = await gDrive.files.list({
    spaces: 'appDataFolder',
  });
  const { files } = filesResponse;
  console.log(files);
  const saveFile = files.find(record => record.name === saveFileName);
  if (saveFile) {
    console.log('save file found');
    return saveFile
  }
  console.log('save file not found');
  try {
    const file = await gDrive.files.newMultipartUploader().setRequestBody({
      name: saveFileName,
      parents: ['appDataFolder']
    }).setData(
      JSON.stringify(getDefaultAuthenticatorData()), MimeTypes.JSON
    ).execute();
    return file;
  } catch (err) {
    // not sure this always get aborted
    const filesResponse = await gDrive.files.list({
      spaces: 'appDataFolder',
    });
    const { files } = filesResponse;
    const saveFile = files.find(record => record.name === saveFileName);
    if (saveFile) {
      return saveFile;
    }
  }
}

async function getSaveFileContent() {
  const saveFileMetadata = await getSaveFileMetadata();
  const saveFileContent = await gDrive.files.getJson(saveFileMetadata.id, {
    spaces: 'appDataFolder',
  });
  return {
    ...getDefaultAuthenticatorData(),
    ...saveFileContent,
  }
}

async function writeSaveFile(content: any) {

}

function getDefaultAuthenticatorData(): GoogleDriveAuthenticatorBackupData {
  return {
    timestamp: new Date().getTime(),
    version: 1,
    authenticators: [],
  }
}