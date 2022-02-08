import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../../../api/client";

import { uuidv4 } from "../../../../common/RandomId";

import {
  Firebase,
  ReturnToken,
  ReturnUid,
  FirebaseUrl,
} from "../../../../api/Firebase";
import { getAuth } from "firebase/auth";

const app = Firebase();
const databaseURL = FirebaseUrl(app);

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  status: "idle",
  httpErr: false,
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const response = await client.get(
      `${databaseURL}/users/${uid}/categories.json?auth=${token}`
    );

    // if (response !== null) {
    //   let categories = {};
    //   for (var key in response) {
    //     if (!response.hasOwnProperty(key)) continue;

    //     let obj = response[key];
    //     let objId = key;

    //     for (var prop in obj) {
    //       if (!obj.hasOwnProperty(prop)) continue;

    //       if (user.text.uid === obj[prop]) {
    //         const newItem = { [objId]: obj };

    //         if (ObjectLength(categories) > 0) {
    //           categories = { ...categories, [objId]: obj };
    //         } else {
    //           categories = newItem;
    //         }
    //       }
    //     }
    //   }

    return response;
  }
);

export const saveNewCategory = createAsyncThunk(
  "categories/saveNewCategory",
  async (text, { rejectWithValue, fulfillWithValue }) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialCategory = { text };
    const categoryId = uuidv4();

    try {
      const response = await client.put(
        `${databaseURL}/users/${uid}/categories/${categoryId}.json?auth=${token}`,
        {
          id: categoryId,
          name: initialCategory.text.name,
          color: initialCategory.text.color,
          uid: uid,
        }
      );
      if (response === null) {
        return rejectWithValue(response);
      }
      return fulfillWithValue(response);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/categoryDeleted",
  async (text) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialCategory = { text };
    const response = await client(
      `${databaseURL}/users/${uid}/categories/${initialCategory.text}.json?auth=${token}`,
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
  async (text, { rejectWithValue, fulfillWithValue }) => {
    const auth = getAuth();
    const uid = ReturnUid(auth);
    const token = ReturnToken(auth);

    const initialCategory = { text };

    try {
      const response = await client(
        `${databaseURL}/users/${uid}/categories/${initialCategory.text.id}.json?auth=${token}`,
        { method: "PATCH", body: initialCategory.text }
      );
      if (response === null) {
        return rejectWithValue(response);
      }
      return fulfillWithValue(response);
    } catch (error) {
      throw rejectWithValue(error.message);
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
      .addCase(saveNewCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(saveNewCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.httpErr = false;
        categoriesAdapter.addOne(state, action.payload);
      })
      .addCase(saveNewCategory.rejected, (state, action) => {
        state.status = "idle";
        state.httpErr = true;
      })
      .addCase(deleteCategory.fulfilled, categoriesAdapter.removeOne)
      .addCase(updateCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const { id, ...changes } = payload;
        state.httpErr = false;
        state.status = "idle";
        categoriesAdapter.updateOne(state, { id, changes });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "idle";
        state.httpErr = true;
      });
  },
});

export const { categoriesDeleted } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.categories);

export const selectCategoryIds = createSelector(
  selectCategories,
  (categories) => categories.map((category) => category.id)
);
