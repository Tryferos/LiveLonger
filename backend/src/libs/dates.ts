

export const getDayStartDate = (date: Date): number => {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate.getTime();
}

export const getDateDayStart = (date: Date) => {
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };  

export const getDayEndDate = (date: Date): number => {
    const newDate = new Date(date);
    newDate.setUTCHours(23, 59, 59, 999);
    return newDate.getTime();
}

export const getDayLimits = (date: Date): {start: number, end: number} => {
    const start = getDayStartDate(date);
    const end = getDayEndDate(date);
    return {start, end};
}
