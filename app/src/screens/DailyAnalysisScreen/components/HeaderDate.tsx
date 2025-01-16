import {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {getDateString} from '../../../libs/dates';
import {CustomText} from '../../../components/elements/CustomText';
import {useCalendarDate} from '../../../store/calendar_dates';

type HeaderDateProps = {
  date?: Date;
};

export const HeaderDate: FC<HeaderDateProps> = () => {
  const {selectedDate} = useCalendarDate();
  if (!selectedDate) {
    return null;
  }
  const [agoString, dateString] = getDateString(selectedDate);
  return (
    <Column gap="3xs">
      <CustomText font="wotfardMedium" color="grayLight" size="lg">
        {agoString}
      </CustomText>
      <CustomText font="wotfardMedium" size="2xl">
        {dateString}
      </CustomText>
    </Column>
  );
};
