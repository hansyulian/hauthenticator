import { useMemo } from "react";
import { Button, ButtonProps, useTheme } from "react-native-paper";

export type ButtonEProps = ButtonProps & {
  type?: SignalType;
}
export const ButtonE = (props: ButtonEProps) => {
  const { type } = props;
  const { colors } = useTheme();

  const calculatedSignalPreset = useMemo<Partial<ButtonProps>>(() => {
    switch (type) {
      case "danger":
        return {
          textColor: colors.onError,
          buttonColor: colors.error,
        };
      default:
        return {

        };
    }

  }, [colors.error, colors.onError, type]);

  return <Button elevation={1} mode='contained' {...calculatedSignalPreset} {...props} />;
};