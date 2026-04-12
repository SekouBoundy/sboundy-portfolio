<script lang="ts">
  import { currentLang, currentTheme } from '../../stores/index'
  import { content as en } from '../../data/content.en.js'
  import { content as fr } from '../../data/content.fr.js'

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
  type Screen = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'design'
  let active = $state<Screen>('home')

  function open(s: Screen) { active = s }
  function back() { active = 'home' }

  // Stack data
  const stack = {
    'Frontend':  ['React', 'Svelte', 'Flutter', 'React Native'],
    'Backend':   ['Node.js', 'Firebase', 'Supabase'],
    'Design':    ['Figma', 'Illustrator'],
    'Tools':     ['Git', 'VS Code', 'Vite'],
  }

  // Contact form
  let name = $state(''), email = $state(''), msg = $state(''), sent = $state(false)
  function sendMsg(e: SubmitEvent) {
    e.preventDefault()
    if (name && email && msg) sent = true
  }

  // Page 1 — portfolio apps
  const page1 = [
    { id: 'about',    img: '/icons/about.png',    label: 'About'    },
    { id: 'projects', img: '/icons/projects.png', label: 'Projects' },
    { id: 'skills',   img: '/icons/skills.png',   label: 'Skills'   },
    { id: 'blog',     img: '/icons/blog.png',     label: 'Blog'     },
    { id: 'contact',  img: '/icons/contact.png',  label: 'Contact'  },
    { id: 'design',   img: '/icons/design.png',   label: 'Design'   },
  ]

  // Page 2 — utility apps (below widgets)
  const page2Apps = [
    { id: 'photos', img: '/icons/photos.png', label: 'Photos' },
    { id: 'music',  img: '/icons/music.png',  label: 'Music'  },
    { id: 'maps',   img: '/icons/maps.png',   label: 'Maps'   },
    { id: 'camera', img: '/icons/camera.png', label: 'Camera' },
  ]

  const totalPages = 2

  // Live weather data (Bamako, Mali)
  const weather = {
    city: 'Bamako',
    country: '🇲🇱',
    temp: 36,
    condition: 'Sunny',
    icon: '☀️',
    high: 39,
    low: 28,
    forecast: [
      { day: 'Sat', icon: '☀️', low: 27, high: 38 },
      { day: 'Sun', icon: '🌤', low: 26, high: 37 },
      { day: 'Mon', icon: '⛅', low: 25, high: 35 },
      { day: 'Tue', icon: '🌦', low: 24, high: 32 },
    ],
  }

  // Calendar
  const today = new Date()
  const calDays = ['S','M','T','W','T','F','S']
  const monthName = today.toLocaleString('default', { month: 'long' })
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const calCells: (number|null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  // Current page
  let currentPage = $state(0)

  // Swipe tracking
  let touchStartX = $state(0)
  let touchStartY = $state(0)
  let dragX = $state(0)
  let dragging = $state(false)
  let swipeAxis = $state<'h' | 'v' | null>(null)  // resolved once per gesture

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    dragging = true
    dragX = 0
    swipeAxis = null
  }

  function onTouchMove(e: TouchEvent) {
    if (!dragging) return
    const dx = e.touches[0].clientX - touchStartX
    const dy = e.touches[0].clientY - touchStartY

    // Resolve axis on first significant movement
    if (swipeAxis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      swipeAxis = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
    }

    if (swipeAxis === 'h') {
      e.preventDefault()   // block scroll while swiping horizontally
      dragX = dx
    }
    // vertical → do nothing, let normal scroll happen
  }

  function onTouchEnd() {
    if (!dragging) return
    dragging = false
    if (swipeAxis === 'h') {
      if (dragX < -50 && currentPage < totalPages - 1) currentPage++
      else if (dragX > 50 && currentPage > 0) currentPage--
    }
    dragX = 0
    swipeAxis = null
  }

  const dockApps = [
    { id: 'about',    img: '/icons/about.png'    },
    { id: 'projects', img: '/icons/projects.png' },
    { id: 'contact',  img: '/icons/contact.png'  },
    { id: 'skills',   img: '/icons/skills.png'   },
  ]

  // ── Control Center ──
  let ccOpen = $state(false)

  // Fake toggles
  let ccWifi      = $state(true)
  let ccBluetooth = $state(true)
  let ccAirplane  = $state(false)
  let ccAirdrop   = $state(false)
  let ccFlash     = $state(false)

  // Real controls
  let ccBrightness = $state(80)   // 20–100
  let ccVolume     = $state(60)   // 0–100
  let isDark = $derived($currentTheme === 'dark')
  function toggleTheme() { currentTheme.set(isDark ? 'light' : 'dark') }
  function toggleLang()  { currentLang.set($currentLang === 'en' ? 'fr' : 'en') }

  // Fake music
  const ccMusic = { title: 'Afrobeats Mix', artist: 'SB Playlist', icon: '🎵' }
  let ccPlaying = $state(false)

  // Fake calculator state
  let ccCalcOpen  = $state(false)
  let ccCalcExpr  = $state('')
  let ccCalcDisp  = $state('0')
  function calcPress(v: string) {
    if (v === 'C') { ccCalcExpr = ''; ccCalcDisp = '0'; return }
    if (v === '=') {
      try { ccCalcDisp = String(Function('"use strict";return (' + ccCalcExpr + ')')()) }
      catch { ccCalcDisp = 'Error' }
      ccCalcExpr = ''
      return
    }
    if (v === '⌫') { ccCalcExpr = ccCalcExpr.slice(0,-1); ccCalcDisp = ccCalcExpr || '0'; return }
    ccCalcExpr += v
    ccCalcDisp = ccCalcExpr
  }

  // Swipe down from top-right corner to open CC (like real iPhone)
  let ccSwipeStartY = $state(0)
  let ccSwipeStartX = $state(0)
  function onCCTouchStart(e: TouchEvent) {
    ccSwipeStartY = e.touches[0].clientY
    ccSwipeStartX = e.touches[0].clientX
  }
  function onCCTouchEnd(e: TouchEvent) {
    const t0 = e.changedTouches[0]
    const dy = t0.clientY - ccSwipeStartY          // positive = downward
    const dx = Math.abs(t0.clientX - ccSwipeStartX)
    const startedTopRight = ccSwipeStartY < 60 && ccSwipeStartX > window.innerWidth * 0.5
    if (startedTopRight && dy > 40 && dx < 60 && active === 'home') ccOpen = true
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

  <!-- ── HOME SCREEN ── -->
  <div id="ios-home" class:hidden={active !== 'home'}>

    <!-- Profile Widget (only on page 0) -->
    {#if currentPage === 0}
      <div class="ios-widget" style="animation: panelIn .25s ease">
        <div class="ios-widget__photo">
          <img src="/icons/about.png" alt="SBOUNDY"
            onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display='none')} />
        </div>
        <div>
          <div class="ios-widget__name">SB<em>OUNDY</em></div>
          <div class="ios-widget__sub">Developer · Designer · Creative<br>Based in Mali 🇲🇱</div>
          <div class="ios-widget__badge">
            <span class="ios-badge-dot"></span>
            {t.status}
          </div>
        </div>
      </div>
    {/if}

    <!-- Pages carousel -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="ios-pages-track"
      role="region"
      aria-label="App pages"
      ontouchstart={onTouchStart}
      ontouchmove={onTouchMove}
      ontouchend={onTouchEnd}
    >
      <div
        class="ios-pages-inner"
        style="transform: translateX(calc({-currentPage * 100}% + {dragging ? dragX : 0}px));
               transition: {dragging ? 'none' : 'transform .35s cubic-bezier(.25,.46,.45,.94)'};"
      >

        <!-- ── PAGE 1 : Portfolio apps ── -->
        <div class="ios-page">
          <div class="ios-apps">
            {#each page1 as app}
              <button class="ios-app" onclick={() => open(app.id as Screen)}>
                <div class="ios-app__icon ios-app__icon--img">
                  <img src={app.img} alt={app.label} />
                </div>
                <span class="ios-app__name">{app.label}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- ── PAGE 2 : Widgets + utility apps ── -->
        <div class="ios-page ios-page--widgets">

          <!-- Widgets row: Weather + Calendar side by side -->
          <div class="w-row">

            <!-- Weather widget -->
            <div class="w-weather">
              <div class="w-weather__city">{weather.city} {weather.country}</div>
              <div class="w-weather__main">
                <span class="w-weather__temp">{weather.temp}°</span>
                <span class="w-weather__icon">{weather.icon}</span>
              </div>
              <div class="w-weather__cond">{weather.condition}</div>
              <div class="w-weather__hl">H:{weather.high}° L:{weather.low}°</div>
              <div class="w-weather__forecast">
                {#each weather.forecast as f}
                  <div class="w-weather__fday">
                    <span class="w-fday__name">{f.day}</span>
                    <span class="w-fday__icon">{f.icon}</span>
                    <span class="w-fday__lo">{f.low}°</span>
                    <span class="w-fday__hi">{f.high}°</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Calendar widget -->
            <div class="w-calendar">
              <div class="w-cal__header">
                <span class="w-cal__month">{monthName}</span>
                <span class="w-cal__day-num">{today.getDate()}</span>
              </div>
              <div class="w-cal__grid">
                {#each calDays as d}
                  <div class="w-cal__dow">{d}</div>
                {/each}
                {#each calCells as cell}
                  <div class="w-cal__cell" class:today={cell === today.getDate()} class:empty={cell === null}>
                    {cell ?? ''}
                  </div>
                {/each}
              </div>
            </div>

          </div>

          <!-- Utility app icons -->
          <div class="ios-apps ios-apps--compact">
            {#each page2Apps as app}
              <button class="ios-app">
                <div class="ios-app__icon ios-app__icon--img">
                  <img src={app.img} alt={app.label} />
                </div>
                <span class="ios-app__name">{app.label}</span>
              </button>
            {/each}
          </div>

        </div>

      </div>
    </div>

    <!-- Page dots -->
    <div class="ios-page-dots">
      {#each Array(totalPages) as _, i}
        <button class="ios-page-dot" class:active={currentPage === i} onclick={() => currentPage = i} aria-label={`Page ${i + 1}`}></button>
      {/each}
    </div>

  </div>

  <!-- ── DOCK ── -->
  <div id="ios-dock" class:dock-hidden={active !== 'home'}>
    {#each dockApps as da}
      <button class="ios-dock__item ios-dock__item--img" onclick={() => open(da.id as Screen)}>
        <img src={da.img} alt={da.id} />
      </button>
    {/each}
  </div>

  <!-- ── HOME INDICATOR ── -->
  <div class="home-indicator"></div>

  <!-- ── CONTROL CENTER ── -->
  {#if ccOpen}
    <div class="cc-overlay" onclick={() => ccOpen = false} role="presentation">

      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="cc-panel" onclick={(e) => e.stopPropagation()}>

        {#if ccCalcOpen}
          <!-- ── CALCULATOR ── -->
          <div class="cc-calc-screen">
            <button class="cc-calc-back" onclick={() => ccCalcOpen = false}>‹ Back</button>
            <div class="cc-calc-display">{ccCalcDisp}</div>
            <div class="cc-calc-grid">
              {#each ['C','⌫','%','/',
                      '7','8','9','×',
                      '4','5','6','−',
                      '1','2','3','+',
                      '±','0','.','='] as k}
                <button
                  class="cc-calc-key"
                  class:cc-key-op={['/','+','−','×','='].includes(k)}
                  class:cc-key-fn={['C','⌫','%','±'].includes(k)}
                  onclick={() => calcPress(k === '×' ? '*' : k === '−' ? '-' : k)}
                >{k}</button>
              {/each}
            </div>
          </div>

        {:else}
          <!-- ── MAIN CONTROL CENTER ── -->

          <!-- Status bar -->
          <div class="cc-statusbar">
            <span class="cc-time">{timeStr}</span>
            <div class="cc-status-icons"><span>●●●</span><span>WiFi</span><span>🔋</span></div>
          </div>

          <!-- Top grid: connectivity block + music block side by side -->
          <div class="cc-top-row">

            <!-- Connectivity 2×2 block -->
            <div class="cc-conn-block">
              <button class="cc-conn-btn" class:cc-on={ccWifi && !ccAirplane} onclick={() => ccWifi = !ccWifi}>
                <span class="cc-conn-icon">📶</span>
                <div>
                  <div class="cc-conn-name">Wi-Fi</div>
                  <div class="cc-conn-sub">{ccWifi && !ccAirplane ? 'Home' : 'Off'}</div>
                </div>
              </button>
              <div class="cc-conn-divider-h"></div>
              <button class="cc-conn-btn" class:cc-on={ccBluetooth && !ccAirplane} onclick={() => ccBluetooth = !ccBluetooth}>
                <span class="cc-conn-icon">🔵</span>
                <div>
                  <div class="cc-conn-name">Bluetooth</div>
                  <div class="cc-conn-sub">{ccBluetooth && !ccAirplane ? 'On' : 'Off'}</div>
                </div>
              </button>
              <div class="cc-conn-divider-v"></div>
              <button class="cc-conn-btn" class:cc-on={ccAirdrop} onclick={() => ccAirdrop = !ccAirdrop}>
                <span class="cc-conn-icon">📡</span>
                <div>
                  <div class="cc-conn-name">AirDrop</div>
                  <div class="cc-conn-sub">{ccAirdrop ? 'Contacts' : 'Off'}</div>
                </div>
              </button>
              <div class="cc-conn-divider-h"></div>
              <button class="cc-conn-btn" class:cc-on={!ccAirplane} onclick={() => ccAirplane = !ccAirplane}>
                <span class="cc-conn-icon">✈️</span>
                <div>
                  <div class="cc-conn-name">Airplane</div>
                  <div class="cc-conn-sub">{ccAirplane ? 'On' : 'Off'}</div>
                </div>
              </button>
            </div>

            <!-- Music block -->
            <div class="cc-music-block">
              <div class="cc-music-top">
                <span class="cc-music-thumb">{ccMusic.icon}</span>
                <div class="cc-music-meta">
                  <div class="cc-music-title">{ccMusic.title}</div>
                  <div class="cc-music-artist">{ccMusic.artist}</div>
                </div>
              </div>
              <div class="cc-music-ctrl">
                <button class="cc-mc-btn" onclick={() => ccPlaying = false}>⏮</button>
                <button class="cc-mc-btn cc-mc-play" onclick={() => ccPlaying = !ccPlaying}>
                  {ccPlaying ? '⏸' : '▶'}
                </button>
                <button class="cc-mc-btn" onclick={() => ccPlaying = false}>⏭</button>
              </div>
            </div>

          </div>

          <!-- Sliders row -->
          <div class="cc-sliders">
            <div class="cc-slider-card">
              <span class="cc-sl-icon">☀️</span>
              <input type="range" min="20" max="100" bind:value={ccBrightness} class="cc-sl" />
            </div>
            <div class="cc-slider-card">
              <span class="cc-sl-icon">🔊</span>
              <input type="range" min="0" max="100" bind:value={ccVolume} class="cc-sl" />
            </div>
          </div>

          <!-- Mid grid: real toggles -->
          <div class="cc-mid-row">
            <button class="cc-tile cc-tile--wide" onclick={toggleLang}>
              <span class="cc-tile__icon">🌐</span>
              <div class="cc-tile__text">
                <div class="cc-tile__name">Language</div>
                <div class="cc-tile__sub">{$currentLang === 'en' ? 'English' : 'Français'}</div>
              </div>
            </button>
            <button class="cc-tile cc-tile--wide" onclick={toggleTheme}>
              <span class="cc-tile__icon">{isDark ? '🌙' : '☀️'}</span>
              <div class="cc-tile__text">
                <div class="cc-tile__name">Appearance</div>
                <div class="cc-tile__sub">{isDark ? 'Dark' : 'Light'}</div>
              </div>
            </button>
          </div>

          <!-- Bottom grid: utility tiles -->
          <div class="cc-bottom-row">
            <button class="cc-tile cc-tile--sq" class:cc-on={ccFlash} onclick={() => ccFlash = !ccFlash}>
              <span class="cc-tile__icon">🔦</span>
              <span class="cc-tile__name">Flash</span>
            </button>
            <button class="cc-tile cc-tile--sq" onclick={() => ccCalcOpen = true}>
              <span class="cc-tile__icon">🧮</span>
              <span class="cc-tile__name">Calc</span>
            </button>
            <button class="cc-tile cc-tile--sq" onclick={() => ccOpen = false}>
              <span class="cc-tile__icon">📷</span>
              <span class="cc-tile__name">Camera</span>
            </button>
            <button class="cc-tile cc-tile--sq" onclick={() => ccOpen = false}>
              <span class="cc-tile__icon">⏱</span>
              <span class="cc-tile__name">Timer</span>
            </button>
          </div>

        {/if}

        <div class="cc-handle"></div>
      </div>
    </div>
  {/if}

  <!-- ═══════════════════════════════════
       APP SCREENS
  ═══════════════════════════════════ -->

  <!-- ABOUT -->
  <div class="ios-screen" class:open={active === 'about'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">About</span>
    </div>
    <div class="ios-scroll">

      <div class="ios-profile-card">
        <div class="ios-profile-top">
          <div class="ios-profile-photo">
            <img src="/icons/about.png" alt="SBOUNDY"
              onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display='none')} />
          </div>
          <div>
            <div class="ios-profile-name">SB<em>OUNDY</em></div>
            <div class="ios-profile-sub">Developer · Designer · Creative<br>Mali 🇲🇱 · FR · EN</div>
            <div class="ios-profile-badge">
              <span class="ios-badge-dot"></span>
              {t.about.status}
            </div>
          </div>
        </div>
        <div class="ios-stat-row">
          <div class="ios-stat">
            <div class="ios-stat__num">3+</div>
            <div class="ios-stat__label">{t.about.stats.exp}</div>
          </div>
          <div class="ios-stat">
            <div class="ios-stat__num">FR·EN</div>
            <div class="ios-stat__label">Lang</div>
          </div>
          <div class="ios-stat">
            <div class="ios-stat__num">∞</div>
            <div class="ios-stat__label">{t.about.stats.ideas}</div>
          </div>
        </div>
      </div>

      <div class="ios-section-header">BIO</div>
      <div class="ios-bio-card">
        {@html t.about.bio}
      </div>

      <div class="ios-section-header">JOURNEY</div>
      <div class="ios-list">
        {#each t.about.journey as item}
          <div class="ios-list-item" style="flex-direction:column; align-items:flex-start; gap:4px">
            <div style="display:flex; gap:8px; align-items:center; width:100%">
              <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">🗺</div>
              <div class="ios-list-label">
                <div class="ios-list-label__main">{item.role}</div>
                <div class="ios-list-label__sub">{item.date}</div>
              </div>
            </div>
            <div style="padding-left:44px; font-size:12px; color:var(--color-secondary); line-height:1.5">{item.desc}</div>
          </div>
        {/each}
      </div>

    </div>
  </div>

  <!-- PROJECTS -->
  <div class="ios-screen" class:open={active === 'projects'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Projects</span>
    </div>
    <div class="ios-scroll">
      <div class="ios-proj-list">
        {#each t.projects.items as proj}
          <div class="ios-proj-card">
            <div class="ios-proj-thumb" style:background={proj.color}>
              <span class="ios-proj-thumb__label">{proj.thumb}</span>
            </div>
            <div class="ios-proj-body">
              <div class="ios-proj-title">{proj.name}</div>
              <div class="ios-proj-desc">{proj.desc}</div>
              <div class="ios-proj-tags">
                {#each proj.tags as tag}
                  <span class="ios-proj-tag">{tag}</span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- SKILLS -->
  <div class="ios-screen" class:open={active === 'skills'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Skills</span>
    </div>
    <div class="ios-scroll">

      {#each Object.entries(stack) as [group, items]}
        <div class="ios-section-header">{group.toUpperCase()}</div>
        <div class="ios-list">
          {#each items as skill}
            <div class="ios-list-item">
              <div class="ios-list-icon" style="background:rgba(139,92,246,.18); font-size:13px">
                {skill === 'React' ? '⚛' : skill === 'Flutter' ? '🐦' : skill === 'Figma' ? '🎨' : skill === 'Git' ? '⎇' : '•'}
              </div>
              <span class="ios-list-label__main">{skill}</span>
            </div>
          {/each}
        </div>
      {/each}

      <div class="ios-section-header">ALSO</div>
      <div class="ios-list">
        {#each ['Illustration', 'Graphic Design', 'Hand Drawing'] as sk}
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">✏️</div>
            <span class="ios-list-label__main">{sk}</span>
          </div>
        {/each}
      </div>

    </div>
  </div>

  <!-- BLOG -->
  <div class="ios-screen" class:open={active === 'blog'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Blog</span>
    </div>
    <div class="ios-scroll">
      <div class="ios-section-header">ARTICLES</div>
      <div class="ios-list">
        {#each t.blog.posts as post}
          <div class="ios-list-item">
            <div class="ios-list-icon"
              style="background:{post.cat === 'Dev' ? 'rgba(59,130,246,.2)' : 'rgba(139,92,246,.2)'}; font-size:14px">
              {post.cat === 'Dev' ? '💻' : '🎨'}
            </div>
            <div class="ios-list-label">
              <div class="ios-list-label__main">{post.title}</div>
              <div class="ios-list-label__sub">{post.cat} · {post.read} · {post.date}</div>
            </div>
            <span class="ios-chevron">›</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- CONTACT -->
  <div class="ios-screen" class:open={active === 'contact'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Contact</span>
    </div>
    <div class="ios-scroll">

      <div class="ios-contact-hero">
        <h2>{t.contact.title.replace("'", "'")}</h2>
        <p>{t.contact.subtitle}</p>
      </div>

      {#if sent}
        <div class="ios-sent">
          <div class="ios-sent__icon">✓</div>
          <div class="ios-sent__title">{t.contact.sent.title}</div>
          <div class="ios-sent__sub">{t.contact.sent.sub}</div>
          <button class="ios-sent__btn" onclick={() => { sent = false; name = ''; email = ''; msg = '' }}>
            {t.contact.sent.again}
          </button>
        </div>
      {:else}
        <form class="ios-form" onsubmit={sendMsg}>
          <div class="ios-section-header">{t.contact.form.name.toUpperCase()}</div>
          <div class="ios-list">
            <div class="ios-list-item" style="padding:0">
              <input class="ios-input" type="text" bind:value={name}
                placeholder={t.contact.form.namePlaceholder} required />
            </div>
          </div>

          <div class="ios-section-header">{t.contact.form.email.toUpperCase()}</div>
          <div class="ios-list">
            <div class="ios-list-item" style="padding:0">
              <input class="ios-input" type="email" bind:value={email}
                placeholder="you@example.com" required />
            </div>
          </div>

          <div class="ios-section-header">{t.contact.form.message.toUpperCase()}</div>
          <div class="ios-list">
            <div class="ios-list-item" style="padding:0">
              <textarea class="ios-input ios-textarea" bind:value={msg}
                placeholder={t.contact.form.messagePlaceholder} rows="4" required></textarea>
            </div>
          </div>

          <div class="ios-contact-btns">
            <button type="submit" class="ios-submit-btn">{t.contact.form.submit}</button>
          </div>
        </form>
      {/if}

      <div class="ios-section-header">LINKS</div>
      <div class="ios-list">
        {#each t.contact.links as link}
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">{link.icon}</div>
            <span class="ios-list-label__main">{link.label}</span>
            <span class="ios-chevron">›</span>
          </div>
        {/each}
      </div>

    </div>
  </div>

  <!-- DESIGN -->
  <div class="ios-screen" class:open={active === 'design'}>
    <div class="ios-screen-bar">
      <span class="ios-time">{timeStr}</span>
      <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
    </div>
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Design</span>
    </div>
    <div class="ios-scroll">
      <div class="ios-contact-hero">
        <h2>Design<em style="color:var(--color-accent)"> Work</em></h2>
        <p>UI/UX · Illustrations · Brand identity crafted in Figma and beyond.</p>
      </div>
      <div class="ios-section-header">TOOLS</div>
      <div class="ios-list">
        {#each ['Figma', 'Illustrator', 'Hand Drawing', 'Prototyping'] as tool}
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">🎨</div>
            <span class="ios-list-label__main">{tool}</span>
          </div>
        {/each}
      </div>
      <div class="ios-section-header">SPECIALTIES</div>
      <div class="ios-list">
        {#each ['Mobile UI (iOS & Android)', 'Web Interfaces', 'Flyers & Branding', 'Illustrations'] as s}
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">✦</div>
            <span class="ios-list-label__main">{s}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

</div>

<style>
/* ── Page 2 widget layout ── */
.ios-page--widgets {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 16px 0;
}

/* ── Weather widget ── */
.w-weather {
  background: linear-gradient(160deg, #1a3a6c 0%, #0d2050 60%, #06123a 100%);
  border-radius: 20px;
  padding: 12px;
  border: .5px solid rgba(255,255,255,.12);
  box-shadow: 0 8px 32px rgba(0,0,0,.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.w-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: stretch;
  height: 140px;
}

.w-weather,
.w-calendar {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.w-weather__city {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,.85);
  margin-bottom: 1px;
}

.w-weather__main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.w-weather__temp {
  font-size: 26px;
  font-weight: 200;
  color: #fff;
  line-height: 1;
  letter-spacing: -1px;
}

.w-weather__cond {
  font-size: 10px;
  color: rgba(255,255,255,.65);
  margin-top: 1px;
}

.w-weather__icon {
  font-size: 26px;
  line-height: 1;
}

.w-weather__hl {
  font-size: 10px;
  color: rgba(255,255,255,.6);
  margin-bottom: 0;
}

.w-weather__forecast {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  border-top: .5px solid rgba(255,255,255,.12);
  padding-top: 6px;
  margin-top: auto;
}

.w-weather__fday {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.w-fday__name { font-size: 8px; color: rgba(255,255,255,.6); }
.w-fday__icon { font-size: 10px; }
.w-fday__lo   { font-size: 8px; color: rgba(255,255,255,.55); }
.w-fday__hi   { font-size: 8px; color: rgba(255,255,255,.85); }

/* ── Calendar widget ── */
.w-calendar {
  background: linear-gradient(160deg, #1a0a2e 0%, #0d0620 100%);
  border-radius: 20px;
  padding: 10px;
  border: .5px solid rgba(255,255,255,.1);
  box-shadow: 0 8px 32px rgba(0,0,0,.35);
  display: flex;
  flex-direction: column;
}

.w-cal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.w-cal__month {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,.9);
  text-transform: uppercase;
  letter-spacing: .05em;
}

.w-cal__day-num {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.w-cal__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  flex: 1;
}

.w-cal__dow {
  font-size: 7px;
  font-weight: 700;
  color: rgba(255,255,255,.4);
  text-align: center;
  padding-bottom: 2px;
}

.w-cal__cell {
  font-size: 8px;
  color: rgba(255,255,255,.7);
  text-align: center;
  padding: 2px 0;
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.w-cal__cell.today {
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;
}

.w-cal__cell.empty { color: transparent; }

/* compact app row below widgets */
.ios-apps--compact {
  padding-top: 4px;
}

/* ── Pages carousel ── */
.ios-pages-track {
  flex: 1;
  overflow: hidden;
  width: 100%;
  touch-action: pan-y; /* allow vertical scroll; horizontal is handled manually */
}

.ios-pages-inner {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.ios-page {
  flex-shrink: 0;
  width: 100%;
}

/* ── Page dots ── */
.ios-page-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 8px 0 4px;
}

.ios-page-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,.3);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background .2s, transform .2s;
}

.ios-page-dot.active {
  background: #fff;
  transform: scale(1.15);
}


@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}

/* Hidden helper */
.hidden { display: none !important; }

/* Button reset for app icons */
button.ios-app, button.ios-dock__item {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* ── App icon with image ── */
.ios-app__icon--img {
  background: transparent !important;
  padding: 0;
  overflow: hidden;
  border-radius: var(--ios-corner-radius);
  box-shadow: 0 4px 16px rgba(0,0,0,.45);
}

.ios-app__icon--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  display: block;
}

/* ── Dock icon with image ── */
.ios-dock__item--img {
  background: transparent !important;
  padding: 0;
  overflow: hidden;
  border-radius: var(--ios-corner-radius);
  box-shadow: 0 4px 16px rgba(0,0,0,.45);
}

.ios-dock__item--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  display: block;
}

/* ── Bio card ── */
.ios-bio-card {
  margin: 0 16px 8px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,.05);
  font-size: 13px;
  color: var(--color-secondary);
  line-height: 1.75;
  border: .5px solid rgba(255,255,255,.08);
}

.ios-bio-card :global(strong) {
  color: var(--color-white);
  font-weight: 600;
}

/* ── Form ── */
.ios-form { padding-bottom: 8px; }

.ios-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-white);
  font-size: 14px;
  padding: 13px 16px;
  font-family: var(--font-body);
}

.ios-input::placeholder { color: rgba(255,255,255,.3); }

.ios-textarea {
  resize: none;
  height: 90px;
}

.ios-submit-btn {
  width: 100%;
  padding: 15px;
  border-radius: var(--radius-lg);
  background: var(--color-accent);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity .15s;
  font-family: var(--font-body);
}

.ios-submit-btn:active { opacity: .8; }

/* ── Sent state ── */
.ios-sent {
  margin: 32px 16px;
  padding: 32px 20px;
  border-radius: var(--radius-xl);
  background: rgba(139,92,246,.12);
  border: .5px solid rgba(139,92,246,.25);
  text-align: center;
}

.ios-sent__icon {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.ios-sent__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 4px;
}

.ios-sent__sub {
  font-size: 13px;
  color: var(--color-secondary);
  margin-bottom: 16px;
}

.ios-sent__btn {
  background: none;
  border: .5px solid var(--color-accent);
  color: var(--color-accent);
  font-size: 13px;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-family: var(--font-body);
}

/* ── Dock hide when app is open ── */
#ios-dock {
  transition: opacity .25s ease, transform .25s ease;
}

.dock-hidden {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

/* ── Full-screen sizing ── */
#ios {
  width: 100vw;
  height: 100vh;
  position: relative;
  transition: filter .2s ease;
}

/* ── Control Center ── */
.cc-overlay {
  position: absolute;
  inset: 0;
  z-index: 90;
  cursor: default;
  background: rgba(0,0,0,.25);
}

.cc-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  max-height: 88%;
  background: rgba(18, 18, 28, 0.92);
  backdrop-filter: blur(50px) saturate(1.8);
  -webkit-backdrop-filter: blur(50px) saturate(1.8);
  border-radius: 0 0 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px 20px;
  animation: ccSlideDown .3s cubic-bezier(.25,.46,.45,.94);
  overflow-y: auto;
}

@keyframes ccSlideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

/* Status bar inside CC */
.cc-statusbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px 4px;
}
.cc-time {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.cc-status-icons {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,.8);
}

/* Top row: connectivity + music */
.cc-top-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Connectivity 2×2 block */
.cc-conn-block {
  background: rgba(255,255,255,.1);
  border-radius: 18px;
  border: .5px solid rgba(255,255,255,.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  position: relative;
  overflow: hidden;
}

.cc-conn-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background .15s;
}
.cc-conn-btn:active { background: rgba(255,255,255,.08); }
.cc-conn-btn.cc-on .cc-conn-name { color: #fff; }
.cc-conn-btn.cc-on .cc-conn-icon { filter: none; }
.cc-conn-btn:not(.cc-on) .cc-conn-icon { opacity: .4; }

.cc-conn-icon { font-size: 16px; line-height: 1; }
.cc-conn-name { font-size: 10px; font-weight: 600; color: rgba(255,255,255,.85); }
.cc-conn-sub  { font-size: 9px; color: rgba(255,255,255,.45); }

/* hairline dividers */
.cc-conn-divider-h {
  grid-column: 1 / -1;
  height: .5px;
  background: rgba(255,255,255,.12);
}
.cc-conn-divider-v {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: .5px;
  background: rgba(255,255,255,.12);
}

/* Music block */
.cc-music-block {
  background: rgba(255,255,255,.1);
  border-radius: 18px;
  border: .5px solid rgba(255,255,255,.1);
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
.cc-music-top { display: flex; align-items: center; gap: 8px; }
.cc-music-thumb { font-size: 28px; }
.cc-music-meta { flex: 1; overflow: hidden; }
.cc-music-title {
  font-size: 11px; font-weight: 700;
  color: #fff;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cc-music-artist { font-size: 9px; color: rgba(255,255,255,.5); }
.cc-music-ctrl {
  display: flex; justify-content: space-between; align-items: center;
}
.cc-mc-btn {
  background: none; border: none;
  color: rgba(255,255,255,.8); font-size: 18px;
  cursor: pointer; line-height: 1; padding: 0;
}
.cc-mc-play {
  background: rgba(255,255,255,.18);
  border-radius: 50%;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
}

/* Sliders */
.cc-sliders {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cc-slider-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,.08);
  border-radius: 14px;
  padding: 10px 14px;
  border: .5px solid rgba(255,255,255,.08);
}
.cc-sl-icon { font-size: 16px; }
.cc-sl {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,.25);
  outline: none;
}
.cc-sl::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.4);
}

/* Mid row: wide real toggles */
.cc-mid-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Bottom row: utility tiles */
.cc-bottom-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

/* Shared tile styles */
.cc-tile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,.1);
  border: .5px solid rgba(255,255,255,.1);
  cursor: pointer;
  transition: background .15s, transform .1s;
}
.cc-tile:active { transform: scale(.96); }
.cc-tile.cc-on  { background: rgba(255,220,50,.2); border-color: rgba(255,220,50,.3); }


.cc-tile--sq {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 4px;
}

.cc-tile__icon { font-size: 22px; line-height: 1; }
.cc-tile__text { display: flex; flex-direction: column; gap: 1px; }
.cc-tile__name { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.9); }
.cc-tile__sub  { font-size: 9px; color: rgba(255,255,255,.45); }

/* handle */
.cc-handle {
  width: 36px; height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,.3);
  margin: 8px auto 0;
  flex-shrink: 0;
}

/* ── Calculator ── */
.cc-calc-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}
.cc-calc-back {
  background: none; border: none;
  color: var(--color-accent); font-size: 14px;
  cursor: pointer; text-align: left; padding: 0;
}
.cc-calc-display {
  font-size: 42px; font-weight: 200;
  color: #fff; text-align: right;
  padding: 0 4px; min-height: 56px;
  word-break: break-all; letter-spacing: -1px;
  flex: 1; display: flex; align-items: flex-end; justify-content: flex-end;
}
.cc-calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.cc-calc-key {
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,.15);
  color: #fff;
  font-size: 20px; font-weight: 400;
  cursor: pointer;
  transition: opacity .12s, transform .1s;
  font-family: var(--font-body);
}
.cc-calc-key:active { opacity: .6; transform: scale(.92); }
.cc-key-op { background: var(--color-accent); }
.cc-key-fn { background: rgba(255,255,255,.28); }
</style>
