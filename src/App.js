import { Route, Switch } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import CreateCategory from "./pages/CreateCategory";
import TaskList from "./pages/TaskList";
import TasksNavigation from "./components/layout/TasksNavigation";

function App() {
  return (
    //localhost:3000/
    //box-it.com/
    <div>
      <TasksNavigation />
      <Switch>
        <Route path="/create-category">
          <CreateCategory />
        </Route>
        <Route path="/create-task">
          <CreateTask />
        </Route>
        <Route path="/task-list">
          <TaskList />
        </Route>
      </Switch>

      {/* <CreateCategory />
      <CreateTask />
      <TaskList category="Economics" task="Test 1" />
      <TaskList category="French" task="Pages 100-150" /> */}
    </div>
  );
}

export default App;
