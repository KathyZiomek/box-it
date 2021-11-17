import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { fetchCategories } from "./features/tasklist/categories/categorySlice";
import { fetchTasks } from "./features/tasklist/tasks/taskSlice";

store.dispatch(fetchCategories());
store.dispatch(fetchTasks());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
