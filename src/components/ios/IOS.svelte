<script lang="ts">
  import { currentLang } from '../../stores/index'
  import { content as en } from '../../data/content.en.js'
  import { content as fr } from '../../data/content.fr.js'

  import HomeScreen   from './HomeScreen.svelte'
  import ControlCenter from './ControlCenter.svelte'
  import AppSwitcher  from './AppSwitcher.svelte'
  import About        from './screens/About.svelte'
  import Projects     from './screens/Projects.svelte'
  import Skills       from './screens/Skills.svelte'
  import Blog         from './screens/Blog.svelte'
  import Contact      from './screens/Contact.svelte'
  import Design       from './screens/Design.svelte'
  import Photos       from './screens/Photos.svelte'

  const translations: Record<string, typeof en> = { en, fr }
  const t = $derived(translations[$currentLang])

  // Clock
  let time = $state(new Date())
  $effect(() => {
    const id = setInterval(() => time = new Date(), 1000)
    return () => clearInterval(id)
  })
  const timeStr = $derived(
    time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )

  // Active screen
  type Screen = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'design' | 'photos'
  let active = $state<Screen>('home')

  // App switcher
  let switcherOpen = $state(false)
  let recents = $state<Screen[]>([])

  const appMeta: Record<string, { label: string; img: string; color: string }> = {
    about:    { label: 'About',    img: '/icons/about.png',    color: '#8b5cf6' },
    projects: { label: 'Projects', img: '/icons/projects.png', color: '#3b82f6' },
    skills:   { label: 'Skills',   img: '/icons/skills.png',   color: '#10b981' },
    blog:     { label: 'Blog',     img: '/icons/blog.png',     color: '#f59e0b' },
    contact:  { label: 'Contact',  img: '/icons/contact.png',  color: '#ef4444' },
    design:   { label: 'Design',   img: '/icons/design.png',   color: '#ec4899' },
  }

  function open(s: Screen) {
    active = s
    recents = [s, ...recents.filter(r => r !== s)].slice(0, 6)
  }
  function back() { active = 'home' }
  function closeApp(s: Screen) { recents = recents.filter(r => r !== s) }

  // Control Center
  let ccOpen       = $state(false)
  let ccBrightness = $state(80)
  let ccVolume     = $state(60)

  // Bottom swipe gesture (app switcher / go home)
  let bsStartY = $state(0)
  let bsStartX = $state(0)
  let bsDragging = $state(false)

  function onBottomSwipeStart(e: TouchEvent) {
    const t0 = e.touches[0]
    const fromBottom = window.innerHeight - t0.clientY
    if (fromBottom < 52) {
      bsStartY = t0.clientY; bsStartX = t0.clientX; bsDragging = true
    }
  }

  function onBottomSwipeEnd(e: TouchEvent) {
    if (!bsDragging) return
    bsDragging = false
    const t0 = e.changedTouches[0]
    const dy = bsStartY - t0.clientY
    const dx = Math.abs(t0.clientX - bsStartX)
    const h  = window.innerHeight
    if (dx > 60) return
    if (dy > h * 0.5) { switcherOpen = false; back() }
    else if (dy > h * 0.20) { switcherOpen = true }
  }

  // Top-right swipe down → Control Center
  let ccSwipeStartY = $state(0)
  let ccSwipeStartX = $state(0)

  function onCCTouchStart(e: TouchEvent) {
    ccSwipeStartY = e.touches[0].clientY
    ccSwipeStartX = e.touches[0].clientX
    onBottomSwipeStart(e)
  }

  function onCCTouchEnd(e: TouchEvent) {
    const t0 = e.changedTouches[0]
    const dy = t0.clientY - ccSwipeStartY
    const dx = Math.abs(t0.clientX - ccSwipeStartX)
    const startedTopRight = ccSwipeStartY < 60 && ccSwipeStartX > window.innerWidth * 0.5
    if (startedTopRight && dy > 40 && dx < 60) ccOpen = true
    onBottomSwipeEnd(e)
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="ios"
  ontouchstart={onCCTouchStart}
  ontouchend={onCCTouchEnd}
  style="filter: brightness({ccBrightness}%)"
>
  <!-- Dynamic Island -->
  <div id="dynamic-island">
    <div class="di-cam"></div>
    <div class="di-mic"></div>
  </div>

  <!-- Status Bar -->
  <div id="ios-statusbar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons">
      <span>●●●</span>
      <span>WiFi</span>
      <span>🔋</span>
    </div>
  </div>

  <!-- Home Screen + Dock -->
  <HomeScreen {active} {t} onOpen={open} />

  <!-- Home Indicator -->
  <div class="home-indicator"></div>

  <!-- Control Center -->
  <ControlCenter bind:open={ccOpen} {timeStr} bind:ccBrightness bind:ccVolume />

  <!-- App Switcher -->
  <AppSwitcher bind:open={switcherOpen} {recents} {appMeta} {timeStr} onOpen={open} onClose={closeApp} />

  <!-- App Screens -->
  <About   {active} {timeStr} {t} {back} />
  <Projects {active} {timeStr} {t} {back} />
  <Skills  {active} {timeStr} {t} {back} />
  <Blog    {active} {timeStr} {back} />
  <Contact {active} {timeStr} {t} {back} />
  <Design  {active} {timeStr} {back} />
  <Photos  {active} {timeStr} {back} />

</div>

<style>
#ios {
  width: 100vw; height: 100vh;
  position: relative;
  transition: filter .2s ease;
}
</style>
