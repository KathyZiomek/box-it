//**TODO: after creating SignUp and Login components, create logic to display either one depending on user's choices */

import { useState } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

import Login from "../../features/authentication/Login";

const HomePage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginButton = () => {
    setIsLoggingIn(true);
  };

  const footer = !isLoggingIn ? (
    <Button onClick={loginButton}>Login</Button>
  ) : (
    <Login />
  );

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
