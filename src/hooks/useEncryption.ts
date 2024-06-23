import { useCallback, useMemo } from "react";
import { useSensitiveDataContext } from "./useSensitiveDataContext";
import { BaseException } from "@modules/BaseException";
import { Aes } from "@modules/Aes";

export const useEncryption = () => {
  const { data: sensitiveData } = useSensitiveDataContext();

  const encrypt = useCallback((payload: string) => {
    if (!sensitiveData?.encryptionKey) {
      throw new BaseException("MissingSensitiveDataStore", {}, "ab092134nklasdf8");
    }
    return Aes.encrypt(payload, sensitiveData.encryptionKey);
  }, [sensitiveData]);
  const decrypt = useCallback((payload: string) => {
    if (!sensitiveData?.encryptionKey) {
      throw new BaseException("MissingSensitiveDataStore", {}, "4123409b8asdnflk3251");
    }
    return Aes.decrypt(payload, sensitiveData.encryptionKey);
  }, [sensitiveData]);

  return useMemo(() => ({
    encrypt,
    decrypt
  }), [encrypt, decrypt]);
};