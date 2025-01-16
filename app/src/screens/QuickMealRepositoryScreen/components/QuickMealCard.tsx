import React, {FC} from 'react';
import {Image} from 'react-native';
import {Brightness} from 'react-native-color-matrix-image-filters';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {Spacer} from '../../../components/elements/Spacer';
import {AppBorderRadius} from '../../../constants/values';
import {getDateString} from '../../../libs/dates';
import {useAppNavigation} from '../../../types/navigation';
import {QuickMealInfo} from '../../../types/nutrition';
import {QuickMealCardHeader} from './QuickMealCardHeader';

type Props = QuickMealInfo;

const getMealDescriptionType = ({
  totalCalories,
  totalGrams,
  totalNutrientsGrams,
  type,
  products: _products,
}: QuickMealInfo) => {
  const products = _products.length;
  if (!totalNutrientsGrams) {
    return '';
  }
  let productDescription = '';
  if (products === 1) {
    productDescription = 'a single ingredient';
  } else if (products <= 3) {
    productDescription = `${products} main ingredients`;
  } else if (products > 3) {
    productDescription = `${products} different ingredients, offering a diverse mix`;
  }

  // Construct nutrient breakdown and identify if any nutrient is high
  let nutrientDescription = '';
  const highNutrients: string[] = [];
  const nutrientEntries = Object.entries(totalNutrientsGrams);

  nutrientEntries.forEach(([nutrient, grams]) => {
    if (!grams) {
      return;
    }
    const isMiligrams = [
      'sodium',
      'calcium',
      'iron',
      'potassium',
      'cholesterol',
    ].includes(nutrient);
    const percentage = grams / totalGrams;
    if (isMiligrams ? grams >= 200 : percentage >= 0.03) {
      nutrientDescription += `${grams} ${
        isMiligrams ? 'mg' : 'grams'
      } of ${nutrient}${
        !isMiligrams ? ` (${(percentage * 100).toFixed(1)}%)` : ''
      }, `;
    }

    if (isMiligrams ? grams >= 250 : percentage >= 0.09) {
      highNutrients.push(nutrient);
    }
  });

  // Clean up nutrient description text
  nutrientDescription = nutrientDescription.slice(0, -2); // Remove trailing comma and space

  // Customize the description based on the nutrient profile
  let nutrientCommentary = '';
  if (highNutrients.length === 1) {
    nutrientCommentary = `This meal is rich in ${highNutrients[0]}.`;
  } else if (highNutrients.length > 1) {
    nutrientCommentary = `This meal is high in ${highNutrients
      .slice(0, -1)
      .join(', ')} and ${highNutrients.at(-1)}.`;
  }

  // Construct the final description with different cases
  return `For ${type.toLowerCase()}, you’re having a meal with around ${totalCalories} calories in total. This meal weighs about ${totalGrams} grams, made from ${productDescription}. It includes ${nutrientDescription}. ${nutrientCommentary}`;
  // const typeText = type.toLowerCase();
  // const proteinPercentage =
  //   ((totalNutrientsGrams?.protein ?? 0) / totalGrams) * 100;
  // const carbsPercentage =
  //   ((totalNutrientsGrams?.carbohydrates ?? 0) / totalGrams) * 100;
  // const fatPercentage = ((totalNutrientsGrams?.fat ?? 0) / totalGrams) * 100;
  // const nutrientText =
  //   proteinPercentage > carbsPercentage
  //     ? carbsPercentage >= fatPercentage
  //       ? 'protein'
  //       : 'fat'
  //     : carbsPercentage > fatPercentage
  //     ? 'carbs'
  //     : 'fat';
  // const caloriesText =
  //   totalCalories > 800 ? 'heavy' : totalCalories < 400 ? 'light' : 'moderate';
  // const ingredientsText = products.length !== 1 ? 'ingredients' : 'ingredient';
  // const ingredientsLengthText = products.length > 3 ? 'a total of' : 'only';
  // return `This is a ${caloriesText}, ${nutrientText} specific meal, targeted for your ${typeText}, consisting of ${ingredientsLengthText} ${products.length} ${ingredientsText}.`;
};

export const QuickMealCard: FC<Props> = props => {
  const {imageUrl} = props;
  const navigation = useAppNavigation();
  const handlePress = () => {
    navigation.navigate('Quick_Meal_Details_Screen', props);
  };
  return (
    <Column
      clickAnimation={true}
      onPress={handlePress}
      gap="xs"
      className="min-h-[15vh] p-0 w-full relative"
      backgroundColor="mainLight"
      shadow="shadowBottom"
      style={{
        borderRadius: AppBorderRadius.normal,
      }}>
      <Brightness
        amount={0.3}
        style={{borderRadius: AppBorderRadius.normal}}
        className="h-full w-full absolute left-0 top-0 items-center justify-center">
        <Image
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"
          blurRadius={1.5}
          resizeMethod="resize"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.6,
            borderRadius: AppBorderRadius.normal,
          }}
        />
      </Brightness>
      <Column className="p-5 pb-2" gap="xs">
        <QuickMealCardHeader {...props} />
        <Column className="w-[88%]">
          <CustomText size="sm" color="gray200">
            {getMealDescriptionType(props)}
          </CustomText>
          <Spacer size="2xs" />
          <CustomText size="xs" color="gray300">
            {getDateString(props.date).join(', at ')}
          </CustomText>
        </Column>
        {/* <QuickMealProuductsList {...props} /> */}
        {/* <QuickMealNutrients {...props} /> */}
      </Column>
      <Row className="absolute right-4 h-full items-center">
        <CustomIcon icon="arrow-forward-ios" size="md" color="gray200" />
      </Row>
    </Column>
  );
};
