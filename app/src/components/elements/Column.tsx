import React, {FC} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {AppColors, AppSpace} from '../../constants/values';
import {BoxProps} from '../../types/components';
import {shadowStyles} from './Row';

export const Column: FC<BoxProps> = ({
  gap = 'zero',
  backgroundColor = 'transparent',
  children,
  shadow,
  onPress,
  onLongPress,
  bgOpacity = 'FF',
  animation,
  style: extraStyles,
  clickAnimation = false,
}) => {
  const basicStyles: ViewStyle[] = [
    {
      display: 'flex',
      flexDirection: 'column',
    },
  ];
  const styles: ViewStyle[] = [
    {
      gap: AppSpace[gap],
      backgroundColor:
        AppColors[backgroundColor] +
        (AppColors[backgroundColor] === 'transparent' ? '' : bgOpacity),
      ...shadowStyles[shadow ?? 'undefined'],
    },
    ...basicStyles,
    extraStyles as ViewStyle,
  ];

  if (onPress && animation) {
    return (
      <Animated.View {...animation} style={[styles]}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={clickAnimation ? 0.8 : 1}
          style={[basicStyles]}>
          <>{children}</>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={clickAnimation ? 0.8 : 1}
        style={styles}>
        <>{children}</>
      </TouchableOpacity>
    );
  }
  if (animation) {
    return (
      <Animated.View {...animation} style={[styles]}>
        {children}
      </Animated.View>
    );
  }
  return <View style={styles}>{children}</View>;
};
