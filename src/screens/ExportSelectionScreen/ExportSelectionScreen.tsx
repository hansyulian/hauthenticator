import { useEffect, useRef, useState } from "react";

import { FlatList } from "react-native";
import { ButtonE } from "~/components/ButtonE";
import { ScreenLayout } from "~/components/ScreenLayout";
import { ViewE } from "~/components/ViewE";
import { useAuthenticators } from "~/hooks/useAuthenticators";
import { useNavigate } from "~/hooks/useNavigate";
import { useSnackbar } from "~/hooks/useSnackbar";

import { ExportSelectionScreenItemRow } from "./ExportSelectionScreen.ItemRow";

export const ExportSelectionScreen = () =>
  // props: NavigationProps<'ExportSelection'>
  {
    const authenticators = useAuthenticators();
    const [ready, setReady] = useState(false);
    const { show } = useSnackbar();
    const navigate = useNavigate();
    const selectedAuthenticatorsRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
      setReady(false);
      for (const authenticator of authenticators) {
        selectedAuthenticatorsRef.current[authenticator.id] = true;
      }
      setReady(true);
    }, [authenticators]);

    const handleExport = () => {
      const selectedAuthenticatorExtendeds: AuthenticatorExtended[] = authenticators.filter(
        (record) => selectedAuthenticatorsRef.current[record.id]
      );
      if (selectedAuthenticatorExtendeds.length === 0) {
        return show("Please select some authenticator to export");
      }
      navigate("Export", {
        authenticatorExtendeds: selectedAuthenticatorExtendeds,
      });
    };

    return (
      <ScreenLayout
        headerText="Export Selection"
        stickyBottomComponent
        bottomComponent={
          <ViewE padding>
            <ButtonE onPress={handleExport}>Continue</ButtonE>
          </ViewE>
        }>
        {ready && (
          <FlatList
            data={authenticators}
            renderItem={({ item, index }) => (
              <ExportSelectionScreenItemRow
                authenticatorExtended={item}
                selectedAuthenticatorsRef={selectedAuthenticatorsRef.current}
                key={`export-screen-item-row-${index}`}
              />
            )}
          />
        )}
      </ScreenLayout>
    );
  };
