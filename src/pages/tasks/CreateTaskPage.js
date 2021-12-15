/**This file contains the component that outputs the page with the create a task form */

import NewTaskForm from "../../features/tasklist/forms/NewTaskForm";
import { Card } from "primereact/card";
// import Card from "../../features/ui/Card";

const CreateTaskPage = () => {
  return (
    <Card>
      <h1>Create a Task</h1>
      <hr />
      <div>
        <NewTaskForm />
      </div>
    </Card>
  );
};
export default CreateTaskPage;
