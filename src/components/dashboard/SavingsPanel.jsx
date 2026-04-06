import { formatCompactCurrency, formatCurrency, formatPercent } from '../../utils/formatters'

function SavingsPanel({
  currentMonthSavings,
  highestSpendingCategory,
  monthlyExpenseDelta,
  savingsRate,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]">
      <p className="text-sm font-medium text-slate-500">Savings</p>
      <p className="mt-3 text-4xl font-semibold text-slate-950">
        {formatCompactCurrency(currentMonthSavings)}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {currentMonthSavings >= 0 ? '+' : '-'}
        {formatPercent(Math.abs(savingsRate))} of income retained this month
      </p>
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Highest spending category
            </p>
            <p className="text-xs text-slate-500">
              {highestSpendingCategory?.name ?? 'Pending data'}
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-900">
            {highestSpendingCategory
              ? formatCompactCurrency(highestSpendingCategory.value)
              : formatCurrency(0)}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Expense change</p>
            <p className="text-xs text-slate-500">Compared with last month</p>
          </div>
          <p
            className={`text-sm font-semibold ${
              monthlyExpenseDelta <= 0 ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            {monthlyExpenseDelta > 0 ? '+' : ''}
            {formatCompactCurrency(monthlyExpenseDelta)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SavingsPanel
