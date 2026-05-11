import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useSound } from '../hooks/useSound'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiSun, HiMoon } from 'react-icons/hi2'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { play } = useSound()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(
    () => localStorage.getItem('sound') === 'true'
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('sound', next.toString())
    if (next) play('chime')
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  const navBg =
    theme === 'dark'
      ? 'bg-[rgba(10,8,8,0.80)] backdrop-blur-2xl border-b border-border-base'
      : `bg-[#FAFAFA]/90 backdrop-blur-md ${scrolled ? 'border-b border-border-base' : 'border-b border-transparent'}`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-16 transition-all duration-300 ${navBg}`}
      >
        {/* LOGO */}
        <a
          href="#"
          className="font-mono text-[19px] font-medium text-t1 tracking-tight"
        >
          brand name
          {/* CUSTOMIZE: Your name or brand — the dot stays as a design detail */}
          <span className="text-accent">.</span>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => play('tick')}
              className="text-sm font-medium text-t2 hover:text-t1 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-2">
          {/* THEME TOGGLE */}
          <div className="flex items-center gap-1 bg-bg-alt border border-border-base rounded-full px-1.5 py-1">
            <button
              onClick={() => {
                theme === 'dark' && toggleTheme()
                play('click')
              }}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-200 font-mono flex items-center ${
                theme === 'light' ? 'bg-white text-t1 shadow-sm' : 'text-t3'
              }`}
            >
              <HiSun className="text-sm" />
            </button>
            <button
              onClick={() => {
                theme === 'light' && toggleTheme()
                play('click')
              }}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-200 font-mono flex items-center ${
                theme === 'dark' ? 'bg-bg-card text-t1 shadow-sm' : 'text-t3'
              }`}
            >
              <HiMoon className="text-sm" />
            </button>
          </div>

          {/* SOUND TOGGLE */}
          <button
            onClick={toggleSound}
            className={`w-9 h-9 flex items-center justify-center border rounded-lg text-sm transition-all duration-200 ${
              soundOn
                ? 'border-accent text-accent bg-accent-dim'
                : 'border-border-base text-t2 hover:border-accent dark:bg-bg-card dark:backdrop-blur-xl'
            }`}
          >
            {soundOn ? (
              <HiSpeakerWave className="text-base" />
            ) : (
              <HiSpeakerXMark className="text-base" />
            )}
          </button>

          {/* HIRE ME */}

          {/* CUSTOMIZE: CTA button text and destination.
    'Hire me'         → developer/designer looking for work
    'Work with me'    → freelancer/consultant
    'Get in touch'    → neutral, works for anyone
    'Let's talk'      → warmer, conversational tone
    Delete entirely if you don't want a CTA button in the navbar. */}

          <a
            href="#contact"
            onClick={() => play('pop')}
            className="flex items-center h-9 px-4 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200"
          >
            CTA
          </a>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center border border-border-base dark:bg-bg-card dark:backdrop-blur-xl rounded-lg text-xs text-t1"
          >
            {theme === 'light' ? (
              <HiMoon className="text-sm" />
            ) : (
              <HiSun className="text-sm" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex items-center justify-center border border-border-base dark:bg-bg-card dark:backdrop-blur-xl rounded-lg text-sm font-bold text-t1"
          >
            {menuOpen ? (
              <HiX className="text-lg" />
            ) : (
              <HiMenu className="text-lg" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAFAFA] dark:bg-[rgba(10,8,8,0.97)] dark:backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMenuOpen(false)
                play('tick')
              }}
              className="text-3xl font-head font-bold text-t1 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* CUSTOMIZE: CTA button text and destination.
    'Hire me'         → developer/designer looking for work
    'Work with me'    → freelancer/consultant
    'Get in touch'    → neutral, works for anyone
    'Let's talk'      → warmer, conversational tone
    Delete entirely if you don't want a CTA button in the navbar. */}

          <a
            href="#contact"
            onClick={() => {
              setMenuOpen(false)
              play('pop')
            }}
            className="mt-4 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-lg transition-all duration-200"
          >
            YOUR_CTA_TEXT
          </a>
        </div>
      )}
    </>
  )
}

export default Navbar
