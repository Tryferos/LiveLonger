import React, {FC, PropsWithChildren} from 'react';
import {AppBorderRadius, ColorsType} from '../../constants/values';
import {AppIconsType} from '../../types/icons';
import {CustomIcon} from '../elements/CustomIcon';
import {Row} from '../elements/Row';

type Props = {
  icon?: AppIconsType;
  iconColor?: ColorsType;
  onPress?: () => void;
  bgOpacity?: string;
} & PropsWithChildren;
export const InfoCard: FC<Props> = ({
  icon = 'info',
  onPress,
  children,
  iconColor = 'mainLight',
  bgOpacity = 'FF',
}) => {
  return (
    <Row
      onPress={onPress}
      className="px-4 py-3 w-full items-center"
      gap="xs"
      backgroundColor="white"
      bgOpacity={bgOpacity}
      style={{borderRadius: AppBorderRadius.normal}}>
      <CustomIcon icon={icon} color={iconColor} />
      {children}
    </Row>
  );
};
