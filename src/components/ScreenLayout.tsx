import { useCommonStyles } from "@hooks/useCommonStyles";
import { PropsWithChildren, ReactNode, useMemo, useState } from "react"
import { LayoutChangeEvent, LayoutRectangle, StyleSheet, View } from "react-native"
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarE } from "./StatusBarE";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { Appbar } from "react-native-paper";
import { useBack } from "@hooks/useBack";
import { useCanBack } from "@hooks/useCanBack";
import { useIsFocused } from "@react-navigation/native";
import { TextE } from "./TextE";
import { ViewE } from "./ViewE";

export type ScreenLayoutProps = PropsWithChildren & {
  headerText?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  disableBack?: boolean;
}

export const ScreenLayout = (props: ScreenLayoutProps) => {
  const { disableBack = false, headerText, children, leftSection, rightSection } = props;
  const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
  const [containerLayout, setContainerLayout] = useState<LayoutRectangle>();
  const contentHeight = useMemo(() => {
    if (!containerLayout || !headerLayout) {
      return 0;
    }
    return containerLayout?.height - headerLayout?.height - headerLayout?.y;
  }, [headerLayout, containerLayout])

  const canBack = useCanBack();
  const back = useBack();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = useStyles(contentHeight, safeAreaInsets);
  const isFocused = useIsFocused();
  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerLayout(event.nativeEvent.layout);

  }
  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setHeaderLayout(event.nativeEvent.layout);

  }
  if (!isFocused) {
    return null;
  }

  return <ViewE fullSize onLayout={onContainerLayout}>
    <Appbar.Header onLayout={onHeaderLayout}>
      {(canBack() && !disableBack) && <Appbar.BackAction onPress={() => back()} />}
      {leftSection}
      <Appbar.Content title={headerText}></Appbar.Content>
      {rightSection}
    </Appbar.Header>
    <View style={styles.contentContainer}>
      {children}
    </View>
    <StatusBarE />
  </ViewE>
}

const useStyles = (contentHeight: number, insets: EdgeInsets) => {
  const constants = useStyleConstants();
  const commonStyles = useCommonStyles();
  return useMemo(() => StyleSheet.create({
    contentContainer: {
      ...commonStyles.fullWidth,
      height: contentHeight,
      backgroundColor: constants.colors.background,
    }
  }), [
    contentHeight,
    insets
  ])
}