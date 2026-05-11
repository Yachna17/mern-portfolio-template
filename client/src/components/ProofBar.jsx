import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// CUSTOMIZE: Your proof bar stats — shown as animated count-up numbers.
// Sits between the Hero and About sections as a quick credibility strip.
//
// num    → the number to count up to (integers only)
// suffix → character shown after the number: '+', "'", '%', 'x', or ''
// label  → short descriptor shown below the number (keep under 20 chars)
//
// Keep exactly 4 items for even layout — swap values, don't add or remove.
//
// Examples by profession:
// ┌─ Developer   → { num: 5,  suffix: '+',  label: 'projects shipped' }
// ├─ Designer    → { num: 12, suffix: '+',  label: 'brands designed'  }
// ├─ Freelancer  → { num: 8,  suffix: '+',  label: 'clients served'   }
// ├─ Writer      → { num: 50, suffix: 'k+', label: 'words published'  }
// ├─ Student     → { num: 26, suffix: "'",  label: 'graduating'       }
// └─ General     → { num: 3,  suffix: '+',  label: 'years experience' }
//
// Not sure what to put? These 4 work for almost anyone:
// projects/work done · years of experience · tools/skills · year graduating or started

const stats = [
  { num: 1, suffix: '+', label: 'LABEL 1' }, // CUSTOMIZE: Replace with your own values
  { num: 2, suffix: '+', label: 'LABEL 2' }, // CUSTOMIZE: Replace with your own values
  { num: 3, suffix: '+', label: 'LABEL 3' }, // CUSTOMIZE: Replace with your own values
  { num: 4, suffix: '+', label: 'LABEL 4' }, // CUSTOMIZE: Replace with your own values
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1200
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function ProofBar() {
  return (
    <motion.div
      className="flex bg-bg-alt dark:backdrop-blur-xl border-t border-b border-border-base relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* TOP ACCENT LINE */}
      <div
        className="absolute top-0 left-0 right-0 h-px hidden dark:block"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(122,21,37,0.3), transparent)',
        }}
      />

      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex-1 py-5 text-center relative ${
            index !== stats.length - 1 ? 'border-r border-border-base' : ''
          }`}
        >
          <div className="font-head text-2xl font-bold text-t1 tracking-tight">
            <CountUp target={stat.num} suffix={stat.suffix} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-t3 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default ProofBar
