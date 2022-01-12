import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../api/client";

import { uuidv4 } from "../../../common/RandomId";
// import { ObjectLength } from "../../../common/ObjectLength";

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
  httpErr: false,
});

//Thunk functions
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // const user = { text };
  const auth = getAuth();
  const uid = ReturnUid(auth);
  const token = ReturnToken(auth);

  const response = await client.get(
    `${databaseURL}/users/${uid}/tasks.json?auth=${token}`
  );

  // if (response !== null) {
  //   let tasks = {};
  //   for (var key in response) {
  //     if (!response.hasOwnProperty(key)) continue;

  //     let obj = response[key];
  //     let objId = key;

  //     for (var prop in obj) {
  //       if (!obj.hasOwnProperty(prop)) continue;

  //       if (user.text.uid === obj[prop]) {
  //         const newItem = { [objId]: obj };

  //         if (ObjectLength(tasks) > 0) {
  //           tasks = { ...tasks, [objId]: obj };
  //         } else {
  //           tasks = newItem;
  //         }
  //       }
  //     }
  //   }
  // console.log(response);
  // return tasks;
  return response;
  // } else {
  //   return response;
  // }
});

export const saveNewTask = createAsyncThunk(
  "tasks/saveNewTask",
  async (
    text,
    { /*dispatch, getState,*/ rejectWithValue, fulfillWithValue }
  ) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialTask = { text };
    const taskId = uuidv4();

    try {
      const response = await client.put(
        `${databaseURL}/users/${uid}/tasks/${taskId}.json?auth=${token}`,
        {
          id: taskId,
          name: initialTask.text.task,
          duedate: initialTask.text.duedate,
          category: initialTask.text.category,
          completed: false,
          uid: uid,
        }
      );

      if (response === null) {
        // console.log(response);
        return rejectWithValue(response);
      }
      return fulfillWithValue(response);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/taskDeleted",
  async (text) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialTask = { text };
    const response = await client(
      `${databaseURL}/users/${uid}/tasks/${initialTask.text}.json?auth=${token}`,
      { method: "DELETE" }
    );
    if (response === null) {
      return initialTask.text;
    } else {
      return response;
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/taskUpdated",
  async (
    text,
    { /*dispatch, getState,*/ rejectWithValue, fulfillWithValue }
  ) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialTask = { text };

    try {
      const response = await client(
        `${databaseURL}/users/${uid}/tasks/${initialTask.text.id}.json?auth=${token}`,
        { method: "PATCH", body: initialTask.text }
      );
      // if (response === null) {
      //   return initialTask.text;
      // } else {
      //   return response;
      // }
      if (response === null) {
        // console.log(response);
        return rejectWithValue(response);
      }
      return fulfillWithValue(response);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksDeleted: tasksAdapter.removeAll,
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
      .addCase(saveNewTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(saveNewTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.httpErr = false;
        tasksAdapter.addOne(state, action.payload);
      })
      .addCase(saveNewTask.rejected, (state, action) => {
        state.status = "idle";
        state.httpErr = true;
      })
      .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
      .addCase(updateTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.status = "idle";
        const { id, ...changes } = payload;
        state.httpErr = false;
        tasksAdapter.updateOne(state, { id, changes });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "idle";
        state.httpErr = true;
      });
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
