import { TextE } from "./TextE";

export type FormErrorsProps = {
  errors?: string[];
}

export const FormErrors = (props: FormErrorsProps) => {
  const { errors } = props;
  if (!errors || errors.length === 0) {
    return null;
  }
  return <>
    {errors.map(error => <TextE color='error' type='error'>{error}</TextE>)}
  </>;
}

