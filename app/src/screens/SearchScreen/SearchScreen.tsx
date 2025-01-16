import React, {FC, useEffect} from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Column} from '../../components/elements/Column';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {AppSpace} from '../../constants/values';
import {useRecentSearchesDispatcher} from '../../store/recent_searches';
import {useSearchProducts} from '../../store/search_products';
import {useAppRouteParams} from '../../types/navigation';
import {ProceedButton} from './components/ProceedButton';
import {RecentSearches} from './components/RecentSearches';
import {SearchButton} from './components/SearchButton';
import {SearchInput} from './components/SearchInput';
import {SearchResults} from './components/SearchResults';

export const SearchScreen: FC = () => {
  const {query, setQuery, fetchProducts, clear, setProducts} =
    useSearchProducts();
  const {addRecentSearch} = useRecentSearchesDispatcher();
  const {init} = useRecentSearchesDispatcher();
  const params = useAppRouteParams<'Search_Product_Screen'>();

  useEffect(() => {
    (async () => {
      await init();
      clear();
      if (params) {
        setProducts(params.selectedProducts);
      }
    })();
  }, []);

  const handleSearch = () => {
    (async () => {
      const success = await fetchProducts(query);
      if (success) {
        addRecentSearch(query);
        setQuery('');
      }
    })();
  };
  const showSearchBtn = query.length > 0;
  const buttonDisabled = query.length < 4;

  return (
    <ScreenWrapper
      scrollView={false}
      hasBgColor={true}
      centerTitle={true}
      bottomChildren={<ProceedButton />}
      className="w-full h-full"
      title="Your Nutrition">
      <KeyboardAvoidingView
        style={{
          flex: 1,
          gap: AppSpace.md,
          height: Dimensions.get('window').height,
        }}
        behavior="height">
        <SearchInput handleSearch={handleSearch} />
        {showSearchBtn && (
          <SearchButton onPress={handleSearch} disabled={buttonDisabled} />
        )}
        <ScrollView
          style={{
            flex: 1,
            height: Dimensions.get('window').height,
          }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}>
          <Column gap="md" className="">
            <RecentSearches />
            <SearchResults />
          </Column>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
