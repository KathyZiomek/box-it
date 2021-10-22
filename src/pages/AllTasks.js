import TaskList from "../components/tasklist/TaskList";

const DUMMY_DATA = [
  { id: "c1", category: "Economics", tasks: "Test 1" },
  { id: "c2", category: "French", tasks: "Read pages 100-150" },
  { id: "c3", category: "Personal", tasks: "Do Laundry" },
];

function AllTasksPage() {
  return (
    <div>
      <h1>Your Task List</h1>
      <hr />
      <TaskList tasks={DUMMY_DATA} />
    </div>
  );
}

export default AllTasksPage;
