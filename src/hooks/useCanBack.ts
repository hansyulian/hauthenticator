import { NavigationParams } from "@modules/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const useCanBack = () => {
  const navigation = useNavigation<NativeStackScreenProps<NavigationParams>["navigation"]>();
  return navigation.canGoBack;
};