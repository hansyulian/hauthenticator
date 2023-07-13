import { useMemo } from "react"
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

type StyleType = ViewStyle | TextStyle | ImageStyle;

export function useCommonStyles() {
  const commonStyles = useMemo(() => ({
    floatingTopLeft: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    floatingBottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    floatingBottomLeft: {
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    floatingTopRight: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    center: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    fullSize: {
      width: '100%',
      height: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }
  }), []);
  return commonStyles as Record<keyof typeof commonStyles, StyleType>;
}