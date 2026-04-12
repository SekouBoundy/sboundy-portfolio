<script lang="ts">
  type Screen = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'design' | 'photos'

  let { active, t, onOpen }: {
    active: string
    t: any
    onOpen: (s: Screen) => void
  } = $props()

  const page1 = [
    { id: 'about',    img: '/icons/about.png',    label: 'About'    },
    { id: 'projects', img: '/icons/projects.png', label: 'Projects' },
    { id: 'skills',   img: '/icons/skills.png',   label: 'Skills'   },
    { id: 'blog',     img: '/icons/blog.png',     label: 'Blog'     },
    { id: 'contact',  img: '/icons/contact.png',  label: 'Contact'  },
    { id: 'design',   img: '/icons/design.png',   label: 'Design'   },
  ]

  // Only 'photos' is a real screen; others are decorative
  const page2Apps: { id: string; img: string; label: string; screen?: Screen }[] = [
    { id: 'photos', img: '/icons/photos.png', label: 'Photos', screen: 'photos' },
    { id: 'music',  img: '/icons/music.png',  label: 'Music'  },
    { id: 'maps',   img: '/icons/maps.png',   label: 'Maps'   },
    { id: 'camera', img: '/icons/camera.png', label: 'Camera' },
  ]

  const dockApps = [
    { id: 'about',    img: '/icons/about.png'    },
    { id: 'projects', img: '/icons/projects.png' },
    { id: 'contact',  img: '/icons/contact.png'  },
    { id: 'skills',   img: '/icons/skills.png'   },
  ]

  const totalPages = 2

  // Weather data (Bamako, Mali)
  const weather = {
    city: 'Bamako', country: '🇲🇱', temp: 36, condition: 'Sunny', icon: '☀️',
    high: 39, low: 28,
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

  // Page swipe
  let currentPage = $state(0)
  let touchStartX = $state(0)
  let touchStartY = $state(0)
  let dragX = $state(0)
  let dragging = $state(false)
  let swipeAxis = $state<'h' | 'v' | null>(null)

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    dragging = true; dragX = 0; swipeAxis = null
  }

  function onTouchMove(e: TouchEvent) {
    if (!dragging) return
    const dx = e.touches[0].clientX - touchStartX
    const dy = e.touches[0].clientY - touchStartY
    if (swipeAxis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      swipeAxis = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
    }
    if (swipeAxis === 'h') { e.preventDefault(); dragX = dx }
  }

  function onTouchEnd() {
    if (!dragging) return
    dragging = false
    if (swipeAxis === 'h') {
      if (dragX < -50 && currentPage < totalPages - 1) currentPage++
      else if (dragX > 50 && currentPage > 0) currentPage--
    }
    dragX = 0; swipeAxis = null
  }
</script>

