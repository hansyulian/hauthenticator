import { TextInput, TextInputProps } from "react-native-paper";
import { FormControlContainer, FormControlContainerProps } from "./FormControlContainer";
import { FormErrors } from "./FormErrors";

export type TextBoxProps = TextInputProps & Pick<FormControlContainerProps, "flex"> & {
  icon?: string;
  onIconPress?: () => void;
  errors?: string[];
}

export const TextBox = (props: TextBoxProps) => {
  const { icon, flex, onIconPress, errors, ...rest } = props;

  const rightComponent = () => {
    if (!icon) {
      return null;
    }
    return <TextInput.Icon icon={icon} onPress={onIconPress} />;
  };

  return <FormControlContainer flex={flex}>
    <TextInput
      right={rightComponent()}
      {...rest}
    />
    <FormErrors errors={errors} />
  </FormControlContainer>;
};

