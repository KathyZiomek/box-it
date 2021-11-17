/**This component outputs the category titles in the task list */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryDeleted, selectCategoryById } from "./categorySlice";

//Destructure `props.id` since we only need the ID value
const Category = ({ id }) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name } = category;

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(categoryDeleted(category.id));
  };

  return (
    <div>
      <h3 id={category.id}>
        {name} <button onClick={onDelete}>Delete Category</button>
      </h3>
    </div>
  );
};

export default Category;

/**TODO: add the ability to delete an entire category with all tasks */
/**TODO: add extra information for the category that is shown when you click on the title (type) */
/**TODO: add styling for the categories */

//TODO: add a reducer to handle toggling the category, then uncomment
// const handleCompletedChange = () => {
//   dispatch({type: 'categories/categoryToggled', payload: category.id})
// }
