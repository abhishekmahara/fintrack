import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    role: 'viewer',
  },
  reducers: {
    toggleRole: (state) => {
      state.role = state.role === 'viewer' ? 'admin' : 'viewer'
    },
  },
})

export const { toggleRole } = uiSlice.actions

export default uiSlice.reducer
