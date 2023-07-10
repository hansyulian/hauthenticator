import { ScreenLayout } from '@components/ScreenLayout';
import { ViewE } from '@components/ViewE';
import { useCommonStyles } from '@hooks/useCommonStyles';
import { useSecondsTimer } from '@hooks/useSecondsTimer';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AuthenticatorListScreenRow } from './AuthenticatorListScreen.Row';
import { SearchBarE } from '@components/SearchBarE';
import { AppBarAction } from '@components/AppBarAction';
import { useNavigate } from '@hooks/useNavigate';
import { useFocusedEffect } from '@hooks/useFocusedEffect';
import { useAuthenticators } from '@hooks/useAuthenticators';

export const AuthenticatorListScreen = () => {
  const authenticators = useAuthenticators();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const filteredAuthenticators = useMemo(() => {
    if (!authenticators) {
      return [];
    }
    if (!searchText) {
      return authenticators;
    }
    const searchTextLowerCase = searchText.toLowerCase();
    return authenticators.filter(record => {
      const issuerLowerCase = record.issuer.toLowerCase();
      const nameLowerCase = record.name.toLowerCase();
      return issuerLowerCase.includes(searchTextLowerCase) ||
        nameLowerCase.includes(searchTextLowerCase);
    });
  }, [authenticators, searchText])
  const styles = useStyles();
  const { seconds, start, stop } = useSecondsTimer(30);
  useFocusedEffect((isFocused) => {
    if (isFocused) {
      start();
    } else {
      stop();
    }
  }, [])

  return <ScreenLayout
    disableBack
    headerText='Authenticator'
    leftSection={<AppBarAction icon='cog' onPress={() => navigate('Settings', {})} />}
    rightSection={<>
      {/* <AppBarAction icon='alert-outline' onPress={() => { }} /> */}
      <AppBarAction icon='plus' onPress={() => navigate('AuthenticatorAdd', {})} />
    </>}
  >
    <FlatList ListFooterComponent={<ViewE style={styles.flatListFooter} />} data={filteredAuthenticators} renderItem={({ item }) => <AuthenticatorListScreenRow authenticator={item} seconds={seconds} />} />
    {authenticators.length > 0 &&
      <ViewE padding='small' style={styles.searchBarContainer}>
        <SearchBarE value={searchText} onChangeText={setSearchText} />
      </ViewE>
    }
  </ScreenLayout>
}

const useStyles = () => {
  const commonStyles = useCommonStyles();
  const searchBarHeight = 80;

  return useMemo(() => StyleSheet.create({
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
    }
  }), [])
}