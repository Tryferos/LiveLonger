import React, {FC, ReactElement} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {AppBorderRadius, AppColors, ColorsType} from '../../constants/values';
import {Column} from '../elements/Column';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';

type Props = {
  onPress: () => void;
  label: string;
  description: string;
  height?: number;
  tail: ReactElement;
  color?: ColorsType;
};

export const EntryPointCard: FC<Props> = ({
  description,
  label,
  onPress,
  tail,
  height = 100,
  color = 'green',
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={[
          AppColors[color],
          AppColors[color] + 'dd',
          AppColors[color] + 'cc',
          AppColors[color] + 'bb',
          AppColors[color] + 'aa',
          AppColors[color] + '99',
          AppColors[color] + '88',
        ]}
        className="px-5 relative"
        style={{
          overflow: 'visible',
          height: height,
          display: 'flex',
          flex: 1,
          borderRadius: AppBorderRadius.normal,
        }}>
        <Column className="w-[70%] justify-evenly h-full">
          <CustomText font="wotfardMedium" size="lg" color="white">
            {label}
          </CustomText>
          <CustomText font="wotfardRegular" size="sm" color="white">
            {description}
          </CustomText>
        </Column>
        <Row className="absolute right-3 h-full items-center">{tail}</Row>
      </LinearGradient>
    </TouchableOpacity>
  );
};
