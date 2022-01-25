import NewTaskForm from "../../features/tasklist/forms/NewTaskForm";
import { Card } from "primereact/card";

const CreateTaskPage = () => {
  return (
    <Card>
      <h1>Create a Task</h1>
      <NewTaskForm />
    </Card>
  );
};
export default CreateTaskPage;
