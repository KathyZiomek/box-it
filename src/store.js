/**The file that creates the Redux Store - holds the global state object */

import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasklist/tasks/taskSlice";
import categoriesReducer from "./features/tasklist/categories/categorySlice";
import filtersReducer from "./features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});

export default store;
