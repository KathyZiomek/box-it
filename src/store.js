/**The file that creates the Redux Store - holds the global state object */

import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasklist/tasklistPieces/tasks/taskSlice";
import categoriesReducer from "./features/tasklist/tasklistPieces/categories/categorySlice";
import filtersReducer from "./features/tasklist/filters/filtersSlice";
import usersReducer from "./features/authentication/userSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tasks: tasksReducer,
    filters: filtersReducer,
    users: usersReducer,
  },
});

export default store;
