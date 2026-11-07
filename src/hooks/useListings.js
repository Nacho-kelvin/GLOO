import { useEffect, useState } from 'react'

// Events and opportunity listings managed in /admin, loaded from /api/listings after the page appears.
// status: 'loading' (also during the build-time render), 'ready' or 'error'. On error both lists are empty.
let cache = null
export function useListings() {
  const [state, setState] = useState(cache ? { status: 'ready', ...cache } : { status: 'loading', events: [], opportunities: [] })
  useEffect(() => {
    let live = true
    fetch('/api/listings')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((d) => { cache = { events: d.events || [], opportunities: d.opportunities || [] }; if (live) setState({ status: 'ready', ...cache }) })
      .catch(() => { if (live && !cache) setState({ status: 'error', events: [], opportunities: [] }) })
    return () => { live = false }
  }, [])
  return state
}
