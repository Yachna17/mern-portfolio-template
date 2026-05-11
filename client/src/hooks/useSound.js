import { useCallback, useRef } from 'react'
import { Howl } from 'howler'

const soundEnabled = () => localStorage.getItem('sound') === 'true'

const createSound = (config) => new Howl(config)

const sounds = {
  tick: () =>
    createSound({
      src: [
        'data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAAAAB/gH+Af4B/gH+Af4B/gH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/',
      ],
      volume: 0.06,
      preload: true,
    }),
}

let tickSound = null
let popSound = null
let shimmerSound = null
let chimeSound = null
let clickSound = null

const initSounds = () => {
  if (tickSound) return

  const ctx = new (window.AudioContext || window.webkitAudioContext)()

  const makeBeep = (frequency, duration, volume, type = 'sine') => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    oscillator.frequency.value = frequency
    oscillator.type = type
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration
    )
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }

  tickSound = () => makeBeep(800, 0.03, 0.7)
  popSound = () => makeBeep(400, 0.06, 0.8, 'sine')
  shimmerSound = () => makeBeep(1200, 0.08, 0.6)
  clickSound = () => makeBeep(600, 0.05, 0.75)
  chimeSound = () => {
    makeBeep(523, 0.15, 0.8)
    setTimeout(() => makeBeep(659, 0.15, 0.8), 133)
    setTimeout(() => makeBeep(784, 0.3, 0.8), 266)
  }
}

export function useSound() {
  const initialized = useRef(false)

  const init = useCallback(() => {
    if (!initialized.current) {
      initSounds()
      initialized.current = true
    }
  }, [])

  const play = useCallback(
    (soundName) => {
      if (!soundEnabled()) return
      init()
      try {
        switch (soundName) {
          case 'tick':
            tickSound?.()
            break
          case 'pop':
            popSound?.()
            break
          case 'shimmer':
            shimmerSound?.()
            break
          case 'click':
            clickSound?.()
            break
          case 'chime':
            chimeSound?.()
            break
          default:
            break
        }
      } catch {}
    },
    [init]
  )

  return { play }
}
