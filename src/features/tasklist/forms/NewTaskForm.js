/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

// import Success from "../../ui/Success";
import Card from "../../ui/Card";
import CategoryDropDown from "./CategoryDropDown";

const selectCategoryIds = (state) =>
  state.categories.map((category) => category.id);

const NewTaskForm = () => {
  const [newTask, setNewTask] = useState("");
  const categoryIds = useSelector(selectCategoryIds, shallowEqual);
  const dispatch = useDispatch();

  const selectTaskIds = (state) => state.tasks.map((task) => task.id);
  const taskIds = useSelector(selectTaskIds, shallowEqual);

  //create the category drop down
  //since `categories` is an array, we can loop over it
  const renderedCategoryItems = categoryIds.map((categoryId) => {
    return <CategoryDropDown key={categoryId} id={categoryId} />;
  });

  const handleChange = (e) => setNewTask(e.target.value);
  /**Setting refs for the inputs */
  const taskInputRef = useRef();
  const categoryInputRef = useRef();

  /**Function that handles when the submit button is clicked */
  const submitHandler = (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    /**get the refs for entered values */
    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const trimmedTask = enteredTask.trim();
    const trimmedCategory = Number(enteredCategory);

    //If the user pressed the button
    if (trimmedTask) {
      //dispatch the "category added" action with this text
      dispatch({ type: "tasklist/taskAdded", payload: trimmedTask });
      /**Update the category for that task item */
      //Get the ID value of the last submitted task - it will be equal to taskIds.length
      const currentTaskId = taskIds.length;
      dispatch({
        type: "tasklist/updateTaskCategory",
        payload: { taskId: currentTaskId, category: trimmedCategory },
      });
      //and clear out the text input
      setNewTask("");
    }
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            required
            id="taskName"
            placeholder="Enter task name here..."
            ref={taskInputRef}
            value={newTask}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <select required id="categoryName" ref={categoryInputRef}>
            {renderedCategoryItems}
          </select>
        </div>

        <div>
          <button>Add New Task</button>
        </div>
      </form>
    </Card>
  );
};

export default NewTaskForm;

/**TODO: add data validation for new task information */
/**TODO: add an option for a blank category/no category selected (which is valid) */
/**TODO: change the way that new tasks are submitted so that they are added to the correct category on firebase */
/* TODO: add inputs for due date, if it's an on-going task, and priority level */
/**TODO: add responsiveness that communicates to the user when they successfully/unsuccessfully submit new task data*/
/**TODO: add a ref for the category ID so that a task can be added under the correct category in firebase */
