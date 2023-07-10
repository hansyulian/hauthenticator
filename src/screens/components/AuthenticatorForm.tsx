import { TextBox } from "@components/TextBox";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { useSecondsTimer } from "@hooks/useSecondsTimer";
import { useEffect, useMemo, useState } from "react";
import { AuthenticatorPreview } from "./AuthenticatorPreview";
import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";

export type AuthenticatorFormProps = {
  form?: AuthenticatorFormData;
  onChange?: (values: AuthenticatorFormData) => void;
  hidePreview?: boolean;
}

export const AuthenticatorForm = (props: AuthenticatorFormProps) => {
  const { form, onChange, hidePreview = false } = props;
  const [name, setName] = useState(form?.name || '');
  const [secret, setSecret] = useState(form?.secret || '');
  const [issuer, setIssuer] = useState(form?.issuer || '');
  const { seconds, start, stop } = useSecondsTimer(30, false);
  const validSecret = secret.length === 16;
  const showPreview = validSecret && !hidePreview;

  useEffect(() => {
    onChange?.({
      name,
      secret,
      issuer,
    })
  }, [name, secret, issuer])

  useEffect(() => {
    if (showPreview) {
      start();
    } else {
      stop();
    }
    return stop
  }, [showPreview]);

  return <ViewE>
    <TextBox
      value={name}
      label='Name'
      placeholder="Alice Bob Charlie"
      onChangeText={setName}
    />
    <TextBox
      value={issuer}
      label='Issuer'
      placeholder="John doe Pte. Ltd."
      onChangeText={setIssuer}
    />
    <TextBox
      value={secret}
      label='Secret'
      placeholder="MFRGGZDFGEZDGBNBV"
      onChangeText={setSecret}
    />
    {showPreview && <ViewE marginBottom="medium">
      <ViewE marginBottom>
        <TextE weight="bold">Authenticator preview:</TextE>
      </ViewE>
      <AuthenticatorPreview
        authenticator={withDefaultAuthenticatorValues({
          issuer,
          name,
          secret,
        })}
        seconds={seconds}
      />
    </ViewE>}
  </ViewE>
}