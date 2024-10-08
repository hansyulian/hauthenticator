import { IconE } from "~/components/IconE";
import { ViewE } from "~/components/ViewE";

import { SettingsScreenRow, SettingsScreenRowProps } from "./SettingsScreen.Row";

export type SettingsScreenIconRowProps = SettingsScreenRowProps & {
  icon: string;
};

export const SettingsScreenIconRow = (props: SettingsScreenIconRowProps) => {
  const { children, icon, onPress } = props;
  return (
    <SettingsScreenRow onPress={onPress}>
      <ViewE row justifyContent="space-between" alignItems="center">
        <ViewE row alignItems="center">
          <ViewE marginRight>
            <IconE icon={icon} />
          </ViewE>
          <ViewE flex>{children}</ViewE>
        </ViewE>
      </ViewE>
    </SettingsScreenRow>
  );
};
