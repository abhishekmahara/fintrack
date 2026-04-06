import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { chartColors } from '../../utils/dashboardMetrics'
import { formatCurrency } from '../../utils/formatters'

function ExpenseMixPanel({ topCategories }) {
  return (
    <div className="rounded-lg border  bg-[linear-gradient(180deg,#08150e_0%,#10261b_100%)] p-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">Expense mix</p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            Spending by category
          </h3>
        </div>
      </div>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topCategories}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={4}
            >
              {topCategories.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ExpenseMixPanel
