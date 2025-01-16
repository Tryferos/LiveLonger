import React, {FC, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {AppSpace} from '../../../constants/values';
import {EmptyIcon} from '../../../svgs/empty';
import {DailyMealsType, isDailyQuickMealItem} from '../../../types/nutrition';
import {MealsTypeList} from './MealsTypeList';

type MealsListProps = {
  meals: DailyMealsType['meals'];
};

export const MealsTypesList: FC<MealsListProps> = ({meals}) => {
  const isEmpty = useMemo(() => {
    return Object.values(meals).every(meal =>
      isDailyQuickMealItem(meal) ? !meal.quickMeal : meal.products.length === 0,
    );
  }, [meals]);
  if (isEmpty) {
    return (
      <Column className="w-full h-[100%] items-center mt-10 px-4" gap="3xl">
        <EmptyIcon
          width={'100%'}
          height={Dimensions.get('screen').height * 0.3}
        />
        <CustomText>{'You do not have any entries for today yet!'}</CustomText>
      </Column>
    );
  } else {
    return (
      <Column
        gap="xl"
        style={{width: Dimensions.get('screen').width - AppSpace.xl}}>
        {Object.values(meals).map((item, index) => {
          if (item.products.length === 0 && !item.quickMeal) {
            return null;
          } else {
            return <MealsTypeList key={item.type + index} {...item} />;
          }
        })}
      </Column>
    );
  }
};
