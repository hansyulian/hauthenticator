import { TextE } from "~/components/TextE";
import { ViewE } from "~/components/ViewE";
import { ProcessDuplicatedGroupRow } from "~/screens/ProcessDuplicatedScreen/ProcessDuplicatedScreen.GroupRow";

export type ProcessDuplicatedGroupProps = {
  group: DuplicatedGroup;
  seconds: number;
  onGroupChange: (group: DuplicatedGroup) => void;
};

export const ProcessDuplicatedGroup = (props: ProcessDuplicatedGroupProps) => {
  const { group, seconds, onGroupChange } = props;

  const onToggleSelected = (entry: SelectableAuthenticatorExtended) => {
    const updatedGroup: DuplicatedGroup = {
      entries: [...group.entries],
    };
    const updatedEntry = updatedGroup.entries.find((e) => e === entry);
    if (updatedEntry) {
      updatedEntry.isSelected = !updatedEntry.isSelected;
    }
    onGroupChange(updatedGroup);
  };

  return (
    <ViewE marginBottom gap>
      {group.entries.map((entry, index) => (
        <ViewE
          key={`process-duplicated-group-${entry.authenticatorExtended.id}`}
          gap="large"
          row
          alignItems="center">
          <TextE weight="bold">{index + 1}.</TextE>
          <ViewE flex>
            <ProcessDuplicatedGroupRow
              entry={entry}
              onToggleSelected={() => onToggleSelected(entry)}
              seconds={seconds}
            />
          </ViewE>
        </ViewE>
      ))}
    </ViewE>
  );
};
