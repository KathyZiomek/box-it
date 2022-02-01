/**The main page of the website - handles the routing of the other pages */

/**TODO: add a user settings page */
import React from "react";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
//TODO: replace with
// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import "react-transition-group";
import "./index.css";

import { Route, Switch } from "react-router-dom";
import Layout from "./ui/layout/Layout";
import CreateCategoryPage from "./pages/tasklist/CreateCategoryPage";
import CreateTaskPage from "./pages/tasklist/CreateTaskPage";
import TaskListPage from "./pages/tasklist/TaskListPage";
import DeleteAllPage from "./pages/tasklist/DeleteAllPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import HomePage from "./pages/HomePage";

import { useSelector } from "react-redux";
import { selectUsers } from "./features/authentication/userSlice";

import PrimeReact from "primereact/api";

PrimeReact.ripple = true;
PrimeReact.cssTransition = true; // Default value is true.

function App() {
  const userCount = useSelector(selectUsers);

  let isLoggedIn =
    userCount.length === 1 && userCount[0].status === "loggedIn" ? true : null;

  if (isLoggedIn) {
    return (
      <Layout>
        <Switch>
          <Route path="/create-category">
            <CreateCategoryPage />
          </Route>
          <Route path="/create-task">
            <CreateTaskPage />
          </Route>
          <Route path="/tasklist">
            <TaskListPage />
          </Route>
          <Route path="/delete-all">
            <DeleteAllPage />
          </Route>
          <Route path="/user-settings">
            <UserSettingsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Layout>
    );
  } else if (!isLoggedIn) {
    return (
      <Layout>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Layout>
    );
  }
}

export default App;
