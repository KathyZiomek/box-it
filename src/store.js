/**The file that creates the Redux Store - holds the global state object */

// import { configureStore } from "@reduxjs/toolkit";

// export default configureStore({
//   reducer: {},
// });

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

//Add whatever middleware you actually want to use here
//the store now has the ability to accept thunk functions in `dispatch`
// other store enhancers if any)
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

//The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer);

export default store;
