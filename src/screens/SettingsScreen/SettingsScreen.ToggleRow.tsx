import { ViewE } from "@components/ViewE";
import { TextE } from "@components/TextE";
import { SwitchE } from "@components/SwitchE";
import { SettingsScreenIconRow, SettingsScreenIconRowProps } from "./SettingsScreen.IconRow";

export type SettingsScreenToggleRowProps = SettingsScreenIconRowProps & {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SettingsScreenToggleRow = (props: SettingsScreenToggleRowProps) => {
  const { text, onChange, value, ...rest } = props;
  return <SettingsScreenIconRow {...rest}>
    <ViewE row justifyContent="space-between" alignItems="center">
      <TextE>{text}</TextE>
      <SwitchE value={value} onValueChange={onChange} />
    </ViewE>
  </SettingsScreenIconRow>;
};
