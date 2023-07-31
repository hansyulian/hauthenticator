import { ButtonE } from "@components/ButtonE";
import { QRCodeE } from "@components/QRCode";
import { ScreenLayout } from "@components/ScreenLayout"
import { ScrollViewE } from "@components/ScrollViewE";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { useEncryption } from "@hooks/useEncryption";
import { NavigationProps } from "@modules/Navigation";
import { OtpAuthUrl } from "@modules/OtpAuthUrl";
import { useMemo } from "react";

export const AuthenticatorDetailScreen = (
  props: NavigationProps<'AuthenticatorDetail'>
) => {
  const { authenticatorExtended } = props.route.params;
  const encryption = useEncryption();

  const displaySecret = useMemo(() => {
    if (!authenticatorExtended) {
      return '';
    }
    return encryption.decrypt(authenticatorExtended.encryptedSecret);
  }, [authenticatorExtended]);
  const otpUrl = useMemo(() => {
    return OtpAuthUrl.encode({
      ...authenticatorExtended.authenticator,
      secret: displaySecret,
    })
  }, [displaySecret, authenticatorExtended.authenticator])

  return <ScreenLayout headerText='Authenticator Detail'>
    <ScrollViewE>
      <ViewE padding gap fullWidth>
        <ViewE paddingHorizontal='large' marginBottom gap>
          <QRCodeE value={otpUrl} />
          <TextE type='code' color='tertiary'>{otpUrl}</TextE>
          <ButtonE icon={'content-copy'}>Copy</ButtonE>
        </ViewE>
        <ViewE row justifyContent='space-between'>
          <ViewE flex>
            <TextE type='pairLabel'>Issuer</TextE>
          </ViewE>
          <ViewE flex={3} alignItems="flex-end">
            <TextE type='pairValue'>{authenticatorExtended.authenticator.issuer}</TextE>
          </ViewE>
        </ViewE>
        <ViewE row justifyContent='space-between'>
          <ViewE flex>
            <TextE type='pairLabel'>Name</TextE>
          </ViewE>
          <ViewE flex={3} alignItems="flex-end">
            <TextE type='pairValue'>{authenticatorExtended.authenticator.name}</TextE>
          </ViewE>
        </ViewE>
        <ViewE row justifyContent='space-between' gap>
          <ViewE flex>
            <TextE type='pairLabel'>Secret</TextE>
          </ViewE>
          <ViewE flex={3} alignItems="flex-end">
            <TextE type='pairValue'>{displaySecret}</TextE>
          </ViewE>
        </ViewE>
      </ViewE>
    </ScrollViewE>
  </ScreenLayout>
} 