import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Column} from '../../components/elements/Column';
import {CustomText} from '../../components/elements/CustomText';
import {Row} from '../../components/elements/Row';
import {InfoCard} from '../../components/organisms/InfoCard';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {saveNutrition} from '../../network/nutrition';
import {useAlerts} from '../../store/alerts';
import {useSearchProducts} from '../../store/search_products';
import {useAppNavigation} from '../../types/navigation';
import {Meal} from '../../types/nutrition';
import {MealTypeCard} from './components/MealTypeCard';
import {ProductsList} from './components/ProductsList';
import {SaveButton} from './components/SaveButton';
import {TotalNutrition} from './components/TotalNutrition';

export const IndividualProductScreen: FC = () => {
  const {selectedProducts} = useSearchProducts();
  const navigation = useAppNavigation();
  const {showAlertPromise} = useAlerts();

  useFocusEffect(
    useCallback(() => {
      if (selectedProducts.length === 0) {
        navigation.goBack();
      }
    }, [selectedProducts]),
  );
  const onSave = async () => {
    // const meal = await saveNutrition(selectedProducts);
    const meal = await showAlertPromise<Meal>({
      promise: saveNutrition(selectedProducts),
      promiseData: {message: 'Inserting meal to your daily nutrition...'},
      successData: {
        message: 'Your meal is now included in your daily nutrition',
      },
      errorData: {message: 'Oops, something went wrong. Please try again.'},
    });
    if (!meal) {
      return;
    }
    navigation.push('Daily_Analysis_Screen', {
      fromAddType: 'INDIVIDUAL_QUERIED',
    });
  };
  return (
    <ScreenWrapper
      bottomChildren={<SaveButton onSave={onSave} />}
      scrollView={false}
      title=""
      gap="xs"
      showBottomFoods>
      <MealTypeCard />
      <InfoCard
        bgOpacity="99"
        onPress={() => navigation.navigate('Quick_Meal_Create_Screen')}>
        <Row style={{justifyContent: 'center', flex: 1}}>
          <CustomText color="gray">
            {'Insert in Quick Meals inventory'}
          </CustomText>
        </Row>
      </InfoCard>
      <ScrollView
        nestedScrollEnabled
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <Column gap="md">
          <TotalNutrition />
          <ProductsList />
        </Column>
      </ScrollView>
    </ScreenWrapper>
  );
};
