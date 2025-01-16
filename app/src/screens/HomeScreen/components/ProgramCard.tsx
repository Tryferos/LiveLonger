import {FC, useMemo} from 'react';
import {ProgramFull, ProgramType, Programs} from '../../../types/settings';
import {Row} from '../../../components/elements/Row';
import {CustomText} from '../../../components/elements/CustomText';
import {AppBorderRadius, AppSpace, ColorsType} from '../../../constants/values';
import {Column} from '../../../components/elements/Column';
import {useNutritionPresets} from '../../../store/nutrition_presets';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {Spacer} from '../../../components/elements/Spacer';
import {DietIcon} from '../../../svgs/diet';
import {useSelectedProgram} from '../../../store/selected_program';

type Props = {
  selected?: boolean;
  program: Programs[ProgramType];
  onPress: () => void;
  type: ProgramType;
};
export const ProgramCard: FC<Props> = ({
  selected = false,
  program,
  onPress,
  type,
}) => {
  const caloricDifference = Math.round((program.caloricPercentage - 1) * 100);
  return (
    <Row
      onPress={onPress}
      className="w-[80vw] py-3 px-4 pb-4 relative"
      style={{
        marginRight: AppSpace['xs'],
        borderRadius: AppBorderRadius.normal,
      }}
      backgroundColor={'main'}>
      {/* <Row className="w-full h-full absolute right-0">
        <DietIcon />
      </Row> */}
      <Column className="w-full" gap="3xs">
        <Row className="items-end" gap="3xs">
          <CustomText
            color={'white'}
            numberOfLines={1}
            size="md"
            font="wotfardMedium">
            {type}
          </CustomText>
          <CustomText
            color={'gray200'}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{flex: 1, width: '100%'}}
            size="sm"
            font="wotfardMedium">
            {program.title.replace(type, '')}
          </CustomText>
        </Row>
        <CustomText
          color={'gray200'}
          style={{flex: 1, width: '100%'}}
          numberOfLines={2}
          ellipsizeMode="tail"
          font="wotfardRegular"
          size="sm">
          {program.description}
        </CustomText>
        <Spacer size="3xs" />
        <Column className="">
          <ProgramMacroInfo
            percentage={caloricDifference}
            unit="kcal"
            value={program.calories ?? 0}
          />
          {/* <ProgramMacroInfo
            label="Carbs"
            percentage={Math.round(program.carbsPercentage * 100)}
            unit="kcal"
            value={program.carbsKcal ?? 0}
            percentageLabel="% of calories"
          />
          <ProgramMacroInfo
            label="Fats"
            percentage={Math.round(program.fatsPercentage * 100)}
            unit="kcal"
            value={program.fatsKcal ?? 0}
            percentageLabel="% of calories"
          /> */}
          <ProgramMacroInfo
            label="Protein"
            percentage={program.proteinPerKg}
            unit="g"
            value={program.proteinGrams ?? 0}
            percentageLabel="g per kg"
          />
        </Column>
        <>
          <Spacer size="3xs" />
          <Row
            className="items-center"
            style={{
              flexDirection: selected ? 'row' : 'row-reverse',
              justifyContent: selected ? 'flex-start' : 'space-between',
            }}
            gap="2xs">
            <CustomIcon
              color={selected ? 'white' : 'gray200'}
              size={'sm'}
              icon={selected ? 'check-circle' : 'arrow-forward-ios'}
            />
            <CustomText
              size={'sm'}
              color={selected ? 'white' : 'gray200'}
              font="wotfardMedium">
              {selected ? 'Current Program' : 'View More'}
            </CustomText>
          </Row>
        </>
      </Column>
    </Row>
  );
};

type MacroProps = {
  label?: string;
  value: number | string;
  unit: 'kcal' | 'g' | string;
  percentage: number;
  percentageLabel?: string;
  color?: ColorsType;
};

export const ProgramMacroInfo: FC<MacroProps> = ({
  percentage,
  unit,
  value,
  label,
  percentageLabel,
  color = 'white',
}) => {
  const grayColor = color;
  const grayColor2 = grayColor === 'white' ? 'gray200' : 'gray';
  return (
    <Row gap="2xs" className="items-center py-[2px]">
      <CustomIcon icon="circle" size="4xs" color={grayColor} />
      <Row className="items-end">
        {label && (
          <CustomText color={grayColor} size="sm">
            {`${label}: `}
          </CustomText>
        )}
        <CustomText color={grayColor} size="sm">
          {value}
        </CustomText>
        <CustomText color={grayColor} size="xs">
          {unit}
        </CustomText>
      </Row>
      {percentage !== 0 && (
        <CustomText
          size="sm"
          color={
            percentageLabel
              ? grayColor2
              : percentage < 0
              ? 'errorLight'
              : 'successLight'
          }>
          ({percentage > 0 && !percentageLabel ? '+' : ''}
          {percentage}
          {percentageLabel ?? '%'})
        </CustomText>
      )}
    </Row>
  );
};
