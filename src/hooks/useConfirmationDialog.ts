import { useCallback } from "react";
import { useDialog } from "./useDialog";

type ConfirmationDialogOptions = {
  title?: string;
  content: string;
  onConfirm: AsyncCallback<void>;
  onCancel?: AsyncCallback<void>;
  type?: SignalType;
}

export const useConfirmationDialog = () => {
  const { show } = useDialog();

  return useCallback((options: ConfirmationDialogOptions) => {
    show({
      title: options.title,
      content: options.content,
      hideCloseButton: true,
      buttons: [{
        text: "Confirm",
        onPress: options.onConfirm,
        type: options.type,
      }, {
        text: "Cancel",
        onPress: () => options.onCancel?.(),
      }]
    });
  }, [show]);
};