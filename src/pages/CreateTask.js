import { useState } from "react";
import Success from "../components/Success";

function Task() {
  const [newTask, setNewTask] = useState(false);

  function newTaskHandler() {
    setNewTask(true);
  }

  function closeSuccessMessage() {
    setNewTask(false);
  }

  return (
    <div>
      <h1>Create a Task</h1>
      <div>
        <hr />
        <label for="taskName">Task Name</label>
        <br />
        <input
          type="text"
          id="taskName"
          placeholder="Enter task name here..."
          onClick={closeSuccessMessage}
        />
        <br />
        <button onClick={newTaskHandler}>Submit</button>
        {newTask && <Success onClick={closeSuccessMessage} />}
      </div>
    </div>
  );
}
export default Task;
