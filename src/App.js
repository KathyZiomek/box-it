/**The main page of the website - handles the routing of the other pages */

/**TODO: add a user settings page */
import React from "react";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import "react-transition-group";

// <!-- Dependencies -->
// <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
// <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
// <script src="https://unpkg.com/react-transition-group@4.4.2/dist/react-transition-group.js"></script>

import { Route, Switch } from "react-router-dom";
import Layout from "./features/layout/Layout";
import CreateCategoryPage from "./pages/tasks/CreateCategoryPage";
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import AllTasksPage from "./pages/tasks/AllTasksPage";
import HomePage from "./pages/tasks/HomePage";

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
            <AllTasksPage />
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
