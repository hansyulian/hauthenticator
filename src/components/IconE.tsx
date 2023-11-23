import { ColorTokens, useStyleConstants } from "@hooks/useStyleConstants";
import { useMemo } from "react";
import { IconButton, IconButtonProps } from "react-native-paper";

export type IconEProps = IconButtonProps & {
  color?: ColorTokens;
}

export const IconE = (props: IconEProps) => {
  const { color, iconColor, ...rest } = props;
  const styleConstants = useStyleConstants();
  const calculatedColor = useMemo(() => {
    if (iconColor) {
      return iconColor;
    }
    if (color) {
      return styleConstants.colors[color] as string;
    }
    return undefined;
  }, [color, iconColor, styleConstants]);
  return <IconButton  {...rest} iconColor={calculatedColor} />;
};