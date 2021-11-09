import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Log the initial state
console.log("Initial state: ", store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log("State after dispatch: ", store.getState())
);

/*When the store is created, create an "Other" default Category name */
store.dispatch({
  type: "tasklist/categoryAdded",
  payload: "Other",
});

// Now, dispatch some actions
store.dispatch({
  type: "tasklist/categoryAdded",
  payload: "Learn about actions",
});
store.dispatch({
  type: "tasklist/categoryAdded",
  payload: "Global Studies",
});
store.dispatch({
  type: "tasklist/taskAdded",
  payload: "A Test Task",
});
store.dispatch({
  type: "tasklist/taskAdded",
  payload: "Another Test Task",
});
store.dispatch({
  type: "tasklist/updateTaskCategory",
  payload: { taskId: 1, category: 0 },
});
store.dispatch({
  type: "tasklist/updateTaskCategory",
  payload: { taskId: 0, category: 1 },
});

// Stop listening to state updates
unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
