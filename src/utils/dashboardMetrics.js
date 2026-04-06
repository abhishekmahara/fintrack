export const chartColors = ['#22c55e', '#7dd3fc', '#86efac', '#fb7185', '#facc15']

export const dashboardPanelClass =
  'rounded-lg border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf8_100%)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]'

export function getDashboardMetrics(transactions) {
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
          month: date.toLocaleString('en-IN', { month: 'short' }),
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
  )
    .sort((firstMonth, secondMonth) =>
      firstMonth.monthKey.localeCompare(secondMonth.monthKey),
    )
    .map((entry) => ({
      ...entry,
      savings: entry.income - entry.expenses,
    }))

  const categoryBreakdown = Object.values(
    transactions
      .filter((transaction) => transaction.type === 'debit')
      .reduce((accumulator, transaction) => {
        if (!accumulator[transaction.category]) {
          accumulator[transaction.category] = {
            name: transaction.category,
            value: 0,
            count: 0,
          }
        }

        accumulator[transaction.category].value += transaction.amount
        accumulator[transaction.category].count += 1
        return accumulator
      }, {}),
  ).sort((firstCategory, secondCategory) => secondCategory.value - firstCategory.value)

  const topCategories = categoryBreakdown.slice(0, 4)
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

  const recentTransactions = [...transactions]
    .sort((firstItem, secondItem) => secondItem.date.localeCompare(firstItem.date))
    .slice(0, 4)

  return {
    balance,
    currentMonthSavings,
    expenses,
    highestSpendingCategory,
    income,
    latestMonth,
    monthlyExpenseDelta,
    monthlyTrend,
    previousMonth,
    recentTransactions,
    savingsRate,
    topCategories,
  }
}
