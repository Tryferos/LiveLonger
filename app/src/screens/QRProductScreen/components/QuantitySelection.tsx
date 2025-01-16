import React, {FC} from 'react';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {QuantityPicker} from './QuantityPicker';

export type QuantitySelectionProps = {
  hasServing: boolean;
  selectedSize: number;
  onChange: (size: number) => void;
};

export const QuantitySelection: FC<QuantitySelectionProps> = ({
  hasServing,
  selectedSize,
  onChange,
}) => {
  const selectedSizeText = `${selectedSize} g`;

  return (
    <Row className="items-center py-4 justify-center">
      <CustomText className="mr-2 ml-1" font="wotfardMedium" size="xl">
        {selectedSizeText}
      </CustomText>
      <QuantityPicker
        hasServing={hasServing}
        onChange={onChange}
        selectedSize={selectedSize}
      />
    </Row>
  );
};
