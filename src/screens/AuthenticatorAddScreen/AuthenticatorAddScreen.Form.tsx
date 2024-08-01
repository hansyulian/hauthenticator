import { useState } from "react";

import { ButtonE } from "~/components/ButtonE";
import { FloatingBottomContainer } from "~/components/FloatingBottomContainer";
import { ViewE } from "~/components/ViewE";
import { useAddAuthenticators } from "~/hooks/useAddAuthenticators";
import { useBack } from "~/hooks/useBack";
import { AuthenticatorForm } from "~/screens/components/AuthenticatorForm";
import { validateAuthenticatorForm } from "~/utils/validateAuthenticatorForm";

export type AuthenticatorAddScreenFormProps = {};

export const AuthenticatorAddScreenForm = () => {
  const [form, setForm] = useState<AuthenticatorFormData>();
  const addAuthenticators = useAddAuthenticators();
  const back = useBack();
  const valid = validateAuthenticatorForm(form);

  const save = async () => {
    if (!form || !valid) {
      return;
    }
    await addAuthenticators([form]);
    back(1);
  };

  return (
    <>
      <ViewE paddingHorizontal>
        <AuthenticatorForm onChange={setForm} />
      </ViewE>
      <FloatingBottomContainer padding>
        <ButtonE disabled={!valid} onPress={save}>
          Confirm
        </ButtonE>
      </FloatingBottomContainer>
    </>
  );
};
