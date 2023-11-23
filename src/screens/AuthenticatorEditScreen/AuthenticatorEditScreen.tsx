import { ButtonE } from "@components/ButtonE";
import { FloatingBottomContainer } from "@components/FloatingBottomContainer";
import { ScreenLayout } from "@components/ScreenLayout";
import { TextBox } from "@components/TextBox";
import { ViewE } from "@components/ViewE";
import { useNavigate } from "@hooks/useNavigate";
import { useUpdateAuthenticator } from "@hooks/useUpdateAuthenticator";
import { NavigationProps } from "@modules/Navigation";
import { useEffect, useState } from "react";

export const AuthenticatorEditScreen = (
  props: NavigationProps<"AuthenticatorEdit">
) => {
  const { authenticatorExtended } = props.route.params;
  const [name, setName] = useState(authenticatorExtended.authenticator.name || "");
  const [issuer, setIssuer] = useState(authenticatorExtended.authenticator.issuer || "");
  const updateAuthenticator = useUpdateAuthenticator();
  const navigate = useNavigate();

  const save = async () => {
    await updateAuthenticator(authenticatorExtended.id, {
      ...authenticatorExtended,
      authenticator: {
        ...authenticatorExtended.authenticator,
        name,
        issuer,
      }
    });
    navigate("AuthenticatorList", {

    }, {
      popTo: true,
    });
  };

  useEffect(() => {

  }, [authenticatorExtended]);

  return <ScreenLayout headerText='AuthenticatorEdit'>
    <ViewE padding>
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
    </ViewE>
    <FloatingBottomContainer padding>
      <ButtonE onPress={save}>Save</ButtonE>
    </FloatingBottomContainer>
  </ScreenLayout>;
}; 
