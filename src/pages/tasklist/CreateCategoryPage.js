import CreateCategoryForm from "../../features/tasklist/createTasklistForms/CreateCategoryForm";

import { Card } from "primereact/card";

const CreateCategoryPage = () => {
  return (
    <Card>
      <h1>Create a Category</h1>
      <CreateCategoryForm />
    </Card>
  );
};

export default CreateCategoryPage;
