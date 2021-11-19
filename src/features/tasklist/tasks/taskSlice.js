import { createSelector } from "reselect";
import { client } from "../../../api/client";

import { ObjectLength } from "../../../common/ObjectLength";

const initialState = {
  status: "idle",
  entities: {},
};

//use the initialState as a default value
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "tasklist/taskAdded": {
      const task = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: task,
        },
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
      const newEntities = { ...state.entities };
      delete newEntities[action.payload];
      return {
        ...state,
        entities: newEntities,
      };
    }
    case "tasklist/tasksLoading": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "tasklist/tasksLoaded": {
      const newEntities = {};
      if (action.payload !== null) {
        action.payload.forEach((task) => {
          newEntities[task.id] = task;
        });
      }
      return {
        ...state,
        status: "idle",
        entities: newEntities,
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

export function saveNewTask(text) {
  return async function saveNewTaskThunk(dispatch, getState) {
    const initialTask = { text };
    //get the number of items currently in categories
    const currentState = getState();
    const taskCount = ObjectLength(currentState.tasks.entities);
    const response = await client.put(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskCount}.json`,
      {
        id: taskCount,
        name: initialTask.text.task,
        category: initialTask.text.category,
      }
    );
    dispatch(taskAdded(response));
  };
}

const selectTaskEntities = (state) => state.tasks.entities;

export const selectTasks = createSelector(selectTaskEntities, (entities) =>
  Object.values(entities)
);

export const selectTaskById = (state, taskId) => {
  return selectTaskEntities(state)[taskId];
};

export const selectTaskIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTasks,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (tasks) => tasks.map((task) => task.id)
);
