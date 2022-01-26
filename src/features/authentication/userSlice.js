import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
});

//Thunk functions
export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  // const response = await client.get();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: usersAdapter.setAll,
    userRemoved: usersAdapter.removeOne,
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
