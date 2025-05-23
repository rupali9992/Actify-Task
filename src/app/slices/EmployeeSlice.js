// app/slices/EmployeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
