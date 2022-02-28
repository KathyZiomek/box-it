import { RadioButton } from "primereact/radiobutton";

export const TaskCheckBoxes = (props) => {
  let status;
  if (props.isComplete) {
    status = true;
  } else if (!props.isComplete) {
    status = false;
  }
  return (
    <div className="p-field p-col-6">
      <label>Status:</label>
      <div className="p-formgroup-inline">
        <div className="p-field-checkbox">
          <RadioButton
            inputId={props.id}
            name="incomplete"
            value={props.name}
            checked={!status}
            onChange={props.markInProgress}
          />
          <label htmlFor="complete" onClick={props.markInProgress}>
            In Progress
          </label>
        </div>
        <div className="p-field-checkbox">
          <RadioButton
            inputId={props.id}
            name="complete"
            value={props.name}
            checked={status}
            onChange={props.markComplete}
          />
          <label htmlFor="complete" onClick={props.markComplete}>
            Complete
          </label>
        </div>
      </div>
    </div>
  );
};
