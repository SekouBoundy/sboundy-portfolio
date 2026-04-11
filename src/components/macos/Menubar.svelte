<!-- src/components/macos/Menubar.svelte -->
<script lang="ts">
  import { currentLang } from '../../stores/index.ts'
  import { t } from '../../stores/lang.ts'
  import ActionCenter from './ActionCenter.svelte'

  let time = $state(formatTime())
  let acOpen = $state(false)

  function formatTime() {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    })
  }

  $effect(() => {
    const id = setInterval(() => time = formatTime(), 1000)
    return () => clearInterval(id)
  })
</script>

<div id="menubar">
  <div class="menu-left">
    <div class="menu-item">&#63743;</div>
    <div class="menu-item menu-item--brand">SBOUNDY</div>
    <div class="menu-item">File</div>
    <div class="menu-item">View</div>
    <div class="menu-item">Window</div>
    <div class="menu-item">Help</div>
  </div>

  <div class="menu-right">
  <!-- Action Center toggle -->
    <button
      id="ac-toggle"
      class="ac-toggle"
      class:ac-toggle--open={acOpen}
      onclick={() => acOpen = !acOpen}
      aria-label="Control Centre"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1"  y="1"  width="6" height="6" rx="1.5"/>
        <rect x="9"  y="1"  width="6" height="6" rx="1.5"/>
        <rect x="1"  y="9"  width="6" height="6" rx="1.5"/>
        <rect x="9"  y="9"  width="6" height="6" rx="1.5"/>
      </svg>
    </button>
    <span class="menu-status">● {$t('status')}</span>
    <span class="menu-time">{time}</span>

    
  </div>
</div>

{#if acOpen}
  <ActionCenter onclose={() => acOpen = false} />
{/if}

<style>
  #menubar {
    height: var(--menubar-height);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    position: relative;
    z-index: var(--z-menubar);

    background: hsla(var(--system-color-light-hsl), 0.22);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 0.5px solid hsla(var(--system-color-dark-hsl), 0.08);
    color: hsla(var(--system-color-dark-hsl), 0.9);
  }

  .menu-left {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  :global(.menu-item) {
    font-size: 13px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: default;
    color: hsla(var(--system-color-dark-hsl), 0.9);
    transition: background 0.12s;
  }

  :global(.menu-item:hover) {
    background: hsla(var(--system-color-dark-hsl), 0.12);
  }

  :global(.menu-item--brand) {
    font-weight: 700;
  }

  .menu-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-status,
  .menu-time {
    font-size: 12px;
    font-weight: 500;
    color: hsla(var(--system-color-dark-hsl), 0.85);
    white-space: nowrap;
  }

  /* ── AC Toggle button ── */
  .ac-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 20px;
    border-radius: 5px;
    color: hsla(var(--system-color-dark-hsl), 0.85);
    transition: background 0.12s;
    cursor: default;
  }

  .ac-toggle:hover,
  .ac-toggle--open {
    background: hsla(var(--system-color-dark-hsl), 0.12);
  }
</style>