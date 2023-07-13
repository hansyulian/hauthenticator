import { ScreenLayout } from "@components/ScreenLayout"
import { NavigationProps } from "@modules/Navigation";
import { FlatList } from "react-native";
import { AuthenticatorImportForm, ImportConfirmationScreenRow } from "./ImportConfirmationScreen.Row";
import { useEffect, useState } from "react";
import { AppBarAction } from "@components/AppBarAction";
import { useAddAuthenticators } from "@hooks/useAddAuthenticator";
import { useNavigate } from "@hooks/useNavigate";

export const ImportConfirmationScreen = (
  props: NavigationProps<'ImportConfirmation'>
) => {
  const { authenticators: authenticatorsImport } = props.route.params;
  const navigate = useNavigate();
  const addAuthenticators = useAddAuthenticators();
  const [importForms, setImportForms] = useState<AuthenticatorImportForm[]>([]);

  useEffect(() => {
    setImportForms(authenticatorsImport.map(record => ({
      authenticator: record,
      selected: true,
    })))
  }, [authenticatorsImport])

  const confirm = () => {
    addAuthenticators(importForms.map(record => record.authenticator));
    navigate('AuthenticatorList', {}, {
      popTo: true,
    });
  }

  return <ScreenLayout headerText='Import Confirmation' rightSection={
    <AppBarAction icon='check' onPress={confirm} />
  }>
    <FlatList
      data={importForms}
      renderItem={({ item, index }) => <ImportConfirmationScreenRow
        key={`import-confirmation-row-${index}`}
        authenticatorForm={item}
      />}
    />
  </ScreenLayout>
} 