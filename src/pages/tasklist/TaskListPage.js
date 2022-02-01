import { Fragment } from "react";
import TaskList from "../../features/tasklist/TaskList";
import Filters from "../../features/tasklist/filters/Filters";

const TaskListPage = () => {
  return (
    <Fragment>
      <Filters />
      {/* <h1 style={{ textAlign: "center" }}>Your Task List</h1>
      <hr /> */}
      <TaskList />
    </Fragment>
  );
};

export default TaskListPage;
