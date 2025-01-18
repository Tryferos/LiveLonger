import React, {useState} from 'react';
import {Row} from '../../../components/elements/Row';
import {IconButton} from '../../../components/organisms/IconButton';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {QuickMealFactorModal} from '../../../components/wrappers/QuickMealFactorModal';
import {deleteQuickMeal} from '../../../network/quick_meals';
import {useAlerts} from '../../../store/alerts';
import {useSearchProducts} from '../../../store/search_products';
import {useAppNavigation, useAppRouteParams} from '../../../types/navigation';
export const QuickMealDetailsButtons = () => {
  const params = useAppRouteParams<'Quick_Meal_Details_Screen'>();
  const {showAlertPromise} = useAlerts();
  const {setProducts} = useSearchProducts();
  const [showQuantityPickerModal, setShowQuantityPickerModal] = useState(false);
  const navigation = useAppNavigation();

  const onDelete = async () => {
    const deleted = await showAlertPromise({
      promise: deleteQuickMeal({_id: params._id}),
      promiseData: {
        message: 'Deleting your meal...',
      },
      errorData: {
        message: 'An Error occured. Failed to delete your meal',
      },
      successData: data => {
        return {
          message: data
            ? 'Your meal has been deleted'
            : 'Failed to delete your meail',
        };
      },
    });
    if (deleted) {
      navigation.goBack();
    }
  };
  return (
    <>
      <Row gap="3xs">
        <IconButton onPress={onDelete} color="error" icon="delete" />
        <RoundButton
          onPress={() => {
            setProducts([]);
            if (params) {
              navigation.navigate('Quick_Meal_Create_Screen', {
                quickMeal: {...params},
              });
            }
          }}
          style={{flex: 1}}
          text="Adjust the recipe"
          icon="edit"
        />
        <IconButton
          onPress={() => setShowQuantityPickerModal(true)}
          color="success"
          icon="add"
        />
      </Row>
      <Modal
        isVisible={showQuantityPickerModal}
        title="Add Quick Meal"
        onClose={() => setShowQuantityPickerModal(false)}>
        <QuickMealFactorModal
          _id={params._id}
          onClose={() => setShowQuantityPickerModal(false)}
        />
      </Modal>
    </>
  );
};
