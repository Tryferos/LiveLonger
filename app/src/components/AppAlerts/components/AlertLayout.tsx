import 'react-native-gesture-handler';
import {FC} from 'react';
import {AppBorderRadius, ColorsType} from '../../../constants/values';
import {AppIconsType} from '../../../types/icons';
import {Row} from '../../elements/Row';
import {CustomText} from '../../elements/CustomText';
import {CustomIcon} from '../../elements/CustomIcon';
import {useAlerts} from '../../../store/alerts';
import {ActivityIndicator} from 'react-native';
import {FadeInUp, FadeOutUp} from 'react-native-reanimated';

type AlertLayoutProps = {
  type?: 'Error' | 'Success' | 'Promise';
  icon?: AppIconsType;
  message: string;
};

export const AlertLayout: FC<AlertLayoutProps> = ({type, icon, message}) => {
  const color = type?.toLowerCase() as ColorsType;
  const alertIcon: AppIconsType =
    type === 'Error'
      ? 'error'
      : type === 'Success'
      ? 'check-circle'
      : 'spinner';
  const onPress = () => {
    useAlerts.getState().hideAlert();
  };
  return (
    <Row
      animation={{
        entering: FadeInUp.duration(250).stiffness(250).springify(),
        exiting: FadeOutUp.duration(250).stiffness(250).springify(),
      }}
      onPress={onPress}
      backgroundColor={color}
      style={{borderRadius: AppBorderRadius.normal, flex: 1}}
      className="items-center text-center justify-between absolute top-12 left-[5%] w-[90%] h-16 px-4 py-2"
      gap="md">
      <CustomText
        style={{flex: 1, textAlign: 'center'}}
        color="white"
        size="sm"
        font="wotfardRegular">
        {message}
      </CustomText>
      {type === 'Promise' ? (
        <ActivityIndicator color="white" size={24} />
      ) : (
        <CustomIcon icon={icon ?? alertIcon} size="md" color="white" />
      )}
    </Row>
  );
};
