import { TextInput, TextInputProps } from "react-native-paper";
import { FormControlContainer, FormControlContainerProps } from "./FormControlContainer";
import { FormErrors } from "./FormErrors";
import { useState } from "react";

export type TextBoxProps = TextInputProps & Pick<FormControlContainerProps, "flex"> & {
  icon?: string;
  onIconPress?: () => void;
  errors?: string[];
}

export const TextBox = (props: TextBoxProps) => {
  const { icon, flex, onIconPress, errors, secureTextEntry, ...rest } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const calculatedSecureTextEntry = secureTextEntry && isPasswordVisible;

  const rightComponent = () => {
    if (secureTextEntry) {
      return <TextInput.Icon icon={isPasswordVisible ? "eye" : "eye-off"} onPress={() => setIsPasswordVisible(!isPasswordVisible)} />;
    }
    if (!icon) {
      return null;
    }
    return <TextInput.Icon icon={icon} onPress={onIconPress} />;
  };

  return <FormControlContainer flex={flex}>
    <TextInput
      right={rightComponent()}
      mode='outlined'
      secureTextEntry={calculatedSecureTextEntry}
      {...rest}
    />
    <FormErrors errors={errors} />
  </FormControlContainer>;
};

