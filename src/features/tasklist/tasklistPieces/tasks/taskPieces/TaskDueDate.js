import DisplayDate from "./DisplayDate";
import { InputText } from "primereact/inputtext";

export const TaskDueDate = (props) => {
  let textDate;
  if (props.duedate != null && props.duedate !== "") {
    textDate = DisplayDate(props.duedate);
    return (
      <div className="p-field">
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="textDate">Due Date:</label>
            <InputText id="textDate" value={textDate} disabled />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
