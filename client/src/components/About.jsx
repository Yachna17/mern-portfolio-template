import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../utils/api'
import { useSound } from '../hooks/useSound'
import { HiUser, HiLocationMarker, HiAcademicCap } from 'react-icons/hi'
import { HiArrowDown, HiArrowRight } from 'react-icons/hi2'

function About() {
  {
    /* CUSTOMIZE: "Currently" bar
    ─ With admin panel → this value is fetched from MongoDB and
      editable without touching code. Keep the useState + useEffect.
    ─ Without admin panel → delete the useState, replace with a
      hardcoded string directly in the JSX:

      <span>Building my first SaaS product</span>

    See README → Customization Guide → Admin Panel (Optional)
    for instructions on setting up or skipping the admin panel. */
  }
  const [currently, setCurrently] = useState(
    'CURRENT FOCUS'
    // CUSTOMIZE: What are you working on right now?
    // This shows in the "currently →" bar in the About section.
    // If you have the admin panel set up, this updates live from MongoDB.
    // If not using the admin panel, just hardcode your text here directly.
    //
    // Examples:
    // 'Building my first SaaS product'
    // 'Available for freelance projects'
    // 'Learning machine learning fundamentals'
    // 'Open to full-time design roles'
    // 'Finishing my thesis + job hunting'
  )
  const { play } = useSound()

  useEffect(() => {
    api
      .get('/api/currently')
      .then((res) => {
        if (res.data.success && res.data.data) {
          setCurrently(res.data.data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="py-28 px-6 bg-[#F7F4F4] dark:bg-[#141212]">
      <div className="max-w-5xl mx-auto">
        {/* EYEBROW */}
        <motion.p
          className="font-mono text-xs text-accent uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          // about
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
          Building things that matter.
        </motion.h2>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-[15px] text-t2 leading-relaxed mb-6">
              {/* 
                ─── CUSTOMIZE: About Section ───────────────────────────────
                Rewrite these paragraphs completely in your own voice.
                This is just a suggested structure — you can change the
                number of paragraphs, tone, or format entirely.

                Paragraph 1 → Who you are + what you do
                Paragraph 2 → What you care about + what you've done
                Paragraph 3 → A human detail — hobbies, interests, personality

                Examples by profession:
                ┌─ Developer  → "I build fast, accessible web apps with React..."
                ├─ Designer   → "I craft interfaces that feel intuitive..."
                ├─ Data       → "I turn messy datasets into clear decisions..."
                └─ Writer     → "I help brands find their voice through..."
                ─────────────────────────────────────────────────────────── 
              */}

              <p>
                I&apos;m a <span className="highlight">ROLE</span> based in
                LOCATION, specializing in AREA OF EXPERTISE.
              </p>
              <p>
                I care about CORE VALUE and SECOND VALUE. I&apos;ve worked on
                WORK EXAMPLE, collaborated on COLLAB EXAMPLE, and I&apos;m
                always looking for the next interesting problem to solve.
              </p>
              <p>Outside of work, I&apos;m usually PERSONAL DETAIL.</p>
            </div>

            {/* CURRENTLY BAR */}
            <div className="flex items-center gap-3 bg-white dark:bg-accent-dim backdrop-blur-xl border border-border-base border-l-[3px] border-l-accent rounded-r-lg px-4 py-3 mb-6 font-mono text-xs text-t2">
              <span className="text-accent font-medium flex items-center gap-1">
                currently <HiArrowRight className="text-[10px]" />
              </span>
              <span>{currently}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 flex-wrap">
              {/* CUSTOMIZE: Add your resume as resume.pdf inside the /public folder
              Rename it to resume.pdf or update this path to match your filename */}
              <a
                href="/resume.pdf"
                download
                onClick={() => play('pop')}
                className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 flex items-center gap-1.5"
              >
                Download resume <HiArrowDown className="text-sm" />
              </a>
              {/* CUSTOMIZE: Replace with your own GitHub profile URL */}
              <a
                href="https://github.com/YOUR_GITHUB_USERNAME"
                target="_blank"
                rel="noreferrer"
                onClick={() => play('pop')}
                className="px-5 py-2.5 bg-transparent text-t1 text-sm font-semibold rounded-lg border border-border-mid hover:border-t3 hover:bg-bg-alt transition-all duration-200 flex items-center gap-1.5"
              >
                View GitHub <HiArrowRight className="text-sm" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-bg-card border border-border-base rounded-xl overflow-hidden transition-all duration-300">
              {/* PHOTO PLACEHOLDER */}
              {/* CUSTOMIZE: Replace with your own photo
                → Add your image to /public folder (e.g. photo.jpg)
                → Update src="/photo.jpg" and alt="YOUR_NAME"
                → Adjust objectPosition to frame your face correctly
                e.g. '50% 0%' = top-center, '50% 20%' = slightly lower
                → Remove or adjust transform scale if not needed */}
              <div className="border-b border-border-base overflow-hidden">
                <img
                  src="/your-photo.jpg"
                  alt=" Add your profile photo here"
                  className="w-full object-cover"
                  style={{
                    objectPosition: '50% 10%', // horizontal center, 10% from top
                    transform: 'scale(1.1)', // zoom in slightly to crop bottom
                    transformOrigin: 'top center', //anchor zoom from top
                  }}
                />
              </div>

              {/* PROFILE META */}
              <div className="p-5">
                {/* CUSTOMIZE: Your name and professional title */}
                <div className="font-head font-bold text-[17px] text-t1 mb-1">
                  Name
                </div>
                <div className="text-sm text-t2 mb-4">Title</div>
                {/* Examples for YOUR_TITLE:
                    "Full Stack Developer" / "UI/UX Designer" /
                    "Data Analyst" / "Freelance Photographer" */}

                <div className="flex flex-col gap-2">
                  {/* CUSTOMIZE: Your city and country/state */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-bg-alt border border-border-base rounded-lg font-mono text-xs text-t2 transition-all duration-200 hover:border-accent-hover">
                    <HiLocationMarker className="text-sm text-accent flex-shrink-0" />
                    City, Country
                  </div>

                  {/* CUSTOMIZE: Your availability status
                      Options: "Open to work" / "Available for freelance" /
                      "Open to collaborations" / "Not available" (delete this block) */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-bg-alt border border-border-base rounded-lg font-mono text-xs text-t2 transition-all duration-200 hover:border-accent-hover">
                    <span
                      className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                      style={{ boxShadow: '0 0 6px rgba(34,197,94,0.5)' }}
                    />
                    Avaliability Status
                  </div>

                  {/* CUSTOMIZE: Your university, bootcamp, or company
                      Delete this block entirely if you'd rather not show it */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-bg-alt border border-border-base rounded-lg font-mono text-xs text-t2 transition-all duration-200 hover:border-accent-hover">
                    <HiAcademicCap className="text-sm text-accent flex-shrink-0" />
                    Institution
                    {/* Not a student? Swap HiAcademicCap for HiBriefcase
                        and put your current company name here instead */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
