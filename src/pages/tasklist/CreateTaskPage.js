import CreateTaskForm from "../../features/tasklist/createTasklistForms/CreateTaskForm";
import { Card } from "primereact/card";

const CreateTaskPage = () => {
  return (
    <Card>
      <h1>Create a Task</h1>
      <CreateTaskForm />
    </Card>
  );
};
export default CreateTaskPage;
