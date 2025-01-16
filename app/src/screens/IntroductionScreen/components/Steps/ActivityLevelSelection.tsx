import Slider from '@react-native-community/slider';
import React, {FC, useEffect, useState} from 'react';
import {Column} from '../../../../components/elements/Column';
import {CustomText} from '../../../../components/elements/CustomText';
import {AppColors} from '../../../../constants/values';

type Props = {
  activity_level?: number;
  onSelect: (value: number) => void;
};

const options = [
  {value: 1.05, label: 'Sedentary', description: 'Little or no exercise'},
  {
    value: 1.2,
    label: 'Light Activity',
    description: 'Light exercise/sports 1-3 days a week',
  },
  {
    value: 1.35,
    label: 'Moderate Activity',
    description: 'Moderate exercise/sports 3-5 days a week',
  },
  {
    value: 1.55,
    label: 'Fairly Active',
    description: 'Hard exercise/sports 6-7 days a week',
  },
  {
    value: 1.7,
    label: 'Very Active',
    description: 'Very hard exercise, physical job, or 2x training',
  },
];
export const ActivityLevelSelection: FC<Props> = ({
  activity_level,
  onSelect,
}) => {
  const [selected, setSelected] = useState(0);
  const onChange = (value: number) => {
    setSelected(value);
    onSelect(options[value].value);
  };
  useEffect(() => {
    let index = 0;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === activity_level) {
        index = i;
        break;
      }
    }
    setSelected(index);
  }, []);
  return (
    <Column gap="sm" className="w-full ">
      <Slider
        style={{width: '100%', height: '15%'}}
        value={selected}
        onValueChange={onChange}
        minimumValue={0}
        maximumValue={options.length - 1}
        step={1}
        minimumTrackTintColor={AppColors.gray}
        maximumTrackTintColor={AppColors.gray}
        thumbTintColor={AppColors.main}
      />
      <Column className="items-center text-center" gap="2xs">
        <CustomText font="wotfardMedium" size="lg">
          {activity_level === undefined
            ? 'Please select an option'
            : options[selected].label}
        </CustomText>
        <CustomText className="text-center" size="md">
          {activity_level && options[selected].description}
        </CustomText>
      </Column>
    </Column>
  );
};
