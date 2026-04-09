/* src/utils/terminal.js */
// ═══════════════════════════════════════
//  Terminal — reusable typing animation
// ═══════════════════════════════════════

export class Terminal {
  constructor(containerId, lines, speed = 55) {
    this.container = document.getElementById(containerId)
    this.lines     = lines
    this.speed     = speed
    this.done      = false
  }

  run() {
    if (this.done || !this.container) return
    this.done = true
    this.container.innerHTML = ''

    let i = 0
    const next = () => {
      if (i >= this.lines.length) return
      const line  = this.lines[i++]
      const delay = line.delay || this.speed

      setTimeout(() => {
        this.container.appendChild(this.createLine(line))
        this.container.scrollTop = this.container.scrollHeight
        next()
      }, delay)
    }

    next()
  }

  createLine(line) {
    const el = document.createElement('div')

    switch (line.type) {
      case 'cmd':
        el.className = 'term-line'
        el.innerHTML = `
          <span class="term-prompt">sboundy@portfolio ~ %</span>
          <span class="term-cmd"> ${line.text}</span>
        `
        break

      case 'sec':
        el.className = 'term-out term-out--violet term-out--bold'
        el.textContent = line.text
        break

      case 'out':
        el.className = `term-out term-out--${line.color || 'default'}`
        el.textContent = line.text
        break

      case 'gap':
        el.innerHTML = '&nbsp;'
        break

      case 'cursor':
        el.className = 'term-line'
        el.innerHTML = `
          <span class="term-prompt">sboundy@portfolio ~ %</span>
          <span class="term-cursor"></span>
        `
        break

      default:
        el.textContent = line.text || ''
    }

    return el
  }

  reset() {
    this.done = false
    if (this.container) this.container.innerHTML = ''
  }
}