import {FC} from 'react';
import {Row} from '../elements/Row';
import {Column} from '../elements/Column';
import {CustomText} from '../elements/CustomText';
import {AppBorderRadius, AppColors} from '../../constants/values';
import {ViewStyle} from 'react-native';
import {CustomIcon} from '../elements/CustomIcon';
import {AppIconsType} from '../../types/icons';

type MiniCardProps = {
  label: string;
  value: string;
  icon: string;
  trailingText?: string;
  styles?: ViewStyle;
  onPress?: () => void;
};

export const MiniCard: FC<MiniCardProps> = ({
  label,
  value,
  icon,
  trailingText,
  onPress,
  styles = {},
}) => {
  return (
    <Row
      onPress={onPress}
      style={{borderRadius: AppBorderRadius.rounded, ...styles}}
      className="bg-slate-100 border-[1px] border-gray-200 p-1 pr-3 items-end justify-between">
      <Row gap="2xs" style={{flex: 1}}>
        <CustomText
          style={{borderRadius: AppBorderRadius.rounded}}
          className="p-2 bg-orange-100"
          size="2xl">
          {icon}
        </CustomText>
        <Column className="justify-between py-[6px]">
          <CustomText
            style={{flex: 1}}
            className="w-[100%]"
            ellipsizeMode="head"
            numberOfLines={1}>
            {label}
          </CustomText>
          <CustomText
            font="wotfardRegular"
            color="gray"
            size="xs">{`${value}`}</CustomText>
        </Column>
      </Row>
      {trailingText && (
        <CustomText
          className="pb-[6px]"
          color="gray"
          size="xs">{`${trailingText}`}</CustomText>
      )}
    </Row>
  );
};
