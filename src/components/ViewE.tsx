
import { useMemo } from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native"
import { useCommonStyles } from "@hooks/useCommonStyles";
import { SpacingValues, useSpacingExtractor } from "@hooks/useSpacingExtractor";
import { ColorTokens, SpacingTokens, useStyleConstants } from "@hooks/useStyleConstants";
export type ViewEFloating = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
export type ViewEStyleProps = {
  flex?: number | true;
  backgroundColor?: ColorTokens;
  floating?: ViewEFloating;
  fullSize?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between' | 'space-around';
  row?: boolean;
  column?: boolean;
  shadow?: boolean;
  gap?: boolean | SpacingTokens;
  alignItems?: 'center' | 'baseline' | 'flex-end' | 'flex-start' | 'stretch';
  minHeight?: number;
  minWidth?: number;
}
export type ViewEProps = ViewProps & SpacingValues & ViewEStyleProps & {

}


export const ViewE = (props: ViewEProps) => {
  const processedProps = useSpacingExtractor(props);
  const {
    padding,
    margin,
    props: { style, ...rest },
  } = processedProps;
  const styles = useStyles(rest, padding, margin);
  const memoedStyle = useMemo(() => {
    return [styles.view, style]
  }, [styles.view, style])
  return <View {...rest} style={memoedStyle} />
}

const useStyles = (props: ViewEStyleProps, padding?: ViewStyle, margin?: ViewStyle) => {
  const commonStyles = useCommonStyles();
  const styleConstants = useStyleConstants();

  return useMemo(() => {
    const {
      flex,
      backgroundColor,
      floating,
      alignItems,
      fullSize,
      fullHeight,
      fullWidth,
      justifyContent,
      row,
      shadow,
      column,
      gap,
      minHeight,
      minWidth,
    } = props;
    const view: ViewStyle = {
      ...padding,
      ...margin,
      flex: flex === true ? 1 : flex,
      justifyContent: justifyContent as any,
      alignItems: alignItems as any,
      minHeight,
      minWidth,
      maxWidth: '100%',
    };
    if (gap) {
      if (gap === true) {
        view.gap = styleConstants.spacing.small;
      } else {
        view.gap = styleConstants.spacing[gap];
      }
    }
    if (backgroundColor) {
      view.backgroundColor = styleConstants.colors[backgroundColor] as any;
    }
    if (shadow) {
      Object.assign(view, commonStyles.shadow);
    }
    if (row) {
      Object.assign(view, commonStyles.row);
    }
    if (column) {
      Object.assign(view, commonStyles.column)
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
  }, [props])
}