/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { saveNewCategory } from "../categories/categorySlice";

const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();

  //identify the last ID value

  //listen for the enter key
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

    // Create the thunk function and immediately dispatch it
    dispatch(saveNewCategory(trimmedCategory));
    //and clear out the text input
    setNewCategory("");
  };

  return (
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
        required
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default NewCategoryForm;