<!-- HOME SCREEN -->
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

      <!-- PAGE 1 : Portfolio apps -->
      <div class="ios-page">
        <div class="ios-apps">
          {#each page1 as app}
            <button class="ios-app" onclick={() => onOpen(app.id as Screen)}>
              <div class="ios-app__icon ios-app__icon--img">
                <img src={app.img} alt={app.label} />
              </div>
              <span class="ios-app__name">{app.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- PAGE 2 : Widgets + utility apps -->
      <div class="ios-page ios-page--widgets">

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
            <button class="ios-app" onclick={() => app.screen && onOpen(app.screen)}>
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
      <button class="ios-page-dot" class:active={currentPage === i}
        onclick={() => currentPage = i} aria-label={`Page ${i + 1}`}></button>
    {/each}
  </div>

</div>

<!-- DOCK -->
<div id="ios-dock" class:dock-hidden={active !== 'home'}>
  {#each dockApps as da}
    <button class="ios-dock__item ios-dock__item--img" onclick={() => onOpen(da.id as Screen)}>
      <img src={da.img} alt={da.id} />
    </button>
  {/each}
</div>

<style>
/* Hidden helper */
.hidden { display: none !important; }

/* Pages carousel */
.ios-pages-track {
  flex: 1; overflow: hidden; width: 100%;
  touch-action: pan-y;
}
.ios-pages-inner { display: flex; width: 100%; height: 100%; will-change: transform; }
.ios-page { flex-shrink: 0; width: 100%; }

/* Page dots */
.ios-page-dots { display: flex; justify-content: center; gap: 6px; padding: 8px 0 4px; }
.ios-page-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: rgba(255,255,255,.3); border: none; padding: 0;
  cursor: pointer; transition: background .2s, transform .2s;
}
.ios-page-dot.active { background: #fff; transform: scale(1.15); }

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}

/* Button reset */
button.ios-app, button.ios-dock__item {
  background: none; border: none; padding: 0; cursor: pointer;
}

/* App icon with image */
.ios-app__icon--img {
  background: transparent !important; padding: 0; overflow: hidden;
  border-radius: var(--ios-corner-radius);
  box-shadow: 0 4px 16px rgba(0,0,0,.45);
}
.ios-app__icon--img img {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: inherit; display: block;
}

/* Dock icon with image */
.ios-dock__item--img {
  background: transparent !important; padding: 0; overflow: hidden;
  border-radius: var(--ios-corner-radius);
  box-shadow: 0 4px 16px rgba(0,0,0,.45);
}
.ios-dock__item--img img {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: inherit; display: block;
}

/* Dock visibility */
#ios-dock { transition: opacity .25s ease, transform .25s ease; }
.dock-hidden { opacity: 0; transform: translateY(20px); pointer-events: none; }

/* Page 2 widget layout */
.ios-page--widgets { display: flex; flex-direction: column; gap: 10px; padding: 4px 16px 0; }

/* Widget row */
.w-row {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; align-items: stretch; height: 140px;
}
.w-weather, .w-calendar { height: 100%; box-sizing: border-box; overflow: hidden; }

/* Weather widget */
.w-weather {
  background: linear-gradient(160deg, #1a3a6c 0%, #0d2050 60%, #06123a 100%);
  border-radius: 20px; padding: 12px; border: .5px solid rgba(255,255,255,.12);
  box-shadow: 0 8px 32px rgba(0,0,0,.4);
  display: flex; flex-direction: column; justify-content: space-between;
}
.w-weather__city { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.85); margin-bottom: 1px; }
.w-weather__main { display: flex; align-items: center; justify-content: space-between; }
.w-weather__temp { font-size: 26px; font-weight: 200; color: #fff; line-height: 1; letter-spacing: -1px; }
.w-weather__icon { font-size: 26px; line-height: 1; }
.w-weather__cond { font-size: 10px; color: rgba(255,255,255,.65); margin-top: 1px; }
.w-weather__hl   { font-size: 10px; color: rgba(255,255,255,.6); margin-bottom: 0; }
.w-weather__forecast {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
  border-top: .5px solid rgba(255,255,255,.12); padding-top: 6px; margin-top: auto;
}
.w-weather__fday { display: flex; flex-direction: column; align-items: center; gap: 1px; }
.w-fday__name { font-size: 8px; color: rgba(255,255,255,.6); }
.w-fday__icon { font-size: 10px; }
.w-fday__lo   { font-size: 8px; color: rgba(255,255,255,.55); }
.w-fday__hi   { font-size: 8px; color: rgba(255,255,255,.85); }

/* Calendar widget */
.w-calendar {
  background: linear-gradient(160deg, #1a0a2e 0%, #0d0620 100%);
  border-radius: 20px; padding: 10px; border: .5px solid rgba(255,255,255,.1);
  box-shadow: 0 8px 32px rgba(0,0,0,.35);
  display: flex; flex-direction: column;
}
.w-cal__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.w-cal__month  { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.9); text-transform: uppercase; letter-spacing: .05em; }
.w-cal__day-num { font-size: 18px; font-weight: 700; color: var(--color-accent); line-height: 1; }
.w-cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; flex: 1; }
.w-cal__dow  { font-size: 7px; font-weight: 700; color: rgba(255,255,255,.4); text-align: center; padding-bottom: 2px; }
.w-cal__cell {
  font-size: 8px; color: rgba(255,255,255,.7); text-align: center;
  padding: 2px 0; border-radius: 50%; aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
}
.w-cal__cell.today { background: var(--color-accent); color: #fff; font-weight: 700; }
.w-cal__cell.empty { color: transparent; }

/* Compact app row */
.ios-apps--compact { padding-top: 4px; }
</style>
