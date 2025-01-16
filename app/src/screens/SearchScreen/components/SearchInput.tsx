import {FC, useEffect, useRef} from 'react';
import {CustomInput} from '../../../components/elements/CustomInput';
import {
  useRecentSearchesDispatcher,
  useRecentSearchesSelector,
} from '../../../store/recent_searches';
import {useSearchProducts} from '../../../store/search_products';
import {TextInput} from 'react-native-gesture-handler';
type SearchInputProps = {
  handleSearch: () => void;
};
export const SearchInput: FC<SearchInputProps> = ({handleSearch}) => {
  const {query, setQuery, fetchProducts, products} = useSearchProducts();
  const searches = useRecentSearchesSelector();
  const {addRecentSearch} = useRecentSearchesDispatcher();

  const ref = useRef<TextInput>(null);

  return (
    <CustomInput
      ref={ref}
      icon="search"
      onIconPress={handleSearch}
      placeholder="Explain what you had for your meal. e.g.
    i just had 50g white rice with chicken breast."
      value={query}
      onChangeText={setQuery}
    />
  );
};
