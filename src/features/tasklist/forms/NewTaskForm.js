/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveNewTask } from "../tasks/taskSlice";
import { selectCategories } from "../categories/categorySlice";

import Success from "../../ui/Success";
import Failure from "../../ui/Failure";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";

const NewTaskForm = () => {
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [duedate, setDueDate] = useState("");
  const [category, setCategory] = useState("Select a Category");
  const [taskWarning, setTaskWarning] = useState(false);
  const [categoryWarning, setCategoryWarning] = useState(false);
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

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

  const handleClick = () => {
    if (taskWarning === true && categoryWarning === true) {
      setTaskWarning(false);
      setCategoryWarning(false);
    } else if (taskWarning === true) {
      setTaskWarning(false);
    } else if (categoryWarning === true) {
      setCategoryWarning(false);
    }
    setSuccess("idle");
  };

  const taskInputRef = useRef();
  const categoryInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.props.value;

    if (enteredTask.length !== 0) {
      if (enteredCategory !== "Select a Category") {
        const trimmedCategory = enteredCategory.trim();
        const enteredDuedate = duedate;

        const trimmedTask = enteredTask.trim();

        const text = {
          task: trimmedTask,
          category: trimmedCategory,
          duedate: enteredDuedate,
        };

        setStatus("loading");
        const response = await dispatch(saveNewTask(text));

        if (response.type === "tasks/saveNewTask/rejected") {
          setSuccess(false);
          setStatus("idle");
        } else if (response.type === "tasks/saveNewTask/fulfilled") {
          setNewTask("");
          setCategory("Select a Category");
          setDueDate("");
          setStatus("idle");
          setSuccess(true);
          setTaskWarning(false);
          setCategoryWarning(false);
        }
      } else {
        setCategoryWarning(true);
        setSuccess(false);
        setStatus("idle");
        return;
      }
    } else {
      setTaskWarning(true);
      setSuccess(false);
      setStatus("idle");
      return;
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter task name here...";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;
  let message = null;
  if (success === true) {
    message = <Success />;
  } else if (success === false) {
    message = <Failure />;
  } else if (success === "idle") {
    message = null;
  }

  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");
  let currentDate = new Date(duedate);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="taskName">Task Name</label>
          <InputText
            type="text"
            id="taskName"
            // required
            placeholder={placeholder}
            ref={taskInputRef}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={isLoading}
            onClick={handleClick}
          />
          {taskWarning && (
            <Message severity="error" text="Task cannot be empty" />
          )}
        </div>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <Dropdown
            options={categorySelectItems}
            placeholder="Select a Category"
            ref={categoryInputRef}
            value={category}
            disabled={isLoading}
            onChange={(e) => {
              setCategory(e.value);
            }}
            onMouseDown={handleClick}
          />
          {categoryWarning && (
            <Message severity="error" text="Must select a category" />
          )}
        </div>
        <div>
          <label htmlFor="duedate">Due Date</label>
          <Calendar
            id="duedate"
            name="duedate"
            minDate={startDate}
            maxDate={endDate}
            value={currentDate}
            viewDate={currentDate}
            disabled={isLoading}
            onChange={(e) => {
              setDueDate(e.value);
              handleClick();
            }}
          />
        </div>
        <div>
          <Button onClick={handleClick}>Add New Task</Button>
        </div>
        {loader}
        {message}
      </form>
    </div>
  );
};

export default NewTaskForm;

/**TODO: add data validation for new task information */
