import { useCallback } from "react";

import { NavigationParams } from "~/modules/Navigation";

import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const useBack = () => {
  const navigation = useNavigation<NativeStackScreenProps<NavigationParams>["navigation"]>();
  return useCallback(
    (pop = 1) => {
      navigation.pop(pop);
    },
    [navigation]
  );
};
