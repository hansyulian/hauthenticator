import { AuthenticatorStoreData } from "@storage/AuthenticatorStore";
import { GoogleDrive } from "./GoogleDrive";
import { Aes } from "./Aes";
import { sortAuthenticators } from "@utils/sortAuthenticators";
const saveFileName = "sync.json";

let googleDrive: GoogleDrive;

export const GoogleDriveSync = {
  initialize,
  sync,
  reset,
  testPassword,
};

async function initialize() {
  if (!googleDrive) {
    googleDrive = await GoogleDrive.initialize();
  }
}

async function reset() {
  await writeSaveFile([]);
}

async function testPassword(password: string) {
  const saveFileContent = await getSaveFileContent();
  const firstAuthenticator = saveFileContent.authenticators[0];
  if (!firstAuthenticator) {
    console.log("empty authenticators");
    return true;
  }
  try {
    await Aes.decrypt(firstAuthenticator.encryptedSecret, password);
    console.log("success");
    return true;
  } catch (err) {
    console.log("fail");
    return false;
  }
}


async function sync(authenticators: AuthenticatorExtended[]): Promise<AuthenticatorExtended[]> {
  const saveFileContent = await getSaveFileContent();
  const processedAuthenticators = syncProcessor(authenticators, saveFileContent.authenticators);
  await writeSaveFile(processedAuthenticators);
  return processedAuthenticators;
}

function syncProcessor(localRecords: AuthenticatorExtended[], syncRecords: AuthenticatorExtended[]): AuthenticatorExtended[] {
  const index: Record<string, AuthenticatorExtended> = {};
  localRecords.forEach(record => index[record.id] = record);
  syncRecords.forEach(record => {
    const id = record.id;
    if (!index[id]) {
      index[id] = record;
      return;
    }
    if (index[id].updatedAt < record.updatedAt) {
      index[id] = record;
      return;
    };
  });
  const values = Object.values(index);
  const result = sortAuthenticators(values);
  return result;
}

async function getSaveFileContent(): Promise<AuthenticatorBackupData> {
  const saveFileContent = await googleDrive.getFileContent(saveFileName);
  return {
    ...getDefaultAuthenticatorData(),
    ...saveFileContent,
  };
}

async function writeSaveFile(authenticators: AuthenticatorExtended[]) {
  await googleDrive.upsert(saveFileName, {
    ...getDefaultAuthenticatorData(),
    authenticators,
  });
}

function getDefaultAuthenticatorData(): AuthenticatorBackupData {
  return {
    timestamp: new Date().getTime(),
    version: 1,
    authenticators: [],

  };
}