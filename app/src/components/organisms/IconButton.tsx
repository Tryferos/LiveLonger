import React, {FC} from 'react';
import {
  AppBorderRadius,
  ColorsType,
  IconSizeType,
} from '../../constants/values';
import {AppIconsType} from '../../types/icons';
import {CustomIcon} from '../elements/CustomIcon';
import {Row} from '../elements/Row';

type Props = {
  icon: AppIconsType;
  color: ColorsType;
  iconColor?: ColorsType;
  iconSize?: IconSizeType;
  onPress?: () => void;
};

export const IconButton: FC<Props> = ({
  icon,
  color,
  iconColor = 'white',
  iconSize = 'md',
  onPress,
}) => {
  return (
    <Row
      className="px-4 py-3"
      style={{borderRadius: AppBorderRadius.rounded}}
      backgroundColor={color}
      onPress={onPress}>
      <CustomIcon icon={icon} color={iconColor} size={iconSize} />
    </Row>
  );
};
