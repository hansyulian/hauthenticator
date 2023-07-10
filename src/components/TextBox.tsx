import { TextInput, TextInputProps } from "react-native-paper";
import { FormControlContainer } from "./FormControlContainer";

export type TextBoxProps = TextInputProps & {

}

export const TextBox = (props: TextBoxProps) => {
  const { ...rest } = props;
  return <FormControlContainer>
    <TextInput
      {...rest}
    />
  </FormControlContainer>;
}

