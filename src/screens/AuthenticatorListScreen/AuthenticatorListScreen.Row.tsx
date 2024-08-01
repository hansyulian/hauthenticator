import { memo, useState } from "react";

import { DividerE } from "@components/DividerE";
import { IconE } from "@components/IconE";
import { TextE } from "@components/TextE";
import { TouchableE } from "@components/TouchableE";
import { ViewE } from "@components/ViewE";
import { useAuthenticate } from "@hooks/useAuthenticate";
import { useConfirmationDialog } from "@hooks/useConfirmationDialog";
import { useDeleteAuthenticators } from "@hooks/useDeleteAuthenticators";
import { useMenu } from "@hooks/useMenu";
import { useNavigate } from "@hooks/useNavigate";
import { useSnackbar } from "@hooks/useSnackbar";
import { useUpdateAuthenticator } from "@hooks/useUpdateAuthenticator";
import { AuthenticatorPreview } from "@screens/components/AuthenticatorPreview";
import { copyClipboard } from "@utils/copyClipboard";

export type AuthenticatorListScreenRowProps = {
  authenticatorExtended: AuthenticatorExtended;
  seconds: number;
};

export const AuthenticatorListScreenRow = memo((props: AuthenticatorListScreenRowProps) => {
  const { seconds, authenticatorExtended } = props;
  const { authenticator, isFavourite } = authenticatorExtended;
  const authenticate = useAuthenticate();
  const [otp, setOtp] = useState("");
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const deleteAuthenticator = useDeleteAuthenticators();
  const confirmationDialog = useConfirmationDialog();
  const updateAuthenticator = useUpdateAuthenticator();
  const { show } = useMenu();

  const onPress = () => {
    copyClipboard(otp);
    snackbar.show("Copied");
  };

  const onLongPress = () => {
    show({
      title: `${authenticator.issuer} - ${authenticator.name}`,
      menu: [
        {
          text: isFavourite ? "Unfavourite" : "Favourite",
          icon: "star",
          onPress: () => {
            updateAuthenticator(authenticatorExtended.id, {
              ...authenticatorExtended,
              isFavourite: !isFavourite,
            });
          },
        },
        {
          text: "Edit",
          icon: "pencil",
          onPress: () => {
            navigate("AuthenticatorEdit", {
              authenticatorExtended,
            });
          },
        },
        {
          text: "Show QR",
          icon: "qrcode",
          onPress: async () => {
            const result = await authenticate();
            if (result) {
              navigate("AuthenticatorDetail", {
                authenticatorExtended,
              });
            }
          },
        },
        {
          onPress: () => {
            confirmationDialog({
              title: "Delete",
              content: (
                <ViewE fullWidth>
                  <TextE>Are you sure want to delete? This action is irreversible</TextE>
                  <TextE weight="bold">Issuer: {authenticator.issuer}</TextE>
                  <TextE weight="bold">Name: {authenticator.name}</TextE>
                </ViewE>
              ),
              onConfirm: async () => {
                await deleteAuthenticator([authenticatorExtended.id]);
              },
              type: "danger",
            });
          },
          text: "Delete",
          icon: "delete",
        },
      ],
    });
  };

  return (
    <TouchableE onPress={onPress} onLongPress={onLongPress}>
      <>
        <ViewE paddingHorizontal="medium" paddingVertical="small" row alignItems="center">
          <ViewE flex={1}>
            <AuthenticatorPreview
              hideTimer
              onChangeOtp={setOtp}
              authenticatorExtended={authenticatorExtended}
              seconds={seconds}
            />
          </ViewE>
          {isFavourite && <IconE icon="star" color="primary" />}
        </ViewE>
        <DividerE />
      </>
    </TouchableE>
  );
});
