import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import { fetchCategories } from "./features/tasklist/categories/categorySlice";
import { fetchTasks } from "./features/tasklist/tasks/taskSlice";

// Log the initial state
// console.log("Initial state: ", store.getState());

store.dispatch(fetchCategories);
store.dispatch(fetchTasks);

// // Stop listening to state updates
// unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
