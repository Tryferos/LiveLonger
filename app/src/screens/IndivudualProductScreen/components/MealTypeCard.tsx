import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {getMealType} from '../../../libs/meal';
import {MealTypeIcon} from './MealTypeIcon';
import {getTotalCalories} from '../../../libs/products';
import {useSearchProducts} from '../../../store/search_products';
import {AppBorderRadius} from '../../../constants/values';

export const MealTypeCard = () => {
  const mealType = getMealType(new Date());
  const mealTypeFormatted =
    mealType.charAt(0).toUpperCase() + mealType.slice(1).toLowerCase();
  const {selectedProducts} = useSearchProducts();
  const {totalCalories} = getTotalCalories(selectedProducts);
  return (
    <Row
      shadow="shadowBottom"
      style={{borderRadius: AppBorderRadius.rounded}}
      className="w-full bg-white py-3 pl-3 pr-4 justify-between items-center">
      <MealTypeIcon />
      <CustomText size="xl" font="wotfardMedium">
        {mealTypeFormatted} meal
      </CustomText>
      <CustomText size="xs" font="wotfardRegular">
        {`${totalCalories} kcal`}
      </CustomText>
    </Row>
  );
};
