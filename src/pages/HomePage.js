import { useState } from "react";

import { useSelector } from "react-redux";

import { selectUsers } from "../features/authentication/userSlice";

import { UIButton } from "../ui/uiPieces/UIButton";
import {
  LoggingInButtons,
  SigningUpButtons,
} from "../features/authentication/authPieces/HomePageButtons";
import Modal from "../ui/uiPieces/Modal";

import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

const HomePage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
          setStatus={setStatus}
          setErrorMessage={setErrorMessage}
          setSuccess={setSuccess}
          loader={loader}
          success={success}
          errorMessage={errorMessage}
        />
      );
    } else if (isSigningUp) {
      return (
        <SigningUpButtons
          loginButton={loginButton}
          setStatus={setStatus}
          setErrorMessage={setErrorMessage}
          setSuccess={setSuccess}
          loader={loader}
          success={success}
          errorMessage={errorMessage}
        />
      );
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <Modal>
      <Card title="Loading...">
        <ProgressBar mode="indeterminate" />
      </Card>
    </Modal>
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
            Box It helps you organize tasks in color-coordinated categories. And
            most importantly - while we keep your tasks in a box, we won't keep
            you in a box. You get to do unlimited customizations to your color
            scheme, categories, and tasks.
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
