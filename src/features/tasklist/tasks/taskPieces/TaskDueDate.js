import DisplayDate from "../../../../common/DisplayDate";
import { InputText } from "primereact/inputtext";

export const TaskDueDate = (props) => {
  if (props.duedate) {
    let displayDate = DisplayDate(props.duedate);

    return (
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="displayDate">Due Date:</label>
          <InputText id="displayDate" value={displayDate} disabled />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
