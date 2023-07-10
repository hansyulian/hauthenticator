import { ViewE } from "@components/ViewE";
import { SettingsScreenRow } from "./SettingsScreen.Row";
import { TextE } from "@components/TextE";
import { SwitchE } from "@components/SwitchE";

export type SettingsScreenRowProps = {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SettingsScreenToggleRow = (props: SettingsScreenRowProps) => {
  const { text, onChange, value } = props;
  return <SettingsScreenRow >
    <ViewE row justifyContent="space-between" alignItems="center">
      <TextE>{text}</TextE>
      <SwitchE value={value} onValueChange={onChange} />
    </ViewE>
  </SettingsScreenRow>
}
