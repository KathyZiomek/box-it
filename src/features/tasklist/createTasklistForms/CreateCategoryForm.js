/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import InfoMessage from "../../../ui/uiPieces/InfoMessage";

import { CategoryFormName } from "./categoryFormPieces/CategoryFormName";
import { CategoryFormColor } from "./categoryFormPieces/CategoryFormColor";

import { saveNewCategory } from "../tasklistPieces/categories/categorySlice";

import { UIButton } from "../../../ui/uiPieces/UIButton";
import { ProgressSpinner } from "primereact/progressspinner";
import Modal from "../../../ui/uiPieces/Modal";

const CreateCategoryForm = () => {
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

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredCategory = newCategory;
    const enteredColor = color;

    if (enteredCategory.length !== 0) {
      const trimmedCategory = enteredCategory.trim();
      const trimmedColor = enteredColor.trim();

      const newCategory = {
        name: trimmedCategory,
        color: trimmedColor,
      };

      setStatus("loading");
      const response = await dispatch(saveNewCategory(newCategory));

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
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter category name here...";
  let loader = isLoading ? (
    <Modal>
      <div className="p-d-flex p-jc-between">
        <ProgressSpinner />
      </div>
    </Modal>
  ) : null;

  let message = null;
  if (success === true) {
    message = <InfoMessage severity="success" summary="Success!" />;
  } else if (success === false) {
    message = <InfoMessage severity="error" message={"Submit Failed."} />;
  } else if (success === "idle") {
    message = null;
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="p-fluid">
        <CategoryFormName
          placeholder={placeholder}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          isLoading={isLoading}
          handleClick={handleClick}
          categoryWarning={categoryWarning}
        />
        <CategoryFormColor
          color={color}
          handleClick={handleClick}
          handleColorChange={handleColorChange}
          setColor={setColor}
        />
        <UIButton
          width="15rem"
          icon="pi pi-check"
          label="Add New Category"
          onClick={handleClick}
        />
        {loader}
        {message}
      </div>
    </form>
  );
};

export default CreateCategoryForm;
