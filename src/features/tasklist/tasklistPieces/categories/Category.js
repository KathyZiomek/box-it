/**NOTE: toasts can have severity levels of info, warn, error and fatal */
/**This component outputs the category titles in the task list */
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

// import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";

// import classes from "./Category.module.css";

//Destructure `props.id` since we only need the ID value
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

  // const categoryInputRef = useRef();
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

    const enteredCategory = newCategoryName;
    const enteredColor = newCategoryColor;
    const trimmedCategory = enteredCategory.trim();
    const trimmedColor = enteredColor.trim();

    let updatedCategory = {
      id: category.id,
      ...(trimmedCategory !== name && { name: trimmedCategory }),
      ...(trimmedColor !== color && { color: trimmedColor }),
    };

    if (updatedCategory.name == null && updatedCategory.color == null) {
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

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  // let toggle = !isEditing ? (
  //   <NotEditingButtons
  //     categoryColor={color}
  //     isLoading={isLoading}
  //     onEdit={onEdit}
  //     onDelete={onDelete}
  //   />
  // ) : null;

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
    // <div className={classes.categoryDiv}>{toggle}</div>
    <form
      id={category.id}
      style={{ color: newCategoryColor }}
      onSubmit={updateHandler}
    >
      <div className="p-fluid">
        <CategoryName
          id={category.id}
          newCategory={newCategoryName}
          setNewCategory={setNewCategoryName}
          isLoading={isLoading}
          // handleClick={handleClick}
          categoryWarning={categoryWarning}
        />
        {/* </div>
      <div className={classes.categoryDiv}> */}
        {/* <div id={category.id}>
          <InputText
            id={category.id}
            defaultValue={name}
            ref={categoryInputRef}
          />
        </div> */}
        <CategoryColor
          color={newCategoryColor}
          // handleClick={handleClick}
          setNewColor={setNewCategoryColor}
        />
        {/* <label htmlFor="categoryColor">Category Color </label>
        <input
          type="color"
          id="categoryColor"
          ref={colorInputRef}
          defaultValue={color}
        />
        <div> */}
        <EditingButtons
          categoryColor={color}
          isLoading={isLoading}
          //TODO: incorporate below
          // handleClick={handleClick}
          // onCancel={onCancel}
        />
        {/* </div> */}
      </div>
    </form>
  );

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
    <div /*style={{ marginTop: 15 }}*/>
      <Toast ref={toast} />
      <Panel headerTemplate={template} toggleable collapsed>
        {categoryAppearance}
        {loader}
      </Panel>
    </div>
  );
};

export default Category;
