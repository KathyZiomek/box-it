/**This component outputs a single task list item - receives props from TaskList.js */
import { React, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, selectTaskById, updateTask } from "./taskSlice";
import { selectCategoryById } from "../categories/categorySlice";
import { selectCategories } from "../categories/categorySlice";
import { checkDates } from "../../../common/DateConversion";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import "primeflex/primeflex.css";

import { EditingButtons, NotEditingButtons } from "./taskPieces/TaskButtons";
import { TaskCheckBoxes } from "./taskPieces/TaskCheckboxes";
import { TaskDueDate } from "./taskPieces/TaskDueDate";

const Task = ({ id }) => {
  const filterStatus = useSelector((state) => state.filters.status);
  const task = useSelector((state) => selectTaskById(state, id));

  const { name, category, duedate, completed } = task;
  const categoryColor = useSelector(
    (state) => selectCategoryById(state, category).color
  );

  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");
  let originalDueDate =
    duedate != null && duedate !== "" ? new Date(duedate) : "";

  const [status, setStatus] = useState("idle");
  const [dropDownCategory, setDropDownCategory] = useState(category);
  const [newDueDate, setNewDueDate] = useState(originalDueDate);
  const [newTaskName, setNewTaskName] = useState(name);
  const [taskWarning, setTaskWarning] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");

  const [isComplete, setIsComplete] = useState(completed);

  // const taskInputRef = useRef();
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

  const handleClick = () => {
    if (taskWarning === true) {
      setTaskWarning(false);
    }
  };

  const onEdit = (event) => {
    event.preventDefault();
    handleClick();
    if (!isEditing) {
      setEditing(true);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    handleClick();
    if (isEditing) {
      setEditing(false);
    }
    setDropDownCategory(category);
    setNewDueDate(originalDueDate);
    setNewTaskName(name);

    if (isComplete !== completed) {
      setIsComplete(completed);
    }
  };

  const updateHandler = async (event) => {
    event.preventDefault();
    console.log("test");

    const enteredTask = newTaskName;
    const enteredCategory = dropDownCategory;
    const enteredDueDate = newDueDate;
    const enteredStatus = isComplete;
    console.log(enteredTask);

    if (enteredTask.length === 0) {
      setTaskWarning(true);
      setStatus("idle");
      return;
    } else {
      const trimmedTask = enteredTask.trim();

      let areEqual = checkDates(enteredDueDate, originalDueDate);

      let text = {
        id: task.id,
        ...(trimmedTask !== task.name && { name: trimmedTask }),
        ...(!areEqual && { duedate: enteredDueDate }),
        ...(enteredCategory !== task.category && { category: enteredCategory }),
        ...(enteredStatus !== task.completed && { completed: enteredStatus }),
      };
      console.log(text);

      if (
        text.name == null &&
        text.duedate == null &&
        text.category == null &&
        text.completed == null
      ) {
        setStatus("idle");
        setEditing(false);
      } else {
        setStatus("loading");
        const response = await dispatch(updateTask(text));

        if (response.type === "tasks/taskUpdated/rejected") {
          toast.current.show({
            severity: "error",
            summary: `Error`,
            detail: `Update for ${name} failed.`,
            life: 2000,
          });
          setStatus("idle");
        } else if (response.type === "tasks/taskUpdated/fulfilled") {
          if (text.name == null && text.category == null) {
            setStatus("idle");
            setEditing(false);
          }
        }
      }
    }
  };

  const markInProgress = () => {
    if (isComplete) {
      setIsComplete(false);
    }
  };
  const markComplete = () => {
    if (!isComplete) {
      setIsComplete(true);
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  let taskAppearance = !isEditing ? (
    <Fragment>
      <TaskDueDate duedate={duedate} />
      <NotEditingButtons
        categoryColor={categoryColor}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  ) : (
    <form onSubmit={updateHandler}>
      <li id={task.id}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-6">
            <label htmlFor="categoryName">Name: </label>
            <InputText
              id={task.id}
              value={newTaskName}
              // ref={taskInputRef}
              disabled={isLoading}
              onChange={(e) => setNewTaskName(e.target.value)}
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
              value={dropDownCategory}
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
              value={newDueDate}
              viewDate={newDueDate}
              disabled={isLoading}
              onChange={(e) => {
                setNewDueDate(e.value);
                handleClick();
              }}
            />
          </div>
          <div className="p-field p-col-6">
            <TaskCheckBoxes
              id={task.id}
              name={name}
              isComplete={isComplete}
              markInProgress={markInProgress}
              markComplete={markComplete}
            />
          </div>
        </div>
        <EditingButtons
          categoryColor={categoryColor}
          onEdit={onEdit}
          setNewDueDate={setNewDueDate}
          isLoading={isLoading}
          handleClick={handleClick}
          onCancel={onCancel}
        />
      </li>
    </form>
  );

  return (
    <div style={{ color: categoryColor }}>
      <Toast ref={toast} />
      {taskAppearance}
      {loader}
    </div>
  );
};

export default Task;
