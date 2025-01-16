import React from 'react';
import {EntryPointCard} from '../../../components/organisms/EntryPointCard';
import {ChefIcon} from '../../../svgs/chef';
import {useAppNavigation} from '../../../types/navigation';

export const MealPlannerEntry = () => {
  const navigation = useAppNavigation();
  const handleNaivgation = () => {
    navigation.navigate('Quick_Meal_Repository_Screen');
  };
  return (
    <EntryPointCard
      label="Quick Meals"
      description="Gather your favorite ingredients and create a meal plan!"
      onPress={handleNaivgation}
      tail={<ChefIcon width={128} height={128} />}
    />
  );
};
