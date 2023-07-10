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
      small: 8,
      medium: 16,
      large: 24,
    },
    fontWeight: {
      bold: '700',
      normal: '400',
    },
    textSizes: {
      normal: 16,
      otpValue: 24,
      screenHeader: 28,
    },
    textWeight: {
      normal: '400',
      otpValue: '600',
      screenHeader: '600',
    },
    colors: {
      ...theme.colors,
    }
  }), [theme])
}