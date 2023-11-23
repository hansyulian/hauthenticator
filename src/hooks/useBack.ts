import { NavigationParams } from "@modules/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";

export const useBack = () => {
  const navigation = useNavigation<NativeStackScreenProps<NavigationParams>["navigation"]>();
  return useCallback((pop = 1) => {
    navigation.pop(pop);
  }, [navigation]);
};