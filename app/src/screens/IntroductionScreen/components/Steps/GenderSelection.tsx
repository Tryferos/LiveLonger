import {FC} from 'react';
import {Column} from '../../../../components/elements/Column';
import {CustomText} from '../../../../components/elements/CustomText';
import {Row} from '../../../../components/elements/Row';
import {AppBorderRadius} from '../../../../constants/values';

type GenderSelectionProps = {
  selectedGender?: 'male' | 'female';
  onSelect: (gender: 'male' | 'female' | string) => void;
};
export const GenderSelection: FC<GenderSelectionProps> = ({
  selectedGender,
  onSelect,
}) => {
  return (
    <Row className=" justify-evenly w-full items-start">
      {['male', 'female'].map((gender, i) => (
        <Column key={gender + i} className="items-center" gap="xs">
          <Column
            key={gender}
            className="p-6"
            backgroundColor={
              gender === selectedGender ? 'success' : 'lightOrange'
            }
            style={{borderRadius: AppBorderRadius.rounded}}
            onPress={() => onSelect(gender)}>
            <CustomText size="3xl">
              {gender === 'male' ? '👱‍♂️' : '🙎‍♀️'}
            </CustomText>
          </Column>
          <CustomText
            color={gender === selectedGender ? 'black' : 'gray'}
            size={gender === selectedGender ? 'lg' : 'md'}
            font="wotfardMedium">
            {gender.upperFirst()}
          </CustomText>
        </Column>
      ))}
    </Row>
  );
};
