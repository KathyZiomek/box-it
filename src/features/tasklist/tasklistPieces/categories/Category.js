/**NOTE: toasts can have severity levels of info, warn, error and fatal */
/**This component outputs the category titles in the task list */
import { React, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCategory,
  selectCategoryById,
  updateCategory,
} from "./categorySlice";
import { deleteTask, selectTasks } from "../tasks/taskSlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";

import classes from "./Category.module.css";

//Destructure `props.id` since we only need the ID value
const Category = ({ id }) => {
  const [status, setStatus] = useState("idle");
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");
  const toast = useRef(null);

  const filterStatus = useSelector((state) => state.filters.status);
  const allTasks = useSelector((state) => selectTasks(state));
  const category = useSelector((state) => selectCategoryById(state, id));
  const { name, color } = category;

  const dispatch = useDispatch();

  const categoryInputRef = useRef();
  const colorInputRef = useRef();

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

  const confirm = () => {
    confirmDialog({
      message:
        "Deleting a category box will also delete any tasks under that category. Are you sure you want to continue?",
      header: "Warning",
      icon: "pi pi-exclamation-triangle",
      accept: () => confirmDelete(),
      reject: () => cancelDelete(),
    });
  };

  const onEdit = (event) => {
    event.preventDefault();
    if (!isEditing) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const updateHandler = async (event) => {
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

      const response = await dispatch(updateCategory(text));

      if (response.type === "categories/categoryUpdated/rejected") {
        toast.current.show({
          severity: "error",
          summary: `Error`,
          detail: `Update for ${name} failed.`,
          life: 2000,
        });
        setStatus("idle");
      } else if (response.type === "categories/categoryUpdated/fulfilled") {
        setStatus("idle");
        setEditing(false);

        let detail, life;
        if (trimmedCategory !== name) {
          detail = `"${name}" Category Changed to "${trimmedCategory}"`;
          life = 2000;
        } else if (trimmedCategory === name) {
          detail = `${name} Category Updated`;
          life = 1500;
        }

        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: detail,
          life: life,
        });
      }
    }
  };

  let toggle = !isEditing ? (
    <div>
      <Button
        type="button"
        style={{
          border: category.color,
          background: category.color,
          width: "12rem",
          marginRight: 12,
        }}
        onClick={onEdit}
        icon="pi pi-pencil"
        label="Edit Category"
      ></Button>

      <Button
        type="button"
        style={{
          border: category.color,
          background: category.color,
          width: "12rem",
        }}
        onClick={confirm}
        icon="pi pi-times"
        label="Delete Category"
      ></Button>
      {/* <hr /> */}
    </div>
  ) : null;

  let categoryAppearance = !isEditing ? (
    <div className={classes.categoryDiv}>{toggle}</div>
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
            style={{
              border: category.color,
              background: category.color,
              width: "12rem",
              marginRight: 12,
            }}
            icon="pi pi-check"
            label="Update Category"
          ></Button>

          <Button
            style={{
              border: category.color,
              background: category.color,
              width: "12rem",
            }}
            onClick={onEdit}
            icon="pi pi-times"
            label="Cancel"
          ></Button>
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

  const template = (options) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down"
      : "pi pi-chevron-up";
    const className = `${options.className} p-jc-start`;

    return (
      <div
        style={{
          // borderRadius: "20px",
          borderColor: "white",
          background: category.color,
        }}
        className={className}
      >
        <span style={{ color: "white", fontSize: "25px" }}>{name}</span>
        <button
          style={{ color: "white" }}
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
          disabled={isEditing}
        >
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Toast ref={toast} />
      <Panel headerTemplate={template} toggleable collapsed>
        {categoryAppearance}
        {loader}
      </Panel>
    </div>
  );
};

export default Category;
