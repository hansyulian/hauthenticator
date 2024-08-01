import { useMemo } from "react";

import { Icon } from "react-native-paper";
import { ColorTokens, useStyleConstants } from "~/hooks/useStyleConstants";

export type IconEProps = {
  color?: ColorTokens;
  icon: unknown;
  size?: number; // undecided
};

export const IconE = (props: IconEProps) => {
  const { color, size = 24, icon } = props;
  const styleConstants = useStyleConstants();
  const calculatedColor = useMemo(() => {
    if (color) {
      return styleConstants.colors[color] as string;
    }
    return undefined;
  }, [color, styleConstants]);
  return <Icon source={icon} size={size} color={calculatedColor} />;
};
