import { useStyleConstants } from "@hooks/useStyleConstants";
import { StatusBar } from "expo-status-bar";

export const StatusBarE = () => {
  const constants = useStyleConstants();

  return <StatusBar backgroundColor={constants.colors.screenHeader} />;
};
