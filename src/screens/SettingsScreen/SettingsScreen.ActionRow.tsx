import { TextE } from "~/components/TextE";
import { ViewE } from "~/components/ViewE";

import { SettingsScreenIconRow, SettingsScreenIconRowProps } from "./SettingsScreen.IconRow";

export type SettingsScreenActionRowProps = SettingsScreenIconRowProps & {
  text: string;
};

export const SettingsScreenActionRow = (props: SettingsScreenActionRowProps) => {
  const { text, ...rest } = props;
  return (
    <SettingsScreenIconRow {...rest}>
      <ViewE row justifyContent="space-between" alignItems="center">
        <TextE>{text}</TextE>
      </ViewE>
    </SettingsScreenIconRow>
  );
};
