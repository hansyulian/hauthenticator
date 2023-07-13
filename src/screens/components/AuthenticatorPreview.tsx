import { SecondsProgressCircle } from "@components/SecondsProgressCircle";
import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { useEncryption } from "@hooks/useEncryption";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { calculateOtp } from "@utils/calculateOtp";
import { useState, useMemo, useCallback, useEffect } from "react";
import { StyleSheet } from 'react-native';

export type AuthenticatorPreviewProps = {
  authenticatorExtended: AuthenticatorExtended;
  seconds: number;
  hideTimer?: boolean;
  onChangeOtp?: (value: string) => void;
  onChangeNextOtp?: (value: string) => void;
}

export const AuthenticatorPreview = (props: AuthenticatorPreviewProps) => {
  const { seconds, authenticatorExtended, onChangeNextOtp, onChangeOtp, hideTimer = false } = props;
  const { authenticator } = authenticatorExtended;
  const [otp, setOtp] = useState('');
  const [nextOtp, setNextOtp] = useState('');
  const encryption = useEncryption();
  const secret = useMemo(() => {
    return encryption.decrypt(authenticatorExtended.encryptedSecret);
  }, [authenticatorExtended.encryptedSecret, encryption])
  const styleStage = useMemo(() => {
    if (seconds < 20) {
      return 0;
    }
    if (seconds < 25) {
      return 1;
    }
    if (seconds < 28) {
      return 2;
    }
    return 3;
  }, [seconds]);
  const styles = useStyles(styleStage);

  const calculateValues = useCallback(() => {
    const now = new Date().getTime();
    setOtp(calculateOtp(secret));
    setNextOtp(calculateOtp(secret, {
      epoch: now + 30000,
    }))
  }, [secret]);

  useEffect(() => {
    onChangeOtp?.(otp);
  }, [onChangeOtp, otp])

  useEffect(() => {
    onChangeNextOtp?.(nextOtp);
  }, [onChangeNextOtp, nextOtp])

  useEffect(() => {
    if (seconds !== 0) {
      return;
    }
    calculateValues();
  }, [seconds]);

  useEffect(() => {
    calculateValues();
  }, [calculateValues])

  return <ViewE row justifyContent="space-between" alignItems="center">
    <ViewE>
      <TextE weight='bold'>{authenticator.issuer || '-'}</TextE>
      <ViewE row>
        <TextE type='otpValue' style={styles.currentOtp}>{otp}</TextE>
        <TextE type='otpValue' style={styles.nextOtp}> - {nextOtp}</TextE>
      </ViewE>
      <TextE>{authenticator.name || '-'}</TextE>
    </ViewE>
    {!hideTimer && <SecondsProgressCircle small seconds={30 - seconds} max={30} />}
  </ViewE>
}

const useStyles = (styleStage: number) => {
  const constants = useStyleConstants();

  return useMemo(() => StyleSheet.create({
    currentOtp: {
      opacity: (1 - styleStage / 8),
      color: constants.colors.primary
    },
    nextOtp: {
      opacity: styleStage / 4,
      color: constants.colors.secondary
    }
  }), [styleStage])
}

