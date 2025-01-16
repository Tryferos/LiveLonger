import React from 'react';
import {BottomScreenButton} from '../../../components/organisms/BottomScreenButton';
import {useAppNavigation} from '../../../types/navigation';

export const QuickMealAddButton = () => {
  const navigation = useAppNavigation();
  const handlePress = () => {
    navigation.navigate('Quick_Meal_Create_Screen');
  };
  return (
    <BottomScreenButton
      text="Create a new quick meal"
      color="mainLight"
      onPress={handlePress}
    />
  );
};
