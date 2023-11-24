import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { GoogleDriveSync } from "./GoogleDriveSync";
import { useSensitiveDataContext } from "@hooks/useSensitiveDataContext";
import { useAppInfoContext } from "@hooks/useAppInfoContext";
import { useAuthenticatorDataContext } from "@hooks/useAuthenticatorDataContext";
import { Aes } from "./Aes";
import { useEffectDebug } from "@hooks/useEffectDebug";

type SyncState = "UNSYNCED" | "SYNCING" | "SYNCED";

export type SyncContextValue = {
  setEnabled: (value: boolean) => void;
  enabled: boolean;
  state: SyncState;
  sync: () => void;
}

export const SyncContext = createContext<SyncContextValue | undefined>(undefined);

export const SyncProvider: FC<PropsWithChildren> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<SyncState>("UNSYNCED");
  const { data: authenticatorData, set: setAuthenticatorData } = useAuthenticatorDataContext();
  const { data: sensitiveDataContext } = useSensitiveDataContext();
  const { data: appInfo } = useAppInfoContext();

  const sync = useCallback(() => {
    setState("UNSYNCED");
  }, [])

  const value = useMemo(() => {
    return {
      setEnabled,
      enabled,
      sync,
      state,
    };
  }, [enabled, setEnabled, sync, state]);

  useEffect(() => {
    setEnabled(!!appInfo?.googleDriveSyncEnabled);
  }, [appInfo?.googleDriveSyncEnabled]);

  useEffect(() => {
    if (!enabled) {
      setState("UNSYNCED");
    }
  }, [enabled])

  useEffect(() => {
    async function resync() {
      if (state !== "UNSYNCED" || !enabled || !authenticatorData || !sensitiveDataContext?.backupPassword || !sensitiveDataContext.encryptionKey) {
        return;
      }
      try {
        setState("SYNCING");
        await GoogleDriveSync.initialize();
        const backupSyncEncryptedAuthenticators = authenticatorData.authenticators.map(record => {
          const secret = Aes.decrypt(record.encryptedSecret, sensitiveDataContext.encryptionKey);
          const backupEncryptedSecret = Aes.encrypt(secret, sensitiveDataContext.backupPassword);
          return {
            ...record,
            encryptedSecret: backupEncryptedSecret,
          };
        });
        const result = await GoogleDriveSync.sync(backupSyncEncryptedAuthenticators);
        const localEncryptedAuthenticators = result.map(record => {
          const secret = Aes.decrypt(record.encryptedSecret, sensitiveDataContext.backupPassword);
          const localEncryptedSecret = Aes.encrypt(secret, sensitiveDataContext.encryptionKey);
          return {
            ...record,
            encryptedSecret: localEncryptedSecret
          };
        });
        await setAuthenticatorData({
          authenticators: localEncryptedAuthenticators,
        });
        setState("SYNCED");
        return;
      } catch (err) {
        // here there is a lot of "Aborted" error, will check with library later
        setState("UNSYNCED");
        throw err;
      }
    }

    resync();
  }, [authenticatorData, enabled, sensitiveDataContext, setAuthenticatorData, state]);

  return <SyncContext.Provider value={value}>
    {children}
  </SyncContext.Provider>;
};