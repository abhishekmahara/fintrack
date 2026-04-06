import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dashboardPanelClass } from '../../utils/dashboardMetrics'
import { formatCompactCurrency, formatCurrency } from '../../utils/formatters'

function CashMovementPanel({ monthlyTrend }) {
  const latestMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]
  const expenseChange = latestMonth
    ? latestMonth.expenses - (previousMonth?.expenses ?? 0)
    : 0

  return (
    <div className={dashboardPanelClass}>
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Monthly income and expenses
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Monthly comparison
          </h2>
        </div>
        <div className="text-sm text-slate-500">
          <p>
            {latestMonth?.month ?? 'Current month'} expenses:{' '}
            <span className="font-semibold text-slate-900">
              {formatCurrency(latestMonth?.expenses ?? 0)}
            </span>
          </p>
          <p>
            Change from previous month:{' '}
            <span
              className={`font-semibold ${
                expenseChange <= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {expenseChange > 0 ? '+' : ''}
              {formatCurrency(expenseChange)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCompactCurrency}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#incomeFill)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#0f172a"
              strokeWidth={2.4}
              fill="url(#expenseFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CashMovementPanel
