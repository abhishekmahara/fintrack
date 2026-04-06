import { formatCurrency, formatPercent } from '../../utils/formatters'

function DashboardStatCards({ balance, currentMonthSavings, latestMonth, savingsRate }) {
  const statCards = [
    {
      label: 'Balance',
      value: formatCurrency(balance),
      details: 'Current available amount',
      valueClass: 'text-slate-950',
    },
    {
      label: 'Savings rate',
      value: formatPercent(savingsRate),
      details: latestMonth ? `${latestMonth.month} retained` : 'No income data yet',
      valueClass: 'text-slate-950',
    },
    {
      label: 'Monthly savings',
      value: formatCurrency(Math.max(currentMonthSavings, 0)),
      details: 'Income left after expenses',
      valueClass: currentMonthSavings >= 0 ? 'text-emerald-700' : 'text-rose-600',
    },
  ]

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {statCards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]"
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className={`mt-3 text-3xl font-semibold ${card.valueClass}`}>
            {card.value}
          </p>
          <p className="mt-2 text-sm text-slate-500">{card.details}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardStatCards
