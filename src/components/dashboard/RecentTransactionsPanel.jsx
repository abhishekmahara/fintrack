import { dashboardPanelClass } from '../../utils/dashboardMetrics'
import { formatCurrency } from '../../utils/formatters'

function RecentTransactionsPanel({ recentTransactions, totalTransactions }) {
  return (
    <div className={dashboardPanelClass}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">Recent transactions</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Latest activity
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          {totalTransactions} total
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <th className="pb-4">Transaction</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Type</th>
              <th className="pb-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-slate-100">
                <td className="py-4 pr-4">
                  <p className="font-semibold text-slate-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-slate-500">{transaction.category}</p>
                </td>
                <td className="py-4 pr-4 text-sm text-slate-500">
                  {transaction.date}
                </td>
                <td className="py-4 pr-4">
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
                <td className="py-4 text-right text-sm font-semibold text-slate-900">
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentTransactionsPanel
