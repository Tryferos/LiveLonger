import {FC, useState} from 'react';
import {Column} from '../../../../components/elements/Column';
import {Modal} from '../../../../components/wrappers/ModalWrapper';
import {QuantityPickerModalContent} from '../../../../components/wrappers/QuantityPickerModal';
import {UserPresets} from '../../../../types/settings';
import {CustomText} from '../../../../components/elements/CustomText';
import {AppBorderRadius} from '../../../../constants/values';
import {Row} from '../../../../components/elements/Row';
import {CustomIcon} from '../../../../components/elements/CustomIcon';

type Props = {
  field: keyof Pick<UserPresets, 'age' | 'height' | 'weight'>;
  value?: number;
  onSelect: (value: number) => void;
  label: string;
};
export const QuantitySelection: FC<Props> = ({
  field,
  value: _value,
  onSelect,
  label,
}) => {
  const value =
    _value ?? (field === 'age' ? 16 : field === 'height' ? 165 : 85);
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(prev => !prev);
  };
  return (
    <Column>
      <Column
        className="items-center w-[40vw]"
        style={{borderRadius: AppBorderRadius.rounded}}
        onPress={toggleModal}>
        <Row
          style={{
            borderTopRightRadius: AppBorderRadius.rounded,
            borderTopLeftRadius: AppBorderRadius.rounded,
          }}
          className="py-2 w-full justify-center"
          backgroundColor="main">
          <CustomText font="wotfardSemibold" color="white" size="lg">
            {field.upperFirstMulti()}
          </CustomText>
        </Row>
        <Column
          className="w-full py-4 pb-8 items-center justify-center relative"
          backgroundColor="lightOrange"
          shadow="shadowBottom">
          {_value !== undefined ? (
            <CustomText font="wotfardMedium" size="xl">
              {`${value} ${label}`}
            </CustomText>
          ) : (
            <CustomText className="px-2 py-2" font="wotfardRegular" size="sm">
              {'Please select a value'}
            </CustomText>
          )}
          <Row className="absolute right-2 bottom-2">
            <CustomIcon icon="edit" size="xs" color="gray" />
          </Row>
        </Column>
      </Column>
      <Modal
        title={field.upperFirstMulti()}
        isVisible={isVisible}
        onClose={toggleModal}>
        <QuantityPickerModalContent
          onClose={toggleModal}
          onSelect={onSelect}
          selectedValue={value}
          height={field === 'age' ? 260 : 340}
          step={1}
          label={label}
        />
      </Modal>
    </Column>
  );
};
