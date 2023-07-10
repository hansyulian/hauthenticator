import { useCallback, useMemo } from "react";
import { SpacingTokens, useStyleConstants } from "./useStyleConstants";

export type SpacingValues = {
  margin?: SpacingTokens | true;
  marginLeft?: SpacingTokens | true;
  marginRight?: SpacingTokens | true;
  marginTop?: SpacingTokens | true;
  marginBottom?: SpacingTokens | true;
  marginVertical?: SpacingTokens | true;
  marginHorizontal?: SpacingTokens | true;
  padding?: SpacingTokens | true;
  paddingLeft?: SpacingTokens | true;
  paddingRight?: SpacingTokens | true;
  paddingTop?: SpacingTokens | true;
  paddingBottom?: SpacingTokens | true;
  paddingVertical?: SpacingTokens | true;
  paddingHorizontal?: SpacingTokens | true;
}

export const useSpacingExtractor = <T extends SpacingValues>(props: T) => {
  const constants = useStyleConstants();
  const {
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    paddingVertical,
    paddingHorizontal,
    ...rest
  } = props;

  const spacingValuePriority = useCallback((values: (SpacingTokens | true | undefined)[]) => {
    for (const value of values) {
      if (value === true) {
        return constants.spacing.medium;
      }
      if (value) {
        return constants.spacing[value]
      }
    }
    return undefined;
  }, [constants.spacing]);

  const marginLeftC = useMemo(() => spacingValuePriority([marginLeft, marginHorizontal, margin]), [marginLeft, marginHorizontal, margin]);
  const marginRightC = useMemo(() => spacingValuePriority([marginRight, marginHorizontal, margin]), [marginRight, marginHorizontal, margin]);
  const marginTopC = useMemo(() => spacingValuePriority([marginTop, marginVertical, margin]), [marginTop, marginVertical, margin]);
  const marginBottomC = useMemo(() => spacingValuePriority([marginBottom, marginVertical, margin]), [marginBottom, marginVertical, margin]);
  const paddingLeftC = useMemo(() => spacingValuePriority([paddingLeft, paddingHorizontal, padding]), [paddingLeft, paddingHorizontal, padding]);
  const paddingRightC = useMemo(() => spacingValuePriority([paddingRight, paddingHorizontal, padding]), [paddingRight, paddingHorizontal, padding]);
  const paddingTopC = useMemo(() => spacingValuePriority([paddingTop, paddingVertical, padding]), [paddingTop, paddingVertical, padding]);
  const paddingBottomC = useMemo(() => spacingValuePriority([paddingBottom, paddingVertical, padding]), [paddingBottom, paddingVertical, padding]);

  const marginC = useMemo(() => ({
    marginLeft: marginLeftC,
    marginRight: marginRightC,
    marginTop: marginTopC,
    marginBottom: marginBottomC,
  }), [marginLeftC, marginRightC, marginTopC, marginBottomC])
  const paddingC = useMemo(() => ({
    paddingLeft: paddingLeftC,
    paddingRight: paddingRightC,
    paddingTop: paddingTopC,
    paddingBottom: paddingBottomC,
  }), [paddingLeftC, paddingRightC, paddingTopC, paddingBottomC])

  return useMemo(() => ({ margin: marginC, padding: paddingC, props: rest }), [marginC, paddingC, rest]);

}
