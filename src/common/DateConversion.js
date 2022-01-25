export const WeekdayConversion = (weekday) => {
  let weekdayDict = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return weekdayDict[weekday];
};

export const MonthConversion = (month) => {
  let monthDict = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  return monthDict[month];
};

export const DayEnding = (day) => {
  if (day === 1 || day === 21 || day === 31) {
    return "st";
  } else if (day === 2 || day === 22) {
    return "nd";
  } else if (day === 3 || day === 23) {
    return "rd";
  } else if (day >= 4) {
    return "th";
  }
};

export const checkDates = (date1, date2) => {
  if ((date1 == null || date1 === "") && (date2 == null || date2 === "")) {
    return true;
  } else {
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    let same = d1.getTime() === d2.getTime();

    if (same) {
      return true;
    } else if (!same) {
      return false;
    }
  }
};
