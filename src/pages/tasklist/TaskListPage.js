import { Fragment } from "react";
import TaskList from "../../features/tasklist/TaskList";
import FilterButtons from "../../features/tasklist/filters/FilterButtons";

const TaskListPage = () => {
  return (
    <Fragment>
      <FilterButtons />
      {/* <h1 style={{ textAlign: "center" }}>Your Task List</h1>
      <hr /> */}
      <TaskList />
    </Fragment>
  );
};

export default TaskListPage;
