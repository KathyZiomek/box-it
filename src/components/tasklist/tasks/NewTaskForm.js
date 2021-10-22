import { /*useState,*/ useRef } from "react";
// import Success from "../../ui/Success";
import Card from "../../ui/Card";

function NewTaskForm(props) {
  // const [newTask, setNewTask] = useState(false);
  const taskInputRef = useRef();
  const categoryInputRef = useRef();

  // function newTaskHandler() {
  //   setNewTask(true);
  // }

  // function closeSuccessMessage() {
  //   setNewTask(false);
  // }

  function submitHandler(event) {
    event.preventDefault();

    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const taskData = {
      category: enteredCategory,
      task: enteredTask,
    };

    props.onAddTask(taskData);
  }

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
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            required
            id="categoryName"
            placeholder="Enter category name here..."
            // onClick={closeSuccessMessage}
            ref={categoryInputRef}
          />
        </div>
        <div>
          <button /*onClick={newTaskHandler}*/>Add New Task</button>
        </div>
      </form>

      {/* {newTask && <Success onClick={closeSuccessMessage} />} */}
    </Card>
  );
}

export default NewTaskForm;
