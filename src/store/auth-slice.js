import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, isRegistered: false, isAdmin: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    loginAdmin(state) {
      state.isLoggedIn = true;
      state.isAdmin = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    logoutAdmin(state) {
      state.isLoggedIn = false;
    },
    registered(state) {
      if (state.isRegistered === false) {
        (state.isRegistered = true), (state.isLoggedIn = true);
      } else {
        state.isLoggedIn = false;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
