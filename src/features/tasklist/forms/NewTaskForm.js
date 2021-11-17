/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveNewTask } from "../tasks/taskSlice";
import { selectCategoryIds } from "../categories/categorySlice";
// import Success from "../../ui/Success";
import CategoryDropDown from "./CategoryDropDown";

const NewTaskForm = () => {
  const categoryIds = useSelector(selectCategoryIds);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

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

    /**Clean the data */
    const trimmedTask = enteredTask.trim();
    const trimmedCategory = Number(enteredCategory);
    /**Combine the data into a single text object to pass to dispatch */
    const text = { task: trimmedTask, category: trimmedCategory };

    //dispatch the "category added" action with this text
    dispatch(saveNewTask(text));
    //and clear out the text input
    setNewTask("");
  };

  return (
    <div>
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
    </div>
  );
};

export default NewTaskForm;

/**TODO: add data validation for new task information */
/**TODO: add an option for a blank category/no category selected (which is valid) */
/* TODO: add inputs for due date, if it's an on-going task, and priority level */
/**TODO: add responsiveness that communicates to the user when they successfully/unsuccessfully submit new task data*/
