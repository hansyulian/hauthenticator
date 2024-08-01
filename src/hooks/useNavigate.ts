import { NavigationParams, NavigationTargets } from "@modules/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";

type NavigateOptions = {
  pop?: number;
  reset?: boolean;
  popTo?: boolean;
};

export function useNavigate() {
  const navigation = useNavigation<NativeStackScreenProps<NavigationParams>["navigation"]>();
  return useCallback(
    <Target extends NavigationTargets>(
      target: Target,
      params: NavigationParams[Target],
      options: Partial<NavigateOptions> = {}
    ) => {
      const { pop, reset, popTo } = options;
      if (pop) {
        navigation.pop(pop);
      }
      if (popTo) {
        const currentRoutes = navigation.getState().routes;
        let i = currentRoutes.length - 1;
        while (i >= 0 && currentRoutes[i].name !== target) {
          i -= 1;
        }
        navigation.pop(currentRoutes.length - i);
      }
      if (reset) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: target,
              params,
            },
          ],
        });
      }
      return navigation.push(target, params);
    },
    [navigation]
  );
}
