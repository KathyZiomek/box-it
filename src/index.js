import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { fetchTasks } from "./features/tasklist/tasks/taskSlice";
import { fetchCategories } from "./features/tasklist/categories/categorySlice";

store.dispatch(fetchTasks());
store.dispatch(fetchCategories());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
