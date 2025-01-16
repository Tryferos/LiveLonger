import {create} from 'zustand';
import {getDateDayStart} from '../libs/dates';

type CalendarDateState = {
  selectedDate: Date | null;
  setSelectedDate: (date?: Date) => void;
};

export const useCalendarDate = create<CalendarDateState>()(set => ({
  selectedDate: getDateDayStart(new Date()),
  setSelectedDate: (date?: Date) => {
    set({selectedDate: getDateDayStart(date ?? new Date())});
  },
}));
