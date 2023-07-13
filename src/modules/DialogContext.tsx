import { TextE } from "@components/TextE";
import { useStyleConstants } from "@hooks/useStyleConstants";
import { StyleSheet } from 'react-native';
import React, { createContext, useState, PropsWithChildren, useMemo, FC, useCallback } from "react";
import { Dialog, Portal } from "react-native-paper";
import { ButtonE } from "@components/ButtonE";

// name: Dialog
type DialogButton = {
  text: string;
  icon?: string;
  onPress: AsyncCallback<void>;
}

export type ShowDialogOptions = {
  title?: string;
  content: string;
  buttons?: DialogButton[];
}

export type DialogContextValue = {
  show: (options: ShowDialogOptions) => void;
  hide: () => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ShowDialogOptions>();

  const show = useCallback((options: ShowDialogOptions) => {
    setVisible(true);
    setOptions(options);
  }, []);
  const hide = useCallback(() => {
    setVisible(false);
  }, [])

  const value = useMemo(() => {
    return {
      show,
      hide,
    };
  }, [show, hide]);

  const buttonsCalculated = useMemo<DialogButton[]>(() => {
    if (!options?.buttons) {
      return [{
        text: 'Close',
        icon: 'close',
        onPress: hide,
      }]
    }
    return options.buttons;
  }, [options?.buttons])

  const handleButtonPress = async (fn: AsyncCallback<void>) => {
    await fn();
    hide();
  }

  return <DialogContext.Provider value={value}>
    {children}
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        {options?.title && <Dialog.Title>{options.title}</Dialog.Title>}
        <Dialog.Content>
          <TextE>{options?.content}</TextE>
        </Dialog.Content>
        <Dialog.Actions>
          {buttonsCalculated.map((button, index) => <ButtonE key={`dialog-provider-item-key-${index}`} icon={button.icon} onPress={() => handleButtonPress(button.onPress)}>
            {button.text}
          </ButtonE>)}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </DialogContext.Provider>;
};
