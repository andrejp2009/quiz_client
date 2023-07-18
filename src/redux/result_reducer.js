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
  },
});

export const { setUserID } = resultReducer.actions;
export default resultReducer.reducer;
