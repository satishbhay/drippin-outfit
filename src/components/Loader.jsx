export default function Loader() {
  return (
    <div className="loader-wrap fade-in">
      <div className="spinner-wrap">
        <div className="spinner" />
        <div className="spinner-2" />
        <span className="loader-emoji">🔥</span>
      </div>
      <p className="loader-text">Analyzing your drip…</p>
      <p className="loader-sub">Checking color combos, fit, accessories &amp; overall vibe</p>
      <div className="loader-dots">
        <span /><span /><span />
      </div>
    </div>
  )
}
