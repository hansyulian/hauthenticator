import { DividerE } from "@components/DividerE";
import { TouchableE } from "@components/TouchableE";
import { ViewE, ViewEProps } from "@components/ViewE";
import React from "react";

export type SettingsScreenRowProps = ViewEProps & {
  onPress?: () => void;
}

export const SettingsScreenRow = (props: SettingsScreenRowProps) => {
  const { onPress } = props;
  const Container = onPress ? TouchableE : ViewE;
  return <ViewE>
    <Container onPress={onPress}>
      <ViewE padding {...props}>
        {props.children}
      </ViewE>
    </Container>
    <DividerE />
  </ViewE>;
};
