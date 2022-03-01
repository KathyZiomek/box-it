/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { saveNewTask } from "../tasklistPieces/tasks/taskSlice";

import { TaskFormName } from "./taskFormPieces/TaskFormName";
import { TaskFormCategory } from "./taskFormPieces/TaskFormCategory";
import { TaskFormDueDate } from "./taskFormPieces/TaskFormDueDate";
import { UIButton } from "../../../ui/uiPieces/UIButton";

import { Toast } from "primereact/toast";

const CreateTaskForm = () => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("idle");
  const [duedate, setDueDate] = useState("");
  const [category, setCategory] = useState("Select a Category");
  const [taskWarning, setTaskWarning] = useState(false);
  const [categoryWarning, setCategoryWarning] = useState(false);
  const toast = useRef(null);

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
  };

  /**Future TODO: add data validation for new task information */

  const submitHandler = async (event) => {
    event.preventDefault();
    toast.current.show({
      severity: "info",
      detail: "Submitting Task...",
      life: 300,
    });
    setStatus("loading");

    const enteredTask = task;
    const enteredCategory = category;

    if (enteredTask.length !== 0) {
      if (enteredCategory !== "Select a Category") {
        const trimmedCategory = enteredCategory.trim();
        const enteredDuedate = duedate;

        const trimmedTask = enteredTask.trim();

        const newTask = {
          task: trimmedTask,
          category: trimmedCategory,
          duedate: enteredDuedate,
        };

        const submitTask = async () => {
          const response = await dispatch(saveNewTask(newTask));

          if (response.type === "tasks/saveNewTask/rejected") {
            setStatus("idle");
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Task Could Not Be Added",
              life: 1000,
            });
          } else if (response.type === "tasks/saveNewTask/fulfilled") {
            setTask("");
            setCategory("Select a Category");
            setDueDate("");
            setStatus("idle");
            setTaskWarning(false);
            setCategoryWarning(false);
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Task Added",
              life: 1000,
            });
          }
        };
        const toastComplete = () => {
          setTimeout(submitTask, 400);
        };

        toastComplete();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Task Could Not Be Added",
          life: 800,
        });
        setCategoryWarning(true);
        setStatus("idle");
        return;
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Task Could Not Be Added",
        life: 800,
      });
      setTaskWarning(true);
      setStatus("idle");
      return;
    }
  };

  let isLoading = status === "loading";

  return (
    <form onSubmit={submitHandler}>
      <Toast ref={toast} />
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
        <TaskFormDueDate
          duedate={duedate}
          isLoading={isLoading}
          setDueDate={setDueDate}
          handleClick={handleClick}
        />
        <UIButton
          width="15rem"
          margin={8}
          icon="pi pi-check"
          label="Add New Task"
          onClick={handleClick}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
