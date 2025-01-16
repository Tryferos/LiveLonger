import {FC} from 'react';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {Row} from '../../../components/elements/Row';
import {ProgramType, Programs} from '../../../types/settings';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Spacer} from '../../../components/elements/Spacer';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {AppColors} from '../../../constants/values';
import {ProgramMacroInfo} from './ProgramCard';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {Divider} from '../../../components/elements/Divider';
import {useSelectedProgram} from '../../../store/selected_program';

type Props = {
  isSelected?: boolean;
  program?: Programs[ProgramType] | null;
  onClose: () => void;
};

export const ProgramModal: FC<Props> = ({
  program,
  onClose,
  isSelected = false,
}) => {
  const {selectProgram, program: selectedProgram} = useSelectedProgram();
  if (!program) {
    return null;
  }
  const caloricDifference = Math.round((program.caloricPercentage - 1) * 100);
  return (
    <Column gap="2xs" className="px-2">
      <CustomText size="sm" color="gray">
        {program?.description}
      </CustomText>
      <Column className="pt-3" gap="3xs">
        <Row className="items-start pb-1" gap="3xs">
          <CustomIcon size="sm" icon="info-outline" />
          <CustomText font="wotfardMedium">{'Program information'}</CustomText>
        </Row>
        <ProgramMacroInfo
          color="black"
          percentage={caloricDifference}
          unit=" of calories"
          value={program.calories ?? 0}
        />
        <ProgramMacroInfo
          label="Carbs"
          color="black"
          percentage={Math.round(program.carbsPercentage * 100)}
          unit="kcal"
          value={program.carbsKcal ?? 0}
          percentageLabel="% of calories"
        />
        <ProgramMacroInfo
          label="Fats"
          color="black"
          percentage={Math.round(program.fatsPercentage * 100)}
          unit="kcal"
          value={program.fatsKcal ?? 0}
          percentageLabel="% of calories"
        />
        <ProgramMacroInfo
          label="Protein"
          color="black"
          percentage={program.proteinPerKg}
          unit="g"
          value={program.proteinGrams ?? 0}
          percentageLabel="g per kg"
        />
        {/* {isSelected && selectedProgram && (
          <ProgramMacroInfo
            label="Start Date"
            color="black"
            percentage={0}
            unit=""
            value={''}
            percentageLabel=""
          />
        )} */}
      </Column>
      <Spacer size="sm" />
      <Row className="justify-between w-full">
        <RoundButton
          style={{
            width: '32%',
            backgroundColor: 'white',
            borderWidth: 1.5,
            borderColor: AppColors.black,
          }}
          textColor="black"
          text="Close"
          paddingVertical="2xs"
          onPress={onClose}
        />
        <RoundButton
          disabled={isSelected}
          icon="schedule"
          paddingVertical="2xs"
          style={{width: '65%'}}
          text={isSelected ? 'Already started' : 'Begin your program'}
          onPress={() => {
            selectProgram(program.program);
            onClose();
          }}
        />
      </Row>
      <Spacer size="3xs" />
    </Column>
  );
};
