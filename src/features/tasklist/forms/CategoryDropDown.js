/**This file handles the component that creates the dropdown with the existing category names that is output in the NewTaskForm component -> CreateTask page */
import React from "react";
import { Fragment } from "react";

import { useSelector /*, useDispatch*/ } from "react-redux";

const selectCategoryById = (state, categoryId) => {
  return state.categories.find((category) => category.id === categoryId);
};

const CategoryDropDown = ({ id }) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name } = category;

  return (
    <Fragment>
      <option id={category.id} value={category.id}>
        {name}
      </option>
    </Fragment>
  );
};

export default CategoryDropDown;
