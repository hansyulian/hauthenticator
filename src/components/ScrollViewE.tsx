
import { useMemo, useState } from "react";
import { Dimensions, LayoutChangeEvent, ScrollView, StyleSheet } from "react-native";
import { useCommonStyles } from "@hooks/useCommonStyles";
import { ViewE, ViewEProps } from "./ViewE";
export type ScrollViewEProps = ViewEProps;


export const ScrollViewE = (props: ScrollViewEProps) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const styles = useStyles();

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setScrollHeight(height);
  };

  return <ScrollView onLayout={onLayout} style={styles.container}>
    <ViewE minHeight={scrollHeight} {...props} />
  </ScrollView>;
};

const useStyles = () => {
  const commonStyles = useCommonStyles();

  return useMemo(() => {
    return StyleSheet.create({
      container: {
        ...commonStyles.fullSize
      }
    });
  }, [commonStyles.fullSize]);
};