/**TODO: create Login component */

import { useRef, useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
  const [status, setStatus] = useState("idle");

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const [isLoading, setIsLoading] = useState(false);

  // let placeholder = isLoading ? "" : "Enter email here...";

  const onLogin = (event) => {
    setStatus("loading");
    event.preventDefault();
    setStatus("loading");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const trimmedEmail = enteredEmail.trim();
    const trimmedPassword = enteredPassword.trim();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((userCredential) => {
        setStatus("idle");
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        console.log(uid);
        console.log(user);
        // ...
      })
      .catch((error) => {
        setStatus("idle");
        const errorCode = error.code;
        const errorMessage = error.message;
        /**TODO: handle error message - output a message to the user if there is an error */
        console.log(
          "Error Code: " + errorCode + ", Error Message: " + errorMessage
        );
      });
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <Card title="Login Form">
      <form onSubmit={onLogin}>
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
              // disabled={isLoading}
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
              // disabled={isLoading}
            />
          </div>
        </div>
        <br />
        <Button>Login</Button>
      </form>
      {loader}
    </Card>
  );
};

export default Login;
