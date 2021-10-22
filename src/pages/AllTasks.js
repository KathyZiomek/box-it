import { useState, useEffect } from "react";
import TaskList from "../components/tasklist/TaskList";

// const DUMMY_DATA = [
//   { id: "c1", category: "Economics", tasks: "Test 1" },
//   { id: "c2", category: "French", tasks: "Read pages 100-150" },
//   { id: "c3", category: "Personal", tasks: "Do Laundry" },
// ];

function AllTasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTasks, setLoadedTasks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://box-it-b5c6c-default-rtdb.firebaseio.com/tasklist.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tasks = [];
        for (const key in data) {
          const task = {
            id: key,
            ...data[key],
          };
          tasks.push(task);
          console.log(task);
        }

        setIsLoading(false);

        setLoadedTasks(tasks);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>Your Task List</h1>
      <hr />
      <TaskList tasks={loadedTasks} />
    </div>
  );
}

export default AllTasksPage;
