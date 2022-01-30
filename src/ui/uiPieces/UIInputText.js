import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const UIInputText = (props) => {
  return (
    <div className="p-inputgroup p-field">
      <span className="p-inputgroup-addon">
        <i className={props.icon}></i>
      </span>
      <InputText
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.isLoading}
        autoComplete={props.autoComplete}
        onClick={props.handleClick}
        onChange={(e) => props.setValue(e.target.value)}
      />
      {props.warning && <Message severity="error" text={props.errorText} />}
    </div>
  );
};
