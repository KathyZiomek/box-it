/**TODO: create SignUp component */

import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { saveNewUser } from "./userSlice";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

import userValidation from "./userValidation";

const SignUp = () => {
  const [status, setStatus] = useState("idle");
  // const dispatch = useDispatch();

  // const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //   const [isLoading, setIsLoading] = useState(false);

  const onRegister = (event) => {
    event.preventDefault();
    setStatus("loading");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (userValidation(enteredEmail) && userValidation(enteredPassword)) {
      const trimmedEmail = enteredEmail.trim();
      const trimmedPassword = enteredPassword.trim();

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
        .then((userCredential) => {
          setStatus("idle");
          //Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setStatus("idle");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            "Error Code: " + errorCode + ", Error Message: " + errorMessage
          );
        });

      // let text = {
      //   // name: trimmedName,
      //   email: trimmedEmail,
      //   password: trimmedPassword,
      // };

      // setStatus("loading");
      // dispatch(saveNewUser(text));
      // setStatus("idle");
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
      <form onSubmit={onRegister}>
        <div>
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
      </form>
      {loader}
    </Card>
  );
};

export default SignUp;
