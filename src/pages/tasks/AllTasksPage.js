/**This file contains the AllTasksPage component which outputs all existing tasks */

// import { useState, useEffect } from "react";
import TaskList from "../../features/tasklist/TaskList";

const AllTasksPage = () => {
  // const [tasklist, setTasklist] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();

  // /**TODO: add a case where the user has no existing tasks or categories*/
  // /**TODO: add a case where the user has tasks but no categories */
  // /**TODO: add a case where the user has categories but no tasks */

  // // const [loadedTasks, setLoadedTasks] = useState([]);

  // useEffect(() => {
  //   const fetchTasklist = async () => {
  //     /**retrieve the data from Firebase */
  //     const response = await fetch(
  //       "https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     /*the data is received */
  //     const responseData = await response.json();

  //     const loadedTasklist = [];

  //     /**put the data in an empty array */
  //     for (const key in responseData) {
  //       loadedTasklist.push({
  //         id: key,
  //         name: responseData[key].name,
  //         color: responseData[key].color,
  //         tasklist: responseData[key].tasklist,
  //       });
  //     }

  //     /**use the state updating function to update the tasklist variable */
  //     setTasklist(loadedTasklist);
  //     setIsLoading(false);
  //     console.log(loadedTasklist);
  //   };

  //   fetchTasklist().catch((error) => {
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

  // console.log(tasklist);
  return (
    <div>
      <h1>Your Task List</h1>
      <hr />
      <TaskList /* tasks={tasklist} */ />
    </div>
  );
};

export default AllTasksPage;
