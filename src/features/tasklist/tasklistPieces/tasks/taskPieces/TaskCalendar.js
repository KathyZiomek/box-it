import { Calendar } from "primereact/calendar";

export const TaskCalendar = (props) => {
  const startDate = new Date();
  const endDate = new Date("01-01-2023");

  return (
    <div className="p-field p-col-6">
      <label htmlFor="duedate">Due Date: </label>
      <Calendar
        id="duedate"
        name="duedate"
        minDate={startDate}
        maxDate={endDate}
        value={props.newDueDate}
        viewDate={props.newDueDate}
        disabled={props.isLoading}
        onChange={(e) => {
          props.setNewDueDate(e.value);
          props.handleClick();
        }}
      />
    </div>
  );
};
