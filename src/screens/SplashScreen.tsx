import { PropsWithChildren } from "react";

import { TextE } from "~/components/TextE";
import { ViewE } from "~/components/ViewE";

export const SplashScreen = (props: PropsWithChildren) => {
  return (
    <ViewE fullSize justifyContent="center" alignItems="center">
      <TextE>Initialization</TextE>
      {props.children}
    </ViewE>
  );
};
