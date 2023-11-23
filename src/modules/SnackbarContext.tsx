import React, { createContext, useState, PropsWithChildren, useMemo, FC, useCallback } from "react";
import { Snackbar } from "react-native-paper";

type ShowSnackbarOptions = {
  onDismiss?: () => void;
  action?: {
    label: string,
    onPress: () => void;
  },
  duration?: number
}
export type SnackbarContextValue = {
  visible: boolean;
  show: (text: string, options?: ShowSnackbarOptions) => void;
  dismiss: () => void;
};

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<ShowSnackbarOptions>({});
  const show = useCallback((text: string, options: ShowSnackbarOptions = {}) => {
    setText(text);
    setOptions(options);
    setVisible(true);
  }, []);

  const dismiss = useCallback(() => {
    options.onDismiss?.();
    setVisible(false);
  }, [options]);

  const value = useMemo(() => {
    return {
      visible,
      show,
      dismiss,
    };
  }, [visible, show, dismiss]);

  return <SnackbarContext.Provider value={value}>
    {children}
    <Snackbar
      visible={visible}
      onDismiss={dismiss}
      action={options.action}
      duration={options.duration || 3000}
    >{
        text
      }</Snackbar>
  </SnackbarContext.Provider>;
};
