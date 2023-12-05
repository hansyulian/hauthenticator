import { TextBox } from "@components/TextBox";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { useSecondsTimer } from "@hooks/useSecondsTimer";
import { useEffect, useMemo, useState } from "react";
import { AuthenticatorPreview } from "./AuthenticatorPreview";
import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";
import { withDefaultAuthenticatorExtendedValues } from "@utils/withDefaultAuthenticatorExtendedValues";
import { useEncryption } from "@hooks/useEncryption";

export type AuthenticatorFormProps = {
  form?: AuthenticatorFormData;
  onChange?: (values: AuthenticatorFormData) => void;
  hidePreview?: boolean;
}

export const AuthenticatorForm = (props: AuthenticatorFormProps) => {
  const { form, onChange, hidePreview = false } = props;
  const [name, setName] = useState(form?.name || "");
  const [secret, setSecret] = useState(form?.secret || "");
  const [issuer, setIssuer] = useState(form?.issuer || "");
  const { seconds, start, stop } = useSecondsTimer(30, false);
  const encryption = useEncryption();
  const showPreview = secret.length >= 16 && !hidePreview;
  const encryptedSecret = useMemo(() => {
    return encryption.encrypt(secret);
  }, [secret, encryption]);

  useEffect(() => {
    onChange?.({
      name,
      secret,
      issuer,
    });
  }, [name, secret, issuer, onChange]);

  useEffect(() => {
    if (showPreview) {
      start();
    } else {
      stop();
    }
    return stop;
  }, [showPreview, start, stop]);

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
      placeholder="app from hansyulian.com"
      onChangeText={setIssuer}
    />
    <TextBox
      value={secret}
      label='Secret'
      placeholder="minimum 16 characters"
      onChangeText={setSecret}
    />
    {showPreview && <ViewE marginBottom="medium">
      <ViewE marginBottom>
        <TextE weight="bold">Authenticator preview:</TextE>
      </ViewE>
      <AuthenticatorPreview
        authenticatorExtended={withDefaultAuthenticatorExtendedValues(({
          authenticator: withDefaultAuthenticatorValues({
            issuer,
            name,
            secret,
          }),
          encryptedSecret,
          isFavourite: false,
        }))}
        seconds={seconds}
      />
    </ViewE>}
  </ViewE>;
};