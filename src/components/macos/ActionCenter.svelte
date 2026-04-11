<!-- src/components/macos/ActionCenter.svelte -->
<script lang="ts">
  import { currentTheme, currentLang } from '../../stores/index.ts'
  import type { Theme, Lang } from '../../stores/index.ts'

  const { onclose }: { onclose: () => void } = $props()

  const COLORS = [
    { id: 'orange', hsl: '35, 100%, 50%'  },
    { id: 'green',  hsl: '135, 59%, 49%'  },
    { id: 'cyan',   hsl: '199, 78%, 55%'  },
    { id: 'blue',   hsl: '211, 100%, 50%' },
    { id: 'indigo', hsl: '241, 61%, 59%'  },
    { id: 'purple', hsl: '280, 68%, 60%'  },
    { id: 'pink',   hsl: '349, 100%, 59%' },
  ]

  let selectedColor = $state('blue')

  function toggleTheme() {
    currentTheme.update((t: Theme) => t === 'dark' ? 'light' : 'dark')
  }

  function toggleLang() {
    currentLang.update((l: Lang) => l === 'en' ? 'fr' : 'en')
  }

  function setColor(id: string, hsl: string) {
    selectedColor = id
    document.body.style.setProperty('--system-color-primary',     `hsl(${hsl})`)
    document.body.style.setProperty('--system-color-primary-hsl', hsl)
  }

  // close on outside click
  function onWindowClick(e: MouseEvent) {
    const t = e.target as HTMLElement
    if (!t.closest('.ac-panel') && !t.closest('#ac-toggle')) onclose()
  }
</script>

<svelte:window onclick={onWindowClick} />

<div class="ac-panel" class:dark={$currentTheme === 'dark'}>

  <!-- ── Row 1: Dark mode + Lang ── -->
  <div class="ac-row">
    <button
      class="ac-tile"
      class:ac-tile--on={$currentTheme === 'dark'}
      onclick={toggleTheme}
    >
      <span class="ac-tile__icon">
        {#if $currentTheme === 'dark'}🌙{:else}☀️{/if}
      </span>
      <span class="ac-tile__label">Dark mode</span>
    </button>

    <button class="ac-tile" onclick={toggleLang}>
      <span class="ac-tile__icon">🌐</span>
      <span class="ac-tile__label">Lang — {$currentLang.toUpperCase()}</span>
    </button>
  </div>

  <!-- ── Row 2: System Color ── -->
  <div class="ac-surface">
    <p class="ac-surface__title">System Color</p>
    <div class="ac-colors">
      {#each COLORS as c}
        <button
          class="ac-dot"
          class:ac-dot--selected={selectedColor === c.id}
          style:background="hsl({c.hsl})"
          onclick={() => setColor(c.id, c.hsl)}
          aria-label={c.id}
        >
          {#if selectedColor === c.id}<span>✓</span>{/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- ── Row 3: Wallpaper card ── -->
  <div class="ac-surface ac-surface--wallpaper">
    <div class="ac-wp-thumb"></div>
    <div class="ac-wp-info">
      <span class="ac-wp-name">Ventura</span>
      <span class="ac-wp-sub">Dynamic Wallpaper</span>
    </div>
  </div>

</div>

<style>
  /* ── Panel shell ── */
  .ac-panel {
    position: fixed;
    top: calc(var(--menubar-height) + 6px);
    right: 10px;
    width: 272px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    z-index: calc(var(--z-menubar) + 10);

    /* Light state (default) */
    background: hsla(var(--system-color-light-hsl), 0.72);
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    box-shadow:
      0 0 0 0.5px hsla(var(--system-color-dark-hsl), 0.1),
      0 8px 40px rgba(0,0,0,.18);

    animation: ac-in 0.18s cubic-bezier(0.34,1.56,0.64,1);
  }

  /* Dark state */
  .ac-panel.dark {
    background: hsla(var(--system-color-light-hsl), 0.16);
    box-shadow:
      inset 0 0 0 0.5px hsla(var(--system-color-dark-hsl), 0.28),
      0 0 0 0.8px hsla(var(--system-color-light-hsl), 0.12),
      0 8px 40px rgba(0,0,0,.55);
  }

  @keyframes ac-in {
    from { opacity: 0; transform: scale(0.93) translateY(-6px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);     }
  }

  /* ── 2-column tile row ── */
  .ac-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .ac-tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    padding: 10px 12px;
    border-radius: 10px;
    background: hsla(var(--system-color-dark-hsl), 0.06);
    transition: background 0.12s;
    cursor: default;
  }

  .ac-tile:hover {
    background: hsla(var(--system-color-dark-hsl), 0.11);
  }

  /* Active (ON) state — uses primary color */
  .ac-tile--on {
    background: hsla(var(--system-color-primary-hsl), 1);
  }

  .ac-tile--on:hover {
    background: hsla(var(--system-color-primary-hsl), 0.85);
  }

  .ac-tile--on .ac-tile__icon {
    background: rgba(255,255,255,.25);
  }

  .ac-tile--on .ac-tile__label {
    color: rgba(255,255,255,.8);
  }

  .ac-tile__icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 15px;
    background: hsla(var(--system-color-dark-hsl), 0.08);
  }

  .ac-tile__label {
    font-size: 11px;
    font-weight: 600;
    color: hsla(var(--system-color-dark-hsl), 0.88);
    text-align: left;
    line-height: 1.3;
  }

  /* ── Surface card ── */
  .ac-surface {
    padding: 10px 12px;
    border-radius: 10px;
    background: hsla(var(--system-color-dark-hsl), 0.06);
  }

  .ac-surface__title {
    font-size: 11px;
    font-weight: 600;
    color: hsla(var(--system-color-dark-hsl), 0.5);
    margin-bottom: 8px;
    letter-spacing: .02em;
  }

  /* ── Color dots ── */
  .ac-colors {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ac-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: white;
    transition: transform 0.1s;
    box-shadow: 0 1px 3px rgba(0,0,0,.25);
    flex-shrink: 0;
  }

  .ac-dot:hover { transform: scale(1.18); }

  .ac-dot--selected {
    box-shadow:
      0 0 0 2.5px white,
      0 0 0 4.5px currentColor;
  }

  /* ── Wallpaper card ── */
  .ac-surface--wallpaper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
  }

  .ac-wp-thumb {
    width: 52px;
    height: 40px;
    border-radius: 7px;
    background: url('/wallpapers/ventura-2.jpg') center/cover no-repeat;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,.35);
  }

  .ac-wp-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .ac-wp-name {
    font-size: 13px;
    font-weight: 600;
    color: hsla(var(--system-color-dark-hsl), 0.9);
  }

  .ac-wp-sub {
    font-size: 11px;
    color: hsla(var(--system-color-dark-hsl), 0.5);
  }
</style>