import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  useRegisterActions,
} from 'kbar'
import { useTheme } from '../hooks/useTheme'
import {
  HiHome,
  HiUser,
  HiLightningBolt,
  HiCode,
  HiAcademicCap,
  HiMail,
} from 'react-icons/hi'
import { HiArrowDownTray } from 'react-icons/hi2'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="font-mono text-[10px] uppercase tracking-widest text-t3 px-4 py-2 border-t border-border-base first:border-t-0">
            {item}
          </div>
        ) : (
          <div
            className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors duration-100 ${
              active ? 'bg-accent-dim text-t1' : 'text-t2'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-base w-5 flex items-center justify-center">
                  {item.icon}
                </span>
              )}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            {item.shortcut?.length ? (
              <div className="flex gap-1">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-alt border border-border-base rounded text-t3"
                  >
                    {sc}
                  </kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  )
}

function PaletteContent() {
  return (
    <KBarPortal>
      <KBarPositioner className="fixed inset-0 z-[999] flex items-start justify-center pt-[20vh] px-4 bg-black/50 backdrop-blur-sm">
        <KBarAnimator className="w-full max-w-lg bg-bg-card border border-border-base rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-base">
            <span className="text-t3 text-sm">⌘</span>
            <KBarSearch
              className="flex-1 bg-transparent outline-none text-sm text-t1 placeholder-t3 font-sans"
              defaultPlaceholder="Type a command or search..."
            />
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-alt border border-border-base rounded text-t3">
              esc
            </kbd>
          </div>
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

function DynamicActions() {
  const { theme, toggleTheme } = useTheme()

  useRegisterActions(
    [
      {
        id: 'theme',
        name:
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
        icon: theme === 'light' ? <MdDarkMode /> : <MdLightMode />,
        section: 'Actions',
        perform: toggleTheme,
      },
    ],
    [theme]
  )

  return null
}

function CommandPalette() {
  const actions = [
    {
      id: 'home',
      name: 'Home',
      icon: <HiHome />,
      shortcut: ['g', 'h'],
      section: 'Navigate',
      perform: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      id: 'about',
      name: 'About',
      icon: <HiUser />,
      shortcut: ['g', 'a'],
      section: 'Navigate',
      perform: () =>
        document
          .getElementById('about')
          ?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <HiLightningBolt />,
      shortcut: ['g', 's'],
      section: 'Navigate',
      perform: () =>
        document
          .getElementById('skills')
          ?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <HiCode />,
      shortcut: ['g', 'p'],
      section: 'Navigate',
      perform: () =>
        document
          .getElementById('projects')
          ?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'education',
      name: 'Education',
      icon: <HiAcademicCap />,
      shortcut: ['g', 'e'],
      section: 'Navigate',
      perform: () =>
        document
          .getElementById('education')
          ?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <HiMail />,
      shortcut: ['g', 'c'],
      section: 'Navigate',
      perform: () =>
        document
          .getElementById('contact')
          ?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'resume',
      name: 'Download resume',
      icon: <HiArrowDownTray />,
      section: 'Actions',
      perform: () => {
        const a = document.createElement('a')
        // CUSTOMIZE: Update the download filename to your own name
        // e.g. 'John_Doe_Resume.pdf' / 'Sarah_Design_CV.pdf'
        a.href = '/resume.pdf'
        a.download = 'YOUR_NAME_Resume.pdf'
        a.click()
      },
    },
    {
      id: 'github',
      name: 'Open GitHub',
      icon: <FaGithub />,
      section: 'Actions',
      // CUSTOMIZE: Replace with your GitHub profile URL
      // Delete this entire block if you don't have a GitHub
      perform: () =>
        window.open('https://github.com/YOUR_GITHUB_USERNAME', '_blank'),
    },
    {
      id: 'linkedin',
      name: 'Open LinkedIn',
      icon: <FaLinkedinIn />,
      section: 'Actions',
      // CUSTOMIZE: Replace with your LinkedIn profile URL
      // Delete this entire block if you don't have a LinkedIn
      perform: () =>
        window.open(
          'https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/',
          '_blank'
        ),
    },

    {
      id: 'twitter',
      name: 'Open X',
      icon: <FaXTwitter />,
      section: 'Actions',
      // CUSTOMIZE: Replace with your X profile URL
      // Delete this entire block if you don't have a X
      perform: () => window.open('https://x.com/YOUR_HANDLE', '_blank'),
    },
  ]

  return (
    <KBarProvider actions={actions}>
      <DynamicActions />
      <PaletteContent />
    </KBarProvider>
  )
}

export default CommandPalette
