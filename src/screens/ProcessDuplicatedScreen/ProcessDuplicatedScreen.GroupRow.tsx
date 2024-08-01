import { CheckboxE } from "@components/CheckboxE";
import { ViewE } from "@components/ViewE";
import { AuthenticatorPreview } from "@screens/components/AuthenticatorPreview";

export type ProcessDuplicatedGroupRowProps = {
  entry: SelectableAuthenticatorExtended;
  seconds: number;
  onToggleSelected: () => void;
};

export const ProcessDuplicatedGroupRow = (props: ProcessDuplicatedGroupRowProps) => {
  const { entry, seconds, onToggleSelected } = props;
  const { isSelected } = entry;

  return (
    <ViewE row justifyContent="space-between">
      <AuthenticatorPreview
        hideTimer
        authenticatorExtended={entry.authenticatorExtended}
        seconds={seconds}
      />
      <ViewE justifyContent="center">
        <CheckboxE checked={isSelected} onPress={onToggleSelected} />
      </ViewE>
    </ViewE>
  );
};
