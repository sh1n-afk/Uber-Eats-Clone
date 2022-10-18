import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  memberId: "",
  memberName: "",
  memberType: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMember: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.memberId = action.payload.memberId;
      state.memberName = action.payload.memberName;
      state.memberType = action.payload.memberType;
    },
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.memberId = "";
      state.memberName = "";
      state.memberEmail = "";
      state.memberType = "";
    },
  },
});

export const { setMember, resetAuth } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectMemberName = (state) => state.auth.memberName;
export const selectMemberId = (state) => state.auth.memberId;
export const selectMemberType = (state) => state.auth.memberType;

export default authSlice.reducer;
