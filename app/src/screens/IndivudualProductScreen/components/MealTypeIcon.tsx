import {FC} from 'react';
import {CustomText} from '../../../components/elements/CustomText';
import {MealTypes} from '../../../constants/types';
import {AppBorderRadius, AppIconSize} from '../../../constants/values';
import {getMealType, getMealTypeIcon} from '../../../libs/meal';
import {BreakfastIcon} from '../../../svgs/breakfast';
import {MealType} from '../../../types/nutrition';

type MealTypeIconProps = {
  type?: MealType;
  bypassIcon?: string;
};

export const MealTypeIcon: FC<MealTypeIconProps> = ({type, bypassIcon}) => {
  const mealType = type ?? getMealType(new Date());
  const size = AppIconSize.md;
  const props = {width: size, height: size};

  if (mealType == MealTypes.BREAKFAST && !bypassIcon) {
    return <BreakfastIcon {...props} />;
  }

  return (
    <CustomText
      className="bg-orange-100 p-2"
      style={{borderRadius: AppBorderRadius.rounded}}
      size="3xl">
      {(() => {
        if (bypassIcon) {
          return bypassIcon;
        }
        return getMealTypeIcon(mealType);
      })()}
    </CustomText>
  );
};
