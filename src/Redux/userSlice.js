import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = { data: user ? JSON.parse(user) : null };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
