/**This component outputs a single task list item - receives props from TaskList.js */
import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  deleteTask,
  selectTaskById,
  taskCompletedStatusChanged,
  updateTask,
} from "./taskSlice";

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const Task = ({ id }) => {
  //call our `selectTaskById` with the state _and_ the ID value
  const filterStatus = useSelector((state) => state.filters.status);
  const task = useSelector((state) => selectTaskById(state, id));
  const { name, category, duedate, completed } = task;
  const [status, setStatus] = useState("idle");
  const [isToggled, setToggled] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  if (filterStatus !== filter) {
    setFilter(filterStatus);
    setEditing(false);
    setToggled(false);
  }

  const onDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const onEdit = (event) => {
    event.preventDefault();
    !isEditing ? setEditing(true) : setEditing(false);
  };

  const taskInputRef = useRef();
  const duedateInputRef = useRef();

  const updateHandler = async (event) => {
    event.preventDefault();

    const enteredTask = taskInputRef.current.value;
    const enteredDuedate = duedateInputRef.current.value;
    const trimmedTask = enteredTask.trim();
    const trimmedDueDate = enteredDuedate.trim();

    const text = {
      name: trimmedTask,
      duedate: trimmedDueDate,
      id: task.id,
    };
    setStatus("loading");
    await dispatch(updateTask(text));
    setStatus("idle");
    setEditing(false);
  };

  const handleToggled = () => {
    isToggled ? setToggled(false) : setToggled(true);
  };

  const handleCheckboxChanged = (event) => {
    const text = {
      id: task.id,
      name,
      category,
      duedate,
      completed: event.checked,
    };
    dispatch(taskCompletedStatusChanged(text));
  };

  let duedateComponent = duedate ? <p>Due Date: {duedate}</p> : null;

  let toggle = isToggled ? (
    <div>
      {duedateComponent}
      <button onClick={onEdit}>Edit Task</button>
      <button onClick={onDelete}>Delete Task</button>
    </div>
  ) : null;

  let taskAppearance = !isEditing ? (
    <li id={task.id} className="p-field-checkbox">
      <Checkbox
        inputId={task.id}
        name="task"
        value={name}
        checked={completed}
        onChange={handleCheckboxChanged}
      />

      <label htmlFor={task.id} onClick={handleToggled}>
        {name}
      </label>
      {toggle}
    </li>
  ) : (
    <form onSubmit={updateHandler}>
      <li id={task.id} className="p-field-checkbox">
        <div>
          <Checkbox
            inputId={task.id}
            name="task"
            value={name}
            checked={completed}
            onChange={handleCheckboxChanged}
          />
          <InputText id={task.id} defaultValue={name} ref={taskInputRef} />
        </div>
        <div>
          <label htmlFor="duedate">Due Date: </label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            min="2022-01-01"
            defaultValue={duedate}
            max="2023-01-01"
            ref={duedateInputRef}
          ></input>
        </div>
        <div>
          <Button>Update Task</Button>
          <Button onClick={onEdit}>Cancel</Button>
        </div>
      </li>
    </form>
  );

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <div>
      {taskAppearance}
      {loader}
    </div>
  );
};

export default Task;

/**TODO: update the styling for the component */
