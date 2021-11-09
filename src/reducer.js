/**Main file for the reducers */

import { combineReducers } from "redux";

import categoriesReducer from "./features/tasklist/categories/categorySlice";
import tasksReducer from "./features/tasklist/tasks/taskSlice";

const rootReducer = combineReducers({
  //Define a top-level state field named `categories` handled by `categoriesReducer`
  categories: categoriesReducer,
  tasks: tasksReducer,
});

export default rootReducer;
