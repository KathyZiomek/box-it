import { Fragment } from "react";

import InfoMessage from "../../../ui/uiPieces/InfoMessage";

import SignUp from "../SignUp";
import Login from "../Login";
import { AnonymousLogin } from "../AnonymousLogin";

import { Button } from "primereact/button";

export const LoggingInButtons = (props) => {
  return (
    <Fragment>
      <Login />
      <div className="p-d-flex p-jc-between">
        <div className="p-field">
          <Button
            onClick={props.signupButton}
            label="Not registered yet? Create an Account here."
            className="p-button-link"
          ></Button>
        </div>
        <AnonymousLogin
          setStatus={props.setStatus}
          setErrorMessage={props.setErrorMessage}
          setSuccess={props.setSuccess}
        />
      </div>
      {props.loader}
      {!props.success && (
        <InfoMessage severity="error" message={props.errorMessage} />
      )}
    </Fragment>
  );
};

export const SigningUpButtons = (props) => {
  return (
    <Fragment>
      <SignUp />
      <div className="p-d-flex p-jc-between">
        <div className="p-field">
          <Button
            onClick={props.loginButton}
            label="Already registered? Login here."
            className="p-button-link"
          ></Button>
        </div>
        <AnonymousLogin
          setStatus={props.setStatus}
          setErrorMessage={props.setErrorMessage}
          setSuccess={props.setSuccess}
        />
      </div>
      {props.loader}
      {!props.success && (
        <InfoMessage severity="error" message={props.errorMessage} />
      )}
    </Fragment>
  );
};
