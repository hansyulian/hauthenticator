import { ReactNode } from "react";
import { TextE } from "./TextE";
import { ViewE } from "./ViewE";
import { TouchableE } from "./TouchableE";

export type LabelValuePairProps = {
  label: string;
  children: string | ReactNode;
  onPress?: VoidFunction;
}

export const LabelValuePair = (props: LabelValuePairProps) => {
  const { onPress } = props;

  if (onPress) {
    return <TouchableE onPress={onPress}>
      <LabelValuePairBase {...props} />
    </TouchableE>
  }

  return <LabelValuePairBase {...props} />
}

export const LabelValuePairBase = (props: LabelValuePairProps) => {
  const { label, children } = props;
  return <ViewE justifyContent="space-between" row>

    <TextE type="pairLabel">{label}</TextE>
    {['string', 'number'].includes(typeof children) ? <TextE type="pairValue">{children}</TextE> : children}
  </ViewE>
}