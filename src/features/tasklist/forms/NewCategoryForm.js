/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import Success from "../../ui/Success";

import { saveNewCategory } from "../categories/categorySlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const dispatch = useDispatch();

  const handleClick = () => {
    setSuccess("idle");
  };

  //listen for the enter key
  const handleChange = (e) => setNewCategory(e.target.value);

  // /**Setting refs for the inputs */
  const categoryInputRef = useRef();

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */
  const submitHandler = async (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    // /**get the refs for entered values */
    const enteredCategory = categoryInputRef.current.value;

    const trimmedCategory = enteredCategory.trim();

    //create and dispatch the thunk function itself
    setStatus("loading");
    //wait for the promise returned by saveNewCategory
    await dispatch(saveNewCategory(trimmedCategory));

    //and clear out the text input
    setNewCategory("");
    setStatus("idle");
    //show a success message to the user
    setSuccess("success");
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter category name here...";
  let loader = isLoading ? (
    <div>
      <p>Submitting...</p>
    </div>
  ) : null;
  let submitted = success === "idle" ? null : <Success />;

  return (
    <form onSubmit={submitHandler}>
      <hr />
      <label htmlFor="categoryName">Category Name</label>
      <br />
      <InputText
        type="text"
        id="categoryName"
        required
        placeholder={placeholder}
        value={newCategory}
        onChange={handleChange}
        ref={categoryInputRef}
        disabled={isLoading}
        onClick={handleClick}
      />
      <br />
      <Button>Submit</Button>
      {loader}
      {submitted}
    </form>
  );
};

export default NewCategoryForm;
