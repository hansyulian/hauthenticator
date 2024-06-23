import { useStyleConstants } from "@hooks/useStyleConstants";
import * as Progress from "react-native-progress";
import { TextE } from "./TextE";

export type SecondsProgressCircleProps = {
  seconds: number;
  max?: number;
  small?: boolean;
}

export const SecondsProgressCircle = (props: SecondsProgressCircleProps) => {
  const styleConstants = useStyleConstants();
  const { seconds, max = 60, small } = props;

  return <Progress.Circle
    progress={seconds / max}
    thickness={small ? 5 : 10}
    direction='counter-clockwise'
    strokeCap='round'
    size={small ? 40 : 80}
    color={styleConstants.colors.primary}
    showsText
    borderWidth={0}
    formatText={(progress) => Math.round(progress * max)}
    textStyle={{ fontSize: small ? 16 : 32 }} />;
};