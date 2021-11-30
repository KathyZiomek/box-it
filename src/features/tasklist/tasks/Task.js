/**This component outputs a single task list item - receives props from TaskList.js */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { deleteTask, selectTaskById } from "./taskSlice";

const Task = ({ id, categoryId }) => {
  const [isToggled, setToggled] = useState(false);

  //call our `selectTaskById` with the state _and_ the ID value
  const task = useSelector((state) => selectTaskById(state, id));
  const { name, category, duedate } = task;

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggled = () => {
    if (isToggled) {
      setToggled(false);
    } else {
      setToggled(true);
    }
  };

  let duedateComponent = duedate ? <p>Due Date: {duedate}</p> : null;

  let toggle = isToggled ? (
    <div>
      {duedateComponent}
      <button onClick={onDelete}>Delete Task</button>
    </div>
  ) : null;

  if (category === categoryId) {
    return (
      <div>
        <li id={task.id}>
          <input type="checkbox" id={task.id} name="task" value="" />
          <label htmlFor={task.id} onClick={handleToggled}>
            {name}
          </label>
          {toggle}
        </li>
      </div>
    );
  } else {
    return null;
  }
};

export default Task;

/**TODO: add extra task information (due date, priority, on-going) that outputs when clicking on the task*/
/**TODO: add functionality to the task to allow it to be clicked and dismissed/deleted from Firebase */
/**TODO: update the styling for the component */
