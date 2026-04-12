<script lang="ts">
  import { projects } from '../../data/projects.ts'

  type Project = typeof projects[0]

  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))]

  let activeTag = $state('All')
  let selected: Project | null = $state(null)

  const filtered = $derived(
    activeTag === 'All'
      ? projects
      : projects.filter(p => p.tags.includes(activeTag))
  )

  function tagCount(tag: string) {
    return tag === 'All' ? projects.length : projects.filter(p => p.tags.includes(tag)).length
  }

  function open(p: Project) { selected = p }
  function close() { selected = null }
</script>

<div class="proj-layout">

  <!-- Sidebar -->
  <aside class="proj-sidebar">
    <p class="sidebar-label">FILTER</p>
    {#each allTags as tag}
      <button
        class="sidebar-item"
        class:active={activeTag === tag}
        onclick={() => { activeTag = tag; selected = null }}
      >
        <span class="sidebar-item__dot"></span>
        {tag}
        <span class="sidebar-item__count">{tagCount(tag)}</span>
      </button>
    {/each}
  </aside>

  <!-- Main -->
  <main class="proj-main">
    <div class="proj-watermark" aria-hidden="true">WORK</div>

    {#if selected}
      <!-- Detail panel -->
      <div class="proj-detail" style="animation: panelIn .2s ease">
        <button class="detail-back" onclick={close}>← Back</button>

        <div class="detail-thumb" style="background: {selected.color}">
          <span class="detail-thumb__text">{selected.thumb}</span>
        </div>

        <div class="detail-meta">
          <div class="detail-header">
            <div>
              <h2 class="detail-name">{selected.name}</h2>
              <p class="detail-role">{selected.role} · {selected.year}</p>
            </div>
            {#if selected.url}
              <a class="detail-link" href={selected.url} target="_blank" rel="noopener">
                Open ↗
              </a>
            {:else}
              <span class="detail-wip">In progress</span>
            {/if}
          </div>

          <p class="detail-desc">{selected.desc}</p>

          <div class="detail-tags">
            {#each selected.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>

    {:else}
      <!-- Card grid -->
      <div class="proj-grid" style="animation: panelIn .2s ease">
        {#each filtered as project (project.id)}
          <button
            class="proj-card"
            onclick={() => open(project)}
            style="animation: panelIn .15s ease"
          >
            <div class="proj-card__thumb" style="background: {project.color}">
              <span class="proj-card__thumb-text">{project.thumb}</span>
              <div class="proj-card__overlay">
                <span class="proj-card__cta">View →</span>
              </div>
            </div>

            <div class="proj-card__info">
              <div class="proj-card__top">
                <span class="proj-card__name">{project.name}</span>
                <span class="proj-card__year">{project.year}</span>
              </div>
              <div class="proj-card__tags">
                {#each project.tags.slice(0, 3) as tag}
                  <span class="tag tag--sm">{tag}</span>
                {/each}
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

  </main>
</div>

<style>
.proj-layout {
  display: grid;
  grid-template-columns: 175px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* Sidebar */
.proj-sidebar {
  background: rgba(0,0,0,.25);
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  backdrop-filter: blur(8px);
  overflow-y: auto;
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

.sidebar-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: .5;
  flex-shrink: 0;
}

.sidebar-item.active .sidebar-item__dot {
  opacity: 1;
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
.proj-main {
  position: relative;
  overflow-y: auto;
  padding: 1.25rem;
}

.proj-watermark {
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

/* Grid */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .85rem;
  position: relative;
  z-index: 1;
}

.proj-card {
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
  padding: 0;
}

.proj-card:hover {
  border-color: rgba(139,92,246,.35);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,.5);
}

.proj-card__thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.proj-card__thumb-text {
  font-family: var(--font-display);
  font-size: 2.8rem;
  color: rgba(255,255,255,.2);
  letter-spacing: .06em;
}

.proj-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(139,92,246,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-fast);
}

.proj-card:hover .proj-card__overlay {
  opacity: 1;
}

.proj-card__cta {
  font-size: .85rem;
  font-weight: var(--fw-bold);
  color: #fff;
  letter-spacing: .04em;
}

.proj-card__info {
  padding: .7rem .85rem .8rem;
}

.proj-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .4rem;
}

.proj-card__name {
  font-size: .92rem;
  font-weight: var(--fw-bold);
  color: var(--color-white);
}

.proj-card__year {
  font-size: .68rem;
  color: var(--color-secondary);
}

.proj-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
}

/* Detail */
.proj-detail {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  font-size: .78rem;
  color: var(--color-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-fast);
  font-family: var(--font-body);
}

.detail-back:hover { color: var(--color-white); }

.detail-thumb {
  width: 100%;
  height: 180px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-subtle);
}

.detail-thumb__text {
  font-family: var(--font-display);
  font-size: 5rem;
  color: rgba(255,255,255,.15);
  letter-spacing: .06em;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.detail-name {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: .06em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: .25rem;
}

.detail-role {
  font-size: .75rem;
  color: var(--color-accent);
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  font-size: .78rem;
  font-weight: var(--fw-medium);
  color: var(--color-accent);
  background: var(--color-accent-glow);
  border: var(--border-accent);
  border-radius: var(--radius-pill);
  padding: 5px 14px;
  text-decoration: none;
  transition: var(--transition-fast);
}

.detail-link:hover {
  background: var(--color-accent);
  color: #fff;
}

.detail-wip {
  font-size: .72rem;
  color: var(--color-secondary);
  background: rgba(255,255,255,.05);
  border: var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}

.detail-desc {
  font-size: .85rem;
  color: var(--color-secondary);
  line-height: 1.85;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

/* Shared tags */
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

.tag--sm {
  font-size: .62rem;
  padding: 2px 8px;
}

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
