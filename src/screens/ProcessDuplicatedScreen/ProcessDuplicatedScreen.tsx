import { useCallback, useEffect, useState } from "react";

import { ButtonE } from "~/components/ButtonE";
import { ScreenLayout } from "~/components/ScreenLayout";
import { ScrollViewE } from "~/components/ScrollViewE";
import { TextE } from "~/components/TextE";
import { ViewE } from "~/components/ViewE";
import { useAsyncCallback } from "~/hooks/useAsyncCallback";
import { useAuthenticators } from "~/hooks/useAuthenticators";
import { useDeleteAuthenticators } from "~/hooks/useDeleteAuthenticators";
import { useEncryption } from "~/hooks/useEncryption";
import { useFocusedEffect } from "~/hooks/useFocusedEffect";
import { useNavigate } from "~/hooks/useNavigate";
import { useSecondsTimer } from "~/hooks/useSecondsTimer";
import { ProcessDuplicatedGroup } from "~/screens/ProcessDuplicatedScreen/ProcessDuplicatedScreen.Group";
import { extractDuplicatedEntries } from "~/utils/extractDuplicatedEntries";

export const ProcessDuplicatedScreen = () => {
  const authenticators = useAuthenticators();
  const { seconds, start, stop } = useSecondsTimer(30);
  const encryption = useEncryption();
  const navigate = useNavigate();
  const deleteAuthenticators = useDeleteAuthenticators();
  useFocusedEffect((isFocused) => {
    if (isFocused) {
      start();
    } else {
      stop();
    }
  }, []);
  const [duplicatedGroups, setDuplicatedGroups] = useState<DuplicatedGroup[]>([]);

  useEffect(() => {
    const comparisonEntries: AuthenticatorComparisonDetail[] = authenticators.map(
      (authenticatorExtended) => ({
        authenticatorExtended,
        issuer: authenticatorExtended.authenticator.issuer || "",
        name: authenticatorExtended.authenticator.name || "",
        secret: encryption.decrypt(authenticatorExtended.encryptedSecret),
      })
    );
    const duplicatedEntries = extractDuplicatedEntries(comparisonEntries);
    const result: DuplicatedGroup[] = duplicatedEntries.map((entries) => ({
      entries: entries.map((authenticator) => ({
        isSelected: true,
        authenticatorExtended: authenticator.authenticatorExtended,
      })),
    }));
    setDuplicatedGroups(result);
  }, [authenticators, encryption]);

  const onGroupChange = (index: number, group: DuplicatedGroup) => {
    const updatedDuplicatedGroups = [...duplicatedGroups];
    updatedDuplicatedGroups[index] = group;
    setDuplicatedGroups(updatedDuplicatedGroups);
  };

  const { callback: onFinish, loading: isLoading } = useAsyncCallback(
    useCallback(async () => {
      const unselectedAuthenticators: SelectableAuthenticatorExtended[] = [];
      for (const group of duplicatedGroups) {
        for (const entry of group.entries) {
          if (!entry.isSelected) {
            unselectedAuthenticators.push(entry);
          }
        }
      }
      const unselectedIds = unselectedAuthenticators.map(
        (record) => record.authenticatorExtended.id
      );
      await deleteAuthenticators(unselectedIds);
      navigate(
        "AuthenticatorList",
        {},
        {
          popTo: true,
        }
      );
    }, [deleteAuthenticators, duplicatedGroups, navigate])
  );

  return (
    <ScreenLayout
      headerText="Process Duplicated Entries"
      stickyBottomComponent
      bottomComponent={
        <ViewE padding>
          <ButtonE onPress={onFinish} loading={isLoading}>
            Finish
          </ButtonE>
        </ViewE>
      }>
      <ScrollViewE padding gap>
        {duplicatedGroups.map((duplicatedGroup, index) => (
          <ViewE gap key={`duplicated-group-${index}`}>
            <TextE type="paragraphHeader" weight="bold">
              Duplicated Group {index + 1}
            </TextE>
            <ProcessDuplicatedGroup
              group={duplicatedGroup}
              seconds={seconds}
              onGroupChange={(group) => onGroupChange(index, group)}
            />
          </ViewE>
        ))}
      </ScrollViewE>
    </ScreenLayout>
  );
};
