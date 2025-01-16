import React from 'react';
import {useNetWorkInfo} from '../../store/netinfo';
import {Column} from '../elements/Column';
import {CustomIcon} from '../elements/CustomIcon';
import {CustomText} from '../elements/CustomText';
import {RoundButton} from '../organisms/RoundButton';
export const NoConnectionModalBody = () => {
  const {isConnected, checkConnection} = useNetWorkInfo();
  const onCheck = () => {
    checkConnection();
  };
  return (
    <Column
      gap="lg"
      className="w-full h-full py-[7.5vh] px-4 items-center justify-between"
      backgroundColor="mainLight">
      <Column className="items-center" gap="md">
        <CustomIcon icon="wifi-off" size="2xl" color="white" />
        <CustomText color="white" className="items-center text-center">
          {
            'Please turn on your internet connectivity to use all the app features'
          }
        </CustomText>
      </Column>
      <RoundButton
        clickAnimation={true}
        text="Check Connection"
        onPress={onCheck}
      />
    </Column>
  );
};
