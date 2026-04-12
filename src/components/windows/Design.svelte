<script lang="ts">
  import { supabase } from '$lib/supabase.js'

  type Work = {
    id: number
    title: string
    category: string
    placeholder: string
    src: string | null
  }

  const categories = [
    { id: 'all',      label: 'All' },
    { id: 'flyers',   label: 'Flyers' },
    { id: 'mockups',  label: 'App Mockups' },
    { id: 'drawings', label: 'Drawings' },
  ]

  let works    = $state<Work[]>([])
  let loading  = $state(true)
  let activeCategory = $state('all')
  let lightboxIndex: number | null = $state(null)

  $effect(() => {
    supabase
      .from('design_works')
      .select('id, title, category, placeholder, src')
      .order('order_index')
      .then(({ data }: { data: Work[] | null }) => {
        works   = data ?? []
        loading = false
      })
  })

  const filtered = $derived(
    activeCategory === 'all'
      ? works
      : works.filter(w => w.category === activeCategory)
  )

  const withSrc = $derived(filtered.filter(w => w.src))

  const lightboxWork = $derived(
    lightboxIndex !== null ? withSrc[lightboxIndex] ?? null : null
  )

  function openLightbox(work: Work) {
    const idx = withSrc.findIndex(w => w.id === work.id)
    if (idx !== -1) lightboxIndex = idx
  }

  function closeLightbox() { lightboxIndex = null }

  function prev() {
    if (lightboxIndex === null) return
    lightboxIndex = (lightboxIndex - 1 + withSrc.length) % withSrc.length
  }

  function next() {
    if (lightboxIndex === null) return
    lightboxIndex = (lightboxIndex + 1) % withSrc.length
  }

  function onKeydown(e: KeyboardEvent) {
    if (lightboxIndex === null) return
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'Escape')     closeLightbox()
  }

  function catCount(id: string) {
    return id === 'all' ? works.length : works.filter(w => w.category === id).length
  }
</script>

<div class="design-layout">

  <!-- Sidebar -->
  <aside class="design-sidebar">
    <p class="sidebar-label">CATEGORIES</p>
    {#each categories as cat}
      <button
        class="sidebar-item"
        class:active={activeCategory === cat.id}
        onclick={() => activeCategory = cat.id}
      >
        <span class="sidebar-item__icon">
          {cat.id === 'all' ? '◈' : cat.id === 'flyers' ? '◻' : cat.id === 'mockups' ? '⊞' : '✏'}
        </span>
        {cat.label}
        <span class="sidebar-item__count">{catCount(cat.id)}</span>
      </button>
    {/each}
  </aside>

  <!-- Grid -->
  <main class="design-main">
    <div class="design-watermark" aria-hidden="true">DESIGN</div>

    {#if loading}
      <div class="design-loading">Loading…</div>
    {:else}
      <div class="design-grid" style="animation: panelIn .2s ease">
        {#each filtered as work (work.id)}
          <button
            class="design-card"
            onclick={() => work.src && openLightbox(work)}
            style="animation: panelIn .15s ease"
          >
            <div class="design-card__thumb">
              {#if work.src}
                <img src={work.src} alt={work.title} />
              {:else}
                <span class="design-card__placeholder">{work.placeholder}</span>
              {/if}
              <div class="design-card__overlay">
                <span class="design-card__zoom">↗</span>
              </div>
            </div>
            <div class="design-card__info">
              <span class="design-card__title">{work.title}</span>
              <span class="design-card__cat">{work.category}</span>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </main>

  <!-- Lightbox -->
  {#if lightboxWork}
    <div class="lightbox" onkeydown={onKeydown} role="dialog" aria-modal="true" tabindex="-1">
      <button class="lightbox__backdrop" onclick={closeLightbox} aria-label="Close"></button>

      <button class="lightbox__nav lightbox__nav--prev" onclick={prev} aria-label="Previous">‹</button>

      <div class="lightbox__content">
        <img src={lightboxWork.src!} alt={lightboxWork.title} />
        <p class="lightbox__caption">
          {lightboxWork.title}
          <span>{lightboxIndex! + 1} / {withSrc.length}</span>
        </p>
      </div>

      <button class="lightbox__nav lightbox__nav--next" onclick={next} aria-label="Next">›</button>

      <button class="lightbox__close" onclick={closeLightbox}>✕</button>
    </div>
  {/if}

</div>

<style>
.design-layout {
  display: grid;
  grid-template-columns: 175px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
  position: relative;
}

/* Sidebar */
.design-sidebar {
  background: rgba(0,0,0,.25);
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  backdrop-filter: blur(8px);
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
  gap: .5rem;
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
  background: rgba(139,92,246,.18);
  color: var(--color-accent);
  font-weight: var(--fw-medium);
}

.sidebar-item__icon {
  font-size: .8rem;
  opacity: .7;
}

.sidebar-item__count {
  margin-left: auto;
  font-size: .65rem;
  background: rgba(255,255,255,.08);
  border-radius: var(--radius-pill);
  padding: 1px 7px;
  color: var(--color-secondary);
}

.sidebar-item.active .sidebar-item__count {
  background: rgba(139,92,246,.25);
  color: var(--color-accent);
}

/* Main */
.design-main {
  position: relative;
  overflow-y: auto;
  padding: 1.25rem;
}

.design-watermark {
  position: absolute;
  bottom: -10px;
  right: -4px;
  font-family: var(--font-display);
  font-size: 7rem;
  letter-spacing: .08em;
  color: rgba(255,255,255,.025);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.design-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: .85rem;
  color: var(--color-secondary);
  opacity: .6;
}

/* Grid */
.design-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .75rem;
  position: relative;
  z-index: 1;
}

.design-card {
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
  padding: 0;
}

.design-card:hover {
  border-color: rgba(139,92,246,.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.4);
}

.design-card__thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: rgba(139,92,246,.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.design-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.design-card__placeholder {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-accent);
  opacity: .4;
}

.design-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(139,92,246,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-fast);
}

.design-card:hover .design-card__overlay {
  opacity: 1;
}

.design-card__zoom {
  font-size: 1.4rem;
  color: #fff;
}

.design-card__info {
  padding: .55rem .7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.design-card__title {
  font-size: .78rem;
  font-weight: var(--fw-medium);
  color: var(--color-white);
}

.design-card__cat {
  font-size: .62rem;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: .08em;
  opacity: .7;
}

/* Lightbox */
.lightbox {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.88);
  backdrop-filter: blur(10px);
  border: none;
  cursor: zoom-out;
}

.lightbox__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  width: 80%;
  height: 82%;
}

.lightbox__content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 24px 64px rgba(0,0,0,.8);
}

.lightbox__caption {
  font-size: .78rem;
  color: rgba(255,255,255,.6);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.lightbox__caption span {
  font-size: .68rem;
  background: rgba(255,255,255,.1);
  border-radius: var(--radius-pill);
  padding: 2px 10px;
}

.lightbox__nav {
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,.08);
  border: var(--border-subtle);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  flex-shrink: 0;
  margin: 0 .5rem;
  line-height: 1;
}

.lightbox__nav:hover {
  background: rgba(139,92,246,.4);
  border-color: rgba(139,92,246,.6);
}

.lightbox__close {
  position: absolute;
  top: 12px;
  right: 14px;
  z-index: 2;
  background: rgba(255,255,255,.1);
  border: var(--border-subtle);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  color: var(--color-white);
  font-size: .8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.lightbox__close:hover {
  background: rgba(255,255,255,.2);
}

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
