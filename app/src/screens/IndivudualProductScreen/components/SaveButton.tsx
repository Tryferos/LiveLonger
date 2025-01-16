import React, {FC} from 'react';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {AppColors} from '../../../constants/values';

type SaveButtonProps = {
  onSave: () => void;
};

export const SaveButton: FC<SaveButtonProps> = ({onSave}) => {
  return (
    <RoundButton
      style={{
        backgroundColor: AppColors.main + '22',
      }}
      textColor="main"
      onPress={onSave}
      text="Apply to Nutrition"
      icon="send"
    />
  );
};
