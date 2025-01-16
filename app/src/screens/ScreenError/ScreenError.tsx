import React from 'react';
import {Column} from '../../components/elements/Column';
import {CustomIcon} from '../../components/elements/CustomIcon';
import {CustomText} from '../../components/elements/CustomText';
import {RoundButton} from '../../components/organisms/RoundButton';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {useAppNavigation, useAppRouteParams} from '../../types/navigation';

export const ScreenError = () => {
  const {reason} = useAppRouteParams<'Screen_Error'>();
  const navigation = useAppNavigation();
  const onProceed = () => {
    navigation.navigate('Main_Home');
  };
  return (
    <ScreenWrapper
      style={{width: '100%'}}
      bottomChildren={
        <RoundButton onPress={onProceed} text={'Go to Home'} icon="home" />
      }
      scrollView={false}
      canGoBack={false}
      title="">
      <Column className="justify-between w-[100%] items-center">
        <Column gap="xl" className="items-center mt-8">
          <CustomIcon size="xl" color="error" icon={'error'} />
          <Column gap="3xs" className="items-center">
            <CustomText
              className="text-center"
              size="lg"
              font="wotfardMedium"
              color="error">
              {'Screen could not load unfortunately.'}
            </CustomText>
            <CustomText className="text-center" size="lg" color="error">
              {reason}
            </CustomText>
          </Column>
        </Column>
      </Column>
    </ScreenWrapper>
  );
};
