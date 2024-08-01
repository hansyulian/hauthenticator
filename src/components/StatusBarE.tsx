import { StatusBar } from "expo-status-bar";
import { useStyleConstants } from "~/hooks/useStyleConstants";

export const StatusBarE = () => {
  const constants = useStyleConstants();

  return <StatusBar backgroundColor={constants.colors.screenHeader} />;
};
