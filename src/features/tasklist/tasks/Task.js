/**This component outputs a single task list item - receives props from TaskList.js */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  deleteTask,
  selectTaskById,
  taskCompletedStatusChanged,
} from "./taskSlice";

import { Checkbox } from "primereact/checkbox";

const Task = ({ id, categoryId }) => {
  const [isToggled, setToggled] = useState(false);

  //call our `selectTaskById` with the state _and_ the ID value
  const task = useSelector((state) => selectTaskById(state, id));
  const { name, category, duedate, completed } = task;

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTask(task.id));
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
      <button onClick={onDelete}>Delete Task</button>
    </div>
  ) : null;

  // if (category === categoryId) {
  return (
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
  );
  // } else {
  //   return null;
  // }
};

export default Task;

/**TODO: add extra task information (due date, priority, on-going) that outputs when clicking on the task*/
/**TODO: add functionality to the task to allow it to be clicked and dismissed/deleted from Firebase */
/**TODO: update the styling for the component */
