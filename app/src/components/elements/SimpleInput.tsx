import React, {FC} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {AppBorderRadius, AppColors, AppFontSize} from '../../constants/values';
import {CustomIcon} from './CustomIcon';
import {Row} from './Row';

type Props = {
  fontSize?: keyof typeof AppFontSize;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export const SimpleInput: FC<Props> = ({
  onChangeText,
  placeholder,
  value,
  fontSize,
}) => {
  return (
    <Row
      className="w-full items-center px-2 py-1"
      style={{
        borderWidth: 1,
        borderColor: AppColors.gray400,
        borderRadius: AppBorderRadius.normal,
      }}>
      <TextInput
        style={{
          flex: 1,
          paddingVertical: 0,
          fontSize: fontSize ? AppFontSize[fontSize] : undefined,
          fontFamily: 'wotfard-regular-webfont',
          color: AppColors.black,
        }}
        underlineColorAndroid={AppColors.transparent}
        cursorColor={AppColors.gray400}
        multiline={true}
        placeholderTextColor={AppColors.gray + '88'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <CustomIcon
        onPress={() => onChangeText('')}
        icon="close"
        size="xs"
        color="gray400"
      />
    </Row>
  );
};
