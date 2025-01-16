import {FC} from 'react';
import {Row} from '../../../components/elements/Row';
import {RoundButton} from '../../../components/organisms/RoundButton';

type FieldsStepsProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onCalculate: () => void;
  step: number;
  totalSteps: number;
  canContinue: boolean;
};

export const FieldsSteps: FC<FieldsStepsProps> = ({
  setStep,
  step,
  totalSteps,
  onCalculate,
  canContinue,
}) => {
  const onNext = () => {
    if (step === totalSteps) {
      onCalculate();
    } else {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  return (
    <Row className="w-full justify-between">
      <RoundButton
        onPress={() => setStep(prev => Math.max(0, prev - 1))}
        style={{
          width: '40%',
          flexDirection: 'row-reverse',
        }}
        paddingVertical="2xs"
        icon="arrow-back-ios"
        text={'Previous'}
        clickAnimation={true}
        disabled={step === 1}
      />
      {
        <RoundButton
          onPress={onNext}
          style={{width: '40%'}}
          paddingVertical="2xs"
          text={step === totalSteps ? 'Calculate' : 'Next'}
          icon={step === totalSteps ? 'done' : 'arrow-forward-ios'}
          clickAnimation={true}
          disabled={!canContinue}
        />
      }
    </Row>
  );
};
