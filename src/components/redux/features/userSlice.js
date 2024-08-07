import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateNotifications: (state, action) =>{
      state.user.notification = action.payload
    }
  },
});

export const { setUser, updateNotifications} = userSlice.actions;
export default userSlice.reducer;
