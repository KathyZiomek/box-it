import { client } from "../../../api/client";

const initialState = [];

//use the initialState as a default value
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "tasklist/taskAdded": {
      return [...state, action.payload];
    }
    // case "tasklist/updateTaskCategory": {
    //   const { category, taskId } = action.payload;
    //   return state.map((task) => {
    //     if (task.id !== taskId) {
    //       return task;
    //     }

    //     return {
    //       ...task,
    //       category,
    //     };
    //   });
    // }
    case "tasklist/taskDeleted": {
      return state.filter((task) => task.id !== action.payload);
    }
    case "tasklist/tasksLoaded": {
      return action.payload;
    }
    default:
      return state;
  }
}

//Thunk function
export async function fetchTasks(dispatch, getState) {
  const response = await client.get(
    "https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks.json"
  );
  // const stateBefore = getState();
  // console.log("Tasks before dispatch: ", stateBefore.tasks.length);

  dispatch({ type: "tasklist/tasksLoaded", payload: response });

  // const stateAfter = getState();
  // console.log("Tasks after dispatch: ", stateAfter.tasks.length);
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewTask(text) {
  // And then creates and returns the async thunk function:
  return async function saveNewTaskThunk(dispatch, getState) {
    // Now we can use the text value and send it to the server
    const initialTask = { text };
    console.log(initialTask.text.category);
    //get the number of items currently in tasks
    const currentState = getState();
    const taskCount = currentState.tasks.length;

    const response = await client.put(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskCount}.json`,
      {
        id: taskCount,
        name: initialTask.text.task,
        category: initialTask.text.category,
      }
    );
    dispatch({ type: "tasklist/taskAdded", payload: response });
  };
}
