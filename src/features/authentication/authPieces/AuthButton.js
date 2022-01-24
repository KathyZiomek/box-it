import { Button } from "primereact/button";

export const AuthButton = (props) => {
  return (
    <div className="p-field">
      <Button
        style={{
          width: "15rem",
          marginTop: 10,
        }}
        icon={props.icon}
        label={props.label}
        onClick={props.handleClick}
      ></Button>
    </div>
  );
};
