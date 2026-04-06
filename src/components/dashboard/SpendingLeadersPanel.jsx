import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartColors, dashboardPanelClass } from '../../utils/dashboardMetrics'
import { formatCurrency } from '../../utils/formatters'

function SpendingLeadersPanel({ topCategories }) {
  return (
    <div className={dashboardPanelClass}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">Top categories</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Highest spending categories
          </h2>
        </div>
      </div>

      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topCategories} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={90}
              stroke="#475569"
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="value" radius={[0, 12, 12, 0]} fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-3">
        {topCategories.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {category.name}
                </p>
                <p className="text-xs text-slate-500">
                  {category.count} transactions
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {formatCurrency(category.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpendingLeadersPanel
