import { client } from "../../../api/client";

const initialState = [];

// import { createSlice } from "@reduxjs/toolkit";

// Use the initialState as a default value
export default function categoriesReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // // Do something here based on the different types of actions
    case "tasklist/categoryAdded": {
      //Return a rew categories state array with the new category item at the end
      return [...state, action.payload];
    }
    case "tasklist/categoryDeleted": {
      return state.filter((category) => category.id !== action.payload);
    }
    case "tasklist/categoriesLoaded": {
      return action.payload;
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't care about this specific action, return the existing state unchanged
      return state;
  }
}

//Thunk function
export async function fetchCategories(dispatch, getState) {
  const response = await client.get(
    "https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json"
  );
  // const stateBefore = getState();
  // console.log("Categories before dispatch: ", stateBefore.categories.length);
  // console.log("Categories before dispatch: ", stateBefore.categories);

  dispatch({ type: "tasklist/categoriesLoaded", payload: response });

  // const stateAfter = getState();
  // console.log("Categories after dispatch: ", stateAfter.categories.length);
  // console.log("Categories after dispatch: ", stateAfter.categories);
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewCategory(text) {
  // And then creates and returns the async thunk function:
  return async function saveNewCategoryThunk(dispatch, getState) {
    // Now we can use the text value and send it to the server
    const initialCategory = { text };
    console.log(initialCategory);
    //get the number of items currently in categories
    const currentState = getState();
    const categoryCount = currentState.categories.length;

    const response = await client.put(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${categoryCount}.json`,
      {
        id: categoryCount,
        name: initialCategory.text,
      }
    );
    dispatch({ type: "tasklist/categoryAdded", payload: response });
  };
}
