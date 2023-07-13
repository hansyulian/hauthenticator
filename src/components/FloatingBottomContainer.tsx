import { useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { ViewE, ViewEProps } from "./ViewE";

export type FloatingBottomContainerProps = ViewEProps & {

}

export const FloatingBottomContainer = (props: FloatingBottomContainerProps) => {
  const { ...rest } = props;
  const [bottomHeight, setBottomHeight] = useState(0);
  const styles = useStyles(bottomHeight);
  const onLayoutBottom = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setBottomHeight(height);
  }
  return <>
    <ViewE style={styles.bottomPadding} />
    <ViewE floating="bottom-left" onLayout={onLayoutBottom} {...rest} fullWidth />
  </>;
}


const useStyles = (bottomHeight: number) => {

  return useMemo(() => StyleSheet.create({
    bottomPadding: {
      paddingBottom: bottomHeight,
    },
  }), [bottomHeight])
}