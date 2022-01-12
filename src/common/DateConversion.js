export const WeekdayConversion = (text) => {
  if (text === 0) {
    return "Sunday";
  }
  if (text === 1) {
    return "Monday";
  }
  if (text === 2) {
    return "Tuesday";
  }
  if (text === 3) {
    return "Wednesday";
  }
  if (text === 4) {
    return "Thursday";
  }
  if (text === 5) {
    return "Friday";
  }
  if (text === 6) {
    return "Saturday";
  }
};

export const MonthConversion = (text) => {
  if (text === 0) {
    return "January";
  }
  if (text === 1) {
    return "February";
  }
  if (text === 2) {
    return "March";
  }
  if (text === 3) {
    return "April";
  }
  if (text === 4) {
    return "May";
  }
  if (text === 5) {
    return "June";
  }
  if (text === 6) {
    return "July";
  }
  if (text === 7) {
    return "August";
  }
  if (text === 8) {
    return "September";
  }
  if (text === 9) {
    return "October";
  }
  if (text === 10) {
    return "November";
  }
  if (text === 11) {
    return "December";
  }
};

export const DayEnding = (text) => {
  if (text === 1 || text === 21 || text === 31) {
    return "st";
  } else if (text === 2 || text === 22) {
    return "nd";
  } else if (text === 3 || text === 23) {
    return "rd";
  } else if (text >= 4) {
    return "th";
  }
};

export const checkDates = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);

  let same = d1.getTime() === d2.getTime();
  let notSame = d1.getTime() !== d2.getTime();
  if (same) {
    return true;
  } else if (notSame) {
    return false;
  }
};
