import { useEffect, useMemo, useState } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ViewE } from "./ViewE";
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import { useCommonStyles } from "@hooks/useCommonStyles";

export type QRScannerProps = {
  onScan: (value: string) => void;
  disabled: boolean;
}

export const QRScanner = (props: QRScannerProps) => {
  const { disabled, onScan } = props;
  const [hasPermission, setHasPermission] = useState(false);
  const [width, setWidth] = useState(0);
  const styles = useStyles(width);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
  }

  const handleScanned = ({ type, data }: any) => {
    if (type !== 256) { // qr type code
      return;
    }
    onScan(data)
  };

  if (!hasPermission) {
    return null;
  }

  return (
    <ViewE fullSize onLayout={handleLayout}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={disabled ? undefined : handleScanned}
        style={styles.scanner}

      />
    </ViewE>
  );
}


const useStyles = (width: number) => {
  const commonStyles = useCommonStyles();
  return useMemo(() => StyleSheet.create({
    scanner: {
      ...commonStyles.fullSize,
      ...commonStyles.floatingTopLeft,
      aspectRatio: 1,
    }
  }), [width])
}