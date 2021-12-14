/**This file contains the AllTasksPage component which outputs all existing tasks */

import { Fragment } from "react";
import TaskList from "../../features/tasklist/TaskList";
// import Card from "../../features/ui/Card";
import FilterButtons from "../../features/filters/FilterButtons";

const AllTasksPage = () => {
  return (
    <Fragment>
      <h1>Your Task List</h1>
      <hr />
      <TaskList />
      <FilterButtons />
    </Fragment>
  );
};

export default AllTasksPage;
