import { useEffect, useMemo, useState } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ViewE } from "./ViewE";
import { Dimensions, LayoutChangeEvent, StyleSheet } from 'react-native'
import { useCommonStyles } from "@hooks/useCommonStyles";
import { ButtonE } from "./ButtonE";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { TextE } from "./TextE";

export type QRScannerProps = {
  onScan: (value: string) => void;
  disabled?: boolean;
  onEnable?: () => void;
  size?: number;
}


export const QRScanner = (props: QRScannerProps) => {
  const { disabled, onScan, onEnable, size } = props;
  const [permissionResponse, requestPermission] = BarCodeScanner.usePermissions();
  const [width, setWidth] = useState(0);
  const styles = useStyles(size || width);

  useEffect(() => {
    if (!permissionResponse?.canAskAgain) {
      return;
    }
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse])

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

  return (
    <ViewE fullSize style={styles.container}
      onLayout={handleLayout}
    >
      {!permissionResponse?.granted && <ViewE padding justifyContent="center" row><TextE>Please grant the camera access</TextE></ViewE>}
      {permissionResponse?.granted && <>
        <ViewE style={styles.scannerContainer}>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={disabled ? undefined : handleScanned}
            style={styles.scanner}
          />
        </ViewE>
        {disabled && <ViewE style={styles.disableScannerOverlay}>
          <ButtonE onPress={onEnable} >Rescan</ButtonE>
        </ViewE>
        }
      </>
      }
    </ViewE>
  );
}


const useStyles = (size?: number) => {
  const commonStyles = useCommonStyles();
  const styleConstants = useStyleConstants();
  return useMemo(() => {
    const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
    const sizeCalculated = size || windowWidth;
    const sizeToWidthRatio = windowWidth / sizeCalculated;
    const heightWidthDifference = windowHeight - windowWidth;
    const scaledHeightWidthDifference = heightWidthDifference / sizeToWidthRatio;
    const heightOffset = scaledHeightWidthDifference / 2;
    return StyleSheet.create({
      container: {
        height: size ? size : '100%',
        width: size ? size : '100%',
        overflow: 'hidden',
      },
      scanner: {
        ...commonStyles.fullSize,
      },
      scannerContainer: {
        ...commonStyles.fullSize,
        ...commonStyles.floatingTopLeft,
        height: sizeCalculated + scaledHeightWidthDifference,
        width: sizeCalculated,
        top: -heightOffset,
        aspectRatio: 1,
      },
      disableScannerOverlay: {
        ...commonStyles.fullSize,
        ...commonStyles.center,
        backgroundColor: styleConstants.colors.backdrop,
      }
    });
  }, [size, commonStyles, styleConstants]);
}