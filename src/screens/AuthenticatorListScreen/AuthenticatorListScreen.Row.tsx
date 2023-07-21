import { DividerE } from "@components/DividerE";
import { TouchableE } from "@components/TouchableE";
import { ViewE } from "@components/ViewE";
import { useAuthenticate } from "@hooks/useAuthenticate";
import { useConfirmationDialog } from "@hooks/useConfirmationDialog";
import { useDeleteAuthenticator } from "@hooks/useDeleteAuthenticator";
import { useMenu } from "@hooks/useMenu";
import { useNavigate } from "@hooks/useNavigate";
import { useSnackbar } from "@hooks/useSnackbar";
import { AuthenticatorPreview } from "@screens/components/AuthenticatorPreview";
import { copyClipboard } from "@utils/copyClipboard";
import { useState } from "react";

export type AuthenticatorListScreenRowProps = {
  authenticatorExtended: AuthenticatorExtended;
  seconds: number;
}

export const AuthenticatorListScreenRow = (props: AuthenticatorListScreenRowProps) => {
  const { seconds, authenticatorExtended } = props;
  const { authenticator } = authenticatorExtended;
  const authenticate = useAuthenticate();
  const [otp, setOtp] = useState('');
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const deleteAuthenticator = useDeleteAuthenticator();
  const confirmationDialog = useConfirmationDialog();
  const { show } = useMenu();

  const onPress = () => {
    copyClipboard(otp);
    snackbar.show('Copied')
  }

  const onLongPress = () => {
    show({
      title: `${authenticator.issuer} - ${authenticator.name}`,
      menu: [{
        text: 'Edit',
        icon: 'pencil',
        onPress: () => {
          navigate('AuthenticatorEdit', {
            authenticatorExtended,
          })
        }
      }, {
        text: 'Show QR',
        icon: 'qrcode',
        onPress: async () => {
          const result = await authenticate();
          if (result) {
            navigate('AuthenticatorDetail', {
              authenticatorExtended,
            })
          }
        }
      }, {
        onPress: () => {
          confirmationDialog({
            title: 'Delete',
            content: `Are you sure want to delete ${authenticator.issuer} - ${authenticator.name}? This action is irreversible`,
            onConfirm: async () => {
              await deleteAuthenticator(authenticatorExtended.id);
            }
          })
        },
        text: 'Delete',
        icon: 'delete',
      }]
    })
  }

  return <TouchableE onPress={onPress} onLongPress={onLongPress}>
    <>
      <ViewE paddingHorizontal="medium" paddingVertical="small" >
        <AuthenticatorPreview hideTimer onChangeOtp={setOtp} authenticatorExtended={authenticatorExtended} seconds={seconds} />
      </ViewE>
      <DividerE />
    </>
  </TouchableE>
}
