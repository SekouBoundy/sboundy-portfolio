/* src/components/shared/Cursor.ts */
// ═══════════════════════════════════════
//  Custom Cursor — macOS only
// ═══════════════════════════════════════

export class Cursor {
  private dot:  HTMLDivElement
  private ring: HTMLDivElement
  private mx = -200
  private my = -200
  private rx = -200
  private ry = -200

  constructor() {
    // Create elements
    this.dot = document.createElement('div')
    this.dot.id = 'cursor'

    this.ring = document.createElement('div')
    this.ring.id = 'cursor-ring'

    document.body.appendChild(this.dot)
    document.body.appendChild(this.ring)

    // Inject styles
    const style = document.createElement('style')
    style.textContent = `
      #cursor {
        position: fixed;
        width: 10px; height: 10px;
        background: var(--color-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: var(--z-cursor);
        transform: translate(-50%, -50%);
        transition: transform .15s, background .2s;
      }
      #cursor-ring {
        position: fixed;
        width: 34px; height: 34px;
        border: 1.5px solid var(--color-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: calc(var(--z-cursor) - 1);
        transform: translate(-50%, -50%);
        opacity: .45;
        transition: opacity .3s;
      }
      body.cursor-hover #cursor {
        transform: translate(-50%, -50%) scale(2.5);
        background: var(--color-accent-dark);
      }
      body.cursor-hover #cursor-ring {
        transform: translate(-50%, -50%) scale(1.6);
        opacity: .2;
      }
    `
    document.head.appendChild(style)

    // Track mouse
    document.addEventListener('mousemove', e => {
      this.mx = e.clientX
      this.my = e.clientY
    })

    // Hover effect on interactive elements
    document.addEventListener('mouseover', e => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, .dock-item, .win-chrome, .tl, .desk-icon, .sidebar-item, .proj-card')) {
        document.body.classList.add('cursor-hover')
      } else {
        document.body.classList.remove('cursor-hover')
      }
    })

    this.animate()
  }

  private animate() {
    this.dot.style.left = this.mx + 'px'
    this.dot.style.top  = this.my + 'px'

    // Ring follows with lag
    this.rx += (this.mx - this.rx) * .1
    this.ry += (this.my - this.ry) * .1

    this.ring.style.left = this.rx + 'px'
    this.ring.style.top  = this.ry + 'px'

    requestAnimationFrame(() => this.animate())
  }
}
