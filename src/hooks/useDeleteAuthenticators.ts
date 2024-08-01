import { useCallback } from "react";

import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";

export const useDeleteAuthenticators = () => {
  const { data, set } = useAuthenticatorDataContext();

  return useCallback(
    async (ids: string[]) => {
      if (!data) {
        return;
      }
      const toBeDeletedAuthenticators = data.authenticators.filter((record) =>
        ids.includes(record.id)
      );
      const now = new Date().toISOString();
      toBeDeletedAuthenticators.forEach((record) => {
        record.status = "DELETED";
        record.updatedAt = now;
      });
      await set({
        ...data,
        authenticators: [...data.authenticators],
      });
    },
    [data, set]
  );
};
