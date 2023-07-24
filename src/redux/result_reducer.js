import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  questionGroup: null,
  result: [],
};

export const resultReducer = createSlice({
  name: 'result',
  initialState: {
    userId: null,
    questionGroup: null,
    result: [],
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setQuestionGroup: (state, action) => {
      state.questionGroup = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },
    resetResultAction: () => {
      return initialState;
    },
  },
});

export const {
  setUserId,
  setQuestionGroup,
  pushResultAction,
  resetResultAction,
  updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;
