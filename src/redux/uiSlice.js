import { createSlice } from '@reduxjs/toolkit'

export const uiInitialState = {
  role: 'viewer',
  filters: {
    search: '',
    type: 'all',
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    toggleRole: (state) => {
      state.role = state.role === 'viewer' ? 'admin' : 'viewer'
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      }
    },
    resetFilters: (state) => {
      state.filters = uiInitialState.filters
    },
  },
})

export const { toggleRole, setFilters, resetFilters } = uiSlice.actions

export default uiSlice.reducer
