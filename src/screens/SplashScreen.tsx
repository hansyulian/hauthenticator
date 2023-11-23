import { TextE } from "@components/TextE";
import { ViewE } from "@components/ViewE";
import { PropsWithChildren } from "react";


export const SplashScreen = (props: PropsWithChildren) => {
  return <ViewE fullSize justifyContent="center" alignItems="center">
    <TextE>Initialization</TextE>
    {props.children}
  </ViewE>;
};