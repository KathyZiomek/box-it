import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../api/client";

import { uuidv4 } from "../../../common/RandomId";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: "idle",
});

//Thunk functions
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await client.get(
    "https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks.json"
  );
  return response;
});

export const saveNewTask = createAsyncThunk(
  "tasks/saveNewTask",
  async (text) => {
    const initialTask = { text };
    const taskId = uuidv4();
    const response = await client.put(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${taskId}.json`,
      {
        id: taskId,
        name: initialTask.text.task,
        duedate: initialTask.text.duedate,
        category: initialTask.text.category,
      }
    );
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/taskDeleted",
  async (text) => {
    const initialTask = { text };
    const response = await client(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/tasks/${initialTask.text}.json`,
      { method: "DELETE" }
    );
    if (response === null) {
      return initialTask.text;
    } else {
      return response;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // taskToggled(state, action) {
    //   const taskId = action.payload;
    //   const task = state.entities[taskId];
    //   task.completed = !task.completed;
    // },
    // taskDeleted: tasksAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.payload !== null) {
          tasksAdapter.setAll(state, action.payload);
          state.status = "idle";
        }
      })
      .addCase(saveNewTask.fulfilled, tasksAdapter.addOne)
      .addCase(deleteTask.fulfilled, tasksAdapter.removeOne);
  },
});

// export const { taskToggled } = tasksSlice.actions;

// export const { taskAdded, taskDeleted } = tasksSlice.actions;

export default tasksSlice.reducer;

export const { selectAll: selectTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors((state) => state.tasks);

export const selectTaskIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTasks,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (tasks) => tasks.map((task) => task.id)
);

// //use the initialState as a default value
// export default function tasksReducer(state = initialState, action) {
//   switch (action.type) {
//     case "tasklist/taskAdded": {
//       const task = action.payload;
//       return {
//         ...state,
//         entities: {
//           ...state.entities,
//           [task.id]: task,
//         },
//       };
//     }
//     // case "tasklist/updateTaskCategory": {
//     //   const { category, taskId } = action.payload;
//     //   return state.map((task) => {
//     //     if (task.id !== taskId) {
//     //       return task;
//     //     }

//     //     return {
//     //       ...task,
//     //       category,
//     //     };
//     //   });
//     // }
//     case "tasklist/taskDeleted": {
//       const newEntities = { ...state.entities };
//       delete newEntities[action.payload];
//       return {
//         ...state,
//         entities: newEntities,
//       };
//     }
//     case "tasklist/tasksLoading": {
//       return {
//         ...state,
//         status: "loading",
//       };
//     }
//     case "tasklist/tasksLoaded": {
//       const newEntities = {};
//       if (action.payload !== null) {
//         action.payload.forEach((task) => {
//           newEntities[task.id] = task;
//         });
//       }
//       return {
//         ...state,
//         status: "idle",
//         entities: newEntities,
//       };
//     }
//     default:
//       return state;
//   }
// }
