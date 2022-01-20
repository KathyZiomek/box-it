import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const TaskName = (props) => {
  return (
    <div className="p-field p-col-6">
      <label htmlFor="categoryName">Name: </label>
      <InputText
        id={props.id}
        value={props.newTaskName}
        disabled={props.isLoading}
        onChange={(e) => props.setNewTaskName(e.target.value)}
        onClick={props.handleClick}
        autoComplete="task"
      />
      {props.taskWarning && (
        <Message severity="error" text="Task cannot be empty" />
      )}
    </div>
  );
};
