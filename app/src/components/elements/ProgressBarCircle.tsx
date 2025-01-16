import * as Progress from 'react-native-progress';
import {AppColors, ColorsType} from '../../constants/values';
import {FC} from 'react';
import App from '../../../App';

type ProgressBarProps = {
  progress: number;
  size?: number;
  unfilledColor?: ColorsType;
  thickness?: number;
};

export const ProgressBarCircle: FC<ProgressBarProps> = ({
  progress,
  size = 40,
  unfilledColor,
  thickness = 4,
}) => {
  return (
    <Progress.Circle
      animated
      progress={Math.min(1, progress)}
      size={size}
      thickness={thickness}
      borderColor={'transparent'}
      color={AppColors.main}
      unfilledColor={unfilledColor ?? AppColors.main + '33'}
    />
  );
};
