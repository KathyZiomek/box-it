import { Button } from "primereact/button";

export const UIButton = (props) => {
  // if (props.categoryColor != null) {
  return (
    <div className="p-field">
      <Button
        style={{
          border: props.categoryColor,
          background: props.categoryColor,
          width: props.width,
          marginTop: props.margin,
        }}
        icon={props.icon}
        label={props.label}
        disabled={props.isLoading}
        onClick={props.onClick}
      ></Button>
    </div>
  );
};
