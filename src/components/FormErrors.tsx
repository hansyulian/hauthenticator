import { uuid } from "@utils/uuid";
import { useRef } from "react";
import { TextE } from "./TextE";

export type FormErrorsProps = {
  errors?: string[];
}

export const FormErrors = (props: FormErrorsProps) => {
  const { errors } = props;
  const id = useRef(uuid());
  if (!errors || errors.length === 0) {
    return null;
  }
  return <>
    {errors.map(error => <TextE key={`${id.current}-${error}`} color='error' type='error'>{error}</TextE>)}
  </>;
}

