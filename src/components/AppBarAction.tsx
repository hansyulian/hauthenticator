import { Appbar } from 'react-native-paper';
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";

type AppBarActionProps = {
  icon: IconSource;
  onPress: () => void;
}

export const AppBarAction = (props: AppBarActionProps) => {
  const { icon, onPress } = props;
  return <Appbar.Action icon={icon} onPress={onPress} />
}

