import { formatCurrency } from '../../utils/formatters'

function TransactionFiltersCard({
  filteredTransactions,
  filters,
  onReset,
  onSearchChange,
  onTypeChange,
  sectionCardClass,
}) {
  return (
    <div className={sectionCardClass}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="transaction-search"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Search
          </label>
          <input
            id="transaction-search"
            type="text"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by description or category"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div className="md:w-48">
          <label
            htmlFor="transaction-type"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Filter
          </label>
          <select
            id="transaction-type"
            value={filters.type}
            onChange={(event) => onTypeChange(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
          >
            <option value="all">All types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="-mx-5 mt-6 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
        <table className="min-w-[40rem] divide-y divide-slate-100 text-left">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <th className="pb-3 pr-6">Date</th>
              <th className="pb-3 pr-6">Amount</th>
              <th className="pb-3 pr-6">Category</th>
              <th className="pb-3">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="text-sm text-slate-700">
                <td className="py-4 pr-6 whitespace-nowrap">{transaction.date}</td>
                <td className="py-4 pr-6 whitespace-nowrap font-medium text-slate-900">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="py-4 pr-6">{transaction.category}</td>
                <td className="py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      transaction.type === 'credit'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
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
  )
}

export default TransactionFiltersCard
