import React, { useEffect, useMemo, useState } from "react";
import { ViewE } from "./ViewE";
import { Dimensions, LayoutChangeEvent, StyleSheet, TouchableOpacity } from "react-native";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useCommonStyles } from "@hooks/useCommonStyles";
import { ButtonE } from "./ButtonE";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { TextE } from "./TextE";

export type QRScannerProps = {
  onScan: (value: string) => void;
  disabled?: boolean;
  onEnable?: () => void;
  size?: number;
};

export const QRScanner = (props: QRScannerProps) => {
  const { disabled, onScan, onEnable, size } = props;
  const [permissionResponse, requestPermission] = useCameraPermissions();
  const [isDisabled, setIsDisabled] = useState(false);
  const [width, setWidth] = useState(0);
  const styles = useStyles(size || width);

  useEffect(() => {
    if (disabled !== undefined) {
      setIsDisabled(disabled);
    }
  }, [disabled]);

  useEffect(() => {
    if (!permissionResponse?.canAskAgain) {
      return;
    }
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScanned = ({ data }: BarcodeScanningResult) => {
    onScan(data);
  };

  return (
    <ViewE fullSize style={styles.container} onLayout={handleLayout}>
      {!permissionResponse?.granted && (
        <ViewE padding justifyContent="center" row>
          <TextE>Please grant the camera access</TextE>
          <ButtonE>Grant Permission</ButtonE>
        </ViewE>
      )}
      {permissionResponse?.granted && (
        <>
          <ViewE style={styles.scannerContainer}>
            <CameraView
              facing="back"
              barcodeScannerSettings={
                disabled
                  ? undefined
                  : {
                      barcodeTypes: ["qr"],
                    }
              }
              onBarcodeScanned={handleScanned}
              style={styles.camera}></CameraView>
          </ViewE>
        </>
      )}
    </ViewE>
  );
};

const useStyles = (size?: number) => {
  const commonStyles = useCommonStyles();
  const styleConstants = useStyleConstants();
  return useMemo(() => {
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
    const sizeCalculated = size || windowWidth;
    const sizeToWidthRatio = windowWidth / sizeCalculated;
    const heightWidthDifference = windowHeight - windowWidth;
    const scaledHeightWidthDifference = heightWidthDifference / sizeToWidthRatio;
    const heightOffset = scaledHeightWidthDifference / 2;
    return StyleSheet.create({
      container: {
        height: size ? size : "100%",
        width: size ? size : "100%",
        overflow: "hidden",
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
      },
      camera: {
        height: "100%",
      },
    });
  }, [size, commonStyles, styleConstants]);
};
