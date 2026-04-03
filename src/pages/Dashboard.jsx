import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useSelector } from 'react-redux'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const formatCompactCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

const chartColors = ['#0f766e', '#2563eb', '#ea580c', '#7c3aed', '#dc2626']

function Dashboard() {
  const transactions = useSelector((state) => state.transactions)

  const income = transactions
    .filter((transaction) => transaction.type === 'credit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const expenses = transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = income - expenses

  const summaryCards = [
    {
      label: 'Total Balance',
      value: formatCurrency(balance),
      accent: 'text-slate-900',
    },
    {
      label: 'Income',
      value: formatCurrency(income),
      accent: 'text-emerald-600',
    },
    {
      label: 'Expenses',
      value: formatCurrency(expenses),
      accent: 'text-rose-600',
    },
  ]

  const monthlyTrend = Object.values(
    transactions.reduce((accumulator, transaction) => {
      const month = new Date(transaction.date).toLocaleString('en-IN', {
        month: 'short',
      })

      if (!accumulator[month]) {
        accumulator[month] = {
          month,
          income: 0,
          expenses: 0,
        }
      }

      if (transaction.type === 'credit') {
        accumulator[month].income += transaction.amount
      } else {
        accumulator[month].expenses += transaction.amount
      }

      return accumulator
    }, {}),
  )

  const categoryBreakdown = Object.values(
    transactions
      .filter((transaction) => transaction.type === 'debit')
      .reduce((accumulator, transaction) => {
        if (!accumulator[transaction.category]) {
          accumulator[transaction.category] = {
            name: transaction.category,
            value: 0,
          }
        }

        accumulator[transaction.category].value += transaction.amount
        return accumulator
      }, {}),
  )

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          A quick snapshot of your current balance, income, and spending.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className={`mt-3 text-3xl font-semibold ${card.accent}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">Monthly trend</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Income vs expenses
            </h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">
              Category breakdown
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Expense split
            </h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
