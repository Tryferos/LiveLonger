import React from 'react';
import {Row} from '../../../components/elements/Row';
import {IconButton} from '../../../components/organisms/IconButton';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {deleteMealItem} from '../../../network/meals';
import {useAlerts} from '../../../store/alerts';
import {useAppNavigation, useAppRouteParams} from '../../../types/navigation';

export const ProductButtons = () => {
  const navigation = useAppNavigation();
  const {showAlertPromise} = useAlerts();
  const {_id, name, quickMealId} =
    useAppRouteParams<'Meal_Product_Info_Screen'>();
  const handleDelete = async () => {
    if (_id) {
      const deleted = await showAlertPromise({
        promise: deleteMealItem({_id: _id, quickMealId: quickMealId}),
        promiseData: {
          message: `Deleting ${name}...`,
        },
        successData: {
          message: `Cleared ${name} from list.`,
        },
        errorData: {message: 'Oops, something went wrong. Please try again.'},
      });
      if (deleted) {
        handleBack();
      }
    }
  };
  const handleBack = () => {
    if (quickMealId) {
      navigation.goBack();
    }
    navigation.goBack();
  };
  return (
    <Row className="w-full" gap="2xs">
      <IconButton color="error" icon="delete" onPress={handleDelete} />
      <RoundButton
        style={{flex: 1}}
        text="View more items"
        onPress={handleBack}
      />
    </Row>
  );
};
