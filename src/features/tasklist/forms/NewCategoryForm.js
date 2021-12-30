/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Success from "../../ui/Success";

import { saveNewCategory } from "../categories/categorySlice";

import { selectUserIds } from "../../authentication/userSlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [color, setColor] = useState("#1976D2");
  const dispatch = useDispatch();

  const handleClick = () => {
    setSuccess("idle");
  };

  const handleCategoryChange = (e) => setNewCategory(e.target.value);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const categoryInputRef = useRef();
  const colorInputRef = useRef();
  const user = useSelector(selectUserIds);

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredCategory = categoryInputRef.current.value;
    const enteredColor = colorInputRef.current.value;

    const trimmedCategory = enteredCategory.trim();
    const trimmedColor = enteredColor.trim();

    const text = {
      name: trimmedCategory,
      color: trimmedColor,
      uid: user[0],
    };

    if (trimmedCategory.length !== 0) {
      setStatus("loading");
      await dispatch(saveNewCategory(text));
      setNewCategory("");
      setColor("#1976D2");
      setStatus("idle");
      setSuccess("success");
    } else {
      return;
    }
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
      <div>
        <label htmlFor="categoryName">Category Name</label>
        <br />
        <InputText
          type="text"
          id="categoryName"
          required
          placeholder={placeholder}
          value={newCategory}
          onChange={handleCategoryChange}
          ref={categoryInputRef}
          disabled={isLoading}
          onClick={handleClick}
        />
      </div>
      <div>
        <label htmlFor="categoryColor">Category Color </label>
        <input
          type="color"
          id="categoryColor"
          ref={colorInputRef}
          value={color}
          onChange={handleColorChange}
        />
      </div>
      <Button>Submit</Button>
      {loader}
      {submitted}
    </form>
  );
};

export default NewCategoryForm;
