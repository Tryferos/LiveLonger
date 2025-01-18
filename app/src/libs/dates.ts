const formatNumber = (number: number) => {
  if (number == 1) {
    return '1st';
  }
  if (number == 2) {
    return '2nd';
  }
  if (number == 3) {
    return '3rd';
  }
  return `${number}th`;
};
export const getDateString = (date: Date) => {
  const agoString = getDateStringAgo(date);
  const day = formatNumber(date.getDate());
  const dayName = date.toLocaleString('en-US', {weekday: 'long'});
  const monthName = date.toLocaleString('en-US', {month: 'short'});
  return [agoString, `${dayName}, ${day} ${monthName}`];
};

export const getDateStringAgo = (_date: Date) => {
  const date = getDateDayStart(_date);
  const currentDate = getDateDayStart(new Date());
  const isToday = date.getDate() === currentDate.getDate();
  if (isToday) {
    return 'Today';
  }
  const singleDayMs = 1000 * 60 * 60 * 24;
  const ago = currentDate.getTime() - date.getTime();
  if (ago <= singleDayMs) {
    return 'Yesterday';
  }
  if (ago <= singleDayMs * 7) {
    return 'This week';
  }
  if (ago <= singleDayMs * 14) {
    return 'Last week';
  }
  if (ago <= singleDayMs * 30) {
    return 'This month';
  }
  if (ago <= singleDayMs * 60) {
    return 'Last month';
  }
  if (ago <= singleDayMs * 365) {
    if (date.getFullYear() < new Date().getFullYear()) {
      return 'Last year';
    } else {
      return 'This year';
    }
  }
};

export const getDatePickerDate = (_date: Date) => {
  const date = getDateDayStart(_date);
  const day = date.getDate();
  const dayName = date.toLocaleString('en-US', {weekday: 'narrow'});
  return {day, dayName};
};

export const getDateDayStart = (date: Date) => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const getDateByIndex = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  return getDateDayStart(date);
};
