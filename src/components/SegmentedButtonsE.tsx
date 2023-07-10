import { useStyleConstants } from "@hooks/useStyleConstants";
import { useMemo } from "react";
import { ViewStyle } from 'react-native';
import { SegmentedButtons } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";

export type SegmentedButtonsEOptions<T = string> = {
  value: T;
  label: string;
  icon?: IconSource;
  style?: ViewStyle;
  uncheckedColor?: string;
  checkedColor?: string;
}
export type SegmentedButtonsEProps<T = string> = {
  value: T;
  onChange: (value: T) => void;
  buttons: SegmentedButtonsEOptions<T>[];
}

export function SegmentedButtonsE<T = string>(props: SegmentedButtonsEProps<T>) {
  const { buttons, onChange, value } = props;
  const constants = useStyleConstants();

  const buttonsExtended = useMemo(() => {
    for (const button of buttons) {
      button.style = button.style || {};
      button.style.backgroundColor = button.style.backgroundColor || constants.colors.surface;
      button.checkedColor = button.checkedColor || constants.colors.primary;
    }
    return buttons;
  }, [buttons, constants])

  return <SegmentedButtons
    value={value as any}
    onValueChange={onChange as any}
    buttons={buttonsExtended as any}
  />
}
