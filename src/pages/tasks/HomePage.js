//**TODO: after creating SignUp and Login components, create logic to display either one depending on user's choices */

import { Fragment, useState } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

import Login from "../../features/authentication/Login";
import SignUp from "../../features/authentication/SignUp";

const HomePage = () => {
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

  // const dfooter = !isLoggingIn ? (
  //   <Button onClick={loginButton}>Login</Button>
  // ) : (
  //   <Login />
  // );

  //   <br />
  // <div>
  //   <Button
  //     label="Not registered yet? Create an Account here."
  //     className="p-button-link"
  //   />
  // </div>
  const footer = () => {
    if (!isLoggingIn && !isSigningUp) {
      return <Button onClick={loginButton}>Login</Button>;
    } else if (isLoggingIn) {
      return (
        <Fragment>
          <Login />
          <div>
            <Button
              onClick={signupButton}
              label="Not registered yet? Create an Account here."
              className="p-button-link"
            />
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
            />
          </div>
        </Fragment>
      );
    }
  };

  return (
    <Card footer={footer}>
      <h1>Box It</h1>
      <div>
        <p>
          Life can get pretty stressful. We all have tasks we need to keep track
          of - whether they are household chores or school deadlines. What's the
          best way to keep all these tasks organized? It's simple - Box It!
        </p>
        <p>
          Box It helps you organize tasks using categories that are kept in
          colour-coordinated boxes. Mark tasks as complete using checkboxes. And
          most importantly - while we keep your tasks in a box, we won't keep
          you in a box. You get to customize your colour scheme and categories
          as much as you want.
        </p>
      </div>
    </Card>
  );
};

export default HomePage;
