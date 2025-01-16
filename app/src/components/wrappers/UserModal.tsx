import React, {FC} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ColorsType} from '../../constants/values';
import {useUserAuthentication} from '../../store/authentication';
import {useNutritionPresets} from '../../store/nutrition_presets';
import {getLanguageName, useUserSettings} from '../../store/settings';
import {AppIconsType} from '../../types/icons';
import {useAppNavigation} from '../../types/navigation';
import {Column} from '../elements/Column';
import {CustomIcon} from '../elements/CustomIcon';
import {CustomText} from '../elements/CustomText';
import {Divider} from '../elements/Divider';
import {Row} from '../elements/Row';

export const UserModal = () => {
  const {signOut} = useUserAuthentication();
  const {presets} = useNutritionPresets();
  const {language, theme, setTheme, setLanguage} = useUserSettings();
  const navigation = useAppNavigation();
  const themeIcon: AppIconsType =
    theme === 'light' ? 'light-mode' : 'dark-mode';
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const navigateToIntriduction = () => {
    navigation.navigate('Introduction_Screen', {
      isEditing: true,
    });
  };
  return (
    <ScrollView className="h-[240px]" showsVerticalScrollIndicator={false}>
      <Column className="py-2">
        <UserModalButton icon={themeIcon} title="Theme" onPress={changeTheme} />
        <UserModalButton
          icon="language"
          title={getLanguageName()}
          onPress={() => {}}
        />
        <UserModalButton
          icon="edit"
          title={`Calory intake ${presets?.daily_calories ?? 0} kcal`}
          iconColor="black"
          onPress={navigateToIntriduction}
        />
        <Divider />
        <UserModalButton
          icon="privacy-tip"
          title={'Data & Privacy'}
          iconColor="main"
          onPress={() => {}}
        />

        <Divider />
        <UserModalButton
          icon="logout"
          title="Logout"
          iconColor="error"
          onPress={signOut}
        />
      </Column>
    </ScrollView>
  );
};
type UserModalButtonProps = {
  onPress: () => void;
  title: string;
  icon: AppIconsType;
  iconColor?: ColorsType;
};
const UserModalButton: FC<UserModalButtonProps> = ({
  onPress,
  title,
  icon,
  iconColor = 'black',
}) => {
  return (
    <Row onPress={onPress} className="px-2 py-2 justify-between items-center">
      <CustomText font="wotfardRegular" size="lg">
        {title}
      </CustomText>
      <CustomIcon icon={icon} size="md" color={iconColor} />
    </Row>
  );
};
