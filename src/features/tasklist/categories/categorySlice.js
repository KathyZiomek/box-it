import { createSelector } from "reselect";
import { client } from "../../../api/client";

const initialState = {
  status: "idle",
  entities: [],
};

// Use the initialState as a default value
export default function categoriesReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // // Do something here based on the different types of actions
    case "tasklist/firstCategoryAdded": {
      //Return a new categories state array with the new category item at the end
      return {
        ...state,
        entities: [action.payload],
      };
    }
    case "tasklist/categoryAdded": {
      //Return a new categories state array with the new category item at the end
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    }
    case "tasklist/categoryDeleted": {
      return {
        ...state,
        entities: state.entities.filter((todo) => todo.id !== action.payload),
      };
    }
    case "tasklist/categoriesLoading": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "tasklist/categoriesLoaded": {
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't care about this specific action, return the existing state unchanged
      return state;
  }
}

export const categoryAdded = (category) => ({
  type: "tasklist/categoryAdded",
  payload: category,
});

export const firstCategoryAdded = (category) => ({
  type: "tasklist/firstCategoryAdded",
  payload: category,
});

export const categoryDeleted = (categoryId) => ({
  type: "tasklist/categoryDeleted",
  payload: categoryId,
});

export const categoriesLoading = () => ({ type: "tasklist/categoriesLoading" });

export const categoriesLoaded = (categories) => ({
  type: "tasklist/categoriesLoaded",
  payload: categories,
});

// Thunk function
export const fetchCategories = () => async (dispatch) => {
  dispatch(categoriesLoading());
  const response = await client.get(
    "https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json"
  );
  dispatch(categoriesLoaded(response));
};

export function saveNewCategory(text) {
  return async function saveNewCategoryThunk(dispatch, getState) {
    const initialCategory = { text };
    //get the number of items currently in categories
    const currentState = getState();
    if (currentState.categories.entities === null) {
      const categoryCount = 0;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${categoryCount}.json`,
        { id: categoryCount, name: initialCategory.text }
      );
      dispatch(firstCategoryAdded(response));
    } else if (currentState.categories.entities.length === undefined) {
      const categoryCount = 0;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${categoryCount}.json`,
        { id: categoryCount, name: initialCategory.text }
      );
      dispatch(firstCategoryAdded(response));
    } else {
      const categoryCount = currentState.categories.entities.length;
      const response = await client.put(
        `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${categoryCount}.json`,
        { id: categoryCount, name: initialCategory.text }
      );
      dispatch(categoryAdded(response));
    }
  };
}

export const selectCategories = (state) => state.categories.entities;

export const selectCategoryById = (state, categoryId) => {
  return selectCategories(state).find((category) => category.id === categoryId);
};

export const selectCategoryIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectCategories,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (categories) => categories.map((category) => category.id)
);
