import { useEffect, useState } from "react";

import { ButtonE } from "~/components/ButtonE";
import { FloatingBottomContainer } from "~/components/FloatingBottomContainer";
import { QRScanner } from "~/components/QRScanner";
import { TextBox } from "~/components/TextBox";
import { ViewE } from "~/components/ViewE";
import { useFocusedEffect } from "~/hooks/useFocusedEffect";
import { useNavigate } from "~/hooks/useNavigate";
import { OtpAuthUrl } from "~/modules/OtpAuthUrl";

export type AuthenticatorAddScreenScanProps = {};

export const AuthenticatorAddScreenScan = (props: AuthenticatorAddScreenScanProps) => {
  const [scanned, setScanned] = useState(false);
  const [uri, setUri] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [authenticator, setAuthenticator] = useState<AuthenticatorFormData>();
  const navigate = useNavigate();
  const canContinue = authenticator && errors.length === 0;

  useFocusedEffect(() => {
    setScanned(false);
  }, []);

  useEffect(() => {
    if (uri === "") {
      return;
    }
    try {
      const form = OtpAuthUrl.decode(uri);
      setScanned(true);
      setAuthenticator(form);
    } catch (err) {
      setAuthenticator(undefined);
      setErrors(["Invalid authenticator uri"]);
    }
  }, [uri]);

  const onScan = (value: string) => {
    setUri(value);
  };

  const onContinue = () => {
    if (!authenticator || !canContinue) {
      return;
    }
    navigate("AuthenticatorAddFormConfirmation", {
      form: authenticator,
    });
  };

  return (
    <>
      <ViewE paddingHorizontal gap>
        <QRScanner onScan={onScan} disabled={scanned} />
        <TextBox label="Authenticator uri" value={uri} onChangeText={setUri} />
      </ViewE>
      <FloatingBottomContainer padding>
        <ButtonE onPress={onContinue} disabled={!canContinue}>
          Continue
        </ButtonE>
      </FloatingBottomContainer>
    </>
  );
};
