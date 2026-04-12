<script lang="ts">
  type Item = { name: string; desc: string }
  type Section = { label: string; icon: string; color: string; items: Item[] }

  const sections: Section[] = [
    {
      label: 'CODING',
      icon:  '< />',
      color: '#8B5CF6',
      items: [
        { name: 'C / C++',  desc: 'Systems programming, algorithms & memory management' },
        { name: 'C#',       desc: '.NET ecosystem, OOP & desktop applications' },
        { name: 'PHP',      desc: 'Server-side scripting & web back-end' },
        { name: 'MySQL',    desc: 'Relational databases, queries & schema design' },
      ],
    },
    {
      label: 'COMPUTER SCIENCE',
      icon:  '⚙',
      color: '#06B6D4',
      items: [
        { name: 'Digital Logic Design',           desc: 'Boolean algebra, gates, circuits & flip-flops' },
        { name: 'Data Structures & Organization', desc: 'Arrays, trees, graphs, sorting & complexity' },
        { name: 'Software Engineering',           desc: 'SDLC, design patterns & architecture' },
        { name: 'Project Management',             desc: 'Agile, Scrum, planning & delivery' },
        { name: 'Robotics',                       desc: 'Actuators, sensors & autonomous systems' },
        { name: 'Embedded Systems',               desc: 'Microcontrollers, real-time & low-level code' },
        { name: 'Electronics · Arduino',          desc: 'Circuit design, prototyping & hardware coding' },
      ],
    },
  ]

  let activeSection = $state(0)
  let activeItem: Item | null = $state(null)

  function select(item: Item) {
    activeItem = activeItem?.name === item.name ? null : item
  }
</script>

<div class="eng-layout">

  <!-- Left nav -->
  <nav class="eng-nav">
    <p class="nav-title">ENGINEER</p>
    {#each sections as sec, i}
      <button
        class="nav-item"
        class:active={activeSection === i}
        style="--accent: {sec.color}"
        onclick={() => { activeSection = i; activeItem = null }}
      >
        <span class="nav-icon">{sec.icon}</span>
        {sec.label}
      </button>
    {/each}

    <div class="nav-badge">
      <span class="badge-dot"></span>
      CS Student
    </div>
  </nav>

  <!-- Content -->
  <main class="eng-main">
    {#each sections as sec, i}
      {#if activeSection === i}
        <div class="section-view" style="animation: slideIn .18s ease">

          <div class="section-header" style="--accent: {sec.color}">
            <span class="section-icon">{sec.icon}</span>
            <div>
              <h2 class="section-title">{sec.label}</h2>
              <p class="section-count">{sec.items.length} topics</p>
            </div>
          </div>

          <div class="items-grid">
            {#each sec.items as item}
              <button
                class="item-card"
                class:active={activeItem?.name === item.name}
                style="--accent: {sec.color}"
                onclick={() => select(item)}
              >
                <div class="card-top">
                  <span class="card-dot" style="background: {sec.color}"></span>
                  <span class="card-name">{item.name}</span>
                </div>

                {#if activeItem?.name === item.name}
                  <p class="card-desc" style="animation: slideIn .15s ease">{item.desc}</p>
                {/if}
              </button>
            {/each}
          </div>

        </div>
      {/if}
    {/each}

    <div class="watermark" aria-hidden="true">ENG</div>
  </main>

</div>

<style>
.eng-layout {
  display: grid;
  grid-template-columns: 170px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* Nav */
.eng-nav {
  background: rgba(0,0,0,.25);
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .2rem;
  backdrop-filter: blur(8px);
}

.nav-title {
  font-size: .58rem;
  font-weight: var(--fw-bold);
  letter-spacing: .14em;
  color: var(--color-secondary);
  padding: 0 .5rem;
  margin-bottom: .4rem;
  opacity: .6;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: .55rem;
  width: 100%;
  padding: .42rem .55rem;
  border-radius: var(--radius-sm);
  font-size: .8rem;
  color: var(--color-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.nav-item:hover {
  color: var(--color-white);
  background: rgba(255,255,255,.05);
}

.nav-item.active {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  font-weight: var(--fw-medium);
}

.nav-icon {
  font-size: .8rem;
  font-family: var(--font-mono);
  flex-shrink: 0;
  opacity: .8;
}

.nav-badge {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: .4rem;
  font-size: .68rem;
  color: var(--color-secondary);
  padding: .4rem .5rem 0;
  border-top: var(--border-subtle);
  opacity: .7;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  box-shadow: 0 0 6px #22c55e;
}

/* Main */
.eng-main {
  position: relative;
  overflow-y: auto;
  padding: 1.4rem;
}

.watermark {
  position: absolute;
  bottom: -14px;
  right: -2px;
  font-family: var(--font-display);
  font-size: 7rem;
  letter-spacing: .08em;
  color: rgba(255,255,255,.025);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

/* Section */
.section-view {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: center;
  gap: .85rem;
  padding-bottom: .85rem;
  border-bottom: var(--border-subtle);
}

.section-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: .95rem;
  color: var(--accent);
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: .1em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: .2rem;
}

.section-count {
  font-size: .68rem;
  color: var(--color-secondary);
  opacity: .6;
}

/* Items grid */
.items-grid {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.item-card {
  width: 100%;
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: .65rem .85rem;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.item-card:hover {
  background: rgba(255,255,255,.06);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}

.item-card.active {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
}

.card-top {
  display: flex;
  align-items: center;
  gap: .6rem;
}

.card-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: .7;
}

.item-card.active .card-dot {
  opacity: 1;
  box-shadow: 0 0 6px var(--accent);
}

.card-name {
  font-size: .86rem;
  font-weight: var(--fw-medium);
  color: var(--color-white);
}

.card-desc {
  font-size: .78rem;
  color: var(--color-secondary);
  line-height: 1.7;
  margin-top: .45rem;
  padding-left: 1.3rem;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
