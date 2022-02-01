import { Fragment } from "react";
import TaskList from "../../features/tasklist/TaskList";
import Filters from "../../features/tasklist/filters/Filters";

const TaskListPage = () => {
  return (
    <Fragment>
      <Filters />
      <TaskList />
    </Fragment>
  );
};

export default TaskListPage;
