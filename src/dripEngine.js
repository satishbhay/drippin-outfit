// ─────────────────────────────────────────────
//  drip data – all ratings live here in code
// ─────────────────────────────────────────────

export const TIERS = [
  { min: 0,  max: 5,  label: 'Below Average',    emoji: '😐', color: '#f0c040' },
  { min: 6,  max: 6,  label: 'Decent Fit',        emoji: '😤', color: '#a0d080' },
  { min: 7,  max: 7,  label: 'Clean Drip',        emoji: '🔥', color: '#7bed9f' },
  { min: 8,  max: 8,  label: 'Hard Dripping',     emoji: '🔥', color: '#2ed573' },
  { min: 9,  max: 9,  label: 'Elite Fit Check',   emoji: '💎', color: '#70a1ff' },
  { min: 10, max: 10, label: 'GOAT Drip',         emoji: '👑', color: '#ffd700' },
]

export const COMMENTS = {
  color: [
    "Color combo goes absolutely crazy hard fr",
    "The palette coordination is giving museum vibes",
    "Color choices are on another level",
    "This color balance hits different — perfect execution",
    "Muted tones delivering understated elite drip",
    "Bold colors pulled off flawlessly, no cap",
    "The contrast is immaculate, very intentional",
    "Monochrome done right — timeless and clean",
    "Color game is speaking for itself, W",
    "The tonal balance is genuinely impressive",
    "These shades complement each other perfectly",
    "Color harmony is giving fashion week energy",
    "Earthy palette working overtime, love it",
    "The color story is cohesive from top to bottom",
    "Subtle but rich — serious style knowledge here",
  ],
  fit: [
    "The fit is giving full main character energy",
    "Silhouette is razor clean, no notes",
    "Proportions are dialed in perfectly",
    "Oversized done right — a true W",
    "Tailored energy even if it's not tailored",
    "The drape on that is genuinely elite",
    "Streetwear check passed with flying colors ✅",
    "Layering game is immaculate, different level",
    "This fit hits different in the best way possible",
    "Clean and minimal — the timeless W formula",
    "The structure of this outfit is seriously good",
    "Relaxed but intentional — peak street style",
    "The length ratios are working perfectly here",
    "Every piece is doing its job beautifully",
    "The whole fit just flows together naturally",
  ],
  accessories: [
    "Accessories are the cherry on top 🍒",
    "The shoes alone are carrying serious heat",
    "Minimal accessories and it still slaps hard",
    "That jewelry is elevating everything around it",
    "Statement piece is literally making a statement",
    "The bag ties the whole look together perfectly",
    "Accessories game is quietly elite, very clean",
    "The watch or chain is a silent flex right here",
    "Footwear choice was the right call, respect",
    "The layers of accessories work in total harmony",
    "Dripping in the details — accessories on point",
    "That one piece elevated the whole outfit to elite",
    "Accessories are doing exactly what they should",
    "Clean restraint on accessories — less is more here",
    "The finishing touches show real style awareness",
  ],
  vibe: [
    "This fit walked in and the whole room changed",
    "Serving looks without even appearing to try",
    "The confidence this fit projects is unmatched",
    "Built different, dressed different, no competition",
    "The vibe is consistent and locked in from head to toe",
    "Drip so hard it's practically illegal in some states",
    "The aesthetic is giving perfectly curated Pinterest board",
    "Core vibes fully unlocked — W behavior",
    "The look is telling a complete story",
    "Trendy but still authentically you — rare combo",
    "This energy is giving main character in a movie",
    "The overall presentation is genuinely impressive",
    "Style IQ is through the roof with this one",
    "This is what showing up looks like, certified",
    "The whole package is delivering, no weak spots",
  ],
}

export const FINAL_VERDICTS = [
  // score 0-5
  ["There's room to grow — style is a journey",
   "The potential is there, keep experimenting",
   "Solid foundation, just needs more sauce",
   "With a few tweaks this becomes a W fit"],

  // score 6
  ["Decent fit, genuinely not bad at all",
   "You passed the fit check with confidence",
   "Solid showing — the streets notice this",
   "Clean entry level drip, respect the basics"],

  // score 7
  ["Aight aight, you can definitely sit at the cool table",
   "This actually goes hard lowkey, no debate",
   "Not bad at all — keep cooking like this",
   "Clean fit, zero major complaints filed"],

  // score 8
  ["Bro is DRIPPING rn no cap 🔥",
   "Hard fit, the streets will 100% respect this",
   "This goes stupid crazy fr fr, certified fire",
   "We see you — this is legitimately fire"],

  // score 9
  ["ELITE tier drip, almost flawless execution",
   "The fashion gods looked down and smiled today",
   "Certified cold, absolutely zero debate",
   "This fit is almost too hard to look at directly"],

  // score 10
  ["GOAT behavior. We are framing this immediately.",
   "Peak fashion achieved. This is the standard now.",
   "The drip is crystalline and completely untouchable.",
   "All 10s across the board. Pure royalty energy."],
]

// ─────────────────────────────────────────────
//  Seeded RNG  (same seed = same numbers always)
// ─────────────────────────────────────────────
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)]
}

// Score biased toward higher end (6-10 range feels realistic and hype)
function scoreInRange(rand, min, max) {
  return Math.round(min + rand() * (max - min))
}

// ─────────────────────────────────────────────
//  Hash image bytes → 32-bit integer seed
// ─────────────────────────────────────────────
export async function hashImage(file) {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let hash = 2166136261
  for (let i = 0; i < bytes.length; i += 16) {
    hash ^= bytes[i]
    hash = (Math.imul(hash, 16777619)) >>> 0
  }
  return hash
}

// ─────────────────────────────────────────────
//  Generate a full drip report from a seed
//  Scores are biased 6–10 so every fit feels
//  hype — same image always gives same result
// ─────────────────────────────────────────────
export function generateRating(seed) {
  const rand = mulberry32(seed)

  // Biased toward good scores: 6–10
  const colorScore       = scoreInRange(rand, 6, 10)
  const fitScore         = scoreInRange(rand, 6, 10)
  const accessoriesScore = scoreInRange(rand, 6, 10)
  const vibeScore        = scoreInRange(rand, 6, 10)

  const overall = Math.round((colorScore + fitScore + accessoriesScore + vibeScore) / 4)

  const tier = TIERS.find(t => overall >= t.min && overall <= t.max) || TIERS[TIERS.length - 1]

  const vBracket = overall <= 5 ? 0
    : overall === 6 ? 1
    : overall === 7 ? 2
    : overall === 8 ? 3
    : overall === 9 ? 4
    : 5

  return {
    overall,
    tier,
    scores: {
      color:       colorScore,
      fit:         fitScore,
      accessories: accessoriesScore,
      vibe:        vibeScore,
    },
    comments: {
      color:       pick(rand, COMMENTS.color),
      fit:         pick(rand, COMMENTS.fit),
      accessories: pick(rand, COMMENTS.accessories),
      vibe:        pick(rand, COMMENTS.vibe),
    },
    verdict: pick(rand, FINAL_VERDICTS[vBracket]),
  }
}
