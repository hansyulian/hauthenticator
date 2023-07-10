import { DividerE } from "@components/DividerE";
import { TouchableE } from "@components/TouchableE";
import { ViewE } from "@components/ViewE";
import { useSnackbar } from "@hooks/useSnackbar";
import { AuthenticatorPreview } from "@screens/components/AuthenticatorPreview";
import { copyClipboard } from "@utils/copyClipboard";
import { useState } from "react";

export type AuthenticatorListScreenRowProps = {
  authenticator: Authenticator;
  seconds: number;
}

export const AuthenticatorListScreenRow = (props: AuthenticatorListScreenRowProps) => {
  const { seconds, authenticator } = props;
  const [otp, setOtp] = useState('');
  const snackbar = useSnackbar();

  const onPress = () => {
    copyClipboard(otp);
    snackbar.show('Copied')
  }

  return <TouchableE onPress={onPress}>
    <>
      <ViewE paddingHorizontal="medium" paddingVertical="small" >
        <AuthenticatorPreview onChangeOtp={setOtp} authenticator={authenticator} seconds={seconds} />
      </ViewE>
      <DividerE />
    </>
  </TouchableE>
}
