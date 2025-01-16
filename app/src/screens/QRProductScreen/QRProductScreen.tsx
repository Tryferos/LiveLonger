import React, {FC, useEffect, useState} from 'react';
import {Column} from '../../components/elements/Column';
import {CustomText} from '../../components/elements/CustomText';
import {ImageScreen} from '../../components/wrappers/ImageScreenWrapper';
import {ErrorMessages} from '../../constants/errors';
import {UserSettings} from '../../constants/settings';
import {formatProductWithGrams} from '../../libs/products';
import {saveNutrition} from '../../network/nutrition';
import {fetchProduct} from '../../network/product';
import {useAlerts} from '../../store/alerts';
import {useSearchProducts} from '../../store/search_products';
import {useAppNavigation, useAppRouteParams} from '../../types/navigation';
import {Meal, Product} from '../../types/nutrition';
import {ProductNutrition} from './components/ProductNutrition';
import {QuantitySelection} from './components/QuantitySelection';
import {SaveButton} from './components/SaveButton';

export const ProductScreen: FC = () => {
  const navigation = useAppNavigation();
  const {code, addToQuickMeal = false} =
    useAppRouteParams<'QR_Product_Screen'>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>();
  const {showAlertPromise} = useAlerts();
  const {selectProduct} = useSearchProducts();

  useEffect(() => {
    if (product) {
      return;
    }
    (async () => {
      const product = await fetchProduct({qrCode: `${code}`});
      if (!product) {
        navigation.navigate('Screen_Error', {
          reason: ErrorMessages.QR_Product_Screen,
        });
        return;
      }
      setProduct(product);

      setSelectedSize(product?.servingSize ?? product?.quantity);
    })();
  }, [code]);

  if (!product || selectedSize === undefined || selectedSize == null) {
    return null;
  }

  const handleSaveProduct = async () => {
    if (addToQuickMeal) {
      selectProduct(formatProductWithGrams(product, selectedSize));
      navigation.navigate('Quick_Meal_Create_Screen', {quickMeal: undefined});
    } else {
      UserSettings.setServingSize(selectedSize, code);
      const meal = await showAlertPromise<Meal>({
        promise: saveNutrition([formatProductWithGrams(product, selectedSize)]),
        promiseData: {
          message: 'Inserting this product to your daily nutrition...',
        },
        successData: {
          message: `${product.name} is now included in your daily nutrition`,
        },
        errorData: {message: 'Oops, something went wrong. Please try again.'},
      });
      if (!meal) {
        return;
      }
      navigation.push('Daily_Analysis_Screen', {
        fromAddType: 'SYNTHETIC_SCANNED',
      });
    }
  };

  const onBack = () => {
    if (addToQuickMeal) {
      navigation.navigate('Quick_Meal_Create_Screen');
    } else {
      navigation.navigate('Main_Home');
    }
  };

  const hasServing = product.hasServingSize ?? false;

  return (
    <ImageScreen
      onBack={onBack}
      src={product.imageUrl ?? ''}
      title={product.name}>
      <Column gap="lg" className="h-[90%] w-[100%] justify-star">
        <Column>
          <CustomText font="wotfardMedium" size="xs" color="gray">
            {selectedSize}g total
          </CustomText>
          <CustomText font="wotfardMedium" size="lg">
            {product.name}
          </CustomText>
        </Column>
        <ProductNutrition
          nutrients={product.nutrients}
          quantity={selectedSize}
        />
        <QuantitySelection
          hasServing={hasServing}
          selectedSize={selectedSize}
          onChange={setSelectedSize}
        />
        <SaveButton onSave={handleSaveProduct} />
      </Column>
    </ImageScreen>
  );
};
