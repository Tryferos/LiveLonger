import {FC} from 'react';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Row} from '../elements/Row';
import {CustomText} from '../elements/CustomText';
import {AppSpace, ColorsType, SpaceType} from '../../constants/values';
import {Column} from '../elements/Column';
import {AppIconsType} from '../../types/icons';
import {CustomIcon} from '../elements/CustomIcon';
import {Spacer} from '../elements/Spacer';

type RoundButtonProps = {
  onPress?: () => void;
  text: string;
  style?: ViewStyle;
  textColor?: ColorsType;
  disabled?: boolean;
  icon?: AppIconsType;
  clickAnimation?: boolean;
  paddingVertical?: SpaceType;
};

export const RoundButton: FC<RoundButtonProps> = ({
  onPress,
  text,
  style,
  textColor,
  icon,
  disabled = false,
  clickAnimation = true,
  paddingVertical = 'xs',
}) => {
  return (
    <Row
      onPress={disabled ? undefined : onPress}
      clickAnimation={clickAnimation}
      style={{
        opacity: disabled ? 0.5 : 1,
        width: '100%',
        justifyContent: icon ? 'space-between' : 'center',
        paddingVertical: AppSpace[paddingVertical],
        ...style,
      }}
      className="px-6 rounded-xl justify-center items-center"
      backgroundColor="main">
      {icon && <Row />}
      <CustomText
        className="text-center"
        color={textColor ?? 'white'}
        font="wotfardMedium"
        size="md">
        {text}
      </CustomText>
      {icon && (
        <CustomIcon icon={icon} size="xs" color={textColor ?? 'white'} />
      )}
    </Row>
  );
};
