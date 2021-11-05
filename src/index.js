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

// Now, dispatch some actions
store.dispatch({
  type: "tasklist/categoryAdded",
  payload: "Learn about actions",
});
store.dispatch({
  type: "tasklist/categoryAdded",
  payload: "Global Studies",
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
