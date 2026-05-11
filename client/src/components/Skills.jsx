import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'
import { useSound } from '../hooks/useSound'
import { HiArrowRight } from 'react-icons/hi2'

// CUSTOMIZE: Your skill category labels.
// These become the column headers (desktop) and accordion tabs (mobile).
// Every skill's category field must match one of these exactly.
//
// Developer examples:
// ['Frontend', 'Backend', 'Database', 'Tools', 'Methodologies', 'Other']
//
// Designer examples:
// ['UI/UX', 'Visual', 'Prototyping', 'Research', 'Handoff', 'Other']
//
// Data examples:
// ['Languages', 'Visualization', 'ML/AI', 'Databases', 'Cloud', 'Other']
//
// Keep to 6 categories max — the desktop layout is a 3×2 grid.
// Fewer is fine: 4 categories = 2×2, just update grid-cols-3 to grid-cols-2.

const categories = [
  'CATEGORY_1',
  'CATEGORY_2',
  'CATEGORY_3',
  'CATEGORY_4',
  'CATEGORY_5',
  'CATEGORY_6', // delete if you only need 5, etc.
]

// CUSTOMIZE: Your skills, grouped by category.
// Shown as fallback if MongoDB is unreachable or admin panel is not set up.
// If using the admin panel, manage skills from there instead.
//
// icon field — two options:
// ─ Devicon class  → 'devicon-react-original colored'
//   Browse all icons at: https://devicon.dev
//   Tip: add 'colored' for the brand color, omit for monochrome
// ─ Short text     → 'AWS', 'SQL', 'Tb' (max 3-4 chars)
//   Use this when devicon doesn't have an icon for your skill
//
// category must match one of the entries in the categories array below.
// Skills with no matching category won't show up.
//
// Not a developer? Rethink the categories entirely — see categories note below.

const fallbackSkills = [
  {
    _id: '1',
    name: 'YOUR_SKILL_NAME',
    icon: 'devicon-YOUR_ICON-plain colored',
    // e.g. 'devicon-react-original colored' or just 'JS' as text
    category: 'YOUR_CATEGORY',
  },
  {
    _id: '2',
    name: 'YOUR_SKILL_NAME',
    icon: 'YOUR_SHORT_TEXT_OR_DEVICON_CLASS',
    category: 'YOUR_CATEGORY',
  },
  // Add as many skills as needed.
  // Each category from the categories array can have any number of skills.
]

// CUSTOMIZE: What you're currently learning or exploring.
// Shows as dashed pill tags at the bottom of the skills section.
// Keep to 3–5 items max — these should be aspirational, not current skills.
// Delete the entire learningNext block + its JSX below if you'd rather not show it.

const learningNext = ['Learning 1', 'Learning 2', 'Learning 3']

function SkillIcon({ icon }) {
  const isDevicon = icon.startsWith('devicon')
  if (isDevicon) {
    return <i className={`${icon} text-lg`} />
  }
  return <span className="text-xs font-bold text-t2">{icon}</span>
}

function Skills() {
  const [skills, setSkills] = useState(fallbackSkills)
  const [openCategory, setOpenCategory] = useState('Frontend')
  const { play } = useSound()

  useEffect(() => {
    api
      .get('/api/skills')
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setSkills(res.data.data)
        }
      })
      .catch(() => {})
  }, [])

  const getSkillsByCategory = (category) =>
    skills.filter((s) => s.category === category)

  return (
    <section id="skills" className="py-28 px-6 bg-[#FAFAFA] dark:bg-[#181818]">
      <div className="max-w-5xl mx-auto">
        {/* EYEBROW */}
        <motion.p
          className="font-mono text-xs text-accent uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          // skills
        </motion.p>

        {/* HEADING */}
        <motion.h2
          className="font-head font-bold text-t1 tracking-tight mb-12"
          style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Tools I work with.
          {/* CUSTOMIZE: Section heading
    Examples: 'Tools I work with.' / 'My toolkit.'
    'What I know.' / 'Skills & tools.' */}
        </motion.h2>

        {/* DESKTOP — 3x2 GRID */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              viewport={{ once: true }}
            >
              {/* CATEGORY HEADER */}
              <div className="font-mono text-[10px] uppercase tracking-widest text-t3 pb-2 border-b border-border-base mb-3">
                {category}
              </div>

              <div className="flex flex-col gap-1.5">
                {getSkillsByCategory(category).map((skill, i) => (
                  <motion.div
                    key={skill._id}
                    onMouseEnter={() => play('shimmer')}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-sm font-medium text-t1 cursor-default transition-all duration-200 hover:border-accent hover:bg-accent-dim dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_2px_8px_rgba(0,0,0,0.2)] dark:hover:[box-shadow:0_0_15px_rgba(122,21,37,0.12),inset_0_1px_0_rgba(255,255,255,0.08),0_4px_15px_rgba(0,0,0,0.3)] dark:hover:[transform:translateX(3px)]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.08 + i * 0.04,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 rounded bg-bg-alt flex items-center justify-center flex-shrink-0">
                      <SkillIcon icon={skill.icon} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE — ACCORDION */}
        <div className="flex flex-col gap-2 md:hidden mb-8">
          {categories.map((category) => (
            <div
              key={category}
              className="border border-border-base rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenCategory(openCategory === category ? null : category)
                }
                className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  openCategory === category
                    ? 'bg-accent-dim text-accent'
                    : 'bg-white dark:bg-bg-card text-t2'
                }`}
              >
                {category}
                <span className="text-[10px]">
                  {openCategory === category ? '▲' : '▼'}
                </span>
              </button>
              {openCategory === category && (
                <div className="p-3 bg-bg-alt flex flex-wrap gap-2">
                  {getSkillsByCategory(category).map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-xs font-medium text-t1"
                    >
                      <SkillIcon icon={skill.icon} />
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* LEARNING NEXT */}
        <motion.div
          className="flex items-center gap-4 flex-wrap p-4 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-xl dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.06)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-t3 whitespace-nowrap flex items-center gap-1">
            learning next <HiArrowRight className="text-[10px]" />
          </span>
          <div className="flex gap-2 flex-wrap">
            {learningNext.map((item) => (
              <span
                key={item}
                className="font-mono text-xs text-t2 border border-dashed border-border-mid rounded px-3 py-1 bg-bg-alt"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
