import { React, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCategory,
  selectCategoryById,
  updateCategory,
  categoryUpdatedCleared,
  categoryDeletedCleared,
} from "./categorySlice";
import { deleteTask, selectTasks } from "../tasks/taskSlice";

import {
  EditingButtons,
  NotEditingButtons,
} from "./categoryPieces/CategoryButtons";
import { CategoryName } from "./categoryPieces/CategoryName";
import { CategoryColor } from "./categoryPieces/CategoryColor";

import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";

const Category = ({ id }) => {
  const categoryErrorStatus = useSelector((state) => state.categories.error);
  const categoryDeletedStatus = useSelector(
    (state) => state.categories.deleted
  );
  const filterStatus = useSelector((state) => state.filters.status);
  const allTasks = useSelector((state) => selectTasks(state));
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name, color } = category;

  const [status, setStatus] = useState("idle");
  const [newCategoryName, setNewCategoryName] = useState(name);
  const [newCategoryColor, setNewCategoryColor] = useState(color);
  const [categoryWarning, setCategoryWarning] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");

  const toast = useRef(null);

  const dispatch = useDispatch();

  if (filterStatus !== filter) {
    setFilter(filterStatus);
    setEditing(false);
  }

  const cancelDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Delete Canceled",
      life: 1500,
    });
  };

  const confirmDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: `Deleting Category...`,
      life: 500,
    });

    const deleteContent = () => {
      if (categoryErrorStatus !== "idle") {
        dispatch(categoryUpdatedCleared("idle"));
      }
      allTasks.forEach((task) => {
        if (task.category === category.id) {
          dispatch(deleteTask(task.id));
        }
      });
      dispatch(deleteCategory(category.id));
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 600);
    };

    toastComplete();
  };

  const onDelete = () => {
    confirmDialog({
      message: `Deleting a category also deletes all of its tasks. Are you sure you want to continue?`,
      header: "Warning",
      icon: "pi pi-exclamation-triangle",
      accept: () => confirmDelete(),
      reject: () => cancelDelete(),
    });
  };

  const handleClick = () => {
    if (categoryWarning === true) {
      setCategoryWarning(false);
    }
  };

  const onEdit = (event) => {
    event.preventDefault();
    handleClick();
    if (!isEditing) {
      setEditing(true);
    }
  };

  const test = () => {
    handleClick();
    if (isEditing) {
      setEditing(false);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    handleClick();
    if (isEditing) {
      setEditing(false);
    }
    setNewCategoryName(name);
    setNewCategoryColor(color);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    if (categoryDeletedStatus !== "idle") {
      dispatch(categoryDeletedCleared("idle"));
    }

    const enteredCategory = newCategoryName;
    const enteredColor = newCategoryColor;

    if (enteredCategory.length === 0) {
      setCategoryWarning(true);
      setStatus("idle");
      return;
    } else {
      const trimmedCategory = enteredCategory.trim();
      const trimmedColor = enteredColor.trim();

      let updatedCategory = {
        id: category.id,
        ...(trimmedCategory !== name && { name: trimmedCategory }),
        ...(trimmedColor !== color && { color: trimmedColor }),
      };

      if (updatedCategory.name == null && updatedCategory.color == null) {
        setStatus("idle");
        setEditing(false);
      } else {
        setStatus("loading");

        dispatch(updateCategory(updatedCategory));
      }
    }
  };

  let isLoading = status === "loading";

  let categoryAppearance = !isEditing ? (
    <Fragment>
      <NotEditingButtons
        categoryColor={color}
        isLoading={isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  ) : (
    <form id={category.id} style={{ color: color }} onSubmit={updateHandler}>
      <div className="p-fluid">
        <CategoryName
          id={category.id}
          newCategory={newCategoryName}
          setNewCategory={setNewCategoryName}
          isLoading={isLoading}
          handleClick={handleClick}
          categoryWarning={categoryWarning}
        />
        <CategoryColor
          color={newCategoryColor}
          handleClick={handleClick}
          setNewCategoryColor={setNewCategoryColor}
        />
      </div>
      <EditingButtons
        categoryColor={color}
        isLoading={isLoading}
        setNewCategoryColor={setNewCategoryColor}
        handleClick={handleClick}
        onCancel={onCancel}
      />
    </form>
  );

  const template = (options) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-right"
      : "pi pi-chevron-down";
    const className = `${options.className} p-jc-start`;

    return (
      <div
        style={{
          borderColor: "white",
          background: category.color,
        }}
        className={className}
      >
        <button
          style={{ color: "white" }}
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
          onMouseDown={test}
        >
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        <span style={{ color: "white", fontSize: "25px" }}>{name}</span>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <Panel headerTemplate={template} toggleable collapsed>
        {categoryAppearance}
      </Panel>
    </div>
  );
};

export default Category;
