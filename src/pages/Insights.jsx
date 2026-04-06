import { useSelector } from 'react-redux'
import { formatCurrency, formatPercent } from '../utils/formatters'

const insightCardClass =
  'rounded-lg border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf8_100%)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]'

function Insights() {
  const transactions = useSelector((state) => state.transactions)

  const credits = transactions.filter((item) => item.type === 'credit')
  const debits = transactions.filter((item) => item.type === 'debit')
  const topCategory = debits.reduce((leader, item) => {
    const existing = leader[item.category] ?? 0
    leader[item.category] = existing + item.amount
    return leader
  }, {})

  const averageExpense =
    debits.length > 0
      ? debits.reduce((total, item) => total + item.amount, 0) / debits.length
      : 0
  const completedRate =
    transactions.length > 0
      ? transactions.filter((item) => item.status === 'completed').length /
        transactions.length
      : 0
  const largestExpense =
    debits.length > 0
      ? debits.reduce((largest, item) =>
          item.amount > largest.amount ? item : largest,
        )
      : null
  const topCategoryEntry = Object.entries(topCategory).sort(
    (firstItem, secondItem) => secondItem[1] - firstItem[1],
  )[0]
  const pendingCount = transactions.filter((item) => item.status === 'pending').length

  return (
    <section className="space-y-6">
      <div className={insightCardClass}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Insight layer
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Analytics signals
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          A quiet summary of operational behavior across credits, expenses, and
          transaction completion quality.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-emerald-950/20 bg-[linear-gradient(180deg,#08150e_0%,#10261b_100%)] p-5 text-white shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100/80">
            Income entries
          </p>
          <p className="mt-4 text-5xl font-semibold tracking-[-0.06em]">
            {credits.length}
          </p>
          <p className="mt-2 text-sm text-emerald-50/90">
            Credit transactions currently recorded
          </p>
        </div>

        <div className={insightCardClass}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Average expense
          </p>
          <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-slate-950">
            {formatCurrency(averageExpense)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Mean debit size across all spending activity
          </p>
        </div>

        <div className={`${insightCardClass} bg-[linear-gradient(180deg,#e8f7eb_0%,#daf2df_100%)]`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/60">
            Completion health
          </p>
          <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-slate-950">
            {formatPercent(completedRate)}
          </p>
          <p className="mt-2 text-sm text-emerald-800">
            Transactions marked completed
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className={insightCardClass}>
          <p className="text-sm font-medium text-slate-500">Spending summary</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Largest outgoing payment
          </h2>

          {largestExpense ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <p className="text-3xl font-semibold text-slate-950">
                  {largestExpense.description}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {largestExpense.category} on {largestExpense.date}
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-500">
                  This is the highest single debit recorded in the current dataset
                  and is a useful reference point when reviewing monthly outliers.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 px-4 py-3 text-left sm:min-w-[150px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Amount
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatCurrency(largestExpense.amount)}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No debit transactions yet.</p>
          )}
        </div>

        <div className={insightCardClass}>
          <p className="text-sm font-medium text-slate-500">Quick notes</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Current observations
          </h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                Top spending category
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {topCategoryEntry
                  ? `${topCategoryEntry[0]} at ${formatCurrency(topCategoryEntry[1])}`
                  : 'No category data available'}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                Pending transactions
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {pendingCount} still awaiting completion
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                Income entries
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {credits.length} credit transactions recorded so far
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Insights
