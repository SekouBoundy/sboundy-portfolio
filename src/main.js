/* src/main.js */

// ═══════════════════════════════════════
//  SBOUNDY — Entry Point
// ═══════════════════════════════════════

import './styles/tokens.css'
import './styles/reset.css'
import './styles/macos.css'
import './styles/windows.css'
import './styles/animations.css'

import { Cursor }     from './components/shared/Cursor.js'
import { Clock }      from './components/shared/Clock.js'
import { LangToggle } from './components/shared/LangToggle.js'
import { Menubar }    from './components/macos/Menubar.js'
import { Dock }       from './components/macos/Dock.js'
import { Desktop }    from './components/macos/Desktop.js'

const isMobile = window.innerWidth <= 768

// ── Shared utilities ──
export const lang  = new LangToggle()
export const clock = new Clock([])

// ── macOS ──
if (!isMobile) {
  new Cursor()
  new Menubar()
  new Desktop()
  new Dock()
  console.log('✓ macOS UI ready')
}

// ── iOS ── (coming next)
if (isMobile) {
  console.log('✓ iOS UI coming next...')
}