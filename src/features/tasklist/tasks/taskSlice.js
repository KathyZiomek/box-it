import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../api/client";

import { uuidv4 } from "../../../common/RandomId";
import { ObjectLength } from "../../../common/ObjectLength";

import {
  Firebase,
  ReturnToken,
  ReturnUid,
  FirebaseUrl,
} from "../../../api/Firebase";
import { getAuth } from "firebase/auth";

import { StatusFilters } from "../../filters/filtersSlice";

const app = Firebase();
const databaseURL = FirebaseUrl(app);

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: "idle",
});

//Thunk functions
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (text) => {
  const user = { text };
  const response = await client.get(
    `${databaseURL}/tasks.json?auth=${user.text.token}`
  );

  if (response !== null) {
    let tasks = {};
    for (var key in response) {
      if (!response.hasOwnProperty(key)) continue;

      let obj = response[key];
      let objId = key;

      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        if (user.text.uid === obj[prop]) {
          const newItem = { [objId]: obj };

          if (ObjectLength(tasks) > 0) {
            tasks = { ...tasks, [objId]: obj };
          } else {
            tasks = newItem;
          }
        }
      }
    }

    return tasks;
  } else {
    return response;
  }
});

export const saveNewTask = createAsyncThunk(
  "tasks/saveNewTask",
  async (text) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialTask = { text };
    const taskId = uuidv4();
    const response = await client.put(
      `${databaseURL}/tasks/${taskId}.json?auth=${token}`,
      {
        id: taskId,
        name: initialTask.text.task,
        duedate: initialTask.text.duedate,
        category: initialTask.text.category,
        completed: false,
        uid: uid,
      }
    );
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/taskDeleted",
  async (text) => {
    const auth = getAuth();
    const token = ReturnToken(auth);

    const initialTask = { text };
    const response = await client(
      `${databaseURL}/tasks/${initialTask.text}.json?auth=${token}`,
      { method: "DELETE" }
    );
    if (response === null) {
      return initialTask.text;
    } else {
      return response;
    }
  }
);

// //TODO: update this function to handle general updates instead of specifically the checkbox
// export const taskCompletedStatusChanged = createAsyncThunk(
//   "tasks/taskCompleted",
//   async (text) => {
//     const initialTask = { text };
//     const response = await client.put(
//       `${databaseURL}/tasks/${initialTask.text.id}.json?auth=${token}`,
//       {
//         id: initialTask.text.id,
//         name: initialTask.text.name,
//         category: initialTask.text.category,
//         duedate: initialTask.text.duedate,
//         completed: initialTask.text.completed,
//       }
//     );
//     if (response === null) {
//       return initialTask.text;
//     } else {
//       return response;
//     }
//   }
// );

export const updateTask = createAsyncThunk(
  "tasks/taskUpdated",
  async (text) => {
    const auth = getAuth();
    const token = ReturnToken(auth);

    const initialTask = { text };
    const response = await client(
      `${databaseURL}/tasks/${initialTask.text.id}.json?auth=${token}`,
      { method: "PATCH", body: initialTask.text }
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
    tasksDeleted: tasksAdapter.removeAll,
    // completedTasksCleared(state, action) {
    //   const completedIds = Object.values(state.entities)
    //     .filter((task) => task.completed)
    //     .map((task) => task.id);
    //   tasksAdapter.removeMany(state, completedIds);
    // },
    // allTasksCompleted(state, action) {
    //   Object.values(state.entities).forEach((task) => {
    //     task.completed = true;
    //   });
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
        } else {
          state.status = "idle";
        }
      })
      .addCase(saveNewTask.fulfilled, tasksAdapter.addOne)
      .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const { id, ...changes } = payload;
        tasksAdapter.updateOne(state, { id, changes });
      });
    // .addCase(taskCompletedStatusChanged.fulfilled, (state, action) => {
    //   const taskId = action.payload.id;
    //   const task = state.entities[taskId];
    //   task.completed = !task.completed;
    // });
  },
});

export const { tasksDeleted } = tasksSlice.actions;

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

export const selectFilteredTasks = createSelector(
  //all tasks
  selectTasks,
  //all filter values
  (state) => state.filters,
  //receive both values
  (tasks, filters) => {
    const { status } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions) {
      return tasks;
    }

    const completedStatus = status === StatusFilters.Completed;
    //return either active or completed tasks based on filter
    return tasks.filter((task) => {
      const statusMatches =
        showAllCompletions || task.completed === completedStatus;
      return statusMatches;
    });
  }
);

export const selectFilteredTaskIds = createSelector(
  //pass our other memoized selector as an input
  selectFilteredTasks,
  //get data in the output selector
  (filteredTasks) => filteredTasks.map((task) => task.id)
);
