// import { createSlice } from "@reduxjs/toolkit";

// export const categorySlice = createSlice({
//   name: "categories",
//   initialState: {
//     value: "",
//   },
//   reducers: {
//     createNew: (state) => {},
//   },
// });

const initialState = [];
// const initialState = [
//   {
//     id: 0,
//     name: "LAMP",
//     color: "green",

//     type: "testType",
//     tasklist: [{ id: 0, duedate: "testDate", name: "Test 1" }],
//   },
//   {
//     id: 1,
//     name: "Economics",
//     color: "red",

//     type: "testType",
//     tasklist: [
//       { id: 0, duedate: "testDate", name: "Test 2" },
//       { id: 1, duedate: "testDate", name: "Test 3" },
//     ],
//   },
// ];

function nextCategory(categories) {
  const maxId = categories.reduce(
    (maxId, category) => Math.max(category.id, maxId),
    -1
  );
  return maxId + 1;
}

// Use the initialState as a default value
export default function categoriesReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case "tasklist/categoryAdded": {
      //we return a new state object
      //can return just the new categories array, no extra object around it
      return [
        //all the existing state data
        ...state,
        {
          //use an auto-incrementing numeric ID for this example
          id: nextCategory(state),
          name: action.payload,
          // tasklist: [{ id: 0, name: "Test 1" }],
          // color: action.payload,
          // type: action.payload,
          // tasklist: [{ id: 0, duedate: "testDate", name: "Test 1" }],
        },
      ];
    }
    case "tasklist/addTasklistToCategory": {
      const { tasklist, categoryId } = action.payload;
      return state.map((category) => {
        if (category.id !== categoryId) {
          return category;
        }
        return {
          ...category,
          tasklist,
        };
      });
    }
    case "tasklist/categoryDeleted": {
      return state.filter((category) => category.id !== action.payload);
    }

    default:
      // If this reducer doesn't recognize the action type, or doesn't care about this specific action, return the existing state unchanged
      return state;
  }
}
