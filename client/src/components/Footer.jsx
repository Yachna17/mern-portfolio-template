import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles, HiArrowUp } from 'react-icons/hi2'

const techStack = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
  'Render',
]

function Footer() {
  const [showStack, setShowStack] = useState(false)

  return (
    <footer className="border-t border-border-base bg-[#FAFAFA] dark:bg-bg-alt dark:backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-center">
        <div className="font-mono text-xs text-t3 flex items-center gap-2 flex-wrap justify-center">
          {/* LOGO */}
          {/* CUSTOMIZE: Your name or brand — the dot stays as a design detail */}
          <span className="text-t1 font-medium">
            brand name
            <span className="text-accent">.</span>
          </span>

          <span className="text-t3 opacity-40">·</span>

          {/* EASTER EGG — BUILT WITH MERN */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowStack(true)}
              onMouseLeave={() => setShowStack(false)}
              className="flex items-center gap-1 hover:text-accent transition-colors duration-200 cursor-default"
            >
              Built with MERN
              <HiSparkles className="text-[10px] text-accent" />
            </button>

            <AnimatePresence>
              {showStack && (
                <motion.div
                  className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-white dark:bg-bg-card dark:backdrop-blur-2xl border border-border-base rounded-xl px-4 py-3 shadow-lg dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_rgba(0,0,0,0.6)] z-10 whitespace-nowrap"
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="font-mono text-[10px] text-t3 uppercase tracking-widest mb-2">
                    full stack
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-t2 border border-border-base rounded px-2 py-0.5 bg-bg-alt"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="text-t3 opacity-40">·</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-t3 opacity-40">·</span>

          {/* BACK TO TOP */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-accent transition-colors duration-200"
          >
            Back to top <HiArrowUp className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
