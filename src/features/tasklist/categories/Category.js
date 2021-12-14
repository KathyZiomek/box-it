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

import classes from "./Category.module.css";

//Destructure `props.id` since we only need the ID value
const Category = ({ id }) => {
  const filterStatus = useSelector((state) => state.filters.status);
  const allTasks = useSelector((state) => selectTasks(state));
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name, color } = category;

  const [status, setStatus] = useState("idle");
  const [isToggled, setToggled] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  const categoryInputRef = useRef();
  const colorInputRef = useRef();

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
    setToggled(false);
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
    if (!isEditing) {
      setEditing(true);
      setIsDeleting(false);
      setToggled(false);
    } else {
      setEditing(false);
    }
  };

  const updateHandler = (event) => {
    event.preventDefault();

    const enteredCategory = categoryInputRef.current.value;
    const enteredColor = colorInputRef.current.value;
    const trimmedCategory = enteredCategory.trim();
    const trimmedColor = enteredColor.trim();

    let text = {
      id: category.id,
      ...(trimmedCategory !== name && { name: trimmedCategory }),
      ...(trimmedColor !== color && { color: trimmedColor }),
    };

    if (text.name === undefined && text.color === undefined) {
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

  let toggle =
    isToggled && !isDeleting ? (
      <div>
        <Button
          style={{ border: category.color, background: category.color }}
          onClick={onEdit}
        >
          Edit Category
        </Button>
        <Button
          style={{ border: category.color, background: category.color }}
          onClick={onDelete}
        >
          Delete Category
        </Button>
        <hr />
      </div>
    ) : null;

  let categoryAppearance = !isEditing ? (
    <div className={classes.categoryDiv}>
      <h3
        id={category.id}
        onClick={handleToggled}
        className={classes.categoryTitle}
        style={{
          background: category.color,
        }}
      >
        {name}
      </h3>
      {toggle}

      {isDeleting && (
        <div>
          <DeleteModal />
          <Button
            style={{ border: category.color, background: category.color }}
            onClick={confirmDelete}
          >
            Confirm
          </Button>
          <Button
            style={{ border: category.color, background: category.color }}
            onClick={cancelDelete}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  ) : (
    <form onSubmit={updateHandler} className={classes.editingForm}>
      <div className={classes.categoryDiv}>
        <div id={category.id}>
          <InputText
            id={category.id}
            defaultValue={name}
            ref={categoryInputRef}
          />
        </div>
        <label htmlFor="categoryColor">Category Color </label>
        <input
          type="color"
          id="categoryColor"
          ref={colorInputRef}
          defaultValue={color}
        />
        <div>
          <Button
            style={{ border: category.color, background: category.color }}
          >
            Update Category
          </Button>
          <Button
            style={{ border: category.color, background: category.color }}
            onClick={onEdit}
          >
            Cancel
          </Button>
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

/**TODO: add styling for the categories */
