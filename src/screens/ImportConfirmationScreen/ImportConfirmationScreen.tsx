import { useEffect, useState } from "react";

import { FlatList } from "react-native";
import { AppBarAction } from "~/components/AppBarAction";
import { ScreenLayout } from "~/components/ScreenLayout";
import { useAddAuthenticators } from "~/hooks/useAddAuthenticators";
import { useNavigate } from "~/hooks/useNavigate";
import { NavigationProps } from "~/modules/Navigation";

import { ImportConfirmationScreenRow } from "./ImportConfirmationScreen.Row";

export const ImportConfirmationScreen = (props: NavigationProps<"ImportConfirmation">) => {
  const { authenticators: authenticatorsImport } = props.route.params;
  const navigate = useNavigate();
  const addAuthenticators = useAddAuthenticators();
  const [importForms, setImportForms] = useState<AuthenticatorImportForm[]>([]);

  useEffect(() => {
    setImportForms(
      authenticatorsImport.map((record) => ({
        authenticator: record,
        selected: true,
      }))
    );
  }, [authenticatorsImport]);

  const confirm = () => {
    addAuthenticators(
      importForms.filter((record) => record.selected).map((record) => record.authenticator)
    );
    navigate(
      "AuthenticatorList",
      {},
      {
        popTo: true,
      }
    );
  };

  return (
    <ScreenLayout
      headerText="Import Confirmation"
      rightSection={<AppBarAction icon="check" onPress={confirm} />}>
      <FlatList
        data={importForms}
        renderItem={({ item, index }) => (
          <ImportConfirmationScreenRow
            key={`import-confirmation-row-${index}`}
            authenticatorForm={item}
          />
        )}
      />
    </ScreenLayout>
  );
};
