import { Fragment, useState } from "react";

import { useSelector } from "react-redux";

import { selectUsers } from "../../features/authentication/userSlice";

import Login from "../../features/authentication/Login";
import SignUp from "../../features/authentication/SignUp";
import { AuthButton } from "../../features/authentication/authPieces/AuthButton";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

const HomePage = () => {
  window.history.replaceState(null, "Box-It", "/");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const loginButton = () => {
    setIsSigningUp(false);
    setIsLoggingIn(true);
  };

  const signupButton = () => {
    setIsLoggingIn(false);
    setIsSigningUp(true);
  };

  const userCount = useSelector(selectUsers);

  let userExists =
    userCount.length === 1 && userCount[0].status === "loggedIn" ? true : false;

  const footer = () => {
    if (userExists === true) {
      return null;
    } else if (!isLoggingIn && !isSigningUp) {
      return (
        <AuthButton
          icon="pi pi-check"
          label="Login"
          handleClick={loginButton}
        />
      );
      // <Button onClick={loginButton}>Login</Button>;
    } else if (isLoggingIn) {
      return (
        <Fragment>
          <Login />
          <div>
            <Button
              onClick={signupButton}
              label="Not registered yet? Create an Account here."
              className="p-button-link"
              // style={{ background: "red" }}
            ></Button>
          </div>
        </Fragment>
      );
    } else if (isSigningUp) {
      return (
        <Fragment>
          <SignUp />
          <div>
            <Button
              onClick={loginButton}
              label="Already registered? Login here."
              className="p-button-link"
            ></Button>
          </div>
        </Fragment>
      );
    }
  };

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
