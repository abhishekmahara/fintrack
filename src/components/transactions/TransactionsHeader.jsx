function TransactionsHeader({
  creditCount,
  debitCount,
  sectionCardClass,
  totalTransactions,
}) {
  return (
    <div className={sectionCardClass}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Ledger workspace
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Transactions
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
            Review transaction activity, add new entries, and narrow the list with
            search and type filters.
          </p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[460px]">
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Total
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {totalTransactions}
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
              Credit
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">
              {creditCount}
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Debit
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {debitCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsHeader
