import { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTasks } from "../tasklist/tasklistPieces/tasks/taskSlice";
import { fetchCategories } from "../tasklist/tasklistPieces/categories/categorySlice";
import { userAdded } from "./userSlice";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReturnUid } from "../../api/Firebase";

import ErrorMessages from "./ErrorMessages";
import InfoMessage from "../../ui/uiPieces/InfoMessage";

import { emailValidation, passwordValidation } from "./userValidation";
import { PasswordInput } from "./authPieces/PasswordInput";
import { UIButton } from "../../ui/uiPieces/UIButton";
import { UIInputText } from "../../ui/uiPieces/UIInputText";

import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onLogin = (event) => {
    setStatus("loading");
    event.preventDefault();

    const enteredEmail = email;
    const enteredPassword = password;
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
          console.log(errorCode);
          if (errorCode.includes("password") && errorCode.includes("email")) {
            setPasswordWarning(true);
            setEmailWarning(true);
          } else if (errorCode.includes("password")) {
            setPasswordWarning(true);
          } else if (errorCode.includes("email")) {
            setEmailWarning(true);
          }
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
    <Card title="Login">
      <form onSubmit={onLogin}>
        <div className="p-fluid">
          <UIInputText
            icon="pi pi-envelope"
            id="email"
            placeholder="Email Address"
            value={email}
            isLoading={isLoading}
            autoComplete="email"
            handleClick={handleClick}
            setValue={setEmail}
            warning={emailWarning}
            errorText="Invalid Email"
          />
          <PasswordInput
            password={password}
            isLoading={isLoading}
            setPassword={setPassword}
            handleClick={handleClick}
            feedback={false}
            passwordWarning={passwordWarning}
          />
        </div>
        <UIButton
          width="15rem"
          margin={10}
          icon="pi pi-check"
          label="Login"
          isLoading={isLoading}
          onClick={handleClick}
        />
      </form>
      {loader}
      {!success && <InfoMessage severity="error" message={errorMessage} />}
    </Card>
  );
};

export default Login;
