// The HOMEAFAR title: black lettering with a distinctive, larger italic "A" carrying a fine gold rule.
// Screen readers get one clean label ("HomeAFar") instead of three fragments. The emblem image beside it is untouched.
export default function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`.trim()} role="img" aria-label="HomeAFar">
      <span aria-hidden="true">Home</span><span className="wm-a" aria-hidden="true">A</span><span aria-hidden="true">Far</span>
    </span>
  )
}
