import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GestureResponderEvent} from 'react-native-modal';
import {AppBorderRadius} from '../../constants/values';
import {CustomIcon} from './CustomIcon';
import {Row} from './Row';

type CustomCheckboxProps = {
  checked: boolean;
  onPress?: () => void;
};

export const CustomCheckbox: FC<CustomCheckboxProps> = ({checked, onPress}) => {
  return (
    <TouchableOpacity
      onPress={
        (ev => {
          if (ev) {
            ev.stopPropagation();
          }
          onPress && onPress();
        }) as ((ev: GestureResponderEvent) => void) & (() => void)
      }>
      <Row
        backgroundColor={checked ? 'main' : 'white'}
        style={{
          borderRadius: AppBorderRadius.small,
          padding: checked ? 2 : 0,
        }}>
        <CustomIcon
          icon="check"
          color={checked ? 'white' : 'main'}
          size={checked ? 'xs' : 'sm'}
        />
      </Row>
    </TouchableOpacity>
  );
};
