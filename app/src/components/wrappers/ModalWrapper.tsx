import React, {FC} from 'react';
import {Dimensions, Platform, View, ViewStyle} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Column} from '../elements/Column';
import {CustomIcon} from '../elements/CustomIcon';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  backdrop?: boolean;
  style?: ViewStyle;
} & ModalHeaderProps;

export const Modal: FC<ModalProps> = ({
  children,
  isVisible,
  onClose,
  title,
  showCloseIcon = true,
  backdrop,
  style,
}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT',
        );

  return (
    <ReactNativeModal
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      isVisible={isVisible}
      className="bg-white absolute bottom-0 left-0 m-0 w-[100vw] rounded-t-3xl"
      hasBackdrop={backdrop}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <Column
        style={{flex: 1, ...style}}
        className="min-h-[120px] px-2 pb-2 pt-4 w-[100%]">
        {showCloseIcon && <ModalHeader title={title} onClose={onClose} />}
        {children}
      </Column>
    </ReactNativeModal>
  );
};

type ModalHeaderProps = {
  title: string;
  showCloseIcon?: boolean;
};

const ModalHeader: FC<ModalHeaderProps & Pick<ModalProps, 'onClose'>> = ({
  title,
  onClose,
}) => {
  return (
    <Row className="items-center justify-between border-divider mb-5">
      <View className="w-[24px]" />
      <CustomText font="wotfardMedium" className="text-center" size={'lg'}>
        {title}
      </CustomText>
      <CustomIcon
        icon="close"
        size="md"
        color="black"
        onPress={onClose}
        style={{marginRight: 10}}
      />
    </Row>
  );
};
