import { createSlice } from '@reduxjs/toolkit'
import { transactions } from '../data/transactions'

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: transactions,
  reducers: {
    addTransaction: (state, action) => {
      state.unshift({
        id: `TXN-${Date.now()}`,
        status: 'completed',
        ...action.payload,
      })
    },
  },
})

export const { addTransaction } = transactionSlice.actions

export default transactionSlice.reducer
