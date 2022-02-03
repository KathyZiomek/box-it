import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAuth, signInAnonymously } from "firebase/auth";
import { ReturnUid } from "../api/Firebase";

import ErrorMessages from "../features/authentication/ErrorMessages";

import { selectUsers, userAdded } from "../features/authentication/userSlice";
import { fetchCategories } from "../features/tasklist/tasklistPieces/categories/categorySlice";
import { fetchTasks } from "../features/tasklist/tasklistPieces/tasks/taskSlice";

import { UIButton } from "../ui/uiPieces/UIButton";

import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  LoggingInButtons,
  SigningUpButtons,
} from "../features/authentication/authPieces/HomePageButtons";
// import { AnonymousLogin } from "../features/authentication/AnonymousLogin";

const HomePage = () => {
  window.history.replaceState(null, "Box-It", "/");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const loginButton = () => {
    setIsSigningUp(false);
    setIsLoggingIn(true);
  };

  const signupButton = () => {
    setIsLoggingIn(false);
    setIsSigningUp(true);
  };

  // const anonymousLogin = () => {
  //   <AnonymousLogin />;
  // };

  const anonymousLogin = (event) => {
    setStatus("loading");
    event.preventDefault();

    const auth = getAuth();
    signInAnonymously(auth)
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
        // const errorMessage = error.message;
        setErrorMessage(ErrorMessages(errorCode));
        setSuccess(false);
      });
  };

  const userCount = useSelector(selectUsers);

  let userExists =
    userCount.length === 1 && userCount[0].status === "loggedIn" ? true : false;

  const footer = () => {
    if (userExists === true) {
      return null;
    } else if (!isLoggingIn && !isSigningUp) {
      return (
        <UIButton
          width="15rem"
          margin={10}
          icon="pi pi-check"
          label="Enter"
          onClick={loginButton}
        />
      );
    } else if (isLoggingIn) {
      return (
        <LoggingInButtons
          signupButton={signupButton}
          anonymousLogin={anonymousLogin}
          loader={loader}
          success={success}
          errorMessage={errorMessage}
        />
      );
    } else if (isSigningUp) {
      return (
        <SigningUpButtons
          loginButton={loginButton}
          anonymousLogin={anonymousLogin}
          loader={loader}
          success={success}
          errorMessage={errorMessage}
        />
      );
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <Card footer={footer}>
      <h1>Box It</h1>
      {!userExists ? (
        <div>
          <p>
            Life can get pretty stressful. We all have tasks we need to keep
            track of - whether they are household chores or school deadlines.
            What's the best way to keep all these tasks organized? It's simple -
            Box It!
          </p>
          <p>
            Box It helps you organize tasks using categories that are kept in
            colour-coordinated boxes. Mark tasks as complete using checkboxes.
            And most importantly - while we keep your tasks in a box, we won't
            keep you in a box. You get to customize your colour scheme and
            categories as much as you want.
          </p>
        </div>
      ) : (
        <div>
          <p>Welcome!</p>
          <p>To get started, select an option from the navigation bar.</p>
        </div>
      )}
    </Card>
  );
};

export default HomePage;
