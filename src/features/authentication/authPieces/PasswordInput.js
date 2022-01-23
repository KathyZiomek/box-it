import { Fragment } from "react";

import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";

export const PasswordInput = (props) => {
  const header = <h6>Enter a password:</h6>;
  const footer = (
    <Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 6 characters</li>
      </ul>
    </Fragment>
  );

  return (
    <div className="p-inputgroup  p-field">
      <span className="p-inputgroup-addon">
        <i className="pi pi-ellipsis-h"></i>
      </span>
      <Password
        id="password"
        autoComplete="current-password"
        value={props.password}
        placeholder="Password"
        header={header}
        footer={footer}
        disabled={props.isLoading}
        onChange={(e) => {
          props.setPassword(e.target.value);
        }}
        onClick={props.handleClick}
        toggleMask
      />
      {props.passwordWarning && (
        <Message severity="error" text="Password requirements not met." />
      )}
    </div>
  );
};
