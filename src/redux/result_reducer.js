import { createSlice } from '@reduxjs/toolkit';

export const resultReducer = createSlice({
  name: 'result',
  initialState: {
    userID: null,
    result: [],
  },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },

    resetResultActions: () => {
      return {
        userID: null,
        result: [],
      };
    },
  },
});

export const { setUserID, pushResultAction, resetResultActions } = resultReducer.actions;
export default resultReducer.reducer;
