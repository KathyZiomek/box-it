import { createSelector } from "reselect";
import { client } from "../../../api/client";

const initialState = {
  status: "idle",
  entities: [],
};

//use the initialState as a default value
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "tasklist/firstTaskAdded": {
      return { ...state, entities: [action.payload] };
    }
    case "tasklist/taskAdded": {
      return {
        state,
        entities: [...state.entities, action.payload],
      };
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
      return {
        ...state,
        entities: state.entities.filter((todo) => todo.id !== action.payload),
      };
    }
    case "tasklist/tasksLoading": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "tasklist/tasksLoaded": {
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    }
    default:
      return state;
  }
}

export const taskAdded = (task) => ({
  type: "tasklist/taskAdded",
  payload: task,
});

export const firstTaskAdded = (task) => ({
  type: "tasklist/firstTaskAdded",
  payload: task,
});

export const taskDeleted = (taskId) => ({
  type: "tasklist/taskDeleted",
  payload: taskId,
});

export const tasksLoading = () => ({ type: "tasklist/tasksLoading" });

export const tasksLoaded = (tasks) => ({
  type: "tasklist/tasksLoaded",
  payload: tasks,
});

//Thunk function
export const fetchTasks = () => async (dispatch) => {
  dispatch(tasksLoading());
  const response = await client.get(
    "https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks.json"
  );
  dispatch(tasksLoaded(response));
};
// export async function fetchTasks(dispatch, getState) {
//   const response = await client.get(
//     "https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks.json"
//   );
//   // const stateBefore = getState();
//   // console.log("Tasks before dispatch: ", stateBefore.tasks.length);

//   dispatch({ type: "tasklist/tasksLoaded", payload: response });

//   // const stateAfter = getState();
//   // console.log("Tasks after dispatch: ", stateAfter.tasks.length);
// }

export function saveNewTask(text) {
  return async function saveNewTaskThunk(dispatch, getState) {
    const initialTask = { text };
    //get the number of items currently in categories
    const currentState = getState();
    if (currentState.tasks.entities === null) {
      const taskCount = 0;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskCount}.json`,
        {
          id: taskCount,
          name: initialTask.text.task,
          category: initialTask.text.category,
        }
      );
      dispatch(firstTaskAdded(response));
    } else if (currentState.tasks.entities.length === undefined) {
      const taskCount = 0;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskCount}.json`,
        {
          id: taskCount,
          name: initialTask.text.task,
          category: initialTask.text.category,
        }
      );
      dispatch(firstTaskAdded(response));
    } else {
      const taskCount = currentState.tasks.entities.length;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskCount}.json`,
        {
          id: taskCount,
          name: initialTask.text.task,
          category: initialTask.text.category,
        }
      );
      dispatch(taskAdded(response));
    }
  };
}

export const selectTasks = (state) => state.tasks.entities;

export const selectTaskById = (state, taskId) => {
  return selectTasks(state).find((task) => task.id === taskId);
};

export const selectTaskIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTasks,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (tasks) => tasks.map((task) => task.id)
);
