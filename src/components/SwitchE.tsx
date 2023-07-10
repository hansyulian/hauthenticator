import { Switch, SwitchProps } from "react-native-paper";
import { ViewE } from "./ViewE";

export type SwitchEProps = SwitchProps & {

}

export const SwitchE = (props: SwitchEProps) => {
  const { ...rest } = props;
  return <ViewE marginVertical='negativeMedium'>
    <Switch {...rest} />
  </ViewE>;
}
