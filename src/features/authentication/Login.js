import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTasks } from "../tasklist/tasks/taskSlice";
import { fetchCategories } from "../tasklist/categories/categorySlice";
import { userAdded } from "./userSlice";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReturnUid } from "../../api/Firebase";

import ErrorMessages from "./ErrorMessages";
import Failure from "../ui/Failure";
import { emailValidation, passwordValidation } from "./userValidation";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Password } from "primereact/password";
import { Message } from "primereact/message";

const Login = () => {
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  // const [error, setError] = useState();
  const [value, setValue] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    if (emailWarning === true && passwordWarning === true) {
      setEmailWarning(false);
      setPasswordWarning(false);
    } else if (emailWarning === true) {
      setEmailWarning(false);
    } else if (passwordWarning === true) {
      setPasswordWarning(false);
    }
    setSuccess("idle");
  };

  const emailInputRef = useRef();

  const onLogin = (event) => {
    setStatus("loading");
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = value;
    const trimmedEmail = enteredEmail.trim();
    const trimmedPassword = enteredPassword.trim();

    if (emailValidation(trimmedEmail) && passwordValidation(trimmedPassword)) {
      /**TODO: add anonymous login: https://firebase.google.com/docs/auth/web/anonymous-auth */

      const auth = getAuth();
      signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
        .then(() => {
          setStatus("idle");
          const uid = ReturnUid(auth);
          const currentUser = { [uid]: { id: uid, status: "loggedIn" } };

          dispatch(userAdded(currentUser));
          dispatch(fetchCategories());
          dispatch(fetchTasks());
        })
        .catch((error) => {
          setStatus("idle");
          const errorCode = error.code;
          setErrorMessage(ErrorMessages(errorCode));
          setSuccess(false);
        });
    } else if (
      emailValidation(enteredEmail) &&
      !passwordValidation(enteredPassword)
    ) {
      setErrorMessage(ErrorMessages("auth/invalid-password"));
      setSuccess(false);
      setPasswordWarning(true);
      setStatus("idle");
      return;
    } else if (
      !emailValidation(enteredEmail) &&
      passwordValidation(enteredPassword)
    ) {
      setErrorMessage(ErrorMessages("auth/invalid-email"));
      setSuccess(false);
      setEmailWarning(true);
      setStatus("idle");
      return;
    } else if (
      !emailValidation(enteredEmail) &&
      !passwordValidation(enteredPassword)
    ) {
      setErrorMessage(ErrorMessages("both invalid"));
      setSuccess(false);
      setEmailWarning(true);
      setPasswordWarning(true);
      setStatus("idle");
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
              placeholder="Email Address"
              ref={emailInputRef}
              disabled={isLoading}
              autoComplete="email"
              onClick={handleClick}
            />
            {emailWarning && (
              <Message severity="error" text="Email requirements not met." />
            )}
          </div>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ellipsis-h"></i>
            </span>
            <Password
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onClick={handleClick}
              placeholder="Password"
              disabled={isLoading}
              autoComplete="current-password"
              toggleMask
              feedback={false}
            />
            {passwordWarning && (
              <Message severity="error" text="Password requirements not met." />
            )}
          </div>
        </div>
        <br />
        <Button>Login</Button>
      </form>
      {loader}
      {!success && <Failure message={errorMessage} />}
    </Card>
  );
};

export default Login;
