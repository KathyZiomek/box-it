/**This component outputs the category titles in the task list */
import { React, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCategory,
  selectCategoryById,
  updateCategory,
} from "./categorySlice";
import { deleteTask, selectTasks } from "../tasks/taskSlice";

import DeleteModal from "../../ui/DeleteModal";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

//Destructure `props.id` since we only need the ID value
const Category = ({ id }) => {
  //call our `selectCategoryById` with the state _and_ the ID value
  const filterStatus = useSelector((state) => state.filters.status);
  const allTasks = useSelector((state) => selectTasks(state));
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name } = category;

  const [color, setColor] = useState(category.color);
  console.log(color);
  const [status, setStatus] = useState("idle");
  const [isToggled, setToggled] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  if (filterStatus !== filter) {
    setFilter(filterStatus);
    setEditing(false);
    setToggled(false);
  }

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

  const onEdit = (event) => {
    event.preventDefault();
    !isEditing ? setEditing(true) : setEditing(false);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const categoryInputRef = useRef();
  const colorInputRef = useRef();

  const updateHandler = (event) => {
    event.preventDefault();
    const enteredCategory = categoryInputRef.current.value;
    const enteredColor = colorInputRef.current.value;

    const trimmedCategory = enteredCategory.trim();
    const trimmedColor = enteredColor.trim();

    let text = {
      id: category.id,
      ...(trimmedCategory !== category.name && { name: trimmedCategory }),
      ...(trimmedColor !== category.color && { color: trimmedColor }),
    };

    if (text.name === undefined) {
      setEditing(false);
    } else {
      setStatus("loading");
      dispatch(updateCategory(text));
      setStatus("idle");
      setEditing(false);
    }
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
      <Button onClick={onEdit}>Edit Category</Button>
      <Button onClick={onDelete}>Delete Category</Button>
    </div>
  ) : null;

  let categoryAppearance = !isEditing ? (
    <div>
      <h3 id={category.id} onClick={handleToggled}>
        {name}
        {toggle}
      </h3>
      {isDeleting && (
        <div>
          <DeleteModal />
          <Button onClick={confirmDelete}>Confirm</Button>
          <Button onClick={cancelDelete}>Cancel</Button>
        </div>
      )}
    </div>
  ) : (
    <form onSubmit={updateHandler}>
      <div>
        <h3 id={category.id}>
          <InputText
            id={category.id}
            defaultValue={name}
            ref={categoryInputRef}
          />
        </h3>
        <label htmlFor="categoryColor">Category Color </label>
        <input
          type="color"
          id="categoryColor"
          ref={colorInputRef}
          value={color}
          onChange={handleColorChange}
        />
        <div>
          <Button>Update Category</Button>
          <Button onClick={onEdit}>Cancel</Button>
        </div>
      </div>
    </form>
  );

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <div>
      {categoryAppearance}
      {loader}
    </div>
  );
};

export default Category;

/**TODO: add extra information for the category that is shown when you click on the title (type) */
/**TODO: add styling for the categories */
