import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap } from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'
import api from '../utils/api'

// CUSTOMIZE: Your education history, most recent first.
// Each entry shows as a card on the timeline.
// You can add more objects or remove the second one if you only have one degree.
//
// type must stay 'education'
// coursework: [] → leave empty array if you don't want pills shown

const fallbackEducation = [
  {
    _id: '1',
    degree: 'Degree',
    // Examples: 'Bachelor of Science in Computer Science'
    //           'BFA in Graphic Design'
    //           'Diploma in Digital Marketing'
    institution: 'Institution',
    location: 'City, Country',
    year: 'Start Year — End Year  ',
    // e.g. '2022 — 2026' or '2020 — 2023'
    coursework: [
      'Course 1',
      'Course 2',
      // Add or remove as needed. Delete all and keep [] to hide pills entirely.
    ],
    type: 'education',
  },
  {
    _id: '2',
    degree: 'Degree',
    institution: 'Institution',
    location: 'City, Country',
    year: 'Start Year — End Year',
    coursework: [],
    type: 'education',
  },
  // Add a third block here if needed, or delete the second block above
  // if you only have one educational qualification.
]

// CUSTOMIZE: Fallback shown only if MongoDB is unreachable or returns empty.
// If you're using the admin panel, manage certifications from there instead.
// If you're NOT using the admin panel, add your real certifications here
// the same way and they'll show statically.
//
// credentialUrl: '' → hides the "View credential ↗" link
// credentialUrl: 'https://...' → shows the link

const fallbackCertifications = [
  {
    _id: 'c1',
    name: 'Certification Name',
    // e.g. 'AWS Certified Developer', 'Google UX Design Certificate'
    issuer: 'Issuer · Year',
    // e.g. 'Amazon Web Services · 2024'
    credentialUrl: 'YOUR_CREDENTIAL_URL',
    // e.g. 'https://www.credly.com/badges/...'
    type: 'certification',
  },
  // Add more certification objects here as needed.
  // No certifications yet? Delete this object and leave the array empty: []
]

function Education() {
  const [certifications, setCertifications] = useState(fallbackCertifications)

  useEffect(() => {
    api
      .get('/api/certifications')
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setCertifications(res.data.data)
        }
      })
      .catch(() => {})
  }, [])

  const timelineItems = [
    ...fallbackEducation,
    ...certifications.map((c) => ({ ...c, type: 'certification' })),
  ]

  return (
    <section
      id="education"
      className="py-28 px-6 bg-[#FAFAFA] dark:bg-[#181818]"
    >
      <div className="max-w-3xl mx-auto">
        {/* EYEBROW */}
        <motion.p
          className="font-mono text-xs text-accent uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          // education
        </motion.p>

        {/* HEADING */}
        {/* CUSTOMIZE: Section heading
          Not just a learner? Options:
          "Where I've studied."  / "My background."
          "How I got here."      / "Education & training." */}
        <motion.h2
          className="font-head font-bold text-t1 tracking-tight mb-16"
          style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Where I've Learned
        </motion.h2>

        {/* TIMELINE */}
        <div className="relative pl-8">
          {/* VERTICAL LINE */}
          <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={item._id}
              className="relative mb-10 last:mb-0"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* DOT */}
              <div
                className={`absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2 border-[#FAFAFA] dark:border-[#181818] ${
                  item.type === 'certification' ? 'bg-amber' : 'bg-accent'
                }`}
                style={{
                  boxShadow:
                    item.type === 'certification'
                      ? '0 0 0 3px rgba(217,119,6,0.2), 0 0 12px rgba(217,119,6,0.2)'
                      : '0 0 0 3px rgba(122,21,37,0.25), 0 0 12px rgba(122,21,37,0.2)',
                }}
              />

              {/* YEAR / TYPE LABEL */}
              <div
                className={`font-mono text-xs mb-2 font-medium flex items-center gap-1.5 ${
                  item.type === 'certification' ? 'text-amber' : 'text-accent'
                }`}
              >
                {item.type === 'certification' ? (
                  <>
                    <HiTrophy className="text-sm" />
                    certification
                  </>
                ) : (
                  //CUSTOMIZE: swap HiAcademicCap for any react-icons icone.g. HiBriefcase for work experience, HiPaintBrush for design school
                  <>
                    <HiAcademicCap className="text-sm" />
                    {item.year}
                  </>
                )}
              </div>

              {/* CARD */}
              <div
                className={`bg-white dark:bg-bg-card dark:backdrop-blur-[25px] rounded-xl p-5 transition-all duration-200 dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.07),0_8px_30px_rgba(0,0,0,0.3)] ${
                  item.type === 'certification'
                    ? 'border border-[#D97706]/20 dark:hover:[border-color:rgba(217,119,6,0.3)]'
                    : 'border border-border-base dark:hover:border-accent'
                }`}
              >
                {/* CERT BADGE */}
                {item.type === 'certification' && (
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-amber border border-[#D97706]/25 rounded px-2 py-0.5 bg-[#D97706]/5 mb-3">
                    <HiTrophy className="text-xs" />
                    certification
                  </div>
                )}

                {/* TITLE */}
                <h3 className="font-head font-bold text-[17px] text-t1 mb-1">
                  {item.type === 'certification' ? item.name : item.degree}
                </h3>

                {/* SUBTITLE */}
                <p className="text-sm text-t2 mb-3">
                  {item.type === 'certification'
                    ? item.issuer
                    : `${item.institution} · ${item.location}`}
                </p>

                {/* COURSEWORK PILLS */}
                {item.type === 'education' && item.coursework?.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="font-mono text-[10px] text-t2 border border-border-base rounded px-2 py-1 bg-bg-alt"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}

                {/* CREDENTIAL LINK */}
                {item.type === 'certification' && item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    View credential ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
