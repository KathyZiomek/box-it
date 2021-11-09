/**This file contains the component that outputs the "Create a Task" form which is output on the CreateTask page */

import React from "react";
import { useState, useRef /*, useEffect**/ } from "react";
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

  //create the category drop down
  //since `categories` is an array, we can loop over it
  const renderedCategoryItems = categoryIds.map((categoryId) => {
    return <CategoryDropDown key={categoryId} id={categoryId} />;
  });

  const handleChange = (e) => setNewTask(e.target.value);
  /**Setting refs for the inputs */
  const taskInputRef = useRef();
  const categoryInputRef = useRef();

  // function newTaskHandler() {
  //   setNewTask(true);
  // }

  // function closeSuccessMessage() {
  //   setNewTask(false);
  // }
  // const [loadedCategories, setCategories] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();

  // /**retrieve Category names from Firebase */
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     /**retrieve the data from Firebase */
  //     const response = await fetch(
  //       "https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     /*the data is received */
  //     const responseData = await response.json();

  //     const loadedCategories = [];

  //     /**put the data in an empty array */
  //     for (const key in responseData) {
  //       loadedCategories.push({
  //         id: key,
  //         name: responseData[key].name,
  //       });
  //     }
  //     /**use the state updating function to update the category variable */
  //     setCategories(loadedCategories);
  //     setIsLoading(false);
  //     console.log(loadedCategories);
  //   };
  //   fetchCategories().catch((error) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  // if (httpError) {
  //   return (
  //     <section>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  // /**map the existing categories to an array in order to populate the dropdown */
  // const categoriesList = loadedCategories.map((category) => (
  //   {<CategoryDropDown key={category.id} id={category.id} name={category.name} />}
  // ));

  /**Function that handles when the submit button is clicked */

  const submitHandler = (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    // const selectTaskById = (state, taskId) => {
    //   return state.tasks.find((task) => task.id === taskId);
    // };

    /**get the refs for entered values */
    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    console.log(enteredTask, enteredCategory);

    const trimmedTask = enteredTask.trim();
    const trimmedCategory = Number(enteredCategory);
    //If the user pressed the button
    if (trimmedTask) {
      //dispatch the "category added" action with this text
      dispatch({ type: "tasklist/taskAdded", payload: trimmedTask });
      /**Update the category for that task item */
      if (trimmedCategory) {
        // const task = useSelector((state) => selectTaskById(state, id));
        //this isn't ideal - it uses the task name instead of the ID
        // TODO: improve this logic to use the ID
        dispatch({
          type: "tasklist/updateTaskCategory",
          payload: { taskName: trimmedTask, category: trimmedCategory },
        });
      }

      //and clear out the text input
      setNewTask("");
    }

    // const taskData = {
    //   category: enteredCategory,
    //   task: enteredTask,
    // };
    // console.log(taskData);

    /**sending the taskData up to CreateTask.js page so it can be sent to firebase */
    // props.onAddTask(taskData);
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
            // onClick={closeSuccessMessage}
            ref={taskInputRef}
            value={newTask}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <select
            required
            id="categoryName"
            ref={categoryInputRef}
            // onClick={closeSuccessMessage}
          >
            {renderedCategoryItems}
          </select>
        </div>

        <div>
          <button /*onClick={newTaskHandler}*/>Add New Task</button>
        </div>
      </form>

      {/* {newTask && <Success onClick={closeSuccessMessage} />} */}
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
