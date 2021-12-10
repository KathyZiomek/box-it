import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../api/client";

import { uuidv4 } from "../../../common/RandomId";

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  status: "idle",
});

// Thunk function
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await client.get(
      "https://box-it-b5c6c-default-rtdb.firebaseio.com/categories.json"
    );
    return response;
  }
);

export const saveNewCategory = createAsyncThunk(
  "categories/saveNewCategory",
  async (text) => {
    const initialCategory = { text };
    const categoryId = uuidv4();
    const response = await client.put(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${categoryId}.json`,
      { id: categoryId, name: initialCategory.text }
    );
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/categoryDeleted",
  async (text) => {
    const initialCategory = { text };
    const response = await client(
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${initialCategory.text}.json`,
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
      `https://box-it-b5c6c-default-rtdb.firebaseio.com/categories/${initialCategory.text.id}.json`,
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
  reducers: {},
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

// export const { categoryAdded, categoryDeleted } = categoriesSlice.actions;

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
