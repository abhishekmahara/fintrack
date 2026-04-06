import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionFiltersCard from '../components/transactions/TransactionFiltersCard'
import TransactionFormCard from '../components/transactions/TransactionFormCard'
import TransactionsHeader from '../components/transactions/TransactionsHeader'
import { addTransaction } from '../redux/transactionSlice'
import { resetFilters, setFilters } from '../redux/uiSlice'

const sectionCardClass =
  'rounded-lg border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf8_100%)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)] sm:p-6'

function Transactions() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.ui.role)
  const filters = useSelector((state) => state.ui.filters)
  const transactions = useSelector((state) => state.transactions)
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'debit',
  })

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category
        .toLowerCase()
        .includes(filters.search.trim().toLowerCase()) ||
      transaction.description
        .toLowerCase()
        .includes(filters.search.trim().toLowerCase())

    const matchesType =
      filters.type === 'all' || transaction.type === filters.type

    return matchesSearch && matchesType
  })

  const creditCount = transactions.filter(
    (transaction) => transaction.type === 'credit',
  ).length
  const debitCount = transactions.filter(
    (transaction) => transaction.type === 'debit',
  ).length

  const handleFormChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (role !== 'admin') {
      return
    }

    dispatch(
      addTransaction({
        date: formData.date,
        amount: Number(formData.amount),
        category: formData.category.trim(),
        type: formData.type,
        description: formData.category.trim(),
      }),
    )

    setFormData({
      date: '',
      amount: '',
      category: '',
      type: 'debit',
    })
  }

  return (
    <section className="min-w-0 space-y-6">
      <TransactionsHeader
        creditCount={creditCount}
        debitCount={debitCount}
        sectionCardClass={sectionCardClass}
        totalTransactions={transactions.length}
      />

      <TransactionFormCard
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        role={role}
        sectionCardClass={sectionCardClass}
      />

      <TransactionFiltersCard
        filteredTransactions={filteredTransactions}
        filters={filters}
        onReset={() => dispatch(resetFilters())}
        onSearchChange={(search) => dispatch(setFilters({ search }))}
        onTypeChange={(type) => dispatch(setFilters({ type }))}
        sectionCardClass={sectionCardClass}
      />
    </section>
  )
}

export default Transactions
