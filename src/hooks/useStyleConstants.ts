import { useMemo } from "react";
import { useTheme } from 'react-native-paper';

export function useStyleConstants() {
  const theme = useTheme();
  return useMemo(() => ({
    sizes: {
      base: 8,
      screenHeader: 40,
    },
    spacing: {
      negativeSmall: -8,
      negativeMedium: -16,
      small: 8,
      medium: 16,
      large: 24,
    },
    fontWeight: {
      bold: '700',
      normal: '400',
    },
    textSizes: {
      error: 16,
      normal: 16,
      otpValue: 24,
      screenHeader: 28,
      menuHeader: 24,
      code: 12,
      pairLabel: 16,
      pairValue: 16,
      paragraphHeader: 20,
    },
    textWeight: {
      error: '400',
      normal: '400',
      otpValue: '600',
      screenHeader: '600',
      menuHeader: '600',
      code: '400',
      pairLabel: '800',
      pairValue: '400',
      paragraphHeader: '700',
    },
    colors: {
      ...theme.colors,
    }
  }), [theme])
}
export type StyleConstants = ReturnType<typeof useStyleConstants>;
export type ColorTokens = keyof StyleConstants['colors'];
export type SpacingTokens = keyof StyleConstants['spacing']
