import React, {FC} from 'react';
import {TextStyle} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIconsTypes from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import MaterialIconsTypes from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import {
  AppColors,
  AppIconSize,
  ColorsType,
  IconSizeType,
} from '../../constants/values';
import {AppIconsType} from '../../types/icons';

type CustomIconProps = {
  icon: AppIconsType;
  prefers?: 'material' | 'fontAwesome';
  color?: ColorsType;
  colorOpacity?: string; //IN HEX
  size?: IconSizeType;
  onPress?: () => void;
  style?: Omit<TextStyle, 'width' | 'height'>;
};

export const CustomIcon: FC<CustomIconProps> = ({
  icon,
  size = 'md',
  color = 'black',
  colorOpacity = 'FF',
  prefers = 'material',
  onPress,
  style,
}) => {
  const iconProps = {
    name: icon,
    size: AppIconSize[size],
    color: AppColors[color] + colorOpacity,
    onPress: onPress,
    style: style,
  };
  if (prefers === 'material' && MaterialIconsTypes[icon as IconType]) {
    return <MaterialIcons {...iconProps} />;
  }
  if (FontAwesomeIconsTypes[icon as IconType]) {
    return <FontAwesome {...iconProps} />;
  }
  return null;
};

type IconType = keyof typeof MaterialIconsTypes &
  keyof typeof FontAwesomeIconsTypes;
