import { ViewE, ViewEProps } from "./ViewE";

export type FormControlContainerProps = ViewEProps;

export const FormControlContainer = (props: FormControlContainerProps) => {
  return <ViewE marginBottom {...props} />
}
