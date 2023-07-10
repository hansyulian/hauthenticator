import { NavigationTargets, NavigationParams } from "@config/NavigationConfig";
import { useRoute } from "@react-navigation/native";

export function usePageParams<
  ScreenName extends NavigationTargets
>(): NavigationParams[ScreenName] {
  const route = useRoute();
  const params = route.params as NavigationParams[ScreenName];
  return params;
}