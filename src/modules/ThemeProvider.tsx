
import { PropsWithChildren, useMemo } from "react";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

// generated in https://callstack.github.io/react-native-paper/docs/guides/theming/

const lightTheme = {
  ...MD3LightTheme,
  "colors": {
    "primary": "rgb(104, 71, 192)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(232, 221, 255)",
    "onPrimaryContainer": "rgb(33, 0, 93)",
    "secondary": "rgb(0, 95, 175)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(212, 227, 255)",
    "onSecondaryContainer": "rgb(0, 28, 58)",
    "tertiary": "rgb(56, 107, 1)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(183, 244, 129)",
    "onTertiaryContainer": "rgb(13, 32, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(28, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(28, 27, 30)",
    "surfaceVariant": "rgb(230, 224, 236)",
    "onSurfaceVariant": "rgb(72, 69, 78)",
    "outline": "rgb(121, 117, 127)",
    "outlineVariant": "rgb(202, 196, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(49, 48, 51)",
    "inverseOnSurface": "rgb(244, 239, 244)",
    "inversePrimary": "rgb(206, 189, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(247, 242, 252)",
      "level2": "rgb(243, 237, 250)",
      "level3": "rgb(238, 231, 248)",
      "level4": "rgb(237, 229, 247)",
      "level5": "rgb(234, 226, 246)"
    },
    "surfaceDisabled": "rgba(28, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(28, 27, 30, 0.38)",
    "backdrop": "rgba(50, 47, 56, 0.4)"
  }
};

const darkTheme = {
  ...MD3DarkTheme,
  "colors": {
    "primary": "rgb(206, 189, 255)",
    "onPrimary": "rgb(57, 5, 144)",
    "primaryContainer": "rgb(80, 43, 167)",
    "onPrimaryContainer": "rgb(232, 221, 255)",
    "secondary": "rgb(165, 200, 255)",
    "onSecondary": "rgb(0, 49, 95)",
    "secondaryContainer": "rgb(0, 71, 134)",
    "onSecondaryContainer": "rgb(212, 227, 255)",
    "tertiary": "rgb(156, 215, 105)",
    "onTertiary": "rgb(26, 55, 0)",
    "tertiaryContainer": "rgb(40, 80, 0)",
    "onTertiaryContainer": "rgb(183, 244, 129)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(28, 27, 30)",
    "onBackground": "rgb(230, 225, 230)",
    "surface": "rgb(28, 27, 30)",
    "onSurface": "rgb(230, 225, 230)",
    "surfaceVariant": "rgb(72, 69, 78)",
    "onSurfaceVariant": "rgb(202, 196, 207)",
    "outline": "rgb(148, 143, 153)",
    "outlineVariant": "rgb(72, 69, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(230, 225, 230)",
    "inverseOnSurface": "rgb(49, 48, 51)",
    "inversePrimary": "rgb(104, 71, 192)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(37, 35, 41)",
      "level2": "rgb(42, 40, 48)",
      "level3": "rgb(48, 45, 55)",
      "level4": "rgb(49, 46, 57)",
      "level5": "rgb(53, 50, 62)"
    },
    "surfaceDisabled": "rgba(230, 225, 230, 0.12)",
    "onSurfaceDisabled": "rgba(230, 225, 230, 0.38)",
    "backdrop": "rgba(50, 47, 56, 0.4)"
  }
};

export const ThemeProvider = (props: PropsWithChildren) => {
  const theme = useMemo(() => {
    return lightTheme;
  }, []);
  return <PaperProvider {...props} theme={theme}>
  </PaperProvider>;
};