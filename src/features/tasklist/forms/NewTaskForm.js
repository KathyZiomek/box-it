/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { saveNewTask } from "../tasks/taskSlice";

import Success from "../../ui/Success";
import Failure from "../../ui/Failure";

import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { TaskFormName } from "./taskFormPieces/TaskFormName";
import { TaskFormCategory } from "./taskFormPieces/TaskFormCategory";

const NewTaskForm = () => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState("idle");
  const [duedate, setDueDate] = useState("");
  const [category, setCategory] = useState("Select a Category");
  const [taskWarning, setTaskWarning] = useState(false);
  const [categoryWarning, setCategoryWarning] = useState(false);

  const dispatch = useDispatch();

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

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTask = task;
    const enteredCategory = category;

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
          setTask("");
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
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;
  let message = null;
  if (success === true) {
    message = <Success />;
  } else if (success === false) {
    message = <Failure message={"Submit Failed."} />;
  } else if (success === "idle") {
    message = null;
  }

  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");
  let currentDate = new Date(duedate);

  return (
    <form onSubmit={submitHandler}>
      <div className="p-fluid">
        <TaskFormName
          isLoading={isLoading}
          task={task}
          setTask={setTask}
          handleClick={handleClick}
          taskWarning={taskWarning}
        />
        <TaskFormCategory
          category={category}
          isLoading={isLoading}
          setCategory={setCategory}
          handleClick={handleClick}
          categoryWarning={categoryWarning}
        />
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
      </div>
    </form>
  );
};

export default NewTaskForm;

/**TODO: add data validation for new task information */
