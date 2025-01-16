import React, {FC} from 'react';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {useAppRouteParams} from '../../../types/navigation';

type SaveButtonProps = {
  onSave: () => void;
};

export const SaveButton: FC<SaveButtonProps> = ({onSave}) => {
  const {addToQuickMeal} = useAppRouteParams<'Scanner_Screen'>();
  return (
    <RoundButton
      onPress={onSave}
      text={
        addToQuickMeal
          ? 'Apply to your Quick Meal'
          : 'Apply to your daily Nutrition'
      }
    />
  );
};
