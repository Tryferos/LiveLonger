import {useFocusEffect} from '@react-navigation/native';
import React, {
  FC,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Column} from '../../../components/elements/Column';
import {CustomCheckbox} from '../../../components/elements/CustomCheckbox';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {SimpleInput} from '../../../components/elements/SimpleInput';
import {Spacer} from '../../../components/elements/Spacer';
import {InfoCard} from '../../../components/organisms/InfoCard';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {QuantityPickerModalContent} from '../../../components/wrappers/QuantityPickerModal';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {getMealType} from '../../../libs/meal';
import {formatProductWithGrams} from '../../../libs/products';
import {getUniqueProducts} from '../../../network/product';
import {useSearchProducts} from '../../../store/search_products';
import {useAppNavigation} from '../../../types/navigation';
import {Product} from '../../../types/nutrition';
import {MealProductImage} from '../../DailyAnalysisScreen/components/MealProductImage';

type Props = {
  products: Product[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchedAll: boolean;
  setFetchedAll: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuickMealProductPicker: FC<Props> = ({
  products,
  setProducts,
  setStep,
  fetchedAll,
  setFetchedAll,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [searchFilter, setSearchFilter] = useState('');
  const {selectedProducts, selectProduct} = useSearchProducts();
  const listRef = useRef<FlatList<Product>>(null);

  const navigation = useAppNavigation();

  const onChange = (value: number) => {
    if (!productToEdit) {
      return;
    }
    setProductToEdit({...formatProductWithGrams(productToEdit, value)});
  };

  const handleToggle = (visible: boolean) => {
    setPickerVisible(visible);
    if (visible === false && productToEdit && productToEdit.quantity > 0) {
      selectProduct(productToEdit);
      setProducts(prev => [
        ...prev.filter(p => p._id !== productToEdit._id),
        productToEdit,
      ]);
      setProductToEdit(undefined);
      listRef.current?.scrollToIndex({index: 0, animated: true});
    }
  };

  const filteredProducts = useMemo(() => {
    const uniqueProducts = products
      .map((item, i) => ({
        ...item,
        _id: item._id ?? (new Date().getTime() + i).toString(),
      }))
      .reduce((acc, curr) => {
        if (!acc.some(p => p.name === curr.name)) {
          acc.push(curr);
        }
        return acc;
      }, [] as Product[]);

    const queriedProducts = uniqueProducts.filter(p =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()),
    );
    return queriedProducts;
  }, [products, searchFilter]);

  const isSelected = (product: Product) =>
    selectedProducts.some(
      p => p._id === product._id || p.name === product.name,
    );

  const sortProducts = useMemo(() => {
    return filteredProducts.descending('date').sort((a, b) => {
      const isSelectedA = isSelected(a);
      const isSelectedB = isSelected(b);
      if (isSelectedA && !isSelectedB) {
        return -1;
      } else if (!isSelectedA && isSelectedB) {
        return 1;
      }
      return 0;
    });
  }, [filteredProducts, selectedProducts]);

  useFocusEffect(
    useCallback(() => {
      setSearchFilter('');
      (async () => {
        if (!fetchedAll) {
          const newProducts = await getUniqueProducts();
          if (newProducts && newProducts.products.length > 0) {
            const newProductsToAdd = [
              ...selectedProducts,
              ...newProducts.products,
            ];
            setProducts(newProductsToAdd);
          } else {
            setProducts(selectedProducts);
          }
        } else {
          setProducts(prev => [...selectedProducts, ...prev]);
        }
      })();
    }, [selectedProducts]),
  );

  const getMoreItems = async () => {
    if (!fetchedAll) {
      const newProducts = await getUniqueProducts(
        (products.last()?.date ?? new Date()).getTime() - 200,
      );
      if (newProducts && newProducts?.products.length > 0) {
        setProducts(prev => [...prev, ...newProducts.products]);
      } else {
        setFetchedAll(true);
      }
    }
  };

  const handleSearchNavigation = () => {
    setStep(0);
    navigation.navigate('Search_Product_Screen', {
      selectedProducts: selectedProducts,
    });
  };

  const handleQRScanNavigation = () => {
    setStep(0);
    navigation.navigate('Scanner_Screen', {
      addToQuickMeal: true,
    });
  };

  return (
    <Column gap="2xs" className="-mt-4">
      <CustomText font="wotfardMedium">{'Your inventory'}</CustomText>
      <SimpleInput
        placeholder={'Filter products'}
        value={searchFilter}
        onChangeText={setSearchFilter}
      />
      <FlatList
        ref={listRef}
        showsVerticalScrollIndicator={false}
        data={sortProducts}
        onEndReached={async () => await getMoreItems()}
        style={{height: '74%'}}
        keyExtractor={item => `${item._id ?? ''}${item}`}
        renderItem={({item: product}) => {
          const selected = isSelected(product);
          return (
            <Fragment key={product._id}>
              <ProductItem
                key={product._id}
                product={product}
                selected={selected}
                onPress={() => {
                  if (selected) {
                    selectProduct(product);
                  } else {
                    setProductToEdit(product);
                    setPickerVisible(true);
                  }
                }}
              />
              <Spacer size="2xs" />
            </Fragment>
          );
        }}
      />
      <ScrollView
        snapToInterval={Dimensions.get('window').width * 0.8}
        snapToAlignment="start"
        style={{height: '14%', minHeight: 75, paddingRight: AppSpace.md}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Row gap="2xs" className="">
          <Row className="w-[80vw] relative">
            <InfoCard icon="search" onPress={handleSearchNavigation}>
              <Column className="w-[90%]" gap="3xs">
                <CustomText font="wotfardMedium">
                  {"Can't find a product?"}
                </CustomText>
                <CustomText size="sm" color="gray">
                  {
                    'Search for products and add them to your quick meal inventory!'
                  }
                </CustomText>
              </Column>
            </InfoCard>
          </Row>
          <Row className="w-[80vw] relative">
            <InfoCard icon="qr-code-2" onPress={handleQRScanNavigation}>
              <Column className="w-[90%]" gap="3xs">
                <CustomText font="wotfardMedium">
                  {"Can't find a product?"}
                </CustomText>
                <CustomText size="sm" color="gray">
                  {
                    'Scan your product and add it to your quick meal collection!'
                  }
                </CustomText>
              </Column>
            </InfoCard>
          </Row>
        </Row>
      </ScrollView>
      <Modal
        isVisible={pickerVisible}
        onClose={() => handleToggle(false)}
        style={{gap: AppSpace.sm, justifyContent: 'space-between'}}
        title="Select quantity">
        <QuantityPickerModalContent
          onClose={() => handleToggle(false)}
          label="g"
          selectedValue={productToEdit?.quantity ?? 0}
          onSelect={onChange}
        />
      </Modal>
    </Column>
  );
};

const ProductItem: FC<{
  product: Product;
  selected: boolean;
  onPress: () => void;
}> = ({onPress, product, selected}) => {
  return (
    <Row
      onPress={onPress}
      backgroundColor="white"
      gap="md"
      style={{borderRadius: AppBorderRadius.normal}}
      className="items-center py-2 px-3"
      shadow="shadowBottom">
      <MealProductImage {...product} mealType={getMealType()} />
      <Column gap="3xs">
        <CustomText font="wotfardMedium">{product.name}</CustomText>
        <Row gap="2xs" className="items-end">
          <CustomText size="sm" color="gray">
            {product.quantity}g
          </CustomText>
          {!selected && <CustomIcon icon="edit" size="2xs" color="gray" />}
        </Row>
      </Column>
      <Row className="absolute right-4 h-full items-center">
        <CustomCheckbox checked={selected} />
      </Row>
    </Row>
  );
};
