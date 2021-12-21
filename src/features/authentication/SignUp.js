/**TODO: create SignUp component */

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTasks } from "../tasklist/tasks/taskSlice";
import { fetchCategories } from "../tasklist/categories/categorySlice";
import { userAdded } from "./userSlice";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import ErrorMessages from "./ErrorMessages";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

import userValidation from "./userValidation";

const SignUp = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
          // Registered and signed in
          const user = userCredential.user;

          const uid = user.uid;
          const text = { [uid]: { id: uid, status: "loggedIn" } };

          dispatch(fetchCategories(uid)).then(dispatch(fetchTasks(uid)));
          dispatch(userAdded(text));
        })
        .catch((error) => {
          setStatus("idle");
          const errorCode = error.code;
          console.log(errorCode);
          const userMessage = ErrorMessages(errorCode);
          setError(userMessage);
        });
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

  let errorMessage = error ? (
    <div>
      <p style={{ color: "red" }}>{error}</p>
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
      {errorMessage}
    </Card>
  );
};

export default SignUp;
