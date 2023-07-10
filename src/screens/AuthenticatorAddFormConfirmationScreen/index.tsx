import { ButtonE } from "@components/ButtonE";
import { ScreenLayout } from "@components/ScreenLayout"
import { ViewE } from "@components/ViewE";
import { NavigationProps } from "@config/NavigationConfig";
import { useAddAuthenticator } from "@hooks/useAddAuthenticator";
import { useBack } from "@hooks/useBack";
import { AuthenticatorForm } from "@screens/components/AuthenticatorForm";
import { validateAuthenticatorForm } from "@utils/validateAuthenticatorForm";
import { useState } from "react";

export const AuthenticatorAddFormConfirmationScreen = (
  props: NavigationProps<'AuthenticatorAddFormConfirmation'>
) => {
  const [form, setForm] = useState<AuthenticatorFormData>();
  const addAuthenticator = useAddAuthenticator();
  const back = useBack();
  const valid = validateAuthenticatorForm(form);
  const save = async () => {
    if (!form || !valid) {
      return;
    }
    await addAuthenticator(form);
    back(2);
  }

  return <ScreenLayout headerText='Confirmation'>
    <ViewE padding='medium'>
      <AuthenticatorForm
        form={props.route.params.form}
        onChange={setForm}
      />
      <ButtonE
        disabled={!valid}
        title="Confirm"
        onPress={save}
      />
    </ViewE>
  </ScreenLayout>
} 