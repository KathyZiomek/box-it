/**The main page of the website - handles the routing of the other pages */

import React from "react";
import { Suspense } from "react";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
//Future TODO: add a toggle between light and dark mode
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import "react-transition-group";
import "./index.css";

import { Route, Switch } from "react-router-dom";
import Layout from "./ui/layout/Layout";
// import HomePage from "./pages/HomePage";

import { useSelector } from "react-redux";
import { selectUsers } from "./features/authentication/userSlice";

import PrimeReact from "primereact/api";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";

PrimeReact.ripple = true;
PrimeReact.cssTransition = true; // Default value is true.

const HomePage = React.lazy(() => import("./pages/HomePage"));
const CreateCategoryPage = React.lazy(() =>
  import("./pages/tasklist/CreateCategoryPage")
);
const CreateTaskPage = React.lazy(() =>
  import("./pages/tasklist/CreateTaskPage")
);
const TaskListPage = React.lazy(() => import("./pages/tasklist/TaskListPage"));
const DeleteAllPage = React.lazy(() =>
  import("./pages/tasklist/DeleteAllPage")
);
const UserSettingsPage = React.lazy(() => import("./pages/UserSettingsPage"));

function App() {
  const userCount = useSelector(selectUsers);

  let isLoggedIn =
    userCount.length === 1 && userCount[0].status === "loggedIn" ? true : null;

  if (isLoggedIn) {
    return (
      <Layout>
        <Suspense
          fallback={
            <Card>
              <div className="p-d-flex p-jc-between">
                <ProgressSpinner />
              </div>
            </Card>
          }
        >
          <Switch>
            <Route path="/create-category" exact>
              <CreateCategoryPage />
            </Route>
            <Route path="/create-task" exact>
              <CreateTaskPage />
            </Route>
            <Route path="/tasklist" exact>
              <TaskListPage />
            </Route>
            <Route path="/delete-all" exact>
              <DeleteAllPage />
            </Route>
            <Route path="/user-settings" exact>
              <UserSettingsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    );
  } else if (!isLoggedIn) {
    return (
      <Layout>
        <Suspense
          fallback={
            <Card>
              <div className="p-d-flex p-jc-between">
                <ProgressSpinner />
              </div>
            </Card>
          }
        >
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

export default App;
