import { CheckboxE } from "@components/CheckboxE";
import { DividerE } from "@components/DividerE";
import { TextBox } from "@components/TextBox";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import React, { useEffect, useState } from "react";

export type AuthenticatorImportForm = {
  authenticator: Authenticator;
  selected: boolean;
}

export type ImportConfirmationScreenRowProps = {
  authenticatorForm: AuthenticatorImportForm;
}

export const ImportConfirmationScreenRow = (props: ImportConfirmationScreenRowProps) => {
  const [issuer, setIssuer] = useState(props.authenticatorForm.authenticator.issuer);
  const [name, setName] = useState(props.authenticatorForm.authenticator.name);
  const [selected, setSelected] = useState(props.authenticatorForm.selected);

  const onToggleSelected = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    props.authenticatorForm.authenticator.name = name;
  }, [name, props.authenticatorForm.authenticator]);
  useEffect(() => {
    props.authenticatorForm.authenticator.issuer = issuer;
  }, [issuer, props.authenticatorForm.authenticator]);
  useEffect(() => {
    props.authenticatorForm.selected = selected;
  }, [props.authenticatorForm, selected]);

  return <ViewE>
    <ViewE padding row>
      <ViewE column flex>
        <ViewE row flex gap>
          <TextBox flex label='Issuer' value={issuer} onChangeText={setIssuer}></TextBox>
          <TextBox flex label='Name' value={name} onChangeText={setName}></TextBox>
        </ViewE>
        <TextE>Secret: <TextE weight="bold">{props.authenticatorForm.authenticator.secret}</TextE></TextE>
      </ViewE>
      <ViewE justifyContent="center">
        <CheckboxE checked={selected} onPress={onToggleSelected} />
      </ViewE>
    </ViewE>
    <DividerE />
  </ViewE>;
};
