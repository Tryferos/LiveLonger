import React, {forwardRef} from 'react';
import {TextInput} from 'react-native';
import {
  AppBorderRadius,
  AppColors,
  AppFontSize,
  FontSizeType,
} from '../../constants/values';
import {AppIconsType} from '../../types/icons';
import {CustomIcon} from './CustomIcon';
import {Row} from './Row';

type CustomInputProps = {
  placeholder: string;
  value: string;
  fontSize?: FontSizeType;
  onChangeText: (text: string) => void;
  icon?: AppIconsType;
  onIconPress?: () => void;
};

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({onChangeText, placeholder, value, icon, onIconPress, fontSize}, ref) => {
    return (
      <Row
        style={{
          borderRadius: AppBorderRadius.normal,
        }}
        className="py-2 px-2 items-center"
        backgroundColor="white">
        {icon ? (
          <CustomIcon
            icon={icon}
            size="md"
            color="gray"
            onPress={onIconPress}
          />
        ) : null}
        <TextInput
          ref={ref}
          style={{
            flexBasis: !icon ? '100%' : '85%',
            display: 'flex',
            textAlignVertical: 'top',
            textAlign: 'center',
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
      </Row>
    );
  },
);
