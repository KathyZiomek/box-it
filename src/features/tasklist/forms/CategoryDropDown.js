/**This file handles the component that creates the dropdown with the existing category names that is output in the NewTaskForm component -> CreateTask page */
import React, { useState } from "react";
import { Fragment } from "react";

import { useSelector } from "react-redux";

import { selectCategories } from "../categories/categorySlice";

import { Dropdown } from "primereact/dropdown";

const CategoryDropDown = React.forwardRef((props, ref) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const [category, setCategory] = useState();
  const categories = useSelector(selectCategories);
  console.log(categories);

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

  return (
    <Fragment>
      <Dropdown
        options={categorySelectItems}
        placeholder="Select a Category"
        onChange={(e) => setCategory(e.value)}
        ref={ref}
        value={category}
      />
    </Fragment>
  );
});

export default CategoryDropDown;
