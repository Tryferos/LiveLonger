import {FC, useEffect, useMemo, useState} from 'react';
import {ProgramType, UserPresets} from '../../../types/settings';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {useNutritionPresets} from '../../../store/nutrition_presets';
import {Row} from '../../../components/elements/Row';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {Dimensions} from 'react-native';
import {Spacer} from '../../../components/elements/Spacer';
import {FieldsSteps} from './FieldsSteps';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {QuantityPickerModalContent} from '../../../components/wrappers/QuantityPickerModal';
import {StepWrapper} from './StepWrapper';
import {GenderSelection} from './Steps/GenderSelection';
import {ActivityLevelSelection} from './Steps/ActivityLevelSelection';
import {QuantitySelection} from './Steps/QuantitySelection';
import {StepsTracker} from './StepsTracker';
import {ProgressBar} from '../../../components/elements/ProgressBar';
import {EmptyIcon} from '../../../svgs/empty';
import {GuideIcon} from '../../../svgs/guide';
import {AppSpace} from '../../../constants/values';
import {useAlerts} from '../../../store/alerts';
import {setNutritionPresets} from '../../../network/user';
import {useUserSettings} from '../../../store/settings';
import {
  getSelectedProgram,
  useSelectedProgram,
} from '../../../store/selected_program';
import {ProgramList} from '../../HomeScreen/components/ProgramList';
import {useAppNavigation} from '../../../types/navigation';

export const PresetsFields: FC = () => {
  const {setPresets: setNutritionPresets, presets: userPresets} =
    useNutritionPresets();
  const navigation = useAppNavigation();
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const {init} = useSelectedProgram();
  const [presets, setPresets] = useState<
    Partial<UserPresets & {program: ProgramType}>
  >({
    sex: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    activity_level: undefined,
  });
  useEffect(() => {
    setPresets({
      sex: userPresets?.sex ?? undefined,
      age: userPresets?.age ?? undefined,
      height: userPresets?.height ?? undefined,
      weight: userPresets?.weight ?? undefined,
      activity_level: userPresets?.activity_level ?? undefined,
    });
  }, [userPresets]);

  const titles: {[key in keyof typeof presets]: string} = {
    age: 'How old are you?',
    height: 'What is your current height?',
    weight: 'How much do you weight?',
    activity_level: 'How often do you exercise?',
    sex: 'What is your gender?',
    program: 'Choose a program to follow',
  };
  const [step, setStep] = useState<number>(0);

  const keys: (keyof typeof presets)[] = Object.keys(presets) as any;
  const totalSteps = keys.length;

  const size = Dimensions.get('window').width - AppSpace['xs'] * 2;

  const field = keys[Math.max(0, step - 1)];
  const value = presets[field];
  const title = titles[field];

  const onSelect = (value: number | string) => {
    setPresets(prev => ({...prev, [field]: value}));
  };

  const onCalculate = async () => {
    const res = await setNutritionPresets(presets);
    if (res) {
      setDailyCalories(res.daily_calories);
      useUserSettings.getState().setIntroduction(false);
      navigation.navigate('Main_Home');
    }
    await init();
  };

  const isValid = value !== undefined;

  return (
    <Column gap="xs" className="items-center justify-between w-full h-[55vh]">
      {step > 0 ? (
        <>
          <StepWrapper title={title ?? ''}>
            {field === 'sex' && (
              <GenderSelection
                selectedGender={presets.sex}
                onSelect={onSelect}
              />
            )}
            {field === 'activity_level' && (
              <ActivityLevelSelection
                activity_level={presets.activity_level}
                onSelect={onSelect}
              />
            )}
            {(field === 'age' || field === 'height' || field === 'weight') && (
              <QuantitySelection
                field={field}
                label={field === 'age' ? 'y' : field === 'height' ? 'cm' : 'kg'}
                value={presets[field]}
                onSelect={onSelect}
              />
            )}
          </StepWrapper>
          <FieldsSteps
            canContinue={isValid}
            onCalculate={onCalculate}
            setStep={setStep}
            step={step}
            totalSteps={totalSteps}
          />
        </>
      ) : (
        <>
          <Row />
          <GuideIcon width={size} height={size - AppSpace['lg']} />
          <RoundButton
            clickAnimation={true}
            text="Begin Calorie Calculation"
            icon="arrow-forward-ios"
            onPress={() => setStep(1)}
          />
        </>
      )}
      <StepsTracker
        dailyCalories={dailyCalories ?? undefined}
        step={Math.max(0, isValid ? step : step - 1)}
        totalSteps={totalSteps}
      />
    </Column>
  );
};
