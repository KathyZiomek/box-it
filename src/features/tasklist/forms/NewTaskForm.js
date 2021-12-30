/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveNewTask } from "../tasks/taskSlice";
import { selectCategoryIds } from "../categories/categorySlice";
import { selectUserIds } from "../../authentication/userSlice";

import Success from "../../ui/Success";
import CategoryDropDown from "./CategoryDropDown";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";

const NewTaskForm = () => {
  const categoryIds = useSelector(selectCategoryIds);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [duedate, setDueDate] = useState("");
  const dispatch = useDispatch();

  //create the category drop down
  //since `categories` is an array, we can loop over it
  const renderedCategoryItems = categoryIds.map((categoryId) => {
    return <CategoryDropDown key={categoryId} id={categoryId} />;
  });

  const handleClick = () => {
    setSuccess("idle");
  };

  const handleChange = (e) => setNewTask(e.target.value);
  /**Setting refs for the inputs */
  const taskInputRef = useRef();
  const categoryInputRef = useRef();
  const user = useSelector(selectUserIds);

  /**Function that handles when the submit button is clicked */
  const submitHandler = async (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    /**get the refs for entered values */
    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredDuedate = duedate;

    /**Clean the data */
    const trimmedTask = enteredTask.trim();
    const trimmedCategory = enteredCategory.trim();

    /**Combine the data into a single text object to pass to dispatch */
    const text = {
      task: trimmedTask,
      category: trimmedCategory,
      duedate: enteredDuedate,
      uid: user[0],
    };

    //create and dispatch the thunk function itself
    setStatus("loading");
    //wait for the promise returned by saveNewTask
    await dispatch(saveNewTask(text));
    //and clear out the text input
    setNewTask("");
    setStatus("idle");
    //show a success message to the user
    setSuccess("success");
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "Enter task name here...";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;
  let submitted = success === "idle" ? null : <Success />;

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
            required
            placeholder={placeholder}
            ref={taskInputRef}
            value={newTask}
            onChange={handleChange}
            disabled={isLoading}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <select
            required
            id="categoryName"
            ref={categoryInputRef}
            onClick={handleClick}
          >
            {renderedCategoryItems}
          </select>
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
            onChange={(e) => {
              setDueDate(e.value);
            }}
          />
        </div>

        <div>
          <Button>Add New Task</Button>
        </div>
        {loader}
        {submitted}
      </form>
    </div>
  );
};

export default NewTaskForm;

/**TODO: add data validation for new task information */
/**TODO: add an option for a blank category/no category selected (which is valid) */
/* TODO: add inputs for due date, if it's an on-going task, and priority level */
/**TODO: add responsiveness that communicates to the user when they successfully/unsuccessfully submit new task data*/
