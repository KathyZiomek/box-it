/**This file contains the component that outputs the page with the create a category form */

import NewCategoryForm from "../../features/tasklist/forms/NewCategoryForm";

function CreateCategoryPage() {
  /*send submitted new category data to firebase */
  function addCategoryHandler(categoryData) {
    fetch("https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <div>
      <h1>Create a Category</h1>
      <NewCategoryForm onAddCategory={addCategoryHandler} />
    </div>
  );
}

export default CreateCategoryPage;
