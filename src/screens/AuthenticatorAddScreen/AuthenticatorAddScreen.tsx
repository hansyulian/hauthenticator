import { SegmentedButtonsE } from "@components/SegmentedButtonsE";
import { ScreenLayout } from "@components/ScreenLayout"
import React, { useState } from "react";
import { ViewE } from "@components/ViewE";
import { AuthenticatorAddScreenScan } from "./AuthenticatorAddScreen.Scan";
import { AuthenticatorAddScreenForm } from "./AuthenticatorAddScreen.Form";
import { ScrollViewE } from "@components/ScrollViewE";
import { ButtonE } from "@components/ButtonE";
import { FloatingBottomContainer } from "@components/FloatingBottomContainer";

export type AuthenticatorAddScreenProps = {

}
export const AuthenticatorAddScreen = () => {
  const [value, setValue] = useState('scan');

  return <ScreenLayout headerText='Add Authenticator'>
    <ScrollViewE fullHeight >
      <ViewE paddingHorizontal marginBottom>
        <SegmentedButtonsE
          buttons={[{
            value: 'scan',
            label: 'Scan QR',
            icon: 'qrcode'
          },
          {
            value: 'form',
            label: 'Form',
            icon: 'form-textbox',
          }]}
          value={value}
          onChange={setValue}
        />
      </ViewE>
      {value === 'scan' && <AuthenticatorAddScreenScan />}
      {value === 'form' && <AuthenticatorAddScreenForm />}
    </ScrollViewE>
  </ScreenLayout>
} 