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

const formatPercent = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value)

const chartColors = ['#0f766e', '#2563eb', '#ea580c', '#7c3aed', '#dc2626']
const cardClass =
  'rounded-[28px] border border-slate-200/80 bg-white/95 p-7 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)]'

function Dashboard() {
  const transactions = useSelector((state) => state.transactions)
  const hasTransactions = transactions.length > 0

  const income = transactions
    .filter((transaction) => transaction.type === 'credit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const expenses = transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = income - expenses

  const monthlyTrend = Object.values(
    transactions.reduce((accumulator, transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}`

      if (!accumulator[monthKey]) {
        accumulator[monthKey] = {
          monthKey,
          month: date.toLocaleString('en-IN', {
            month: 'short',
            year: 'numeric',
          }),
          income: 0,
          expenses: 0,
        }
      }

      if (transaction.type === 'credit') {
        accumulator[monthKey].income += transaction.amount
      } else {
        accumulator[monthKey].expenses += transaction.amount
      }

      return accumulator
    }, {}),
  ).sort((firstMonth, secondMonth) =>
    firstMonth.monthKey.localeCompare(secondMonth.monthKey),
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
  ).sort((firstCategory, secondCategory) => secondCategory.value - firstCategory.value)

  const highestSpendingCategory = categoryBreakdown[0]

  const latestMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]
  const currentMonthSavings = latestMonth
    ? latestMonth.income - latestMonth.expenses
    : 0
  const savingsRate =
    latestMonth && latestMonth.income > 0
      ? currentMonthSavings / latestMonth.income
      : 0
  const monthlyExpenseDelta = latestMonth
    ? latestMonth.expenses - (previousMonth?.expenses ?? 0)
    : 0
  const monthlyExpenseDeltaLabel =
    monthlyExpenseDelta === 0
      ? 'No change from last month'
      : `${monthlyExpenseDelta > 0 ? '+' : '-'}${formatCurrency(
          Math.abs(monthlyExpenseDelta),
        )} vs ${previousMonth?.month ?? 'previous month'}`

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
    {
      label: 'Highest Spending Category',
      value: highestSpendingCategory?.name ?? 'No expenses yet',
      accent: 'text-amber-600',
      details: highestSpendingCategory
        ? formatCurrency(highestSpendingCategory.value)
        : 'Track debit transactions to unlock this',
    },
    {
      label: 'Monthly Comparison',
      value: latestMonth
        ? `${latestMonth.month} vs ${previousMonth?.month ?? 'last month'}`
        : 'Not enough data',
      accent: 'text-blue-600',
      details: latestMonth
        ? monthlyExpenseDeltaLabel
        : 'Add transactions across two months to compare',
    },
    {
      label: 'Savings Calculation',
      value: formatCurrency(currentMonthSavings),
      accent: currentMonthSavings >= 0 ? 'text-emerald-600' : 'text-rose-600',
      details: latestMonth
        ? `${formatPercent(savingsRate)} saved in ${latestMonth.month}`
        : 'Savings rate updates once income is available',
    },
  ]

  return (
    <section className="min-w-0 space-y-8">
      <div className={`${cardClass} overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50/70`}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Overview
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
          Dashboard
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-base">
          A quick snapshot of your current balance, income, and spending.
        </p>
      </div>

      {!hasTransactions ? (
        <div className={`${cardClass} bg-gradient-to-br from-white via-slate-50 to-slate-100/80 text-center`}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Dashboard status
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            No transactions yet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Add your first transaction to see balances, category insights, monthly
            comparisons, and savings calculations here.
          </p>
        </div>
      ) : null}

      {hasTransactions ? (
        <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`${cardClass} group`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {card.label}
            </p>
            <p
              className={`mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-[2rem] ${card.accent} transition duration-300 group-hover:scale-[1.01]`}
            >
              {card.value}
            </p>
            {card.details ? (
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {card.details}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className={`${cardClass} min-w-0`}>
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Monthly trend
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
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

        <div className={`${cardClass} min-w-0`}>
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Category breakdown
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
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
        </>
      ) : null}
    </section>
  )
}

export default Dashboard
