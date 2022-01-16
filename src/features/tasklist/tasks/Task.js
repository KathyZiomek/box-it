/**This component outputs a single task list item - receives props from TaskList.js */
import { React, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteTask, selectTaskById, updateTask } from "./taskSlice";
import { selectCategoryById } from "../categories/categorySlice";
import { selectCategories } from "../categories/categorySlice";

import DisplayDate from "./../../../common/DisplayDate";
import { checkDates } from "../../../common/DateConversion";

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import "primeflex/primeflex.css";

const Task = ({ id }) => {
  const filterStatus = useSelector((state) => state.filters.status);
  const task = useSelector((state) => selectTaskById(state, id));

  const { name, category, duedate, completed } = task;
  const categoryColor = useSelector(
    (state) => selectCategoryById(state, category).color
  );

  let displayDate = DisplayDate(duedate);
  let duedateComponent = duedate ? (
    <p style={{ color: categoryColor }}>Due Date: {displayDate}</p>
  ) : null;

  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");
  let currentDate = new Date(duedate);

  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [dropDownCategory, setDropDownCategory] = useState("");
  const [taskWarning, setTaskWarning] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newDuedate, setNewDueDate] = useState(currentDate);

  const taskInputRef = useRef();
  const categoryInputRef = useRef();
  const toast = useRef(null);

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

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

  let displayCategory =
    dropDownCategory !== category && dropDownCategory.length === 0
      ? category
      : dropDownCategory;

  const handleClick = () => {
    if (taskWarning === true) {
      setTaskWarning(false);
    } else if (taskWarning === true) {
      setTaskWarning(false);
    }
    setSuccess("idle");
  };

  if (filterStatus !== filter) {
    setFilter(filterStatus);
    setEditing(false);
  }

  const onDelete = () => {
    setStatus("loading");
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Task Deleted",
      life: 800,
    });

    const deleteContent = () => {
      dispatch(deleteTask(task.id));
      setStatus("idle");
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 500);
    };
    toastComplete();
  };

  const onEdit = (event) => {
    event.preventDefault();
    handleClick();
    !isEditing ? setEditing(true) : setEditing(false);
    if (success === false) {
      setSuccess("idle");
    }
    setDropDownCategory("");
    setNewDueDate(currentDate);
  };

  const updateHandler = async (event) => {
    event.preventDefault();

    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.props.value;
    const enteredDueDate = newDuedate;

    if (enteredTask.length === 0) {
      setTaskWarning(true);
      setSuccess(false);
      setStatus("idle");
      return;
    } else {
      const trimmedTask = enteredTask.trim();

      let areEqual = checkDates(enteredDueDate, currentDate);

      let text = {
        id: task.id,
        ...(trimmedTask !== task.name && { name: trimmedTask }),
        ...(!areEqual && { duedate: enteredDueDate }),
        ...(enteredCategory !== task.category && { category: enteredCategory }),
      };

      if (
        text.name === undefined &&
        text.duedate === undefined &&
        text.category === undefined
      ) {
        setStatus("idle");
        setEditing(false);
        setDropDownCategory("");
        return;
      } else {
        setStatus("loading");
        const response = await dispatch(updateTask(text));

        if (response.type === "tasks/taskUpdated/rejected") {
          setSuccess(false);
          toast.current.show({
            severity: "error",
            summary: `Error`,
            detail: `Update for ${name} failed.`,
            life: 2000,
          });
          setStatus("idle");
        } else if (response.type === "tasks/taskUpdated/fulfilled") {
          if (text.category === undefined) {
            setEditing(false);
            setStatus("idle");
            setSuccess("idle");
          } else if (text.category !== undefined) {
            setStatus("idle");
            setSuccess("idle");
          }
        }
      }
    }
  };

  const handleCheckboxChanged = (event) => {
    const text = {
      id: task.id,
      completed: event.checked,
    };
    dispatch(updateTask(text));
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  let taskAppearance = !isEditing ? (
    <Fragment>
      <div className="p-field">{duedateComponent}</div>
      <div className="p-formgroup-inline p-fluid">
        <div className="p-field">
          <Button
            style={{
              border: categoryColor,
              background: categoryColor,
              width: "12rem",
              marginRight: 12,
            }}
            onClick={onEdit}
            icon="pi pi-pencil"
            label="Edit Task"
          ></Button>
        </div>
        <div className="p-field">
          <Button
            style={{
              border: categoryColor,
              background: categoryColor,
              width: "12rem",
            }}
            onClick={onDelete}
            icon="pi pi-times"
            label="Delete Task"
          ></Button>
        </div>
      </div>
    </Fragment>
  ) : (
    <form onSubmit={updateHandler}>
      <li id={task.id}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-6">
            <label htmlFor="categoryName">Name: </label>
            <InputText
              id={task.id}
              defaultValue={name}
              ref={taskInputRef}
              disabled={isLoading}
              onClick={handleClick}
            />
            {taskWarning && (
              <Message severity="error" text="Task cannot be empty" />
            )}
          </div>
          <div className="p-field p-col-6">
            <label htmlFor="categoryName">Category: </label>
            <Dropdown
              options={categorySelectItems}
              ref={categoryInputRef}
              value={displayCategory}
              disabled={isLoading}
              onChange={(e) => {
                setDropDownCategory(e.value);
              }}
              onMouseDown={handleClick}
            />
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-6">
            <label htmlFor="duedate">Due Date: </label>
            <Calendar
              id="duedate"
              name="duedate"
              minDate={startDate}
              maxDate={endDate}
              value={newDuedate}
              viewDate={newDuedate}
              disabled={isLoading}
              onChange={(e) => {
                setNewDueDate(e.value);
                handleClick();
              }}
            />
          </div>
        </div>
        <div className="p-d-flex p-jc-between">
          <div className="p-field">
            <Button
              style={{
                border: categoryColor,
                background: categoryColor,
                width: "10rem",
                // marginLeft: 12,
                // marginTop: 12,
              }}
              icon="pi pi-times"
              label="Clear Due Date"
              onClick={(e) => {
                e.preventDefault();
                setNewDueDate("");
              }}
              disabled={isLoading}
            ></Button>
          </div>
          <div className="p-field">
            <Button
              style={{
                border: categoryColor,
                background: categoryColor,
                width: "10rem",
                // marginRight: 12,
              }}
              icon="pi pi-check"
              label="Update"
              onClick={handleClick}
              disabled={isLoading}
            ></Button>
          </div>
          <div className="p-field">
            <Button
              style={{
                border: categoryColor,
                background: categoryColor,
                width: "10rem",
              }}
              onClick={onEdit}
              icon="pi pi-times"
              label="Cancel"
              disabled={isLoading}
            ></Button>
          </div>
        </div>
      </li>
    </form>
  );

  const template = (options) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down"
      : "pi pi-chevron-up";
    const className = `${options.className}`;

    return (
      <div
        style={{
          // borderRadius: "20px",
          borderColor: categoryColor,
          // background: "red",
        }}
        className={className}
        onClick={!isEditing ? options.onTogglerClick : null}
        disabled={isEditing}
      >
        <div className="p-d-flex p-jc-between">
          <div>
            <Checkbox
              inputId={task.id}
              name="task"
              value={name}
              checked={completed}
              onChange={handleCheckboxChanged}
            />
          </div>
          <div>
            <label
              htmlFor={task.id}
              style={{
                color: categoryColor,
                fontSize: "18px",
                marginLeft: 15,
              }}
            >
              {name}
            </label>
          </div>
          <div>
            <button
              style={{ color: categoryColor }}
              className={options.togglerClassName}
              onClick={!isEditing ? options.onTogglerClick : null}
              disabled={isEditing}
            >
              <span className={toggleIcon}></span>
              <Ripple />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: 15, marginTop: 15 }}>
      <Toast ref={toast} />
      <Panel headerTemplate={template} toggleable collapsed>
        {taskAppearance}
        {loader}
      </Panel>
    </div>
  );
};

export default Task;
