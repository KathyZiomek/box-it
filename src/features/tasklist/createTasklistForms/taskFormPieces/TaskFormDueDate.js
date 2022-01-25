import { Calendar } from "primereact/calendar";

export const TaskFormDueDate = (props) => {
  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");

  let currentDate =
    props.duedate != null && props.duedate !== ""
      ? new Date(props.duedate)
      : "";

  return (
    <div className="p-field">
      <label htmlFor="duedate">Due Date:</label>
      <Calendar
        id="duedate"
        name="duedate"
        placeholder="Select a Due Date"
        minDate={startDate}
        maxDate={endDate}
        value={currentDate}
        viewDate={currentDate}
        disabled={props.isLoading}
        onChange={(e) => {
          props.setDueDate(e.value);
          props.handleClick();
        }}
      />
    </div>
  );
};
