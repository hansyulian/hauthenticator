import React, { useCallback, useEffect, useState } from "react";

import { ButtonE } from "~/components/ButtonE";
import { ScreenLayout } from "~/components/ScreenLayout";
import { ScrollViewE } from "~/components/ScrollViewE";
import { config } from "~/config/config";
import { useNavigate } from "~/hooks/useNavigate";
import DevPlayground from "~/screens/DevToolsScreen/DevPlayground.example";

export const DevToolsScreen = () => {
  const navigate = useNavigate();
  const [shouldTriggerNavigate, setShouldTriggerNavigate] = useState(true);

  const goToHome = useCallback(() => {
    navigate("AuthenticatorList", {});
  }, [navigate]);

  useEffect(() => {
    if (config.devInitialScreen) {
      console.log("navigating to", config.devInitialScreen);
      navigate(config.devInitialScreen, config.devInitialScreenParams || {});
      setShouldTriggerNavigate(false);
    } else {
      goToHome();
    }
  }, [goToHome, navigate, shouldTriggerNavigate]);

  return (
    <ScreenLayout headerText="Dev Tools">
      <ScrollViewE padding>
        <ButtonE onPress={goToHome}>Go to home screen</ButtonE>
        <DevPlayground />
      </ScrollViewE>
    </ScreenLayout>
  );
};
