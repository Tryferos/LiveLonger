import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {AppSpace, ColorsType} from '../../constants/values';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';
type Props = {
  text?: string;
  onPress?: () => void;
  color: ColorsType;
};
export const BottomScreenButton: FC<Props> = ({
  text,
  color = 'mainLight',
  onPress,
}) => {
  return (
    <Row
      clickAnimation={true}
      onPress={onPress}
      backgroundColor={color}
      className="h-full pb-5 items-center justify-center"
      style={{
        marginHorizontal: -AppSpace.sm,
        width: Dimensions.get('screen').width,
      }}>
      <CustomText color="white" size="lg" font="wotfardMedium">
        {text}
      </CustomText>
    </Row>
  );
};
