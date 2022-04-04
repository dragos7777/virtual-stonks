import { configureStore } from '@reduxjs/toolkit';
import stonksSlice from './my-stonks-slice';

const store = configureStore({
    reducer: { stonks:stonksSlice.reducer },
  });

  export default store;