/**This file handles the component that creates the dropdown with the existing category names that is output in the NewTaskForm component -> CreateTask page */
import React, { useState } from "react";
import { Fragment } from "react";

import { useSelector } from "react-redux";

import { selectCategories } from "../categories/categorySlice";

import { Dropdown } from "primereact/dropdown";

const CategoryDropDown = React.forwardRef((props, ref) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const [category, setCategory] = useState("Select a Category");
  const categories = useSelector(selectCategories);

  let placeholder = props.props;

  console.log(placeholder);

  let currentValue = "";
  if (placeholder.submit === undefined) {
    console.log("test");
    currentValue = placeholder === category ? placeholder : category;
  } else if (placeholder.submit !== undefined) {
    console.log("test");
    if (category !== placeholder.placeholder) {
      console.log("test");
      setCategory("Select a Category");
    }
    console.log("test");
    placeholder = "Select a Category";
    currentValue = placeholder;
  }

  let categorySelectItems = null;
  categorySelectItems = categories.map((category) => {
    if (categorySelectItems === null) {
      return { label: category.name, value: category.id };
    } else {
      return {
        ...categorySelectItems,
        label: category.name,
        value: category.id,
      };
    }
  });

  // console.log("category = " + category + ", placeholder = " + placeholder);
  const handleChange = (e) => {
    setCategory(e.value);
  };

  return (
    <Fragment>
      <Dropdown
        options={categorySelectItems}
        placeholder={placeholder}
        onChange={handleChange}
        ref={ref}
        value={currentValue}
      />
    </Fragment>
  );
});

export default CategoryDropDown;
