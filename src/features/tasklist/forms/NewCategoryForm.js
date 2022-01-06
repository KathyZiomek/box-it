/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import Success from "../../ui/Success";
import Failure from "../../ui/Failure";

import { saveNewCategory } from "../categories/categorySlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [color, setColor] = useState("#1976D2");
  const [categoryWarning, setCategoryWarning] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (categoryWarning === true) {
      setCategoryWarning(false);
    }
    setSuccess("idle");
  };

  const handleCategoryChange = (e) => setNewCategory(e.target.value);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const categoryInputRef = useRef();
  const colorInputRef = useRef();

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredCategory = categoryInputRef.current.value;
    const enteredColor = colorInputRef.current.value;

    if (enteredCategory.length !== 0) {
      const trimmedCategory = enteredCategory.trim();
      const trimmedColor = enteredColor.trim();

      const text = {
        name: trimmedCategory,
        color: trimmedColor,
      };

      if (trimmedCategory.length !== 0) {
        setStatus("loading");
        const response = await dispatch(saveNewCategory(text));

        if (response.type === "categories/saveNewCategory/rejected") {
          setSuccess(false);
          setStatus("idle");
        } else if (response.type === "categories/saveNewCategory/fulfilled") {
          setNewCategory("");
          setColor("#1976D2");
          setStatus("idle");
          setSuccess(true);
          setCategoryWarning(false);
        }
      } else {
        setCategoryWarning(true);
        setSuccess(false);
        setStatus("idle");
        return;
      }
    } else {
      setCategoryWarning(true);
      setSuccess(false);
      setStatus("idle");
      return;
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter category name here...";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  let message = null;
  if (success === true) {
    message = <Success />;
  } else if (success === false) {
    message = <Failure />;
  } else if (success === "idle") {
    message = null;
  }

  return (
    <form onSubmit={submitHandler}>
      <hr />
      <div>
        <label htmlFor="categoryName">Category Name</label>
        <br />
        <InputText
          type="text"
          id="categoryName"
          // required
          placeholder={placeholder}
          value={newCategory}
          onChange={handleCategoryChange}
          ref={categoryInputRef}
          disabled={isLoading}
          onClick={handleClick}
        />
        {categoryWarning && (
          <Message severity="error" text="Category cannot be empty" />
        )}
      </div>
      <div>
        <label htmlFor="categoryColor">Category Color </label>
        <input
          type="color"
          id="categoryColor"
          ref={colorInputRef}
          value={color}
          onClick={handleClick}
          onChange={handleColorChange}
        />
      </div>
      <Button onClick={handleClick}>Submit</Button>
      {loader}
      {message}
    </form>
  );
};

export default NewCategoryForm;
