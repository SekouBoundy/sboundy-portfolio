/* src/components/shared/Clock.js */

// ═══════════════════════════════════════
//  Clock — shared between macOS & iOS
// ═══════════════════════════════════════

export class Clock {
  constructor(elements) {
    // elements = array of DOM el to update
    this.elements = elements
    this.tick()
    setInterval(() => this.tick(), 1000)
  }

  tick() {
    const now  = new Date()
    const time = now.toLocaleTimeString('en-US', {
      hour:   '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const date = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month:   'short',
      day:     'numeric',
    })

    this.elements.forEach(el => {
      if (!el) return
      el.dataset.type === 'time-only'
        ? (el.textContent = time)
        : (el.textContent = `${date}  ${time}`)
    })
  }
}