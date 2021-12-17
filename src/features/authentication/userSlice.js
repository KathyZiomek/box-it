/**TODO: create user initialState */
/**TODO: create reducer for signup - add new user to Firebase */
/**TODO: add validation for new user information */
/**TODO: create reducer for login - handle verifying a user's log in information */
/**TODO: modify categorySlice to include a user ID foreign key */

import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

import { uuidv4 } from "../../common/RandomId";

import Firebase from "../../api/Firebase";

const app = Firebase();
const databaseURL = app._options.databaseURL;

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
});

//Thunk functions
export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  // const response = await client.get();
});

/**TODO: incorporate code that hides passwords in the database */
export const saveNewUser = createAsyncThunk(
  "users/saveNewUser",
  async (text) => {
    const initialUser = { text };
    const userId = uuidv4();
    const response = await client.put(`${databaseURL}/users/${userId}.json`, {
      id: userId,
      name: initialUser.text.name,
      email: initialUser.text.email,
      password: initialUser.text.password,
    });
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload !== null) {
          // usersAdapter.setOne
          usersAdapter.setAll(state, action.payload);
          state.status = "idle";
        } else {
          state.status = "idle";
        }
      })
      .addCase(saveNewUser.fulfilled, usersAdapter.addOne);
  },
});

export default usersSlice.reducer;

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.categories);

export const selectUserIds = createSelector(selectUsers, (users) =>
  users.map((user) => user.id)
);
