import { ButtonE } from "@components/ButtonE";
import { ScreenLayout } from "@components/ScreenLayout";
import { ScrollViewE } from "@components/ScrollViewE";
import { config } from "@config/config";
import { useNavigate } from "@hooks/useNavigate";
import React, { useEffect, useState } from "react";

export const DevToolsScreen = () => {
  const navigate = useNavigate();
  const [shouldTriggerNavigate, setShouldTriggerNavigate] = useState(true);

  useEffect(() => {
    if (config.devInitialScreen) {
      console.log("navigating to", config.devInitialScreen);
      navigate(config.devInitialScreen, config.devInitialScreenParams || {});
      setShouldTriggerNavigate(false);
    }
  }, [navigate, shouldTriggerNavigate]);

  const goToHome = () => {
    navigate("AuthenticatorList", {});
  };

  return <ScreenLayout headerText='Dev Tools'>
    <ScrollViewE padding>
      <ButtonE onPress={goToHome}>
        Go to home screen
      </ButtonE>
    </ScrollViewE>
  </ScreenLayout>;
}; 