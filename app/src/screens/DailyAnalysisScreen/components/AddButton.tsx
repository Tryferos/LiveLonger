import {FC} from 'react';
import {Row} from '../../../components/elements/Row';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {ScrollView} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {ProductType} from '../../../types/nutrition';
import {useAppNavigation} from '../../../types/navigation';

type AddButtonProps = {
  fromAddType: ProductType;
};

export const AddButton: FC<AddButtonProps> = ({fromAddType}) => {
  const navigator = useAppNavigation();
  const size = AppSpace['2xl'];
  const orderStyle =
    fromAddType === 'INDIVIDUAL_QUERIED' ? 'flex-col-reverse' : 'flex-col';
  const navigateToScanScreen = () => {
    navigator.navigate('Scanner_Screen');
  };

  const navigateToSearchScreen = () => {
    navigator.navigate('Search_Product_Screen');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      decelerationRate={0}
      snapToInterval={64}
      nestedScrollEnabled
      snapToAlignment={'start'}
      style={{maxHeight: size + 4, maxWidth: size}}>
      <Column gap="3xs" className={orderStyle}>
        <Row
          onPress={navigateToScanScreen}
          style={{borderRadius: AppBorderRadius.rounded}}
          backgroundColor="main"
          className="p-2">
          <CustomIcon size={'lg'} color="white" icon="qr-code-2" />
        </Row>
        <Row
          onPress={navigateToSearchScreen}
          style={{borderRadius: AppBorderRadius.rounded}}
          backgroundColor="main"
          className="p-2">
          <CustomIcon size={'lg'} color="white" icon="add" />
        </Row>
      </Column>
    </ScrollView>
  );
};
