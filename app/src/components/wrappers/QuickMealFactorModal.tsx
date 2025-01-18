import Slider from '@react-native-community/slider';
import {useMemo, useState} from 'react';
import {AppColors, AppSpace} from '../../constants/values';
import {getMealType} from '../../libs/meal';
import {saveQuickMealNutrition} from '../../network/nutrition';
import {useAlerts} from '../../store/alerts';
import {useAppNavigation} from '../../types/navigation';
import {Column} from '../elements/Column';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';
import {RoundButton} from '../organisms/RoundButton';

type Props = {
  onClose: () => void;
  _id?: string;
};

export const QuickMealFactorModal = ({onClose, _id}: Props) => {
  const [factor, setFactor] = useState(0);
  const {showAlertPromise} = useAlerts();
  const navigation = useAppNavigation();
  const factorLabel = useMemo(() => {
    if (factor === 0) {
      return 'None';
    } else if (factor < 0.15) {
      return 'A Few Bites';
    } else if (factor < 0.4) {
      return 'A Small Portion';
    } else if (factor < 0.5) {
      return 'Less Than Half';
    } else if (factor === 0.5) {
      return 'Exactly Half';
    } else if (factor < 0.7) {
      return 'More Than Half';
    } else if (factor < 0.85) {
      return 'A Large Portion';
    } else if (factor < 1) {
      return 'A Few Bites Left';
    } else {
      return 'All of it';
    }
  }, [factor]);

  const handleSave = async () => {
    onClose();
    if (_id) {
      const meal = await showAlertPromise({
        promise: saveQuickMealNutrition({
          quickMealId: _id,
          quantity_factor: factor,
          type: getMealType(),
        }),
        promiseData: {
          message: 'Adding to nutrition...',
        },
        errorData: {
          message: 'An Error occured. Failed to add your meal',
        },
        successData: data => {
          navigation.navigate('Daily_Analysis_Screen', {
            fromAddType: 'INDIVIDUAL_QUERIED',
          });
          return {
            message: data
              ? 'Your meal has been added to nutrition'
              : 'Failed to add your meal to nutrition',
          };
        },
      });
    }
  };

  return (
    <Column
      gap="sm"
      style={{
        padding: AppSpace.sm,
      }}
      className="w-full items-center">
      <CustomText className="text-center">
        {'How much did you consume?'}
      </CustomText>
      <Column className="items-center  w-full" gap="2xs">
        <Slider
          style={{width: '100%', height: '15%'}}
          value={factor}
          onValueChange={value => setFactor(value)}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          minimumTrackTintColor={AppColors.gray}
          maximumTrackTintColor={AppColors.gray}
          thumbTintColor={AppColors.main}
        />
        <Row gap="2xs" className="items-center">
          <CustomText font="wotfardMedium">{factorLabel}</CustomText>
          <CustomText font="wotfardRegular" size="sm" color="gray">
            ({(factor * 100).toFixed(0)}%)
          </CustomText>
        </Row>
      </Column>
      <RoundButton
        text="Apply & Save"
        disabled={factor === 0}
        onPress={handleSave}
      />
    </Column>
  );
};
