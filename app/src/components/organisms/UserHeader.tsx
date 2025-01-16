import {Image} from 'react-native';
import {Row} from '../elements/Row';
import {useUserAuthentication} from '../../store/authentication';
import {FC, Fragment, useState} from 'react';
import {CustomIcon} from '../elements/CustomIcon';
import {AppBorderRadius, AppColors, AppSpace} from '../../constants/values';
import {useAppNavigation} from '../../types/navigation';
import {Modal} from '../wrappers/ModalWrapper';
import {UserModal} from '../wrappers/UserModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomText} from '../elements/CustomText';
import {ProgressBar} from '../elements/ProgressBar';
import {Column} from '../elements/Column';
import {getMealName, getMealType, getMealTypeIcon} from '../../libs/meal';
import {MealTypeIcon} from '../../screens/IndivudualProductScreen/components/MealTypeIcon';

export const UserHeader = () => {
  return (
    <Row className="w-full h-[10vh] py-4 justify-between items-center">
      <UserSection />
      <Row gap="2xs">
        <SearchIcon />
        <ScanIcon />
      </Row>
    </Row>
  );
};

const UserSection: FC = () => {
  const {user} = useUserAuthentication();
  return (
    <Row gap="2xs">
      <Row
        className="p-1"
        backgroundColor="gray200"
        bgOpacity="99"
        style={{borderRadius: AppBorderRadius.normal}}>
        <UserIcon />
      </Row>
      {user && (
        <Column className="items-start">
          <CustomText font="wotfardMedium">{user.displayName}</CustomText>
          <CustomText font="wotfardRegular" size="sm" color="gray">
            {getMealTypeIcon(getMealType())} {getMealName()}
          </CustomText>
        </Column>
      )}
    </Row>
  );
};

const SearchIcon: FC = () => {
  const navigation = useAppNavigation();
  const handleNavigation = () => {
    navigation.navigate('Search_Product_Screen');
  };
  return (
    <Row
      onPress={handleNavigation}
      backgroundColor="gray200"
      bgOpacity="99"
      className="p-1"
      style={{borderRadius: AppBorderRadius.normal}}>
      <CustomIcon icon="search" size="md" color="gray" />
    </Row>
  );
};

const ScanIcon: FC = () => {
  const navigation = useAppNavigation();
  const handleNavigation = () => {
    navigation.navigate('Scanner_Screen');
  };
  return (
    <Row
      onPress={handleNavigation}
      bgOpacity="99"
      backgroundColor="gray200"
      className="p-1"
      style={{borderRadius: AppBorderRadius.normal}}>
      <CustomIcon icon="qr-code-2" size="md" color="gray" />
    </Row>
  );
};

const UserIcon: FC = () => {
  const {user, signInWithGoogle} = useUserAuthentication();
  const [isVisible, setIsVisible] = useState(false);
  const handlePress = () => {
    setIsVisible(prev => !prev);
  };
  const handleLogin = () => {
    signInWithGoogle();
  };
  const size = AppSpace.md * 1.25;
  if (user && user.photoURL) {
    return (
      <Fragment>
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={{
              width: size,
              height: size,
              borderRadius: AppBorderRadius.normal,
            }}
            source={{uri: user.photoURL}}
          />
        </TouchableOpacity>
        <Modal
          title="Your Settings"
          onClose={handlePress}
          isVisible={isVisible}>
          <UserModal />
        </Modal>
      </Fragment>
    );
  }
  return (
    <CustomIcon onPress={handleLogin} icon="person" size="md" color="gray" />
  );
};
