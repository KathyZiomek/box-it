/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import { useState, useRef } from "react";
import Success from "../../ui/Success";
import Card from "../../ui/Card";

/**Accepts props from CreateCategory.js */
function NewCategoryForm(props) {
  const [newCategory, setNewCategory] = useState(false);

  /**Setting refs for the inputs */
  const categoryInputRef = useRef();
  const typeInputRef = useRef();
  const colorInputRef = useRef();

  function newCategoryHandler() {
    setNewCategory(true);
  }

  function closeSuccessMessage() {
    setNewCategory(false);
  }

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */
  function submitHandler(event) {
    /**Avoid the default response from the browser */
    event.preventDefault();

    /**get the refs for entered values */
    const enteredCategory = categoryInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredColor = colorInputRef.current.value;

    /**TODO: remove hard-coded sample tasklist data */
    const categoryData = {
      name: enteredCategory,
      type: enteredType,
      color: enteredColor,
      tasklist: [
        { name: "Test 1", duedate: "date" },
        { name: "Test 2", duedate: "date" },
      ],
    };

    /**sending the taskData up to CreateCategory.js page so it can be sent to firebase */
    props.onAddCategory(categoryData);
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <hr />
        <label htmlFor="categoryName">Category Name</label>
        <br />
        <input
          type="text"
          id="categoryName"
          placeholder="Enter category name here..."
          onClick={closeSuccessMessage}
          ref={categoryInputRef}
        />
        <br />
        {/* TODO: have the category types be dynamically generated in the drop down from Firebase */}
        <label htmlFor="categoryType">Type</label>
        <br />
        <select
          name="categoryType"
          id="categoryType"
          ref={typeInputRef}
          onClick={closeSuccessMessage}
        >
          <option value="school">School</option>
          <option value="personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <br />
        {/* TODO: figure out how to output sample colors in a dropdown in this form */}
        {/* TODO: have the category colours be dynamically generated in the drop down from Firebase */}
        <label htmlFor="categoryColor">Color</label>
        <br />
        <select
          name="categoryColor"
          id="categoryColor"
          ref={colorInputRef}
          onClick={closeSuccessMessage}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <br />
        <button onClick={newCategoryHandler}>Submit</button>
      </form>
      {newCategory && <Success onClick={closeSuccessMessage} />}
    </Card>
  );
}

export default NewCategoryForm;
