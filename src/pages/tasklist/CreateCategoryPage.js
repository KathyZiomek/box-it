import NewCategoryForm from "../../features/tasklist/forms/NewCategoryForm";

import { Card } from "primereact/card";

const CreateCategoryPage = () => {
  return (
    <Card>
      <h1>Create a Category</h1>
      <NewCategoryForm />
    </Card>
  );
};

export default CreateCategoryPage;
