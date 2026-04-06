import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRole } from './redux/uiSlice'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import Transactions from './pages/Transactions'

const links = [
  {
    id: 'Dashboard',
  },
  {
    id: 'Transactions',
  },
  {
    id: 'Insights',
  },
]

function App() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.ui.role)
  const [activePage, setActivePage] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const pageContent = {
    Dashboard: <Dashboard />,
    Transactions: <Transactions />,
    Insights: <Insights />,
  }

  return (

      <div className="mx-auto max-w-screen 2 bg-[radial-gradient(circle_at_top,#1a5d33_0%,#0b1b12_42%,#07110b_100%)] p-3 sm:p-4">
        <div className="flex min-h-[calc(100vh-1.5rem)] flex-col gap-3 md:h-[calc(100vh-3.5rem)] md:flex-row md:overflow-hidden md:gap-4">
        <aside
          className={`rounded-lg border border-white/8 bg-[linear-gradient(180deg,#0b1c12_0%,#10261a_100%)] text-slate-100 shadow-[0_10px_24px_rgba(15,23,42,0.14)] md:w-[252px] md:shrink-0 ${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="px-5 py-5 md:px-6 md:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <div className="flex gap-1">
                      <span className="block h-4 w-1 rounded-full bg-emerald-300" />
                      <span className="block h-4 w-1 rounded-full bg-emerald-400/70" />
                      <span className="block h-4 w-1 rounded-full bg-emerald-500/50" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold tracking-[-0.03em] text-white">
                      FINTRAC
                    </p>
                    <p className="text-xs  tracking-[0.24em] text-emerald-200/60">
                      Personal finance
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-white/20 hover:text-white md:hidden"
              >
                Close
              </button>
            </div>
          </div>

          <div className="px-5 pb-5 md:px-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
              Navigation
            </p>
          </div>
          <nav className="flex flex-col gap-2 px-4 pb-5 md:px-5">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActivePage(link.id)
                  setIsSidebarOpen(false)
                }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                  activePage === link.id
                    ? 'bg-white/9 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'text-slate-300 hover:bg-white/6 hover:text-white'
                }`}
              >
                <span className="block text-sm font-semibold tracking-[-0.02em]">
                  {link.id}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-lg border border-emerald-950/8 bg-[linear-gradient(180deg,#ffffff_0%,#f6faf7_100%)] p-3 shadow-[0_10px_28px_rgba(15,23,42,0.08)] md:overflow-y-auto md:p-4">
          <div className="min-h-full rounded-lg bg-transparent p-2 sm:p-3">
            <header className="flex flex-col gap-4 rounded-lg border border-slate-200/70 bg-white px-4 py-4 shadow-[0_6px_16px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {activePage}
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen((current) => !current)}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:hidden"
                >
                  {isSidebarOpen ? 'Hide menu' : 'Show menu'}
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(toggleRole())}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Role: {role}
                </button>
              </div>
            </header>

            <section className="min-w-0 px-1 py-5 sm:px-1 sm:py-6">
              {pageContent[activePage]}
            </section>
          </div>
        </main>
        </div>
      </div>
 
  )
}

export default App
