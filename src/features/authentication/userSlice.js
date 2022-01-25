import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
// import { client } from "../../api/client";

// import Firebase from "../../api/Firebase";

// const app = Firebase();
// const databaseURL = app._options.databaseURL;

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
});

//Thunk functions
export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  // const response = await client.get();
});

// /**TODO: incorporate code that hides passwords in the database */
// export const saveNewUser = createAsyncThunk(
//   "users/saveNewUser",
//   async (text) => {
//     // const initialUser = { text };
//     // const response = await client.put(`${databaseURL}/users/${userId}.json`, {
//     //   id: userId,
//     //   email: initialUser.text.email,
//     //   password: initialUser.text.password,
//     // });
//     // return response;
//   }
// );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: usersAdapter.setAll,
    userRemoved: usersAdapter.removeOne,

    /**TODO: convert saveLoggedInUser thunk to a regular reducer, instead of a builder  - save the current UID as a current user
     * TODO: use this information when fetching categories + tasks
     * TODO: update saving categories to include a UID foreign key
     */
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(fetchUser.pending, (state, action) => {
    //   state.status = "loading";
    // })
    // .addCase(fetchUser.fulfilled, (state, action) => {
    //   if (action.payload !== null) {
    //     // usersAdapter.setOne
    //     usersAdapter.setAll(state, action.payload);
    //     state.status = "idle";
    //   } else {
    //     state.status = "idle";
    //   }
    // })
    // .addCase(saveLoggedInUser.fulfilled, usersAdapter.addOne);
  },
});

export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectUserIds = createSelector(selectUsers, (users) =>
  users.map((user) => user.id)
);
