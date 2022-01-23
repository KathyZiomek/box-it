import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const EmailInput = (props) => {
  return (
    <div className="p-inputgroup p-field">
      <span className="p-inputgroup-addon">
        <i className="pi pi-envelope"></i>
      </span>
      <InputText
        type="text"
        id="email"
        placeholder="Email Address"
        value={props.email}
        disabled={props.isLoading}
        autoComplete="email"
        onClick={props.handleClick}
        onChange={(e) => props.setEmail(e.target.value)}
      />
      {props.emailWarning && (
        <Message severity="error" text="Email requirements not met." />
      )}
    </div>
  );
};
