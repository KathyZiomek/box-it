import { React, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCategory,
  selectCategoryById,
  updateCategory,
} from "./categorySlice";
import { deleteTask, selectTasks } from "../tasks/taskSlice";

import {
  EditingButtons,
  NotEditingButtons,
} from "./categoryPieces/CategoryButtons";
import { CategoryName } from "./categoryPieces/CategoryName";
import { CategoryColor } from "./categoryPieces/CategoryColor";

import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";

const Category = ({ id }) => {
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
      detail: `"${category.name}" Category Deleted`,
      life: 1500,
    });

    const deleteContent = () => {
      allTasks.forEach((task) => {
        if (task.category === category.id) {
          dispatch(deleteTask(task.id));
        }
      });
      dispatch(deleteCategory(category.id));
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 1500);
    };

    toastComplete();
  };

  const onDelete = () => {
    confirmDialog({
      message:
        "Deleting a category box will also delete any tasks under that category. Are you sure you want to continue?",
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

  const updateHandler = async (event) => {
    event.preventDefault();

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

        const response = await dispatch(updateCategory(updatedCategory));

        if (response.type === "categories/categoryUpdated/rejected") {
          toast.current.show({
            severity: "error",
            summary: `Error`,
            detail: `Update for ${name} failed.`,
            life: 2000,
          });
          setStatus("idle");
        } else if (response.type === "categories/categoryUpdated/fulfilled") {
          //null
        }
      }
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

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
        {loader}
      </Panel>
    </div>
  );
};

export default Category;
