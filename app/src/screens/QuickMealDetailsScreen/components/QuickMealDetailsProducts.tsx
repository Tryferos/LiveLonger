import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppColors} from '../../../constants/values';
import {getMealType} from '../../../libs/meal';
import {useAppNavigation} from '../../../types/navigation';
import {Product, QuickMealInfo} from '../../../types/nutrition';
import {ProductIcon} from '../../QuickMealRepositoryScreen/components/ProductIcon';

type Props = Pick<QuickMealInfo, 'products' | '_id'>;

export const QuickMealsDetailsProducts: FC<Props> = ({products, _id}) => {
  const navigation = useAppNavigation();
  const navigateToProduct = (product: Product) => {
    navigation.navigate('Meal_Product_Info_Screen', {
      ...product,
      mealType: getMealType(product.date),
      quickMealId: _id,
    });
  };
  return (
    <Column gap="2xs">
      <CustomText className="mb-1" font="wotfardMedium" size="md" color="gray">
        {'A look at the ingredients'}
      </CustomText>
      {products.map((product, i) => {
        const {imageUrl, name, calories, _id, quantity} = product;
        return (
          <Row
            onPress={() => navigateToProduct(product)}
            gap="2xs"
            key={_id ?? i}
            className="relative px-2 py-2"
            style={{
              borderWidth: 1,
              borderColor: AppColors.gray200,
              borderRadius: AppBorderRadius.normal,
            }}>
            <ProductIcon name={name} imageUrl={imageUrl} />
            <Column gap="3xs">
              <CustomText font="wotfardMedium">{name}</CustomText>
              <Row className="items-center" gap="2xs">
                <CustomText size="sm" color="gray">
                  {calories} kcal
                </CustomText>
                <CustomIcon icon="circle" color="gray400" size="4xs" />
                <CustomText size="sm" color="gray">
                  {quantity} g
                </CustomText>
              </Row>
            </Column>
            <Row className="items-center h-full absolute right-2 top-2">
              <CustomIcon icon="arrow-forward-ios" color="gray" size="xs" />
            </Row>
          </Row>
        );
      })}
    </Column>
  );
};
