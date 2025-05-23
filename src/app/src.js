import { configureStore } from '@reduxjs/toolkit';
 
import EmployeeSlice from './slices/EmployeeSlice'; 
const store = configureStore({
  reducer: {
   employee: EmployeeSlice
  },
});

export default store;
