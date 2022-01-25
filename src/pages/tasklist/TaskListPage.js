import { Fragment } from "react";
import TaskList from "../../features/tasklist/TaskList";
import FilterButtons from "../../features/filters/FilterButtons";

const TaskListPage = () => {
  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>Your Task List</h1>
      <hr />
      <TaskList />
      <FilterButtons />
    </Fragment>
  );
};

export default TaskListPage;
