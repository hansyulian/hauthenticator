import { ScreenLayout } from "@components/ScreenLayout"
import { config } from "@config/config";
import { useNavigate } from "@hooks/useNavigate"
import { uuid } from "@utils/uuid";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export const DevToolsScreen = () => {
  const navigate = useNavigate();
  const [shouldTriggerNavigate, setShouldTriggerNavigate] = useState(true);

  console.log(uuid());

  useEffect(() => {
    if (config.devInitialScreen) {
      console.log('navigating to', config.devInitialScreen)
      navigate(config.devInitialScreen, config.devInitialScreenParams || {})
      setShouldTriggerNavigate(false);
    }
  }, [navigate, shouldTriggerNavigate]);

  return <ScreenLayout headerText='Dev Tools'>
    <ScrollView>
    </ScrollView>
  </ScreenLayout>
} 