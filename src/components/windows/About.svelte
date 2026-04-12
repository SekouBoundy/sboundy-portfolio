<script lang="ts">
  import { currentLang } from '../../stores/index'
  import { content as en } from '../../data/content.en.js'
  import { content as fr } from '../../data/content.fr.js'

  const translations: Record<string, typeof en> = { en, fr }

  const about = $derived(translations[$currentLang].about)

  let activeTab = $state('profile')

  const stack = {
    'Frontend':  ['React', 'Svelte', 'Flutter', 'React Native', 'HTML / CSS'],
    'Backend':   ['Node.js', 'Firebase', 'Supabase'],
    'Design':    ['Figma', 'Illustrator', 'Hand-drawn'],
    'Tools':     ['Git', 'VS Code', 'Vite', 'Vercel'],
  }

  const links = [
    { icon: '✉', label: 'sekouboundy55@gmail.com',  href: 'mailto:sekouboundy55@gmail.com' },
    { icon: '⌥', label: 'GitHub',              href: '#' },
    { icon: '▲', label: 'Figma Community',     href: '#' },
    { icon: 'in', label: 'LinkedIn',            href: '#' },
  ]

  const tabs = $derived([
    { id: 'profile', label: about.tabs.profile },
    { id: 'stack',   label: about.tabs.stack   },
    { id: 'journey', label: about.tabs.journey },
  ])
</script>

