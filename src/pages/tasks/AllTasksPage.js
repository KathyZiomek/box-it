/**This file contains the AllTasksPage component which outputs all existing tasks */

import TaskList from "../../features/tasklist/TaskList";
import Card from "../../features/ui/Card";

const AllTasksPage = () => {
  return (
    <Card>
      <h1>Your Task List</h1>
      <hr />
      <TaskList />
    </Card>
  );
};

export default AllTasksPage;

// /**TODO: add a case where the user has no existing tasks or categories*/
// /**TODO: add a case where the user has tasks but no categories */
// /**TODO: add a case where the user has categories but no tasks */
