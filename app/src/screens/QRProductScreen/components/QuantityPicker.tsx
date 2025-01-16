import React, {FC, useState} from 'react';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {Row} from '../../../components/elements/Row';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {QuantityPickerModalContent} from '../../../components/wrappers/QuantityPickerModal';
import {AppSpace} from '../../../constants/values';
import {QuantitySelectionProps} from './QuantitySelection';

export const QuantityPicker: FC<QuantitySelectionProps> = ({
  hasServing,
  onChange,
  selectedSize,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleToggle = (value: boolean) => () => setPickerVisible(value);

  return (
    <Row>
      <CustomIcon
        icon="edit"
        size="sm"
        color="black"
        onPress={handleToggle.apply(this, [true])}
      />
      <Modal
        isVisible={pickerVisible}
        onClose={handleToggle.apply(this, [false])}
        style={{gap: AppSpace.sm, justifyContent: 'space-between'}}
        title="Select quantity">
        <QuantityPickerModalContent
          onClose={handleToggle.apply(this, [false])}
          label="g"
          selectedValue={selectedSize}
          onSelect={onChange}
        />
      </Modal>
    </Row>
  );
};
