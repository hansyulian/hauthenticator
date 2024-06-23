import { PropsWithChildren } from "react";
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { TouchableRipple } from "react-native-paper";

export type TouchableEProps = PropsWithChildren & {
  type?: "ripple" | "opacity" | "native" | "withoutFeedback" | "highlight";
  onPress?: () => void;
  onLongPress?: () => void;
};

export const TouchableE = (props: TouchableEProps) => {
  const { type, ...rest } = props;
  switch (type) {
    case "native":
      return <TouchableNativeFeedback {...rest} />;
    case "highlight":
      return <TouchableHighlight {...rest} />;
    case "opacity":
      return <TouchableOpacity {...rest} />;
    case "withoutFeedback":
      return <TouchableWithoutFeedback {...rest} />;
    case "ripple":
    default:
      return <TouchableRipple {...rest}>

      </TouchableRipple>;
  }
};