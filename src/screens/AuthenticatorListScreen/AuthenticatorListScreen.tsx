import { useMemo, useState } from "react";

import { FlatList, StyleSheet } from "react-native";

import { AppBarAction } from "@components/AppBarAction";
import { ScreenLayout } from "@components/ScreenLayout";
import { SearchBarE } from "@components/SearchBarE";
import { SecondsProgressCircle } from "@components/SecondsProgressCircle";
import { ViewE } from "@components/ViewE";
import { useAuthenticators } from "@hooks/useAuthenticators";
import { useCommonStyles } from "@hooks/useCommonStyles";
import { useFocusedEffect } from "@hooks/useFocusedEffect";
import { useIsAppActive } from "@hooks/useIsAppActive";
import { useNavigate } from "@hooks/useNavigate";
import { useSecondsTimer } from "@hooks/useSecondsTimer";
import { sortAuthenticators } from "@utils/sortAuthenticators";

import { AuthenticatorListScreenRow } from "./AuthenticatorListScreen.Row";

export const AuthenticatorListScreen = () => {
  const authenticators = useAuthenticators();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const isAppActive = useIsAppActive();

  const sortedAuthenticators = useMemo(() => {
    return sortAuthenticators(authenticators);
  }, [authenticators]);

  const filteredAuthenticators = useMemo(() => {
    if (!sortedAuthenticators) {
      return [];
    }
    if (!searchText) {
      return sortedAuthenticators;
    }
    const searchTextLowerCase = searchText.toLowerCase();
    return sortedAuthenticators.filter((record) => {
      const issuerLowerCase = record.authenticator.issuer?.toLowerCase() || "";
      const nameLowerCase = record.authenticator.name?.toLowerCase() || "";
      return (
        issuerLowerCase.includes(searchTextLowerCase) || nameLowerCase.includes(searchTextLowerCase)
      );
    });
  }, [sortedAuthenticators, searchText]);
  const styles = useStyles();
  const { seconds, start, stop } = useSecondsTimer(30);
  useFocusedEffect((isFocused) => {
    if (isFocused) {
      start();
    } else {
      stop();
    }
  }, []);

  if (!isAppActive) {
    return null;
  }

  return (
    <ScreenLayout
      disableBack
      headerText="Authenticator"
      leftSection={<AppBarAction icon="cog" onPress={() => navigate("Settings", {})} />}
      rightSection={
        <>
          <AppBarAction icon="plus" onPress={() => navigate("AuthenticatorAdd", {})} />
        </>
      }
      bottomComponent={
        authenticators.length > 0 && (
          <>
            <ViewE style={styles.timerContainer} padding>
              <SecondsProgressCircle seconds={30 - seconds} max={30} />
            </ViewE>
            <ViewE padding style={styles.searchBarContainer}>
              <SearchBarE value={searchText} onChangeText={setSearchText} />
            </ViewE>
          </>
        )
      }
      stickyBottomComponent>
      <FlatList
        ListFooterComponent={<ViewE style={styles.flatListFooter} />}
        data={filteredAuthenticators}
        renderItem={({ item, index }) => (
          <AuthenticatorListScreenRow
            key={`authenticator-list-screen-row-${index}`}
            authenticatorExtended={item}
            seconds={seconds}
          />
        )}
      />
    </ScreenLayout>
  );
};

const useStyles = () => {
  const commonStyles = useCommonStyles();
  const searchBarHeight = 80;

  return useMemo(
    () =>
      StyleSheet.create({
        timerContainer: {
          ...commonStyles.floatingBottomRight,
          bottom: searchBarHeight,
        },
        searchBarContainer: {
          ...commonStyles.floatingBottomRight,
          ...commonStyles.fullWidth,
        },
        flatListFooter: {
          paddingBottom: searchBarHeight,
        },
      }),
    [commonStyles.floatingBottomRight, commonStyles.fullWidth]
  );
};
