import { useSelector } from 'react-redux'
import CashMovementPanel from '../components/dashboard/CashMovementPanel'
import DashboardEmptyState from '../components/dashboard/DashboardEmptyState'
import DashboardHero from '../components/dashboard/DashboardHero'
import DashboardStatCards from '../components/dashboard/DashboardStatCards'
import ExpenseMixPanel from '../components/dashboard/ExpenseMixPanel'
import RecentTransactionsPanel from '../components/dashboard/RecentTransactionsPanel'
import SavingsPanel from '../components/dashboard/SavingsPanel'
import SpendingLeadersPanel from '../components/dashboard/SpendingLeadersPanel'
import { getDashboardMetrics } from '../utils/dashboardMetrics'

function Dashboard() {
  const transactions = useSelector((state) => state.transactions)
  const hasTransactions = transactions.length > 0
  const {
    balance,
    currentMonthSavings,
    highestSpendingCategory,
    latestMonth,
    monthlyExpenseDelta,
    monthlyTrend,
    recentTransactions,
    savingsRate,
    topCategories,
  } = getDashboardMetrics(transactions)

  return (
    <section className="min-w-0 space-y-5">
      <DashboardHero />

      {!hasTransactions ? <DashboardEmptyState /> : null}

      {hasTransactions ? (
        <>
          <DashboardStatCards
            balance={balance}
            currentMonthSavings={currentMonthSavings}
            latestMonth={latestMonth}
            savingsRate={savingsRate}
          />

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(290px,0.9fr)]">
            <CashMovementPanel monthlyTrend={monthlyTrend} />

            <div className="grid gap-4">
              <SavingsPanel
                currentMonthSavings={currentMonthSavings}
                highestSpendingCategory={highestSpendingCategory}
                monthlyExpenseDelta={monthlyExpenseDelta}
                savingsRate={savingsRate}
              />
              <ExpenseMixPanel topCategories={topCategories} />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
            <RecentTransactionsPanel
              recentTransactions={recentTransactions}
              totalTransactions={transactions.length}
            />
            <SpendingLeadersPanel topCategories={topCategories} />
          </div>
        </>
      ) : null}
    </section>
  )
}

export default Dashboard
