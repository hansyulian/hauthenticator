import { ButtonE } from "@components/ButtonE";
import { ViewE } from "@components/ViewE";
import { useAddAuthenticator } from "@hooks/useAddAuthenticator";
import { useBack } from "@hooks/useBack";
import { useNavigate } from "@hooks/useNavigate";
import { AuthenticatorForm } from "@screens/components/AuthenticatorForm";
import { validateAuthenticatorForm } from "@utils/validateAuthenticatorForm";
import { useState } from "react";

export type AuthenticatorAddScreenFormProps = {

}

export const AuthenticatorAddScreenForm = () => {
  const [form, setForm] = useState<AuthenticatorFormData>();
  const addAuthenticator = useAddAuthenticator();
  const back = useBack();
  const valid = validateAuthenticatorForm(form);

  const save = async () => {
    if (!form || !valid) {
      return;
    }
    await addAuthenticator(form);
    back(1);
  }

  return <ViewE padding='medium'>
    <AuthenticatorForm
      onChange={setForm}
    />
    <ButtonE
      disabled={!valid}
      title="Confirm"
      onPress={save}
    />
  </ViewE>
}
