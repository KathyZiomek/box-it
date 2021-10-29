/**The main page of the website - handles the routing of the other pages */
/**TODO: add authentication and a login page */
/**TODO: add a home page */
/**TODO: add a nav bar */
/**TODO: add a user settings page */

import { Route, Switch } from "react-router-dom";
import CreateTask from "./pages/CreateTaskPage";
import CreateCategory from "./pages/CreateCategoryPage";
import TaskList from "./pages/AllTasksPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/create-category">
          <CreateCategory />
        </Route>
        <Route path="/create-task">
          <CreateTask />
        </Route>
        <Route path="/">
          <TaskList />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
