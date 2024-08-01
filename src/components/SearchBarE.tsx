import { Searchbar, SearchbarProps } from "react-native-paper";

type SearchBarEProps = SearchbarProps & {};

export const SearchBarE = (props: SearchBarEProps) => {
  const { ...rest } = props;
  return <Searchbar {...rest} />;
};
