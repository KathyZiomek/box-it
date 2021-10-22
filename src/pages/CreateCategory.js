import { useState } from "react";
import Success from "../components/ui/Success";

function CreateCategoryPage() {
  const [newCategory, setNewCategory] = useState(false);

  function newCategoryHandler() {
    setNewCategory(true);
  }

  function closeSuccessMessage() {
    setNewCategory(false);
  }

  return (
    <div>
      <h1>Create a Category</h1>
      <div>
        <hr />
        <label htmlFor="categoryName">Category Name</label>
        <br />
        <input
          type="text"
          id="categoryName"
          placeholder="Enter category name here..."
          onClick={closeSuccessMessage}
        />
        <br />
        <button onClick={newCategoryHandler}>Submit</button>
        {newCategory && <Success onClick={closeSuccessMessage} />}
      </div>
    </div>
  );
}

export default CreateCategoryPage;
