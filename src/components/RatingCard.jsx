import { useEffect, useState } from 'react'

function ScoreBar({ label, score, comment, delay }) {
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay)
    const t2 = setTimeout(() => setWidth(score * 10), delay + 80)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [score, delay])

  if (!visible) return null

  return (
    <div className="score-row fade-in">
      <div className="score-row-header">
        <span className="score-label">{label}</span>
        <div className="score-right">
          <span className="score-num">{score}</span>
          <span className="score-denom">/10</span>
        </div>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${width}%` }} />
      </div>
      <p className="score-comment">{comment}</p>
    </div>
  )
}

function CountUp({ target, duration = 1400 }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    let start = null
    function step(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setVal(target)
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return <>{val}</>
}

export default function RatingCard({ rating, imageUrl, onReset }) {
  const { overall, tier, scores, comments, verdict } = rating

  const categories = [
    { label: '🎨 Color Combo',  score: scores.color,       comment: comments.color,       delay: 400  },
    { label: '👔 Fit & Style',  score: scores.fit,         comment: comments.fit,         delay: 600  },
    { label: '💍 Accessories',  score: scores.accessories, comment: comments.accessories, delay: 800  },
    { label: '✨ Vibe Check',   score: scores.vibe,        comment: comments.vibe,        delay: 1000 },
  ]

  return (
    <div className="card fade-in">
      {/* image */}
      <div className="image-wrap">
        <img src={imageUrl} alt="Your outfit" className="outfit-img" />
        <div className="img-overlay" />
        <div className="share-hint">📸 Your Fit</div>
        <div
          className="tier-badge"
          style={{ background: tier.color + '18', borderColor: tier.color + '60', color: tier.color }}
        >
          {tier.emoji} {tier.label}
        </div>
      </div>

      {/* overall */}
      <div className="overall-block">
        <div className="overall-glow" style={{ background: tier.color }} />
        <p className="overall-label">Drip Score</p>
        <div className="overall-score" style={{ color: tier.color }}>
          <CountUp target={overall} />
          <span className="overall-denom">/10</span>
        </div>
        <p className="verdict">"{verdict}"</p>
      </div>

      <div className="divider" />

      {/* breakdown */}
      <div className="breakdown">
        <p className="breakdown-title">Breakdown</p>
        {categories.map(c => (
          <ScoreBar key={c.label} {...c} />
        ))}
      </div>

      {/* CTA */}
      <div className="card-footer">
        <button className="reset-btn" onClick={onReset}>
          ↩ Check Another Fit
        </button>
      </div>
    </div>
  )
}