<div class="about-layout">

  <!-- ── Sidebar ── -->
  <aside class="about-sidebar">

    <div class="sidebar-section">
      <p class="sidebar-label">FAVORITES</p>
      {#each tabs.slice(0, 2) as tab}
        <button
          class="sidebar-item"
          class:active={activeTab === tab.id}
          onclick={() => activeTab = tab.id}
        >
          <span class="sidebar-item__icon">
            {tab.id === 'profile' ? '👤' : '⚡'}
          </span>
          {tab.label}
        </button>
      {/each}
    </div>

    <div class="sidebar-section">
      <p class="sidebar-label">LOCATIONS</p>
      <button
        class="sidebar-item"
        class:active={activeTab === 'journey'}
        onclick={() => activeTab = 'journey'}
      >
        <span class="sidebar-item__icon">🗺</span>
        Journey
      </button>
    </div>

    <div class="sidebar-divider"></div>

    <div class="sidebar-links">
      {#each links as link}
        <a class="sidebar-link" href={link.href}>
          <span class="sidebar-link__icon">{link.icon}</span>
          <span class="sidebar-link__label">{link.label}</span>
        </a>
      {/each}
    </div>

  </aside>

  <!-- ── Main content ── -->
  <main class="about-main">

    <!-- watermark -->
    <div class="about-watermark" aria-hidden="true">SBOUNDY</div>

    {#if activeTab === 'profile'}
      <div class="about-panel" style="animation: panelIn .2s ease">

        <!-- hero -->
        <div class="about-hero">
          <div class="about-photo">
            <img src="/icons/about.png" alt="SBOUNDY" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
            <!-- <div class="about-photo__fallback">SB</div> -->
          </div>

          <div class="about-info">
            <h1 class="about-name">SBOUNDY</h1>
            <div class="about-badge">
              <span class="about-badge__dot"></span>
              {about.status}
            </div>
            <p>{@html about.bio}</p>
          </div>
        </div>

        <!-- stats -->
        <div class="about-stats">
          <div class="astat">
            <div class="astat__num">3+</div>
            <div class="astat__label">{about.stats.exp}</div>
          </div>
          <div class="astat">
            <div class="astat__num astat__num--sm">{about.stats.lang}</div>
            <div class="astat__label">Languages</div>
          </div>
          <div class="astat">
            <div class="astat__num">∞</div>
            <div class="astat__label">{about.stats.ideas}</div>
          </div>
          <div class="astat astat--accent">
            <div class="astat__num astat__num--sm">MALI</div>
            <div class="astat__label">{about.stats.base}</div>
          </div>
        </div>

      </div>

    {:else if activeTab === 'stack'}
      <div class="about-panel" style="animation: panelIn .2s ease">
        <h2 class="panel-title">Tech Stack</h2>
        {#each Object.entries(stack) as [group, items]}
          <div class="stack-group">
            <p class="stack-label">{group}</p>
            <div class="tag-row">
              {#each items as item}
                <span class="tag">{item}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>

    {:else if activeTab === 'journey'}
      <div class="about-panel" style="animation: panelIn .2s ease">
        <h2 class="panel-title">Journey</h2>
        <div class="journey-list">
          {#each about.journey as item, i}
            <div class="journey-item">
              <div class="journey-dot"></div>
              <div class="journey-date">{item.date}</div>
              <div class="journey-body">
                <div class="journey-role">{item.role}</div>
                <div class="journey-desc">{item.desc}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

  </main>
</div>

<style>
/* Layout */
.about-layout {
  display: grid;
  grid-template-columns: 195px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* ── Sidebar ── */
.about-sidebar {
  background: rgba(0,0,0,.25);
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  overflow-y: auto;
  backdrop-filter: blur(8px);
}

.sidebar-section {
  margin-bottom: .6rem;
}

.sidebar-label {
  font-size: .6rem;
  font-weight: var(--fw-bold);
  letter-spacing: .12em;
  color: var(--color-secondary);
  padding: 0 .5rem;
  margin-bottom: .3rem;
  opacity: .7;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: .55rem;
  width: 100%;
  padding: .38rem .55rem;
  border-radius: var(--radius-sm);
  font-size: .82rem;
  color: var(--color-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.sidebar-item:hover {
  color: var(--color-white);
  background: rgba(255,255,255,.05);
}

.sidebar-item.active {
  background: rgba(139, 92, 246, .18);
  color: var(--color-accent);
  font-weight: var(--fw-medium);
}

.sidebar-item__icon {
  font-size: .85rem;
  opacity: .8;
}

.sidebar-divider {
  height: 1px;
  background: var(--border-subtle);
  margin: .5rem 0;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: .1rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: .55rem;
  padding: .32rem .55rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: .78rem;
  color: var(--color-secondary);
  transition: var(--transition-fast);
}

.sidebar-link:hover {
  color: var(--color-white);
  background: rgba(255,255,255,.05);
}

.sidebar-link__icon {
  font-size: .8rem;
  width: 16px;
  text-align: center;
  opacity: .6;
}

.sidebar-link__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Main ── */
.about-main {
  position: relative;
  overflow-y: auto;
  padding: 1.75rem 1.75rem 1.5rem;
}

.about-watermark {
  position: absolute;
  bottom: -10px;
  right: -8px;
  font-family: var(--font-display);
  font-size: 8rem;
  letter-spacing: .08em;
  color: rgba(255,255,255,.025);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.about-panel {
  position: relative;
  z-index: 1;
}

/* Hero */
.about-hero {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.about-photo {
  position: relative;
  width: 105px;
  height: 145px;
  border-radius: var(--radius-md);
  overflow: visible;
  flex-shrink: 0;
  background: var(--color-surface);
}

.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: var(--radius-md);
  border: var(--border-subtle);
  box-shadow: 0 8px 32px rgba(139,92,246,.2);
  transition: transform .35s cubic-bezier(0.34,1.56,0.64,1), box-shadow .35s ease;
  display: block;
  cursor: zoom-in;
  transform-origin: top left;
  position: relative;
  z-index: 1;
}

.about-photo img:hover {
  transform: scale(2) translate(10px, 8px);
  box-shadow: 0 24px 64px rgba(139,92,246,.45);
  z-index: 20;
}


.about-info {
  flex: 1;
  padding-top: .1rem;
}

.about-name {
  font-family: var(--font-display);
  font-size: 2.6rem;
  letter-spacing: .08em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: .4rem;
}

.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-accent-glow);
  border: var(--border-accent);
  border-radius: var(--radius-pill);
  padding: 3px 12px;
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: var(--color-accent);
  margin-bottom: .65rem;
}

.about-badge__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: blink 2s infinite;
}

.about-info p {
  font-size: var(--fs-small);
  color: var(--color-secondary);
  line-height: 1.85;
  max-width: 340px;
}

.about-info :global(strong) {
  color: var(--color-white);
  font-weight: var(--fw-medium);
}

/* Stats */
.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .65rem;
}

.astat {
  background: rgba(255,255,255,.04);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  padding: .75rem .5rem;
  text-align: center;
  transition: var(--transition-fast);
}

.astat:hover {
  border-color: rgba(139,92,246,.3);
  background: rgba(139,92,246,.06);
  transform: translateY(-1px);
}

.astat--accent {
  background: rgba(139,92,246,.1);
  border-color: rgba(139,92,246,.25);
}

.astat__num {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--color-accent);
  line-height: 1;
}

.astat__num--sm {
  font-size: 1.1rem;
  padding-top: .35rem;
}

.astat__label {
  font-size: .65rem;
  color: var(--color-secondary);
  margin-top: .2rem;
  text-transform: uppercase;
  letter-spacing: .06em;
}

/* Panel title */
.panel-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: .06em;
  color: var(--color-white);
  margin-bottom: 1.25rem;
}

/* Stack */
.stack-group {
  margin-bottom: 1.1rem;
}

.stack-label {
  font-size: var(--fs-label);
  font-weight: var(--fw-bold);
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: .45rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

.tag {
  font-size: .7rem;
  font-weight: var(--fw-medium);
  padding: 4px 11px;
  border-radius: var(--radius-pill);
  background: var(--color-accent-glow);
  border: var(--border-accent);
  color: var(--color-accent);
  transition: var(--transition-fast);
  cursor: default;
}

.tag:hover {
  background: var(--color-accent);
  color: #fff;
}

/* Journey */
.journey-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.journey-item {
  display: grid;
  grid-template-columns: 18px 110px 1fr;
  gap: .75rem;
  position: relative;
  padding-bottom: 1.4rem;
}

.journey-item:last-child {
  padding-bottom: 0;
}

.journey-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 16px;
  bottom: 0;
  width: 1px;
  background: rgba(139,92,246,.25);
}

.journey-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  background: var(--color-accent-glow);
  flex-shrink: 0;
  margin-top: 2px;
  position: relative;
  z-index: 1;
}

.journey-date {
  font-size: .72rem;
  font-weight: var(--fw-bold);
  color: var(--color-accent);
  padding-top: .05rem;
  line-height: 1.4;
}

.journey-role {
  font-size: .88rem;
  font-weight: var(--fw-bold);
  color: var(--color-white);
  margin-bottom: .2rem;
}

.journey-desc {
  font-size: .77rem;
  color: var(--color-secondary);
  line-height: 1.7;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .3; }
}

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
