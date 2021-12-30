//imports
import {
  WeekdayConversion,
  MonthConversion,
  DayEnding,
} from "./DateConversion";

const DisplayDate = (text) => {
  const initialDate = new Date(text);

  //Display dates as Weekday, Month Day, Year
  //e.g. Saturday, January 01, 2022

  const weekday = WeekdayConversion(initialDate.getDay());
  const month = MonthConversion(initialDate.getMonth());
  const day = initialDate.getDate();
  const dayEnding = DayEnding(day);
  const year = initialDate.getFullYear();

  const newDueDate =
    weekday + ", " + month + " " + day + dayEnding + ", " + year;

  return newDueDate;
};

export default DisplayDate;
