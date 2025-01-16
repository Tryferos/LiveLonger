import {FC, useMemo} from 'react';
import {Row} from '../../../components/elements/Row';
import {CustomText} from '../../../components/elements/CustomText';
import {AppBorderRadius, AppColors} from '../../../constants/values';
import {ProgressBar} from '../../../components/elements/ProgressBar';
import {CustomIcon} from '../../../components/elements/CustomIcon';

type Props = {
  step: number;
  totalSteps: number;
  dailyCalories?: number;
};
export const StepsTracker: FC<Props> = ({step, totalSteps, dailyCalories}) => {
  const percentage = useMemo(() => {
    return Math.round((step / totalSteps) * 100);
  }, [step, totalSteps]);
  return (
    <Row className="w-full h-[45px] items-center justify-center relative">
      <ProgressBar progress={percentage / 100} widthFactor={0.9} height={45} />
      <CustomText
        size="sm"
        className="absolute"
        color={step < 3 ? 'black' : 'white'}>
        {dailyCalories ? `${dailyCalories} kcal` : 'Calculating...'}
      </CustomText>
      <CustomText
        size="xs"
        className="absolute left-4"
        color={step === 0 ? 'black' : 'white'}>
        {`${percentage}%`}
      </CustomText>
      <Row className="absolute right-4">
        <CustomIcon
          color={step === totalSteps ? 'white' : 'main'}
          icon={dailyCalories ? 'check' : 'calculate'}
        />
      </Row>
    </Row>
  );
};
