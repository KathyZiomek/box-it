/**TODO: create Login component */

import { useRef, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // let placeholder = isLoading ? "" : "Enter email here...";

  return (
    <Card title="Login Form">
      <form>
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
        <Button>Login</Button>
      </form>
    </Card>
  );
};

export default Login;
