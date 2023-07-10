import { QRScanner } from "@components/QRScanner"
import { ViewE } from "@components/ViewE"
import { useFocusedEffect } from "@hooks/useFocusedEffect";
import { useNavigate } from "@hooks/useNavigate";
import { OtpAuthUrl } from "@modules/OthAuthUrl";
import { useEffect, useState } from "react";

export type AuthenticatorAddScreenScanProps = {

}

export const AuthenticatorAddScreenScan = (props: AuthenticatorAddScreenScanProps) => {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  useFocusedEffect(() => {
    setScanned(false);
  }, [])

  const onScan = (value: string) => {
    setScanned(true);
    const authenticator = OtpAuthUrl.decode(value);
    navigate('AuthenticatorAddFormConfirmation', {
      form: authenticator,
    })
  }

  return <ViewE>
    <QRScanner onScan={onScan} disabled={scanned} />
  </ViewE>
}
