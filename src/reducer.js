import { combineReducers } from "redux";

import categoriesReducer from "./features/tasklist/categories/categorySlice";

const rootReducer = combineReducers({
  //Define a top-level state field named `categories` handled by `categoriesReducer`
  categories: categoriesReducer,
});

export default rootReducer;
