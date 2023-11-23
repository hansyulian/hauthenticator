import { Button, ButtonProps } from "react-native-paper";

export type ButtonEProps = ButtonProps & {

}
export const ButtonE = (props: ButtonEProps) => {
  return <Button mode='contained' {...props} />;
};