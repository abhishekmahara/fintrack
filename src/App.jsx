import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRole } from './redux/uiSlice'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import Transactions from './pages/Transactions'

const links = ['Dashboard', 'Transactions', 'Insights']

function App() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.ui.role)
  const [activePage, setActivePage] = useState('Dashboard')

  const pageContent = {
    Dashboard: <Dashboard />,
    Transactions: <Transactions />,
    Insights: <Insights />,
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen flex-col md:flex-row">
        <aside className="border-b border-slate-200 bg-slate-900 px-6 py-6 text-slate-100 md:w-64 md:border-b-0 md:border-r">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              FinTrack
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Dashboard</h1>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => setActivePage(link)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activePage === link
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">App</p>
              <h2 className="text-2xl font-semibold text-slate-900">
                FinTrack Dashboard
              </h2>
            </div>

            <button
              type="button"
              onClick={() => dispatch(toggleRole())}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Role: {role}
            </button>
          </header>

          <section className="px-6 py-8">
            {pageContent[activePage]}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
