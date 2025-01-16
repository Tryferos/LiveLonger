import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import {AppBorderRadius, AppColors, ColorsType} from '../../constants/values';

type ProgressBarProps = {
  progress: number;
  size?: number;
  height?: number;
  widthFactor?: number;
  color?: ColorsType;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  size = 40,
  height,
  widthFactor = 1,
  color = 'main',
}) => {
  return (
    <Progress.Bar
      animated
      progress={Math.min(1, progress)}
      borderColor={AppColors.transparent}
      color={AppColors[color]}
      height={height}
      borderRadius={AppBorderRadius.rounded}
      width={Dimensions.get('window').width * widthFactor}
      unfilledColor={AppColors.gray200}
    />
  );
};
