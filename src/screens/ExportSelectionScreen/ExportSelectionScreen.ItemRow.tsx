import { CheckboxE } from "@components/CheckboxE";
import { DividerE } from "@components/DividerE";
import { LabelValuePair } from "@components/LabelValuePair";
import { ViewE } from "@components/ViewE";
import { useEffect, useState } from "react";

export type ExportSelectionScreenItemRowProps = {
  authenticatorExtended: AuthenticatorExtended;
  selectedAuthenticatorsRef: Record<string, boolean>;
}

export const ExportSelectionScreenItemRow = (props: ExportSelectionScreenItemRowProps) => {
  const { authenticatorExtended, selectedAuthenticatorsRef } = props;
  const [selected, setSelected] = useState(selectedAuthenticatorsRef[authenticatorExtended.id] || false);

  const onToggleSelected = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    selectedAuthenticatorsRef[authenticatorExtended.id] = selected;
  }, [authenticatorExtended.id, selected, selectedAuthenticatorsRef]);

  return <>
    <ViewE row padding>
      <ViewE flex gap>
        <LabelValuePair
          label="Issuer"
        >
          {authenticatorExtended.authenticator.issuer}
        </LabelValuePair>
        <LabelValuePair
          label="Name"
        >
          {authenticatorExtended.authenticator.name}
        </LabelValuePair>
      </ViewE>
      <ViewE alignItems="center" justifyContent="center">
        <CheckboxE checked={selected} onPress={onToggleSelected} />
      </ViewE>
    </ViewE>
    <DividerE />
  </>;
};
