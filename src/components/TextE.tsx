
import { ColorTokens, useStyleConstants, StyleConstants } from "@hooks/useStyleConstants";
import { useMemo } from "react";
import { StyleSheet, Text as NativeText } from "react-native"
import { Text, TextProps } from 'react-native-paper';

type FontWeights = 'bold' | 'normal';
export type TextETypes = keyof StyleConstants['textSizes'];
export type TextEProps = TextProps<NativeText> & {
  type?: TextETypes;
  weight?: FontWeights;
  color?: ColorTokens;
  truncate?: number;
}
export const TextE = (props: TextEProps) => {
  const { type = 'normal', weight, style, color, truncate, children, ...rest } = props;
  const styles = useStyles(type, weight, color);
  const memoedStyle = useMemo(() => {
    return [styles.text, style]
  }, [styles.text, style])
  const processedChildren = useMemo(() => {
    if (typeof children === 'string' && truncate && children.length + 3 > truncate) {
      return `${children.substring(0, truncate)}...`;
    }
    return children;
  }, [truncate, children])
  return <Text {...rest} style={memoedStyle} children={processedChildren} />
}

const useStyles = (type: TextETypes, weight?: FontWeights, color?: ColorTokens) => {
  const constants = useStyleConstants();

  return useMemo(() => StyleSheet.create({
    text: {
      color: color ? constants.colors[color] : undefined as any,
      fontSize: constants.textSizes[type],
      fontWeight: weight ? constants.fontWeight[weight] : constants.textWeight[type] as any,
    }
  }), [type, constants, weight])
}