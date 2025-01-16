import {FC, useMemo} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {useSearchProducts} from '../../../store/search_products';
import {NoResults} from './NoResults';
import {Product} from '../../../types/nutrition';
import {Row} from '../../../components/elements/Row';
import {Spacer} from '../../../components/elements/Spacer';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomCheckbox} from '../../../components/elements/CustomCheckbox';
import {AppBorderRadius} from '../../../constants/values';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getTotalCalories} from '../../../libs/products';

export const SearchResults = () => {
  const {products, noResults, selectedProducts} = useSearchProducts();
  if (noResults) return <NoResults />;
  const {totalCalories} = getTotalCalories(selectedProducts);
  const selectedText =
    selectedProducts.length == 0
      ? 'none'
      : selectedProducts.length == products.length
      ? 'all'
      : `${selectedProducts.length}/${products.length}`;

  return (
    <Column className="pb-6" gap="3xs">
      <Row className="justify-between items-center mx-2">
        <Row className="items-center">
          <CustomText font="wotfardMedium" size="lg">
            {'🥣  Results'}
          </CustomText>
          <CustomText
            font="wotfardMedium"
            size="xs"
            color="gray"
            className="ml-2">
            {`(${selectedText} selected)`}
          </CustomText>
        </Row>
        <CustomText font="wotfardMedium" color="gray" size="sm">
          {`${totalCalories} kcal`}
        </CustomText>
      </Row>
      <Spacer size="3xs" />
      {products.map((product, i) => (
        <SearchResultsItem key={product.name + i} {...product} />
      ))}
    </Column>
  );
};

const SearchResultsItem: FC<Product> = product => {
  const {selectedProducts, selectProduct} = useSearchProducts();
  const {name, calories, quantity} = product;

  const isSelected =
    selectedProducts.some(selectedProduct => selectedProduct.name === name) ??
    false;

  const onPress = () => {
    selectProduct(product);
  };

  return (
    <Row
      onPress={onPress}
      shadow={isSelected ? 'shadowMedium' : 'shadowMediumLight'}
      backgroundColor="white"
      style={{
        borderRadius: AppBorderRadius.small,
      }}
      className="items-center py-4 px-6 justify-between transition-all duration-300 ease-in-out">
      <CustomCheckbox checked={isSelected} onPress={() => {}} />
      <CustomText font="wotfardMedium" size="md" className="">
        {name}
      </CustomText>
      <Column className="items-center">
        <CustomText
          font="wotfardRegular"
          color="gray"
          size="xs"
          className="ml-2">
          {calories.toFixed(0)} kcal
        </CustomText>
        <CustomText
          font="wotfardRegular"
          color="gray"
          size="xs"
          className="ml-2">
          {quantity} g
        </CustomText>
      </Column>
    </Row>
  );
};
