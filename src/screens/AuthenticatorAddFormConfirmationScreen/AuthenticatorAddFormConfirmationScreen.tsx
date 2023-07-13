import { ButtonE } from "@components/ButtonE";
import { ScreenLayout } from "@components/ScreenLayout"
import { ViewE } from "@components/ViewE";
import { NavigationProps } from "@modules/Navigation";
import { useAddAuthenticators } from "@hooks/useAddAuthenticator";
import { useNavigate } from "@hooks/useNavigate";
import { AuthenticatorForm } from "@screens/components/AuthenticatorForm";
import { validateAuthenticatorForm } from "@utils/validateAuthenticatorForm";
import { useState } from "react";

export const AuthenticatorAddFormConfirmationScreen = (
  props: NavigationProps<'AuthenticatorAddFormConfirmation'>
) => {
  const [form, setForm] = useState<AuthenticatorFormData>();
  const addAuthenticators = useAddAuthenticators();
  const navigate = useNavigate();
  const valid = validateAuthenticatorForm(form);
  const save = async () => {
    if (!form || !valid) {
      return;
    }
    await addAuthenticators([form]);
    navigate('AuthenticatorList', {
      back: true,
    });
  }

  return <ScreenLayout headerText='Confirmation' >
    <ViewE padding='medium'>
      <AuthenticatorForm
        form={props.route.params.form}
        onChange={setForm}
      />
      <ButtonE
        disabled={!valid}
        onPress={save}
      >
        Confirm
      </ButtonE>
    </ViewE>
  </ScreenLayout>
} 