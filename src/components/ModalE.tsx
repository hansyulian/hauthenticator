import { PropsWithChildren, useMemo } from "react";

import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useStyleConstants } from "~/hooks/useStyleConstants";

import { ViewE } from "./ViewE";

export type ModalEProps = PropsWithChildren & {
  visible: boolean;
  onDismiss: AsyncCallback<void>;
};

export const ModalE = (props: ModalEProps) => {
  const { visible, onDismiss } = props;
  const styles = useStyles();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.contentContainer}>
        <ViewE padding style={styles.innerContentContainer} backgroundColor="background">
          {props.children}
        </ViewE>
      </Modal>
    </Portal>
  );
};

const useStyles = () => {
  const styleConstants = useStyleConstants();

  return useMemo(
    () =>
      StyleSheet.create({
        contentContainer: {
          padding: styleConstants.spacing.large,
        },
        innerContentContainer: {},
      }),
    [styleConstants]
  );
};
