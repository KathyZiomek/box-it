import { Button } from "primereact/button";
import "primeflex/primeflex.css";

export const NotEditingButtons = (props) => {
  return (
    <div className="p-formgroup-inline p-fluid">
      <div className="p-field">
        <Button
          style={{
            border: props.categoryColor,
            background: props.categoryColor,
            width: "12rem",
            marginRight: 12,
          }}
          onClick={props.onEdit}
          icon="pi pi-pencil"
          label="Edit Task"
        ></Button>
      </div>
      <div className="p-field">
        <Button
          style={{
            border: props.categoryColor,
            background: props.categoryColor,
            width: "12rem",
          }}
          onClick={props.onDelete}
          icon="pi pi-times"
          label="Delete Task"
        ></Button>
      </div>
    </div>
  );
};

export const EditingButtons = (props) => {
  return (
    <div className="p-d-flex p-jc-between">
      <div className="p-field">
        <Button
          style={{
            border: props.categoryColor,
            background: props.categoryColor,
            width: "10rem",
          }}
          icon="pi pi-times"
          label="Clear Due Date"
          onClick={(e) => {
            e.preventDefault();
            props.setNewDueDate("");
          }}
          disabled={props.isLoading}
        ></Button>
      </div>
      <div className="p-field">
        <Button
          style={{
            border: props.categoryColor,
            background: props.categoryColor,
            width: "10rem",
            // marginRight: 12,
          }}
          icon="pi pi-check"
          label="Update"
          onClick={props.handleClick}
          disabled={props.isLoading}
        ></Button>
      </div>
      <div className="p-field">
        <Button
          style={{
            border: props.categoryColor,
            background: props.categoryColor,
            width: "10rem",
          }}
          onClick={props.onEdit}
          icon="pi pi-times"
          label="Cancel"
          disabled={props.isLoading}
        ></Button>
      </div>
    </div>
  );
};
