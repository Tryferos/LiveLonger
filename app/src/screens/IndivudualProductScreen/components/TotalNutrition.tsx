import React, {Fragment, useMemo} from 'react';
import {ViewStyle} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {Spacer} from '../../../components/elements/Spacer';
import {MiniCard} from '../../../components/organisms/MiniCard';
import {
  NutrimentIcons,
  NutrimentKeys,
  NutrimentSecondayKeys,
  calculatePercentage,
} from '../../../constants/nutrition';
import {getTotalCalories} from '../../../libs/products';
import {useSearchProducts} from '../../../store/search_products';

export const TotalNutrition = () => {
  const {selectedProducts} = useSearchProducts();
  const keys = useMemo(() => {
    return [
      ...Object.keys(NutrimentKeys),
      ...Object.keys(NutrimentSecondayKeys).filter(item => item !== 'Sodium'),
    ];
  }, []);

  const nutrition = useMemo(() => {
    return keys.map(key => {
      return {
        item: {
          value: selectedProducts.reduce(
            (acc, product) =>
              acc +
              product.nutrients[
                NutrimentKeys[key] ?? NutrimentSecondayKeys[key]
              ],
            0,
          ),
          key: key,
        },
      };
    });
  }, [selectedProducts]);

  const {totalCalories, totalQuantity} = getTotalCalories(selectedProducts);

  return (
    <Column gap="3xs">
      <Row className="justify-between items-center">
        <CustomText font="wotfardMedium" size="lg" color="black">
          Total nutrition
        </CustomText>
        <CustomText font="wotfardMedium" size="xs">
          {`${totalQuantity} grams`}
        </CustomText>
      </Row>
      <Spacer size="3xs" />
      <Row className="flex-wrap justify-between" gap="3xs">
        {nutrition.map((nutritionItem, i) => {
          const value = nutritionItem.item.value;
          if (value == 0) {
            return null;
          }
          const percentage = calculatePercentage(
            value,
            parseFloat(totalQuantity),
          );
          const styles: ViewStyle = {flexBasis: '49%'};
          return (
            <Fragment key={i}>
              {i == 0 && selectedProducts.length == 1 ? (
                <MiniCard
                  label={selectedProducts[0].name}
                  value={`${selectedProducts[0].quantity.toFixed(0)} g`}
                  icon="📦"
                  styles={styles}
                />
              ) : null}
              <MiniCard
                trailingText={percentage}
                styles={styles}
                icon={NutrimentIcons[nutritionItem.item.key]}
                label={nutritionItem.item.key}
                value={`${value.toFixed(1)} g`}
              />
            </Fragment>
          );
        })}
      </Row>
    </Column>
  );
};
