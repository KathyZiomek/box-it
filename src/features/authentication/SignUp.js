/**TODO: create SignUp component */

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { saveNewUser } from "./userSlice";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

import userValidation from "./userValidation";

const SignUp = () => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //   const [isLoading, setIsLoading] = useState(false);

  const newUserRegistration = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      userValidation(enteredName) &&
      userValidation(enteredEmail) &&
      userValidation(enteredPassword)
    ) {
      const trimmedName = enteredName.trim();
      const trimmedEmail = enteredEmail.trim();
      const trimmedPassword = enteredPassword.trim();

      let text = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      };

      setStatus("loading");
      dispatch(saveNewUser(text));
      setStatus("idle");
    } else {
      return;
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <Card title="Sign Up Form">
      <form onSubmit={newUserRegistration}>
        <div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              type="text"
              id="name"
              required
              placeholder="Your Name"
              ref={nameInputRef}
              disabled={isLoading}
            />
          </div>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              type="text"
              id="email"
              required
              placeholder="Email Address"
              ref={emailInputRef}
              disabled={isLoading}
            />
          </div>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ellipsis-h"></i>
            </span>
            <InputText
              type="password"
              id="password"
              required
              placeholder="Password"
              ref={passwordInputRef}
              disabled={isLoading}
            />
          </div>
        </div>
        <br />
        <Button>Sign Up</Button>
        {loader}
      </form>
    </Card>
  );
};

export default SignUp;
