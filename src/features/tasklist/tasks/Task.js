/**This component outputs a single task list item - receives props from TaskList.js */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

const selectTaskById = (state, taskId) => {
  return state.tasks.find((task) => task.id === taskId);
};

const Task = ({ id, categoryId }) => {
  //call our `selectTaskById` with the state _and_ the ID value
  const task = useSelector((state) => selectTaskById(state, id));
  const { name, category } = task;

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({ type: "tasklist/taskDeleted", payload: task.id });
  };

  if (category === categoryId) {
    return (
      <div>
        <li id={task.id}>
          {name}
          <button onClick={onDelete}>Delete Task</button>
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
