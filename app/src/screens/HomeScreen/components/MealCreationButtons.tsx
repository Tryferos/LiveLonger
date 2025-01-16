import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {EntryPointCard} from '../../../components/organisms/EntryPointCard';
import {AppBorderRadius} from '../../../constants/values';
import {BarcodeIcon} from '../../../svgs/barcode';
import {SearchIcon} from '../../../svgs/search';
import {AppIconsType} from '../../../types/icons';
import {useAppNavigation} from '../../../types/navigation';

export const MealCreationButtons: FC = () => {
  const navigation = useAppNavigation();
  const navigateToScannerScreen = () => {
    navigation.navigate('Scanner_Screen');
  };
  const navigateToSearchScreen = () => {
    navigation.navigate('Search_Product_Screen');
  };
  return (
    <Column gap="xs" className="w-[100%]">
      <EntryPointCard
        color="main"
        onPress={navigateToScannerScreen}
        height={100}
        label="Barcode Scanner"
        description="Scan a product barcode and add it to your nutrition."
        tail={<BarcodeIcon width={110} height={130} />}
      />
      <EntryPointCard
        color="main"
        onPress={navigateToSearchScreen}
        height={100}
        label="Query Products"
        description="Describe your meal in a few words."
        tail={<SearchIcon width={120} height={130} />}
      />
      {/* //! Deprecated */}
      {/* <CustomButton
        icon="qr-code-2"
        text={'Scan a product barcode.'}
        onPress={navigateToScannerScreen}
        leadingIcon="arrow-forward-ios"
      />
      <CustomButton
        icon="search"
        text={'Describe your meal in a few words.'}
        onPress={navigateToSearchScreen}
        leadingIcon="arrow-forward-ios"
      /> */}
    </Column>
  );
};

type ButtonProps = {
  onPress: () => void;
  text: string;
  icon: AppIconsType;
  leadingIcon?: AppIconsType;
};

export const CustomButton: FC<ButtonProps> = ({
  icon,
  onPress,
  text,
  leadingIcon,
}) => {
  return (
    <Row
      onPress={onPress}
      shadow="shadowBottom"
      className="justify-between items-center w-full relative"
      backgroundColor="main"
      bgOpacity="ee"
      style={{borderRadius: AppBorderRadius.normal, flex: 1}}>
      <Row className="px-4 py-4 justify-between items-center w-full">
        {icon ? <CustomIcon color="white" size="lg" icon={icon} /> : <Row />}
        <CustomText
          className="max-w-[70%] flex-wrap text-center"
          color="white"
          size="sm"
          font="wotfardMedium">
          {text}
        </CustomText>
        {leadingIcon ? (
          <CustomIcon size="sm" icon="arrow-forward-ios" color="white" />
        ) : (
          <Row />
        )}
      </Row>
    </Row>
  );
};
