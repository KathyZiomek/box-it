/**This component outputs the category titles in the task list */

import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory, selectCategoryById } from "./categorySlice";
import { deleteTask, selectTasks } from "../tasks/taskSlice";
import DeleteModal from "../../ui/DeleteModal";

//Destructure `props.id` since we only need the ID value
const Category = ({ id }) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const [isToggled, setToggled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const category = useSelector((state) => selectCategoryById(state, id));

  const { name } = category;

  //get all current tasks
  const allTasks = useSelector((state) => selectTasks(state));

  const dispatch = useDispatch();

  const onDelete = () => {
    setIsDeleting(true);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const confirmDelete = () => {
    //if the task is under the category that will be deleted, dispatch that delete action
    allTasks.forEach((task) => {
      if (task.category === category.id) {
        dispatch(deleteTask(task.id));
      }
    });
    dispatch(deleteCategory(category.id));
    setIsDeleting(false);
  };

  const handleToggled = () => {
    if (isToggled) {
      setToggled(false);
    } else {
      if (isDeleting) {
        return;
      } else {
        setToggled(true);
      }
    }
  };

  let toggle = isToggled ? (
    <div>
      <button onClick={onDelete}>Delete Category</button>
    </div>
  ) : null;

  return (
    <div>
      <h3 id={category.id} onClick={handleToggled}>
        {name}
        {toggle}
      </h3>
      {isDeleting && (
        <div>
          <DeleteModal />
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
  // } else if (filteredCategories.length === 0) {
  //   if (filterStatus === "active") {
  //     return (
  //       <div>
  //         <p>There are currently no active tasks.</p>
  //       </div>
  //     );
  //   } else if (filterStatus === "completed") {
  //     return (
  //       <div>
  //         <p>There are currently no completed tasks.</p>
  //       </div>
  //     );
  //   }
  //   return;
  // } else if (filterStatus === "all") {
  //   console.log("all active");
  //   return null;
  // } else {
  //   console.log("test");
  //   return null;
  // }
};

export default Category;

/**TODO: add extra information for the category that is shown when you click on the title (type) */
/**TODO: add styling for the categories */

//TODO: add a reducer to handle toggling the category, then uncomment
// const handleCompletedChange = () => {
//   dispatch({type: 'categories/categoryToggled', payload: category.id})
// }
