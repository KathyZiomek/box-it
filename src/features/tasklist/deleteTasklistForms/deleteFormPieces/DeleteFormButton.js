import { Button } from "primereact/button";

export const DeleteFormButton = (props) => {
  return (
    <div className="p-field">
      <Button
        style={{
          width: "15rem",
          marginTop: 8,
        }}
        icon={props.icon}
        label={props.label}
        onClick={props.action}
      ></Button>
    </div>
  );
};
