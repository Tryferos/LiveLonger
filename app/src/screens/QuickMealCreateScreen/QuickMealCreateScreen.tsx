import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Column} from '../../components/elements/Column';
import {CustomInput} from '../../components/elements/CustomInput';
import {Row} from '../../components/elements/Row';
import {RoundButton} from '../../components/organisms/RoundButton';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {AppSpace} from '../../constants/values';
import {getMealType} from '../../libs/meal';
import {saveQuickMeal} from '../../network/quick_meals';
import {useAlerts} from '../../store/alerts';
import {useSearchProducts} from '../../store/search_products';
import {useAppNavigation, useAppRouteParams} from '../../types/navigation';
import {MealType, Product, QuickMeal} from '../../types/nutrition';
import {QuickMealImage} from './components/QuickMealImage';
import {QuickMealProductPicker} from './components/QuickMealProductPicker';
import {QuickMealTypePicker} from './components/QuickMealTypePicker';

type ImageData = {
  uri: string;
  imageData: Uint8Array;
};

export const QuickMealCreateScreen = () => {
  const {quickMeal} = useAppRouteParams<'Quick_Meal_Create_Screen'>();
  const [mealName, setMealName] = useState(quickMeal?.name ?? '');
  const [fetchedAll, setFetchedAll] = useState(false);
  const [selectedType, setSelectedType] = useState<MealType>(
    quickMeal?.type ?? getMealType(),
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    quickMeal?.imageUrl,
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [image, setImage] = useState<ImageData | null>(null);
  const {showAlert} = useAlerts();
  const [step, setStep] = useState(0);
  const navigation = useAppNavigation();
  const {clear, selectedProducts, selectProduct} = useSearchProducts();
  const totalSteps = 2;
  useFocusEffect(
    useCallback(() => {
      //* This case is for when the user is editing a quick meal
      if (
        products.length === 0 &&
        quickMeal &&
        quickMeal.products &&
        quickMeal.products.length > 0
      ) {
        quickMeal.products.forEach(product => {
          selectProduct(product, false);
        });
      }
      setStep(0);
    }, []),
  );

  const nextStep = async () => {
    if (step === totalSteps - 1) {
      await onSave();
    } else {
      setStep(prev => prev + 1);
    }
  };
  const previousStep = () => {
    setStep(prev => prev - 1);
  };

  const onSave = async () => {
    const payload: QuickMeal = {
      _id: quickMeal?._id,
      imageData: Array.from(image?.imageData ?? []),
      imageUrl: (image?.imageData ? undefined : imageUrl) ?? undefined,
      date: new Date(),
      name: mealName,
      type: selectedType as MealType,
      products: selectedProducts,
    };
    const res = await saveQuickMeal(payload);
    if (res) {
      clear();
      setImage(null);
      setMealName('');
      setSelectedType(getMealType());
      navigation.navigate('Quick_Meal_Repository_Screen');
    } else {
      showAlert({
        alert: 'Error',
        data: {message: 'Something went wrong... Please try again.'},
      });
    }
  };

  const clearImage = () => {
    setImage(null);
    setImageUrl(undefined);
  };

  const handleOnBack = () => {
    if (step === 0) {
      clear();
      navigation.goBack();
    } else {
      previousStep();
    }
  };
  const canSave =
    selectedProducts.length > 0 &&
    mealName.length > 3 &&
    step === 1 &&
    (image || imageUrl);

  return (
    <ScreenWrapper
      trailingIcon="search"
      onBack={handleOnBack}
      style={{width: '100%'}}
      scrollView={false}
      onTrailIconPress={() => {
        setStep(0);
        navigation.navigate('Search_Product_Screen', {
          selectedProducts: selectedProducts,
        });
      }}
      basisBottom={8}
      bottomChildren={
        <Row gap="xs" className="w-full">
          {step > 0 && (
            <RoundButton
              paddingVertical="2xs"
              icon="arrow-back-ios-new"
              style={{flex: 1, flexDirection: 'row-reverse'}}
              text={'Previous'}
              onPress={previousStep}
            />
          )}
          <RoundButton
            paddingVertical="2xs"
            style={{flex: 1}}
            icon={step === totalSteps - 1 ? undefined : 'arrow-forward-ios'}
            text={step === totalSteps - 1 ? 'Done' : 'Continue to inventory'}
            onPress={nextStep}
            disabled={step === 0 ? false : !canSave}
          />
        </Row>
      }>
      <KeyboardAvoidingView
        style={{flex: 1, gap: AppSpace.md}}
        behavior="height">
        <Column gap="xs">
          {step === 0 ? (
            <>
              <QuickMealImage
                clearImage={clearImage}
                imageUrl={imageUrl}
                imageData={image}
                setImageData={setImage}
              />
              <CustomInput
                fontSize="md"
                icon="person"
                onChangeText={text => setMealName(text)}
                placeholder={'How will you call your meal?'}
                value={mealName}
              />
              <QuickMealTypePicker
                selectedType={selectedType}
                onChangeType={setSelectedType}
              />
            </>
          ) : (
            <QuickMealProductPicker
              fetchedAll={fetchedAll}
              setFetchedAll={setFetchedAll}
              setStep={setStep}
              products={products}
              setProducts={setProducts}
            />
          )}
        </Column>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
