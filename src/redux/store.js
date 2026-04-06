import { configureStore } from '@reduxjs/toolkit'
import transactionReducer, { transactionInitialState } from './transactionSlice'
import uiReducer, { uiInitialState } from './uiSlice'
import { loadPersistedState, savePersistedState } from './persistence'

const persistedState = loadPersistedState()

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    ui: uiReducer,
  },
  preloadedState: {
    transactions: persistedState?.transactions ?? transactionInitialState,
    ui: {
      ...uiInitialState,
      role: persistedState?.ui?.role ?? uiInitialState.role,
    },
  },
})

store.subscribe(() => {
  savePersistedState(store.getState())
})
