import {
  WeekdayConversion,
  MonthConversion,
  DayEnding,
} from "./DateConversion";

const DisplayDate = (duedate) => {
  const initialDueDate = new Date(duedate);

  //Display dates as Weekday, Month Day, Year
  //e.g. Saturday, January 01, 2022

  const weekday = WeekdayConversion(initialDueDate.getDay());
  const month = MonthConversion(initialDueDate.getMonth());
  const day = initialDueDate.getDate();
  const dayEnding = DayEnding(day);
  const year = initialDueDate.getFullYear();

  const newDueDate = `${weekday}, ${month} ${day}${dayEnding}, ${year}`;

  return newDueDate;
};

export default DisplayDate;
