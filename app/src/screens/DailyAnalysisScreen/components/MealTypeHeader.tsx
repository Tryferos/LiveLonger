import {FC, Fragment} from 'react';
import {ProgressBarCircle} from '../../../components/elements/ProgressBarCircle';
import {Row} from '../../../components/elements/Row';
import {CustomText} from '../../../components/elements/CustomText';
import {CustomIcon} from '../../../components/elements/CustomIcon';

type MealTypeHeaderProps = {
  progress: number;
  type: string;
  calories: string;
};

export const MealTypeHeader: FC<MealTypeHeaderProps> = ({
  progress,
  type,
  calories,
}) => {
  const typeText = type.at(0) + type.slice(1).toLowerCase();
  return (
    <Row className="items-center justify-between">
      <Row gap={'2xs'} className="items-center">
        <Progress progress={progress} />
        <CustomText font="wotfardMedium" size="lg">
          {typeText}
        </CustomText>
      </Row>
      <Row gap="3xs" className="items-end">
        <CustomText font="wotfardMedium" color="gray">
          {calories}
        </CustomText>
        <CustomText font="wotfardRegular" size="sm" color="gray">
          {'kcal'}
        </CustomText>
      </Row>
    </Row>
  );
};
type ProgressProps = {
  progress: number;
};
const Progress: FC<ProgressProps> = ({progress}) => {
  return (
    <Fragment>
      {progress >= 1 ? (
        <Row className="absolute left-[6px]">
          <CustomIcon icon="check" color="mainLight" size="xs" />
        </Row>
      ) : null}
      <ProgressBarCircle progress={progress} size={28} />
    </Fragment>
  );
};
