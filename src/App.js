/**The main page of the website - handles the routing of the other pages */
/**TODO: add authentication and a login page */
/**TODO: add a home page */
/**TODO: add a nav bar */
/**TODO: add a user settings page */
import React from "react";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Route, Switch } from "react-router-dom";
import Layout from "./features/layout/Layout";
import CreateCategoryPage from "./pages/tasks/CreateCategoryPage";
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import AllTasksPage from "./pages/tasks/AllTasksPage";
import HomePage from "./pages/tasks/HomePage";

function App() {
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
}

export default App;
