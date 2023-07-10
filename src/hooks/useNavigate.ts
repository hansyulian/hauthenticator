import { NavigationParams, NavigationTargets } from "@config/NavigationConfig";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";

type NavigateOptions = {
  pop?: number;
}

export function useNavigate() {
  const navigation = useNavigation<NativeStackScreenProps<NavigationParams>['navigation']>();
  return useCallback(<Target extends NavigationTargets>(target: Target, params: NavigationParams[Target], options: Partial<NavigateOptions> = {}) => {
    const { pop } = options;
    if (pop) {
      navigation.pop(pop);
    }
    return navigation.push(target, params);
  }, [navigation]);
}