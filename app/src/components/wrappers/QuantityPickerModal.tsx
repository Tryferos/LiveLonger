import React, {FC, memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {AppSpace} from '../../constants/values';
import {Column} from '../elements/Column';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';
import {RoundButton} from '../organisms/RoundButton';

type QuantityPickerModalProps = {
  height?: number;
  onSelect: (value: number) => void;
  selectedValue: number;
  step?: number;
  label?: string;
  onClose: () => void;
};

export const QuantityPickerModalContent: FC<QuantityPickerModalProps> =
  memo<QuantityPickerModalProps>(
    ({height = 220, onSelect, selectedValue, step = 5, label, onClose}) => {
      const ref = useRef<ScrollView>(null);
      const [scrollPosition, setScrollPosition] = useState(0);

      const totalSizes = Math.floor(selectedValue / step);

      const values = useMemo(() => {
        const end = Math.ceil(100 / step);
        return [
          ...new Array(totalSizes).fill(0).map((_, i) => i * step),
          selectedValue,
          ...new Array(end)
            .fill(0)
            .map((_, i) => Math.floor(selectedValue) + (i + 1) * step),
        ];
      }, [selectedValue]);

      const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentOffset} = event.nativeEvent;
        setScrollPosition(contentOffset.y);
      };

      const fontSizeSelected = 24;
      const gap = 20;
      const fontSizeNormal = 18;
      useEffect(() => {
        //Scroll at the render of the component in order to show the selected value
        if (!ref.current || values.length === 0) {
          return;
        }
        const offsetSpace = 24;
        const totalSize =
          values.length * gap * 1.5 +
          (values.length - 1) * fontSizeNormal +
          fontSizeSelected -
          height / 2;

        const positionRelativeToSize =
          values.indexOf(selectedValue) / values.length;
        const middlePosition =
          totalSize * positionRelativeToSize - height * 0.5;

        ref.current?.scrollTo({
          y: middlePosition,
          animated: true,
        });
      }, [ref]);

      const onChange = (value: number) => {
        //Scroll when the value is changed so it keeps the value visible
        const stepOffset = (value - selectedValue) / step;
        const heightStep = gap + fontSizeNormal;
        const offset = stepOffset * heightStep;
        if (Math.abs(stepOffset) < 1 || Math.abs(stepOffset) > 5) {
          onSelect(value);
          return;
        }
        const offsetMax =
          offset > 0
            ? Math.min(heightStep * 2, offset)
            : Math.max(-heightStep * 2, offset);
        ref.current?.scrollTo({y: scrollPosition + offsetMax, animated: true});
        onSelect(value);
      };

      return (
        <>
          <ScrollView
            ref={ref}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            style={{height: height}}
            snapToAlignment="center">
            <Column className="items-center" gap="md">
              {values.map((currentValue, i) => {
                const isSelected = currentValue == selectedValue;
                const isNextToSelected =
                  currentValue == selectedValue + step ||
                  currentValue == selectedValue - step;
                const fontSize = isSelected
                  ? 'xl'
                  : isNextToSelected
                  ? 'xl'
                  : 'lg';
                const color = isSelected ? 'main' : 'gray';
                return (
                  <Row
                    key={i}
                    style={{borderLeftColor: '#2563eb'}}
                    className={`relative w-[100%] items-center justify-center ${
                      isSelected ? 'border-l-2' : 'border-0'
                    }`}>
                    <CustomText
                      onPress={() => onChange(currentValue)}
                      font="wotfardMedium"
                      size={fontSize}
                      style={{marginLeft: isSelected ? 16 : 0}}
                      color={color}>
                      {currentValue}
                      {isSelected && label ? ` ${label}` : ''}
                    </CustomText>
                  </Row>
                );
              })}
            </Column>
          </ScrollView>
          <RoundButton
            text={'Apply'}
            onPress={onClose}
            style={{paddingVertical: AppSpace['2xs'], zIndex: 200}}
          />
        </>
      );
    },
  );
