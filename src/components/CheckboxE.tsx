import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, CheckboxProps } from "react-native-paper";

export type CheckboxEProps = Omit<CheckboxProps, "status"> & {
  checked: boolean;
  onPress: () => void;
};

export const CheckboxE = (props: CheckboxEProps) => {
  const { checked, onPress, ...rest } = props;
  return <Checkbox {...rest} status={checked ? "checked" : "unchecked"} onPress={onPress} />;
};
