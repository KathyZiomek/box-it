/**The file that creates the Redux Store - holds the global state object */

import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasklist/tasks/taskSlice";
import categoriesReducer from "./features/tasklist/categories/categorySlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `categories`, handled by `categoriesReducer`
    categories: categoriesReducer,
    tasks: tasksReducer,
  },
});

export default store;
