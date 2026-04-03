import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: 'viewer',
  filters: {
    search: '',
    type: 'all',
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
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
      state.filters = initialState.filters
    },
  },
})

export const { toggleRole, setFilters, resetFilters } = uiSlice.actions

export default uiSlice.reducer
