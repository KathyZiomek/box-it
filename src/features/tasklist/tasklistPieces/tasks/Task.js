/**This component outputs a single task list item - receives props from TaskList.js */
import { React, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteTask,
  selectTaskById,
  updateTask,
  taskUpdatedCleared,
  taskDeletedCleared,
} from "./taskSlice";
import { selectCategoryById } from "../categories/categorySlice";

import { checkDates } from "./taskPieces/DateConversion";

import { EditingButtons, NotEditingButtons } from "./taskPieces/TaskButtons";
import { TaskCheckBoxes } from "./taskPieces/TaskCheckboxes";
import { TaskDueDate } from "./taskPieces/TaskDueDate";
import { TaskName } from "./taskPieces/TaskName";
import { TaskCalendar } from "./taskPieces/TaskCalendar";
import { TaskCategoryDropDown } from "./taskPieces/TaskCategoryDropDown";

import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primeflex/primeflex.css";

const Task = ({ id }) => {
  const taskErrorStatus = useSelector((state) => state.tasks.error);
  const taskDeletedStatus = useSelector((state) => state.tasks.deleted);
  const filterStatus = useSelector((state) => state.filters.status);
  const task = useSelector((state) => selectTaskById(state, id));

  const { name, category, duedate, completed } = task;
  const categoryColor = useSelector(
    (state) => selectCategoryById(state, category).color
  );

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
      detail: "Deleting Task...",
      life: 500,
    });

    const deleteContent = () => {
      if (taskErrorStatus !== "idle") {
        dispatch(taskUpdatedCleared("idle"));
      }
      dispatch(deleteTask(task.id));
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 600);
    };
    toastComplete();
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Warning",
      icon: "pi pi-exclamation-triangle",
      accept: () => confirmDelete(),
      reject: () => cancelDelete(),
    });
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

  const updateHandler = (event) => {
    event.preventDefault();
    if (taskDeletedStatus !== "idle") {
      dispatch(taskDeletedCleared("idle"));
    }

    const enteredTask = newTaskName;
    const enteredCategory = dropDownCategory;
    const enteredDueDate = newDueDate;
    const enteredStatus = isComplete;

    if (enteredTask.length === 0) {
      setTaskWarning(true);
      setStatus("idle");
      return;
    } else {
      const trimmedTask = enteredTask.trim();

      let areEqual = checkDates(enteredDueDate, originalDueDate);

      let updatedTask = {
        id: task.id,
        ...(trimmedTask !== task.name && { name: trimmedTask }),
        ...(!areEqual && { duedate: enteredDueDate }),
        ...(enteredCategory !== task.category && { category: enteredCategory }),
        ...(enteredStatus !== task.completed && { completed: enteredStatus }),
      };

      if (
        updatedTask.name == null &&
        updatedTask.duedate == null &&
        updatedTask.category == null &&
        updatedTask.completed == null
      ) {
        setStatus("idle");
        setEditing(false);
      } else {
        setStatus("loading");
        dispatch(updateTask(updatedTask));
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

  let taskAppearance = !isEditing ? (
    <Fragment>
      <TaskDueDate duedate={duedate} />
      <NotEditingButtons
        categoryColor={categoryColor}
        onEdit={onEdit}
        onDelete={confirm}
      />
    </Fragment>
  ) : (
    <form id={task.id} onSubmit={updateHandler}>
      <div className="p-fluid p-formgrid p-grid">
        <TaskName
          id={task.id}
          newTaskName={newTaskName}
          isLoading={isLoading}
          setNewTaskName={setNewTaskName}
          handleClick={handleClick}
          taskWarning={taskWarning}
        />
        <TaskCategoryDropDown
          dropDownCategory={dropDownCategory}
          isLoading={isLoading}
          setDropDownCategory={setDropDownCategory}
          handleClick={handleClick}
        />
        <TaskCalendar
          newDueDate={newDueDate}
          isLoading={isLoading}
          setNewDueDate={setNewDueDate}
          handleClick={handleClick}
        />
        <TaskCheckBoxes
          id={task.id}
          name={name}
          isComplete={isComplete}
          markInProgress={markInProgress}
          markComplete={markComplete}
        />
      </div>
      <EditingButtons
        categoryColor={categoryColor}
        onEdit={onEdit}
        setNewDueDate={setNewDueDate}
        isLoading={isLoading}
        handleClick={handleClick}
        onCancel={onCancel}
      />
    </form>
  );

  return (
    <div style={{ color: categoryColor }}>
      <Toast ref={toast} />
      {taskAppearance}
    </div>
  );
};

export default Task;
