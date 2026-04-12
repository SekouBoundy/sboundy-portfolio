<!-- src/components/macos/Window.svelte -->
<script lang="ts">
  import { wins, closeWin, minimizeWin, maximizeWin, focusWin } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'

  let { id, title, children }: { id: WinID; title: string; children: any } = $props()

  const win = $derived(wins[id])

  let dragging = $state(false)
  let ox = 0, oy = 0

  function onChromeDown(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('.tl')) return
    dragging = true
    ox = e.clientX - wins[id].left
    oy = e.clientY - wins[id].top
    focusWin(id)
    e.preventDefault()
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return
    wins[id].left = e.clientX - ox
    wins[id].top  = Math.max(28, e.clientY - oy)
  }

  function onMouseUp() { dragging = false }
</script>

<svelte:window onmousemove={onMouseMove} onmouseup={onMouseUp} />

{#if win.open && !win.minimized}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="win"
    class:win--maximized={win.maximized}
    class:win--dragging={dragging}
    style:top="{win.maximized ? 0 : win.top}px"
    style:left="{win.maximized ? 100 : win.left}px"
    // style:right="{win.maximized ? 0 : undefined}px"
    style:width="{win.maximized ? '100%' : win.w + 'px'}"
    style:height="{win.maximized ? '100%' : win.h + 'px'}"
    style:z-index={win.z}
    onmousedown={() => focusWin(id)}
  >
    <!-- Chrome -->
    <div class="win-chrome" onmousedown={onChromeDown}>
      <div class="traffic-lights">
        <button class="tl tl--close"  aria-label="Close"    onclick={() => closeWin(id)}></button>
        <button class="tl tl--min"    aria-label="Minimize" onclick={() => minimizeWin(id)}></button>
        <button class="tl tl--max"    aria-label="Maximize" onclick={() => maximizeWin(id)}></button>
      </div>
      <span class="win-title">{title}</span>
      <div class="win-chrome__spacer"></div>
    </div>

    <!-- Content slot -->
    <div class="win-content">
      {@render children()}
    </div>
  </div>
{/if}

<style>
  :global(body.light) .win {
    border-color: rgba(0,0,0,.10);
  }

  .win {
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: .5px solid rgba(255,255,255,.1);
    box-shadow:
      0 12px 40px rgba(0,0,0,.55),
      0 0 0 .5px rgba(255,255,255,.08);
    transition:
      border-radius .2s ease,
      box-shadow .2s ease;
    min-width: 400px;
    min-height: 300px;
  }

  :global(body.light) .win {
    border-color: rgba(0,0,0,.10);
    box-shadow:
      0 8px 28px rgba(0,0,0,.14),
      0 0 0 .5px rgba(0,0,0,.08);
  }

  .win--maximized {
    border-radius: 0 !important;
  }

  .win--dragging,
  .win--dragging * {
    cursor: grabbing !important;
    user-select: none;
    box-shadow:
      0 24px 60px rgba(0,0,0,.5),
      0 0 0 .5px rgba(255,255,255,.15);
  }

  /* Chrome — tinted with system color */
  .win-chrome {
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: color-mix(in srgb, hsl(var(--system-color-primary-hsl)) 22%, rgba(18,18,18,.92));
    backdrop-filter: blur(20px);
    border-bottom: .5px solid hsla(var(--system-color-primary-hsl), .2);
    cursor: grab !important;
    user-select: none;
  }

  :global(body.light) .win-chrome {
    background: color-mix(in srgb, hsl(var(--system-color-primary-hsl)) 16%, rgba(245,245,245,.94));
    border-bottom-color: hsla(var(--system-color-primary-hsl), .22);
  }

  .win-chrome:active { cursor: grabbing !important; }

  .win-chrome__spacer { width: 52px; flex-shrink: 0; }

  /* Traffic lights */
  .traffic-lights {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .tl {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: none;
    cursor: default !important;
    position: relative;
    flex-shrink: 0;
    transition: filter .15s;
  }

  .tl::after {
    content: '';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 700;
    color: rgba(0,0,0,.6);
    opacity: 0;
    transition: opacity .15s;
  }

  /* show icons when hovering anywhere on the chrome */
  .win-chrome:hover .tl::after { opacity: 1; }
  .tl:hover { filter: brightness(1.15); }

  .tl--close  { background: #ff5f57; }
  .tl--min    { background: #febc2e; }
  .tl--max    { background: #28c840; }

  .tl--close::after { content: '✕'; }
  .tl--min::after   { content: '−'; font-size: 10px; }
  .tl--max::after   { content: '+'; font-size: 10px; }

  /* Content — solid enough to read, tinted with system color */
  .win-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: color-mix(in srgb, hsl(var(--system-color-primary-hsl)) 10%, rgba(15,15,15,.82));
    backdrop-filter: blur(40px) saturate(140%);
  }

  :global(body.light) .win-content {
    background: color-mix(in srgb, hsl(var(--system-color-primary-hsl)) 7%, rgba(252,252,252,.88));
    backdrop-filter: blur(40px) saturate(140%);
  }
</style>