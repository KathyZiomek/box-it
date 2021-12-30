import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../api/client";

import { uuidv4 } from "../../../common/RandomId";
import { ObjectLength } from "../../../common/ObjectLength";

import Firebase from "../../../api/Firebase";

const app = Firebase();
const databaseURL = app._options.databaseURL;

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  status: "idle",
});

// Thunk function
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (text) => {
    const user = { text };
    const response = await client.get(`${databaseURL}/categories.json`);

    if (response !== null) {
      let categories = {};
      for (var key in response) {
        if (!response.hasOwnProperty(key)) continue;

        let obj = response[key];
        let objId = key;

        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;

          if (user.text === obj[prop]) {
            const newItem = { [objId]: obj };

            if (ObjectLength(categories) > 0) {
              categories = { ...categories, [objId]: obj };
            } else {
              categories = newItem;
            }
          }
        }
      }

      return categories;
    } else {
      return response;
    }
  }
);

export const saveNewCategory = createAsyncThunk(
  "categories/saveNewCategory",
  async (text) => {
    const initialCategory = { text };
    const categoryId = uuidv4();
    const response = await client.put(
      `${databaseURL}/categories/${categoryId}.json`,
      {
        id: categoryId,
        name: initialCategory.text.name,
        color: initialCategory.text.color,
        uid: initialCategory.text.uid,
      }
    );
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/categoryDeleted",
  async (text) => {
    const initialCategory = { text };
    const response = await client(
      `${databaseURL}/categories/${initialCategory.text}.json`,
      { method: "DELETE" }
    );
    if (response === null) {
      return initialCategory.text;
    } else {
      return response;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/categoryUpdated",
  async (text) => {
    const initialCategory = { text };
    const response = await client(
      `${databaseURL}/categories/${initialCategory.text.id}.json`,
      { method: "PATCH", body: initialCategory.text }
    );
    if (response === null) {
      return initialCategory.text;
    } else {
      return response;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: { categoriesDeleted: categoriesAdapter.removeAll },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload !== null) {
          categoriesAdapter.setAll(state, action.payload);
          state.status = "idle";
        } else {
          state.status = "idle";
        }
      })
      .addCase(saveNewCategory.fulfilled, categoriesAdapter.addOne)
      .addCase(deleteCategory.fulfilled, categoriesAdapter.removeOne)
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const { id, ...changes } = payload;
        categoriesAdapter.updateOne(state, { id, changes });
      });
  },
});

export const { categoriesDeleted } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.categories);

export const selectCategoryIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectCategories,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (categories) => categories.map((category) => category.id)
);
