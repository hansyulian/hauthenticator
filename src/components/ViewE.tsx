
import { useMemo } from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native"
import { useCommonStyles } from "@hooks/useCommonStyles";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { SpacingValues, useSpacingExtractor } from "@hooks/useSpacingExtractor";
export type ViewEFloating = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
export type ViewEProps = ViewProps & SpacingValues & {
  floating?: ViewEFloating;
  row?: boolean;
  shadow?: boolean;
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between' | 'space-around';
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullSize?: boolean;
  alignItems?: 'center' | 'baseline' | 'flex-end' | 'flex-start' | 'stretch';
}

export const ViewE = (props: ViewEProps) => {
  const processedProps = useSpacingExtractor(props);
  const {
    padding,
    margin,
    props: { floating, alignItems, fullHeight, fullSize, fullWidth, justifyContent, row, shadow, style, ...rest }
  } = processedProps;
  const styles = useStyles(
    floating,
    alignItems,
    fullSize,
    fullHeight,
    fullWidth,
    justifyContent,
    row,
    shadow,
    padding,
    margin
  );
  const memoedStyle = useMemo(() => {
    return [styles.view, style]
  }, [styles.view, style])
  return <View {...rest} style={memoedStyle} />
}


const useStyles = (
  floating?: ViewEFloating,
  alignItems?: string,
  fullSize?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  justifyContent?: string,
  row?: boolean,
  shadow?: boolean,
  padding?: ViewStyle,
  margin?: ViewStyle
) => {
  const constants = useStyleConstants();
  const commonStyles = useCommonStyles();

  return useMemo(() => {
    const view: ViewStyle = {
      ...padding,
      ...margin,
      justifyContent: justifyContent as any,
      alignItems: alignItems as any,
    };
    if (shadow) {
      Object.assign(view, commonStyles.shadow);
    }
    if (row) {
      Object.assign(view, commonStyles.row);
    }
    if (fullWidth) {
      Object.assign(view, commonStyles.fullWidth);
    }
    if (fullHeight) {
      Object.assign(view, commonStyles.fullHeight);
    }
    if (fullSize) {
      Object.assign(view, commonStyles.fullSize);
    }
    switch (floating) {
      case 'bottom-left':
        Object.assign(view, commonStyles.floatingBottomLeft);
        break;
      case 'bottom-right':
        Object.assign(view, commonStyles.floatingBottomRight);
        break;
      case 'top-left':
        Object.assign(view, commonStyles.floatingTopLeft);
        break;
      case 'top-right':
        Object.assign(view, commonStyles.floatingTopRight);
        break;
    }
    return StyleSheet.create({
      view,
    })
  }, [
    padding,
    margin,
    floating,
    fullSize,
    fullHeight,
    row,
    justifyContent,
    alignItems,
    shadow])
}