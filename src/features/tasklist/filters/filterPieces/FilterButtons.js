import { Button } from "primereact/button";

export const LeftFilterButton = (props) => {
  return (
    <Button
      style={{ marginRight: 20 }}
      icon="pi pi-check"
      label="Mark All Completed"
      onClick={props.onMarkCompletedClicked}
      disabled={props.disabledButtons}
    />
  );
};

export const RightFilterButton = (props) => {
  return (
    <Button
      label="Clear Completed"
      icon="pi pi-times"
      onClick={props.onClearCompletedClicked}
      disabled={props.disabledButtons}
    />
  );
};
