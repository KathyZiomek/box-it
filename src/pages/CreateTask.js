import NewTaskForm from "../components/tasklist/tasks/NewTaskForm";

function CreateTaskPage() {
  function addTaskHandler(taskData) {
    fetch("https://box-it-b5c6c-default-rtdb.firebaseio.com/tasklist.json", {
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
}
export default CreateTaskPage;
