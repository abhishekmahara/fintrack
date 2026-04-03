import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction } from '../redux/transactionSlice'
import { resetFilters, setFilters } from '../redux/uiSlice'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

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
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Transactions
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Search and filter recent transaction activity.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Add transaction
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Admins can add new transactions. Viewers have read-only access.
            </p>
          </div>
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              role === 'admin'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {role}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <input
            type="date"
            value={formData.date}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                date: event.target.value,
              }))
            }
            disabled={role !== 'admin'}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            required
          />
          <input
            type="number"
            min="0"
            value={formData.amount}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                amount: event.target.value,
              }))
            }
            disabled={role !== 'admin'}
            placeholder="Amount"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            required
          />
          <input
            type="text"
            value={formData.category}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                category: event.target.value,
              }))
            }
            disabled={role !== 'admin'}
            placeholder="Category"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            required
          />
          <div className="flex gap-3">
            <select
              value={formData.type}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  type: event.target.value,
                }))
              }
              disabled={role !== 'admin'}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
            <button
              type="submit"
              disabled={role !== 'admin'}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              htmlFor="transaction-search"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Search
            </label>
            <input
              id="transaction-search"
              type="text"
              value={filters.search}
              onChange={(event) =>
                dispatch(setFilters({ search: event.target.value }))
              }
              placeholder="Search by description or category"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="md:w-48">
            <label
              htmlFor="transaction-type"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Filter
            </label>
            <select
              id="transaction-type"
              value={filters.type}
              onChange={(event) =>
                dispatch(setFilters({ type: event.target.value }))
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
            >
              <option value="all">All types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead>
              <tr className="text-sm text-slate-500">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm text-slate-700">
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4 font-medium text-slate-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-4">{transaction.category}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.type === 'credit'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 ? (
            <p className="pt-6 text-sm text-slate-500">
              No transactions match the current search or filter.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Transactions
