import {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {
  getDateByIndex,
  getDatePickerDate,
  getDateString,
} from '../../../libs/dates';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, SpaceType} from '../../../constants/values';
import {getMealsDaysAvailable} from '../../../network/meals';
import {CalendarDayPickerShimmer} from '../shimmers/CalendarDayPickerShimmer';
import {useSelectedProgram} from '../../../store/selected_program';
import {useCalendarDate} from '../../../store/calendar_dates';

type CalendarDayPickerProps = {
  gap?: SpaceType;
};

export const CalendarDayPicker: FC<CalendarDayPickerProps> = ({
  gap = '2xs',
}) => {
  const ref = useRef<ScrollView>(null);
  const totalDatesToShow = 14;
  const [dates, setDates] = useState<Date[]>([]);
  const {selectedDate, setSelectedDate} = useCalendarDate();

  useEffect(() => {
    (async () => {
      const {dates} = await getMealsDaysAvailable();
      setDates(dates);
    })();
  }, []);

  useEffect(() => {
    if (!ref || !ref.current) return;
    ref.current.scrollToEnd({animated: true});
  }, [ref, dates]);

  if (dates.length === 0) {
    return <CalendarDayPickerShimmer />;
  }

  return (
    <ScrollView
      ref={ref}
      horizontal
      decelerationRate={0}
      snapToAlignment="start"
      snapToInterval={64}
      showsHorizontalScrollIndicator={false}>
      <Row gap={gap} style={{flex: 1}} className="items-start h-[8.5vh]">
        {dates.map((date, index) => {
          const time1 = date.getTime();
          const time2 = selectedDate?.getTime() ?? new Date().getTime();
          return (
            <DayPicker
              key={index}
              onSelect={setSelectedDate}
              date={date}
              selected={time1 === time2}
            />
          );
        })}
      </Row>
    </ScrollView>
  );
};
type DayPickerProps = {
  selected: boolean;
  onSelect: (date?: Date) => void;
  date: Date;
};

const DayPicker: FC<DayPickerProps> = ({date, onSelect, selected}) => {
  const {day, dayName} = getDatePickerDate(date);

  const onPress = () => {
    onSelect(date);
  };

  return (
    <Column
      className="px-5 py-3 h-[8.5vh] justify-between items-center mr-1"
      onPress={onPress}
      style={{borderRadius: AppBorderRadius.rounded, flex: 1}}
      backgroundColor={'main'}
      bgOpacity={selected ? '15' : '00'}>
      <CustomText size="xs" color="black">
        {dayName}
      </CustomText>
      <CustomText size="sm" color="black" font="wotfardMedium">
        {day}
      </CustomText>
    </Column>
  );
};
