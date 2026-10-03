import { useState } from 'react'
import Uploader from './components/Uploader.jsx'
import RatingCard from './components/RatingCard.jsx'
import Loader from './components/Loader.jsx'
import { hashImage, generateRating } from './dripEngine.js'

export default function App() {
  const [state, setState] = useState('idle') // idle | loading | result
  const [imageUrl, setImageUrl] = useState(null)
  const [rating, setRating] = useState(null)

  async function handleImage(file, url) {
    setImageUrl(url)
    setState('loading')

    const [hash] = await Promise.all([
      hashImage(file),
      new Promise(r => setTimeout(r, 2200)),
    ])

    const result = generateRating(hash)
    setRating(result)
    setState('result')
  }

  function reset() {
    setState('idle')
    setImageUrl(null)
    setRating(null)
  }

  return (
    <div className="page">
      {/* floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">drippin</span>
        </div>
        <div className="header-badge">Outfit Rater</div>
      </header>

      <main className="main">
        {state === 'idle' && (
          <div className="hero fade-in">
            <div className="hero-eyebrow">
              <span>⚡</span>
              <span>Instant Drip Detection</span>
            </div>
            <h1 className="hero-title">
              How hard are you<br />
              <span className="gradient-text">dripping today?</span>
            </h1>
            <p className="hero-sub">
              Upload your outfit. Get a brutally honest<br />drip score in seconds. No cap.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">0–10</div>
                <div className="stat-label">Drip Score</div>
              </div>
              <div className="stat">
                <div className="stat-num">4</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat">
                <div className="stat-num">Free</div>
                <div className="stat-label">Always</div>
              </div>
            </div>
            <Uploader onImage={handleImage} />
          </div>
        )}

        {state === 'loading' && <Loader />}

        {state === 'result' && rating && (
          <RatingCard rating={rating} imageUrl={imageUrl} onReset={reset} />
        )}
      </main>

      <footer className="footer">
        <p>drippin © 2025 · rate your fit, not your feelings</p>
      </footer>
    </div>
  )
}
