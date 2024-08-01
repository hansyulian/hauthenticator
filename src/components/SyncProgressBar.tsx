import { useSyncContext } from "@hooks/useSyncContext";
import { useEffect } from "react";
import { ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";

export const SyncProgressBar = () => {
  const { state } = useSyncContext();

  useEffect(() => {
    console.log("sync state", state);
  }, [state]);
  if (state !== "SYNCING") {
    return null;
  }
  return <ProgressBar indeterminate style={styles.progressBar} />;
};

const styles = StyleSheet.create({
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
