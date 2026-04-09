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
import { About }      from './pages/About.js'
import { Skills }     from './pages/Skills.js'
import { Projects }   from './pages/Projects.js'
import { Blog }       from './pages/Blog.js'
import { Contact }    from './pages/Contact.js'
import { openWindow } from './utils/windowManager.js'

const isMobile = window.innerWidth <= 768

export const lang  = new LangToggle()
export const clock = new Clock([])

if (!isMobile) {
  new Cursor()
  new Menubar()
  new Desktop()
  new Dock()
  new About()
  new Skills()
  new Projects()
  new Blog()
  new Contact()

  // Open default windows
  setTimeout(() => openWindow('about'),    300)
  setTimeout(() => openWindow('terminal'), 600)

  console.log('✓ macOS UI ready')
}