<script lang="ts">
  let { active, timeStr, back }: {
    active: string
    timeStr: string
    back: () => void
  } = $props()

  const tools = [
    {
      name: 'Figma',
      desc: 'UI design & prototyping',
      color: '#1e1b2e',
      border: '#a78bfa',
      svg: `<svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.51 9.51 0 0 1 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 0 1 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19Z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#FF7262"/>
      </svg>`
    },
    {
      name: 'Illustrator',
      desc: 'Vector graphics & illustration',
      color: '#1a1200',
      border: '#f9a825',
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <rect width="24" height="24" rx="5" fill="#FF9A00"/>
        <text x="4" y="17" font-size="12" font-weight="900" font-family="serif" fill="#1a1200">Ai</text>
      </svg>`
    },
    {
      name: 'Hand Drawing',
      desc: 'Sketching & concept art',
      color: '#0d1a10',
      border: '#4ade80',
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <path d="M4 20l2-6 10-10 4 4-10 10-6 2z" stroke="#4ade80" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M14 6l4 4" stroke="#4ade80" stroke-width="1.5"/>
        <circle cx="5" cy="19" r="1" fill="#4ade80"/>
      </svg>`
    },
    {
      name: 'Prototyping',
      desc: 'Interactive flows & testing',
      color: '#120d1a',
      border: '#c084fc',
      svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <rect x="2" y="4" width="9" height="7" rx="1.5" stroke="#c084fc" stroke-width="1.5"/>
        <rect x="13" y="4" width="9" height="7" rx="1.5" stroke="#c084fc" stroke-width="1.5"/>
        <rect x="7" y="14" width="10" height="6" rx="1.5" stroke="#c084fc" stroke-width="1.5"/>
        <path d="M6.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11" stroke="#c084fc" stroke-width="1.5"/>
        <line x1="12" y1="12.5" x2="12" y2="14" stroke="#c084fc" stroke-width="1.5"/>
      </svg>`
    },
  ]

  const process = [
    { step: '01', title: 'Research', desc: 'User needs, market & competitors', icon: '🔍' },
    { step: '02', title: 'Wireframe', desc: 'Low-fi sketches & information architecture', icon: '📐' },
    { step: '03', title: 'Prototype', desc: 'Hi-fi Figma mockups & interactive flows', icon: '🖥' },
    { step: '04', title: 'Deliver', desc: 'Handoff assets, specs & design tokens', icon: '🚀' },
  ]

  const stats = [
    { value: '20+', label: 'Projects' },
    { value: '3+', label: 'Years' },
    { value: '8+', label: 'Clients' },
    { value: '100%', label: 'Passion' },
  ]
</script>

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

    <!-- Hero -->
    <div class="ds-hero">
      <h2 class="ds-hero__title">DESIGN<em>WORK</em></h2>
      <p class="ds-hero__sub">UI/UX · Illustrations · Brand identity crafted in Figma and beyond.</p>
    </div>

    <!-- Stats -->
    <div class="ds-stats">
      {#each stats as s}
        <div class="ds-stat">
          <span class="ds-stat__value">{s.value}</span>
          <span class="ds-stat__label">{s.label}</span>
        </div>
      {/each}
    </div>

    <!-- Tools -->
    <div class="ios-section-header">TOOLS</div>
    <div class="ds-tools">
      {#each tools as tool}
        <div class="ds-tool-card" style="border-color:{tool.border}20; background:{tool.color}">
          <div class="ds-tool-icon" style="border:1.5px solid {tool.border}40">
            {@html tool.svg}
          </div>
          <div class="ds-tool-info">
            <span class="ds-tool-name">{tool.name}</span>
            <span class="ds-tool-desc">{tool.desc}</span>
          </div>
          <div class="ds-tool-dot" style="background:{tool.border}"></div>
        </div>
      {/each}
    </div>

    <!-- Process -->
    <div class="ios-section-header">PROCESS</div>
    <div class="ds-process">
      {#each process as p, i}
        <div class="ds-process-step">
          <div class="ds-process-left">
            <div class="ds-process-icon">{p.icon}</div>
            {#if i < process.length - 1}
              <div class="ds-process-line"></div>
            {/if}
          </div>
          <div class="ds-process-body">
            <div class="ds-process-header">
              <span class="ds-process-num">{p.step}</span>
              <span class="ds-process-title">{p.title}</span>
            </div>
            <p class="ds-process-desc">{p.desc}</p>
          </div>
        </div>
      {/each}
    </div>

  </div>
</div>

<style>
  /* Hero */
  .ds-hero {
    padding: 24px 20px 16px;
    text-align: center;
  }
  .ds-hero__title {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    margin: 0 0 8px;
  }
  .ds-hero__title em {
    font-style: normal;
    color: var(--color-accent, #a78bfa);
  }
  .ds-hero__sub {
    font-size: 13px;
    color: rgba(255,255,255,.5);
    margin: 0;
    line-height: 1.5;
  }

  /* Stats */
  .ds-stats {
    display: flex;
    justify-content: space-around;
    margin: 0 16px 8px;
    background: rgba(255,255,255,.04);
    border-radius: 16px;
    padding: 16px 8px;
    border: 1px solid rgba(255,255,255,.07);
  }
  .ds-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .ds-stat__value {
    font-size: 22px;
    font-weight: 800;
    color: var(--color-accent, #a78bfa);
    line-height: 1;
  }
  .ds-stat__label {
    font-size: 10px;
    color: rgba(255,255,255,.4);
    text-transform: uppercase;
    letter-spacing: .5px;
  }

  /* Tools */
  .ds-tools {
    margin: 0 16px 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ds-tool-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid transparent;
  }
  .ds-tool-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,.06);
    flex-shrink: 0;
  }
  .ds-tool-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ds-tool-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
  .ds-tool-desc {
    font-size: 11px;
    color: rgba(255,255,255,.4);
  }
  .ds-tool-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    opacity: .8;
    flex-shrink: 0;
  }

  /* Process */
  .ds-process {
    margin: 0 16px 24px;
    display: flex;
    flex-direction: column;
  }
  .ds-process-step {
    display: flex;
    gap: 12px;
  }
  .ds-process-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 36px;
    flex-shrink: 0;
  }
  .ds-process-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(167,139,250,.15);
    border: 1px solid rgba(167,139,250,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .ds-process-line {
    width: 1px;
    flex: 1;
    min-height: 16px;
    background: linear-gradient(to bottom, rgba(167,139,250,.3), rgba(167,139,250,.05));
    margin: 4px 0;
  }
  .ds-process-body {
    padding-bottom: 18px;
    flex: 1;
  }
  .ds-process-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 3px;
    padding-top: 6px;
  }
  .ds-process-num {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-accent, #a78bfa);
    letter-spacing: .5px;
  }
  .ds-process-title {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
  .ds-process-desc {
    font-size: 12px;
    color: rgba(255,255,255,.45);
    margin: 0;
    line-height: 1.5;
  }
</style>
