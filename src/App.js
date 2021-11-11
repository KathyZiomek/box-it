/**The main page of the website - handles the routing of the other pages */
/**TODO: add authentication and a login page */
/**TODO: add a home page */
/**TODO: add a nav bar */
/**TODO: add a user settings page */

import { Route, Switch } from "react-router-dom";
import Layout from "./features/layout/Layout";
//import TaskList from "./features/tasklist/TaskList";
import CreateCategoryPage from "./pages/tasks/CreateCategoryPage";
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import AllTasksPage from "./pages/tasks/AllTasksPage";

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
        <Route path="/">
          <AllTasksPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
