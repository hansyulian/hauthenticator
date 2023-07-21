import { useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ViewE } from "./ViewE";

export type QRCodeProps = {
  value: string;
  size?: number;
}

export const QRCodeE = (props: QRCodeProps) => {
  const { value, size } = props;
  const [width, setWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }
  return <ViewE fullWidth onLayout={onLayout}>
    <QRCode
      size={size || width}
      value={value}
    />
  </ViewE>
}
