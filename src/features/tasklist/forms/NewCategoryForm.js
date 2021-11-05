/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Card from "../../ui/Card";

const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();

  //listen for the enter key
  //TODO: change this behaviour (listening for the enter key) to listening for the submit button click
  const handleChange = (e) => setNewCategory(e.target.value);

  // /**Setting refs for the inputs */
  const categoryInputRef = useRef();

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */
  const submitHandler = (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    // /**get the refs for entered values */
    const enteredCategory = categoryInputRef.current.value;

    const trimmedCategory = enteredCategory.trim();
    //If the user pressed the enter key
    if (trimmedCategory) {
      //dispatch the "category added" action with this text
      dispatch({ type: "tasklist/categoryAdded", payload: trimmedCategory });
      //and clear out the text input
      setNewCategory("");
    }
  };

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
          value={newCategory}
          onChange={handleChange}
          ref={categoryInputRef}
        />
        <br />
        <button>Submit</button>
      </form>
    </Card>
  );
};

export default NewCategoryForm;
