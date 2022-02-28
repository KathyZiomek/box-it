/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */
import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { CategoryFormName } from "./categoryFormPieces/CategoryFormName";
import { CategoryFormColor } from "./categoryFormPieces/CategoryFormColor";

import { saveNewCategory } from "../tasklistPieces/categories/categorySlice";

import { UIButton } from "../../../ui/uiPieces/UIButton";

import { Toast } from "primereact/toast";

const CreateCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("idle");
  const [color, setColor] = useState("#1976D2");
  const [categoryWarning, setCategoryWarning] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null);

  const handleClick = () => {
    if (categoryWarning === true) {
      setCategoryWarning(false);
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  /**Future TODO: add data validation for new category information */

  const submitHandler = (event) => {
    event.preventDefault();
    toast.current.show({
      severity: "info",
      detail: "Submitting Category...",
      life: 500,
    });
    setStatus("loading");

    const enteredCategory = newCategory;
    const enteredColor = color;

    if (enteredCategory.length !== 0) {
      const trimmedCategory = enteredCategory.trim();
      const trimmedColor = enteredColor.trim();

      const newCategory = {
        name: trimmedCategory,
        color: trimmedColor,
      };

      const submitCategory = async () => {
        const response = await dispatch(saveNewCategory(newCategory));

        if (response.type === "categories/saveNewCategory/rejected") {
          setStatus("idle");
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Category Could Not Be Added",
            life: 1000,
          });
        } else if (response.type === "categories/saveNewCategory/fulfilled") {
          setNewCategory("");
          setColor("#1976D2");
          setStatus("idle");
          setCategoryWarning(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Category Added",
            life: 1000,
          });
        }
      };
      const toastComplete = () => {
        setTimeout(submitCategory, 500);
      };

      toastComplete();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could Not Submit Category",
        life: 800,
      });
      setCategoryWarning(true);
      setStatus("idle");
      return;
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter category name here...";

  return (
    <form onSubmit={submitHandler}>
      <Toast ref={toast} />
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
          isLoading={isLoading}
        />
        <UIButton
          width="15rem"
          icon="pi pi-check"
          label="Add New Category"
          onClick={handleClick}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default CreateCategoryForm;
