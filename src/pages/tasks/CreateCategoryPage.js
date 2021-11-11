/**This file contains the component that outputs the page with the create a category form */

import NewCategoryForm from "../../features/tasklist/forms/NewCategoryForm";
import Card from "../../features/ui/Card";

const CreateCategoryPage = () => {
  return (
    <Card>
      <h1>Create a Category</h1>
      <NewCategoryForm />
    </Card>
  );
};

export default CreateCategoryPage;
