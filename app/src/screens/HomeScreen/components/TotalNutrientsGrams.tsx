import React, {FC, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppColors, AppSpace} from '../../../constants/values';
import {useNutrientPercentages} from '../../../hooks/useNutrientPercentages';
import {DailyMealsType} from '../../../types/nutrition';
type TotalNutrientsGramsProps = Pick<DailyMealsType, 'totalNutrientsGrams'>;

export const TotalNutrientsGrams: FC<TotalNutrientsGramsProps> = ({
  totalNutrientsGrams,
}) => {
  const percentages = useNutrientPercentages({
    protein: totalNutrientsGrams?.protein,
    carbs: totalNutrientsGrams?.carbohydrates,
    fat: totalNutrientsGrams?.fat,
  });
  return (
    <ScrollView
      decelerationRate={0}
      snapToAlignment="start"
      snapToInterval={styles.card.width}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <Row gap="2xs">
        <NutrientCard
          nutrient={'Protein'}
          value={totalNutrientsGrams?.protein}
          percentage={percentages.protein}
        />
        <NutrientCard
          nutrient={'Carbs'}
          value={totalNutrientsGrams?.carbohydrates}
          percentage={percentages.carbs}
        />
        <NutrientCard
          nutrient={'Fat'}
          value={totalNutrientsGrams?.fat}
          percentage={percentages.fat}
        />
        <NutrientCard nutrient={'Sodium'} value={totalNutrientsGrams?.sodium} />
        <NutrientCard nutrient={'Sugars'} value={totalNutrientsGrams?.sugars} />
      </Row>
    </ScrollView>
  );
};

type NutrientCardProps = {
  nutrient: string;
  value?: number;
  percentage?: number;
};

const NutrientCard: FC<NutrientCardProps> = ({
  nutrient,
  value = 0,
  percentage = 0,
}) => {
  const [showPercentage, setShowPercentage] = useState(false);
  const cardHeight = Dimensions.get('screen').height * 0.1;
  const MINUMUM_CARD_HEIGHT_MULTIPLIER = 0.15;
  const MAXIMUM_CARD_HEIGHT_MULTIPLIER = 0.98;
  const CARD_SHOW_THRESHOLD = 0.07;
  return (
    <Column
      onPress={() => setShowPercentage(prev => !prev)}
      backgroundColor="mainLight"
      bgOpacity="05"
      gap="md"
      className="px-4 border-[1px] py-2 items-center relative"
      style={{
        width: styles.card.width,
        height: cardHeight,
        borderRadius: AppBorderRadius.rounded,
        borderColor: AppColors.white,
      }}>
      {percentage > CARD_SHOW_THRESHOLD && (
        <Row
          animation={{
            entering: FadeInUp.stiffness(250).springify(),
            exiting: FadeOutDown.stiffness(250).springify(),
          }}
          bgOpacity={'20'}
          style={{
            width: styles.card.width - 2,
            height:
              cardHeight *
              percentage.between(
                MINUMUM_CARD_HEIGHT_MULTIPLIER,
                MAXIMUM_CARD_HEIGHT_MULTIPLIER,
              ),
            borderBottomEndRadius: AppBorderRadius.rounded,
            borderBottomStartRadius: AppBorderRadius.rounded,
            borderTopEndRadius:
              percentage >= 0.85 ? AppBorderRadius.rounded : undefined,
            borderTopStartRadius:
              percentage >= 0.85 ? AppBorderRadius.rounded : undefined,
          }}
          className="absolute left-0 bottom-0"
          backgroundColor="mainLight"
        />
      )}
      <CustomText font="wotfardMedium" size="sm">
        {nutrient}
      </CustomText>
      <CustomText color="gray">
        {showPercentage ? percentage.formatPercentage() : `${value}g`}
      </CustomText>
    </Column>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width * 0.33 - AppSpace['2xs'] * 2,
  },
});
