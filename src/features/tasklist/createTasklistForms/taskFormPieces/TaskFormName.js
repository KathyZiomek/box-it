import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const TaskFormName = (props) => {
  let placeholder = props.isLoading ? "" : "Enter task name here...";

  return (
    <div className="p-field">
      <label htmlFor="taskName">Task Name:</label>
      <InputText
        type="text"
        id="taskName"
        placeholder={placeholder}
        value={props.task}
        onChange={(e) => props.setTask(e.target.value)}
        disabled={props.isLoading}
        onClick={props.handleClick}
        autoComplete="taskName"
      />
      {props.taskWarning && (
        <Message severity="error" text="Task cannot be empty" />
      )}
    </div>
  );
};
