// The database-backed admin dashboard has been removed from the static site.
// Keep the legacy route's lazy-import target as a safe informational fallback.
export default function Admin() {
  return <section className="wrap sec measure"><h1>Admin is not available</h1><p>This static website does not include an admin dashboard or database.</p></section>
}
