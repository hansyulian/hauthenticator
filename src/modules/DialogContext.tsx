import { TextE } from "@components/TextE";
import React, { createContext, useState, PropsWithChildren, useMemo, FC, useCallback } from "react";
import { Dialog, Portal } from "react-native-paper";
import { ButtonE } from "@components/ButtonE";

// name: Dialog
type DialogButton = {
  text: string;
  icon?: string;
  onPress: AsyncCallback<void>;
  type?: SignalType;
}

export type ShowDialogOptions = {
  title?: string;
  content: string;
  buttons?: DialogButton[];
  hideCloseButton?: boolean;
  closeButtonText?: string;
  closeButtonIcon?: string;
}

export type DialogContextValue = {
  show: (options: ShowDialogOptions) => void;
  hide: () => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ShowDialogOptions>();
  const [loadingButtonIndex, setLoadingButtonIndex] = useState(-1);

  const show = useCallback((options: ShowDialogOptions) => {
    setVisible(true);
    setOptions(options);
  }, []);
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const value = useMemo(() => {
    return {
      show,
      hide,
    };
  }, [show, hide]);

  const buttonsCalculated = useMemo<DialogButton[]>(() => {
    const result = [...options?.buttons || []];
    if (!options?.hideCloseButton) {
      result.push({
        text: options?.closeButtonText || "Close",
        icon: options?.closeButtonIcon || "close",
        onPress: hide,
      });
    }
    return result;
  }, [options?.buttons, options?.hideCloseButton, options?.closeButtonText, options?.closeButtonIcon, hide]);

  const handleButtonPress = async (fn: AsyncCallback<void>, index: number) => {
    setLoadingButtonIndex(index);
    await fn();
    hide();
    setLoadingButtonIndex(-1);
  };

  return <DialogContext.Provider value={value}>
    {children}
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        {options?.title && <Dialog.Title>{options.title}</Dialog.Title>}
        <Dialog.Content>
          <TextE>{options?.content}</TextE>
        </Dialog.Content>
        <Dialog.Actions>
          {buttonsCalculated.map((button, index) => <ButtonE
            mode="elevated"
            key={`dialog-provider-item-key-${index}`}
            icon={button.icon}
            onPress={() => handleButtonPress(button.onPress, index)}
            type={button.type}
            loading={loadingButtonIndex === index}
            disabled={loadingButtonIndex !== -1}
          >
            {button.text}
          </ButtonE>)}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </DialogContext.Provider>;
};
