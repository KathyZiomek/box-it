/**This file contains the component that outputs the page with the create a task form */

// import { useState, useEffect } from "react";

import NewTaskForm from "../../features/tasklist/forms/NewTaskForm";

const CreateTaskPage = () => {
  /*send submitted new task data to firebase */
  function addTaskHandler(taskData) {
    fetch("https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <div>
      <h1>Create a Task</h1>
      <hr />
      <div>
        <NewTaskForm onAddTask={addTaskHandler} />
      </div>
    </div>
  );
};
export default CreateTaskPage;
