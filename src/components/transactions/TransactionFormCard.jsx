function TransactionFormCard({
  formData,
  onChange,
  onSubmit,
  role,
  sectionCardClass,
}) {
  return (
    <div className={sectionCardClass}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Entry point
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
            Add transaction
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Admins can add new transactions. Viewers have read-only access.
          </p>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
            role === 'admin'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {role}
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="date"
          value={formData.date}
          onChange={(event) => onChange('date', event.target.value)}
          disabled={role !== 'admin'}
          className="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
          required
        />
        <input
          type="number"
          min="0"
          value={formData.amount}
          onChange={(event) => onChange('amount', event.target.value)}
          disabled={role !== 'admin'}
          placeholder="Amount"
          className="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
          required
        />
        <input
          type="text"
          value={formData.category}
          onChange={(event) => onChange('category', event.target.value)}
          disabled={role !== 'admin'}
          placeholder="Category"
          className="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
          required
        />
        <div className="flex gap-3">
          <select
            value={formData.type}
            onChange={(event) => onChange('type', event.target.value)}
            disabled={role !== 'admin'}
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
          <button
            type="submit"
            disabled={role !== 'admin'}
            className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionFormCard
