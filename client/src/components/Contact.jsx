import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import api from '../utils/api'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi2'
import { useSound } from '../hooks/useSound'

function Contact() {
  const [status, setStatus] = useState('idle')
  const { play } = useSound()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await api.post('/api/contact', data)
      setStatus('success')
      play('chime')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'bg-white dark:bg-bg-card dark:backdrop-blur-xl border rounded-lg px-4 py-3 text-sm text-t1 placeholder-t3 outline-none transition-all duration-200 focus:border-accent dark:focus:[box-shadow:0_0_0_1px_rgba(122,21,37,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]'

  const inputBorder = (hasError) =>
    hasError ? 'border-red-400 dark:border-red-500' : 'border-border-base'

  return (
    <section id="contact" className="py-28 px-6 bg-[#F7F4F4] dark:bg-[#141212]">
      <div className="max-w-5xl mx-auto">
        {/* EYEBROW */}
        <motion.p
          className="font-mono text-xs text-accent uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          // contact
        </motion.p>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* CUSTOMIZE: Contact section headline and availability blurb
              Rewrite both in your own voice and for your situation.

              Headline examples by profession:
              ┌─ Developer  → "Have a project in mind? Let's build it."
              ├─ Designer   → "Have a vision? Let's make it real."
              ├─ Writer     → "Need the right words? Let's talk."
              ├─ Analyst    → "Have a problem to solve? Let's dig in."
              └─ General    → "Want to work together? Let's connect."

              Paragraph examples:
              ┌─ Student    → "Open to internships, entry-level roles, and
              │               freelance work. I reply within 24 hours."
              ├─ Freelancer → "Available for new projects starting YOUR_MONTH.
              │               I typically respond within a day."
              ├─ Senior     → "Selectively open to senior and lead roles.
              │               Best reached via LinkedIn."
              └─ General    → "Open to opportunities that are a good fit.
              │               I'll get back to you within 24 hours."
          */}
            <h2
              className="font-head font-bold text-t1 tracking-tight mb-4 leading-tight"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
            >
              Have a vision?{' '}
              <span className="text-accent">Let's make it real.</span>
            </h2>

            <p className="text-sm text-t2 leading-relaxed mb-8">
              Availability Statement
            </p>

            {/* SOCIAL LINKS */}
            {/* CUSTOMIZE: Delete any blocks you don't need,
              or duplicate a block to add more platforms.
            */}
            <div className="flex flex-col gap-3">
              {/* Twitter/X */}
              <a
                // CUSTOMIZE: Replace with your X profile URL
                href="https://x.com/YOUR_HANDLE"
                target="_blank"
                rel="noreferrer"
                onClick={() => play('pop')}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-sm text-t2 hover:border-border-mid dark:hover:border-accent dark:hover:bg-accent-dim transition-all duration-200"
              >
                <div className="w-7 h-7 bg-bg-alt border border-border-base rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaXTwitter className="text-[#000000] text-sm" />
                </div>
                x.com/twitter_handle
              </a>

              {/* LINKEDIN */}
              <a
                // CUSTOMIZE: Replace with your LinkedIn profile URL
                href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/"
                target="_blank"
                rel="noreferrer"
                onClick={() => play('pop')}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-sm text-t2 hover:border-border-mid dark:hover:border-accent dark:hover:bg-accent-dim transition-all duration-200"
              >
                <div className="w-7 h-7 bg-bg-alt border border-border-base rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaLinkedinIn className="text-[#0A66C2] text-sm" />
                </div>
                linkedin.com/in/linkedin_username
              </a>

              {/* GITHUB */}
              <a
                // CUSTOMIZE: Replace with your GitHub profile URL
                href="https://github.com/YOUR_GITHUB_USERNAME"
                target="_blank"
                rel="noreferrer"
                onClick={() => play('pop')}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-sm text-t2 hover:border-border-mid dark:hover:border-accent dark:hover:bg-accent-dim transition-all duration-200"
              >
                <div className="w-7 h-7 bg-bg-alt border border-border-base rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaGithub className="text-t1 text-sm" />
                </div>
                github.com/github_username
              </a>

              {/* EMAIL */}
              <a
                // CUSTOMIZE: Replace with your email address
                href="mailto:YOUR_EMAIL_ADDRESS"
                onClick={() => play('pop')}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-bg-card dark:backdrop-blur-xl border border-border-base rounded-lg text-sm text-t2 hover:border-border-mid dark:hover:border-accent dark:hover:bg-accent-dim transition-all duration-200"
              >
                <div className="w-7 h-7 bg-bg-alt border border-border-base rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdEmail className="text-[#EA4335] text-sm" />
                </div>
                Email Address
              </a>
            </div>
          </motion.div>

          {/* RIGHT — FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-[rgba(34,197,94,0.08)] border border-green-200 dark:border-[rgba(34,197,94,0.2)] flex items-center justify-center dark:[box-shadow:0_0_20px_rgba(34,197,94,0.15)]">
                  <HiCheckCircle className="text-2xl text-green-500 dark:text-green-400" />
                </div>
                <h3 className="font-head font-bold text-lg text-t1">
                  Message sent!
                </h3>
                <p className="text-sm text-t2">
                  I&apos;ll reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    play('tick')
                  }}
                  className="font-mono text-xs text-accent hover:underline mt-2 flex items-center gap-1"
                >
                  Send another <HiArrowRight className="text-xs" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* NAME */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-t3">
                    name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`${inputBase} ${inputBorder(errors.name)}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <span className="font-mono text-[10px] text-red-400">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-t3">
                    email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`${inputBase} ${inputBorder(errors.email)}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="font-mono text-[10px] text-red-400">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-t3">
                    message
                  </label>
                  <textarea
                    rows={5}
                    // CUSTOMIZE: Update placeholder text to match your work type
                    //    Examples:
                    //    ┌─ Developer   → "Tell me about your project..."
                    //    ├─ Designer    → "Tell me about your design needs..."
                    //    ├─ Writer      → "Tell me what you need written..."
                    //    ├─ Analyst     → "Tell me about the problem you're solving..."
                    //    ├─ General     → "What's on your mind?"
                    //    └─ Minimal     → "Your message..."
                    //
                    placeholder="What's on your mind?"
                    className={`${inputBase} ${inputBorder(errors.message)} resize-none`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                  />
                  {errors.message && (
                    <span className="font-mono text-[10px] text-red-400">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* ERROR STATE */}
                {status === 'error' && (
                  <p className="font-mono text-[10px] text-red-400">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  onClick={() => status === 'idle' && play('pop')}
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send message <HiArrowRight className="text-sm" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
