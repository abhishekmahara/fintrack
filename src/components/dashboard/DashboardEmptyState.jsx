import { dashboardPanelClass } from '../../utils/dashboardMetrics'

function DashboardEmptyState() {
  return (
    <div
      className={`${dashboardPanelClass} bg-[radial-gradient(circle_at_top,#dcfce7_0%,#ffffff_38%,#f8fafc_100%)] text-center`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
        Dashboard status
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
        No transactions yet
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
        Add your first transaction to unlock the analytics board, cash signals,
        category monitoring, and savings calculations.
      </p>
    </div>
  )
}

export default DashboardEmptyState
