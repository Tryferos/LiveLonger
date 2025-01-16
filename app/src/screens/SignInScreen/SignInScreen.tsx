import {FC} from 'react';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {Row} from '../../components/elements/Row';
import {Column} from '../../components/elements/Column';
import {CustomText} from '../../components/elements/CustomText';
import {RoundButton} from '../../components/organisms/RoundButton';
import {useUserAuthentication} from '../../store/authentication';
import {EmptyIcon} from '../../svgs/empty';
import {useAppNavigation} from '../../types/navigation';
import {AppSpace} from '../../constants/values';
import {CustomIcon} from '../../components/elements/CustomIcon';
import {Spacer} from '../../components/elements/Spacer';

export const SignInScreen: FC = () => {
  const navigation = useAppNavigation();
  const {signInWithGoogle, user} = useUserAuthentication();
  if (user) {
    navigation.navigate('Main_Home');
  }
  return (
    <ScreenWrapper
      scrollView={false}
      basisBottom={12}
      bottomChildren={
        <Column gap="3xs" className="w-full">
          <CustomText color="error" size="xs">
            {'Please sign in to use all the app features'}
          </CustomText>
          <RoundButton onPress={signInWithGoogle} text={'Sign In'} />
        </Column>
      }
      title="">
      <Column gap="md" className="items-center flex-1 justify-between">
        <CustomText font="wotfardMedium" size="xl">
          {'Welcome to LiveLonger'}
        </CustomText>
        <Spacer />
        <Row className="h-[40vh]">
          <EmptyIcon height={'100%'} width={'100%'} />
        </Row>
        <Spacer />
      </Column>
    </ScreenWrapper>
  );
};
