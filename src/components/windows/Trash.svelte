<script lang="ts">
  type DeadProject = {
    id:     number
    name:   string
    emoji:  string
    why:    string
    when:   string
    lesson: string
  }

  // ── Fill these in with your real abandoned projects ──
  const graveyard: DeadProject[] = [
    {
      id:     1,
      name:   'Project Name 1',
      emoji:  '💀',
      why:    'Why did you give up? (e.g. too complex, lost interest, pivot…)',
      when:   '2023',
      lesson: 'What did you learn from it?',
    },
    {
      id:     2,
      name:   'Project Name 2',
      emoji:  '🪦',
      why:    'Why did you give up?',
      when:   '2024',
      lesson: 'What did you learn from it?',
    },
    {
      id:     3,
      name:   'Project Name 3',
      emoji:  '🗑️',
      why:    'Why did you give up?',
      when:   '2024',
      lesson: 'What did you learn from it?',
    },
  ]
  // ─────────────────────────────────────────────────────

  let selected: DeadProject | null = $state(null)
</script>

<div class="trash-layout">

  <!-- Sidebar -->
  <aside class="trash-sidebar">
    <p class="sidebar-label">GRAVEYARD</p>
    {#each graveyard as project}
      <button
        class="sidebar-item"
        class:active={selected?.id === project.id}
        onclick={() => selected = selected?.id === project.id ? null : project}
      >
        <span class="item-emoji">{project.emoji}</span>
        <span class="item-name">{project.name}</span>
        <span class="item-year">{project.when}</span>
      </button>
    {/each}

    <div class="sidebar-footer">
      <span class="footer-count">{graveyard.length} items</span>
    </div>
  </aside>

  <!-- Main -->
  <main class="trash-main">
    <div class="watermark" aria-hidden="true">RIP</div>

    {#if selected}
      <div class="detail" style="animation: fadeUp .2s ease">
        <div class="detail-header">
          <span class="detail-emoji">{selected.emoji}</span>
          <div>
            <h2 class="detail-name">{selected.name}</h2>
            <p class="detail-year">Abandoned · {selected.when}</p>
          </div>
        </div>

        <div class="detail-section">
          <p class="section-label">WHY IT DIED</p>
          <p class="section-body">{selected.why}</p>
        </div>

        <div class="detail-section">
          <p class="section-label">LESSON LEARNED</p>
          <p class="section-body lesson">{selected.lesson}</p>
        </div>

        <div class="rip-stamp">R.I.P</div>
      </div>

    {:else}
      <div class="empty-state">
        <p class="empty-icon">🗑️</p>
        <p class="empty-title">Trash</p>
        <p class="empty-sub">Projects that didn't make it.<br>Select one to see why.</p>
      </div>
    {/if}
  </main>

</div>

<style>
.trash-layout {
  display: grid;
  grid-template-columns: 180px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* Sidebar */
.trash-sidebar {
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
  gap: .45rem;
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
  background: rgba(239,68,68,.12);
  color: #f87171;
}

.item-emoji { font-size: .9rem; flex-shrink: 0; }

.item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-year {
  font-size: .65rem;
  opacity: .5;
  flex-shrink: 0;
}

.sidebar-footer {
  margin-top: auto;
  padding: .5rem .5rem 0;
  border-top: var(--border-subtle);
}

.footer-count {
  font-size: .65rem;
  color: var(--color-secondary);
  opacity: .5;
}

/* Main */
.trash-main {
  position: relative;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.watermark {
  position: absolute;
  bottom: -16px;
  right: -4px;
  font-family: var(--font-display);
  font-size: 7rem;
  letter-spacing: .08em;
  color: rgba(239,68,68,.04);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

/* Detail */
.detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-emoji {
  font-size: 3rem;
  line-height: 1;
}

.detail-name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: .06em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: .2rem;
}

.detail-year {
  font-size: .72rem;
  color: #f87171;
  opacity: .8;
}

.detail-section {
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  padding: .85rem 1rem;
}

.section-label {
  font-size: .58rem;
  font-weight: var(--fw-bold);
  letter-spacing: .12em;
  color: var(--color-secondary);
  opacity: .6;
  margin-bottom: .45rem;
}

.section-body {
  font-size: .84rem;
  color: var(--color-secondary);
  line-height: 1.8;
}

.section-body.lesson {
  color: #86efac;
}

.rip-stamp {
  position: absolute;
  top: 0;
  right: 0;
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: .18em;
  color: rgba(239,68,68,.2);
  border: 2px solid rgba(239,68,68,.15);
  border-radius: 6px;
  padding: 4px 10px;
  transform: rotate(12deg);
  pointer-events: none;
  user-select: none;
}

/* Empty state */
.empty-state {
  text-align: center;
  margin-top: 3rem;
}

.empty-icon { font-size: 3rem; margin-bottom: .75rem; }

.empty-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: .1em;
  color: var(--color-white);
  margin-bottom: .4rem;
}

.empty-sub {
  font-size: .82rem;
  color: var(--color-secondary);
  line-height: 1.8;
  opacity: .7;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
