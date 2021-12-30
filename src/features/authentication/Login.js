/**TODO: create Login component */

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTasks } from "../tasklist/tasks/taskSlice";
import { fetchCategories } from "../tasklist/categories/categorySlice";
import { userAdded } from "./userSlice";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import ErrorMessages from "./ErrorMessages";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onLogin = (event) => {
    setStatus("loading");
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const trimmedEmail = enteredEmail.trim();
    const trimmedPassword = enteredPassword.trim();

    /**TODO: add anonymous login: https://firebase.google.com/docs/auth/web/anonymous-auth */

    const auth = getAuth();
    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((userCredential) => {
        setStatus("idle");
        // Signed in
        const user = userCredential.user;

        // console.log(user);
        const uid = user.uid;
        const text = { [uid]: { id: uid, status: "loggedIn" } };

        dispatch(fetchCategories(uid)).then(dispatch(fetchTasks(uid)));
        dispatch(userAdded(text));
      })
      .catch((error) => {
        setStatus("idle");
        const errorCode = error.code;
        // console.log(errorCode);
        const userMessage = ErrorMessages(errorCode);
        setError(userMessage);
      });
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  let errorMessage = error ? (
    <div>
      <p style={{ color: "red" }}>{error}</p>
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
            />
          </div>
        </div>
        <br />
        <Button>Login</Button>
      </form>
      {loader}
      {errorMessage}
    </Card>
  );
};

export default Login;
