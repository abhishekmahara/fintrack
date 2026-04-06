const STORAGE_KEY = 'fintrack-dashboard-state'

export const loadPersistedState = () => {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)

    if (!rawState) {
      return undefined
    }

    const parsedState = JSON.parse(rawState)

    return {
      transactions: Array.isArray(parsedState.transactions)
        ? parsedState.transactions
        : undefined,
      ui: {
        role:
          parsedState.ui?.role === 'admin' || parsedState.ui?.role === 'viewer'
            ? parsedState.ui.role
            : undefined,
      },
    }
  } catch {
    return undefined
  }
}

export const savePersistedState = (state) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        transactions: state.transactions,
        ui: {
          role: state.ui.role,
        },
      }),
    )
  } catch {
    // Ignore storage write failures so the app keeps working.
  }
}
