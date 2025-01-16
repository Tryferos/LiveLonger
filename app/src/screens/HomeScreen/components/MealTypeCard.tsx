import {FC} from 'react';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {MealType} from '../../../types/nutrition';
import {AppBorderRadius, AppColors, AppSpace} from '../../../constants/values';

type Props = {
  selected: boolean;
  meal: MealType | 'all';
  onPress: () => void;
};

export const MealTypeCard: FC<Props> = ({selected, meal, onPress}) => {
  return (
    <Row
      onPress={!selected ? onPress : undefined}
      className="px-4 py-2"
      backgroundColor={selected ? 'mainLight' : 'white'}
      style={{
        borderRadius: AppBorderRadius.normal,
        borderColor: AppColors.mainLight,
        borderWidth: 1,
        marginRight: AppSpace['3xs'],
      }}>
      <CustomText color={selected ? 'white' : 'mainLight'}>
        {meal.upperFirst()}
      </CustomText>
    </Row>
  );
};
