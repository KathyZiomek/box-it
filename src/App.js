import { Route, Switch } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import CreateCategory from "./pages/CreateCategory";
import TaskList from "./pages/AllTasks";
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
