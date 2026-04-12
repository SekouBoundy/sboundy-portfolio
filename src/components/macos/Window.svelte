<!-- src/components/macos/Window.svelte -->
<script lang="ts">
  import { wins, closeWin, minimizeWin, maximizeWin, focusWin } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'
  import { cubicOut } from 'svelte/easing'

  let { id, title, children }: { id: WinID; title: string; children: any } = $props()

  const win = $derived(wins[id])

  let dragging = $state(false)
  let ox = 0, oy = 0
  // track which action triggered the exit so winOut can pick the right animation
  let exitMode = $state<'close' | 'min'>('close')

  function onChromeDown(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('.tl')) return
    dragging = true
    ox = e.clientX - wins[id].left
    oy = e.clientY - wins[id].top
    focusWin(id)
    e.preventDefault()
  }

  // ── Resize ───────────────────────────────
  type Edge = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se'
  let resizing = $state<Edge | null>(null)

  const RESIZE_CURSOR: Record<Edge, string> = {
    n:  "url('/cursor-ns.png')   8 10, n-resize",
    s:  "url('/cursor-ns.png')   8 10, s-resize",
    e:  "url('/cursor-ew.png')   10 8, e-resize",
    w:  "url('/cursor-ew.png')   10 8, w-resize",
    nw: "url('/cursor-nwse.png') 9 9, nw-resize",
    se: "url('/cursor-nwse.png') 9 9, se-resize",
    ne: "url('/cursor-nesw.png') 9 9, ne-resize",
    sw: "url('/cursor-nesw.png') 9 9, sw-resize",
  }
  let rx = 0, ry = 0   // pointer offset at resize start
  let rw = 0, rh = 0   // size at resize start
  let rl = 0, rt = 0   // position at resize start

  const MIN_W = 400, MIN_H = 300

  function onResizeDown(e: MouseEvent, edge: Edge) {
    e.stopPropagation()
    e.preventDefault()
    resizing = edge
    rx = e.clientX
    ry = e.clientY
    rw = wins[id].w
    rh = wins[id].h
    rl = wins[id].left
    rt = wins[id].top
    focusWin(id)
    // Set cursor globally so it stays consistent even when mouse leaves the window
    document.body.style.cursor = RESIZE_CURSOR[edge]
  }

  function onMouseMove(e: MouseEvent) {
    if (dragging) {
      wins[id].left = e.clientX - ox
      wins[id].top  = Math.max(28, e.clientY - oy)
      return
    }
    if (!resizing) return

    const ddx = e.clientX - rx
    const ddy = e.clientY - ry

    let newW = rw, newH = rh, newL = rl, newT = rt

    if (resizing.includes('e')) newW = Math.max(MIN_W, rw + ddx)
    if (resizing.includes('s')) newH = Math.max(MIN_H, rh + ddy)
    if (resizing.includes('w')) {
      newW = Math.max(MIN_W, rw - ddx)
      newL = rl + (rw - newW)
    }
    if (resizing.includes('n')) {
      newH = Math.max(MIN_H, rh - ddy)
      newT = Math.max(28, rt + (rh - newH))
    }

    wins[id].w    = newW
    wins[id].h    = newH
    wins[id].left = newL
    wins[id].top  = newT
  }

  function onMouseUp() {
    dragging  = false
    resizing  = null
    document.body.style.cursor = ''
  }

  function handleClose() {
    exitMode = 'close'
    closeWin(id)
  }

  function handleMin() {
    exitMode = 'min'
    minimizeWin(id)
  }

  // macOS-style open: spring up from center
  function winIn(node: HTMLElement, _params: unknown) {
    return {
      duration: 300,
      easing: cubicOut,
      css: (t: number) => `
        opacity: ${t};
        transform: scale(${0.80 + 0.20 * t});
        transform-origin: center center;
      `,
    }
  }

  // Dispatches to the right out-animation based on exitMode
  function winOut(node: HTMLElement, _params: unknown) {
    return exitMode === 'min' ? genieOut(node) : disperseOut(node)
  }

  // Close — quick puff then implode to nothing
  function disperseOut(_node: HTMLElement) {
    return {
      duration: 240,
      css: (t: number) => {
        // t: 1→0  (Svelte out-transition convention)
        // Phase 1 — first 20% of time (t: 1→0.8): slight scale-up "puff"
        // Phase 2 — last  80% of time (t: 0.8→0):  collapse to zero + fade
        let scale: number, opacity: number, blur: number

        if (t > 0.8) {
          const p = (1 - t) / 0.2   // 0→1 during phase 1
          scale   = 1 + p * 0.07
          opacity = 1
          blur    = 0
        } else {
          const p = t / 0.8          // 1→0 during phase 2
          scale   = p * 1.07         // 1.07→0
          opacity = p * p            // quadratic fade — snappy
          blur    = (1 - p) * 10
        }

        return `
          transform: scale(${scale});
          opacity: ${opacity};
          filter: blur(${blur}px);
          transform-origin: center center;
        `
      },
    }
  }

  // Minimize — macOS genie effect
  function genieOut(node: HTMLElement) {
    const rect = node.getBoundingClientRect()

    // Target the specific dock icon for this window id
    const dockIcon = document.querySelector<HTMLElement>(`[data-win-id="${id}"]`)
    const dockRect = dockIcon?.getBoundingClientRect()
      ?? document.querySelector('#dock')?.getBoundingClientRect()

    const targetX = dockRect
      ? dockRect.left + dockRect.width / 2
      : window.innerWidth / 2
    const targetY = dockRect ? dockRect.top + dockRect.height / 2 : window.innerHeight - 48

    // Distance from window center to dock icon center
    const dx = targetX - (rect.left + rect.width  / 2)
    const dy = targetY - (rect.top  + rect.height / 2)

    return {
      duration: 520,
      // No easing — we control curvature manually in the css fn
      css: (t: number) => {
        // p = progress from 0 (start) → 1 (end)
        const p  = 1 - t
        const p2 = p * p        // accelerating curve for top lag
        const p3 = p * p * p    // more aggressive for bottom

        // Each horizontal slice squeezes at different rates:
        // bottom squishes first, top holds wide until late → classic genie curve
        const sTop  = p2 * 4          // top: barely moves
        const sQ1   = p2 * 18         // 25% down
        const sMid  = p  * 30         // 50% down
        const sQ3   = p  * 42         // 75% down
        const sBot  = Math.min(p * 50, 50) // bottom: squishes most, capped at 50%

        // Translate toward the dock icon — bottom arrives first
        const tx = dx * p
        const ty = dy * (p2 * 0.4 + p3 * 0.6)   // accelerate toward end

        // Scale down uniformly as it nears the dock
        const scale = 1 - p * 0.35

        // 10-point polygon simulates the curved sides of the genie
        return `
          clip-path: polygon(
            ${sTop}%      0%,
            ${100-sTop}%  0%,
            ${100-sQ1}%   25%,
            ${100-sMid}%  50%,
            ${100-sQ3}%   75%,
            ${100-sBot}%  100%,
            ${sBot}%      100%,
            ${sQ3}%       75%,
            ${sMid}%      50%,
            ${sQ1}%       25%
          );
          transform: translate(${tx}px, ${ty}px) scale(${scale});
          transform-origin: center top;
          opacity: ${t < 0.18 ? t / 0.18 : 1};
        `
      },
    }
  }
</script>

<svelte:window onmousemove={onMouseMove} onmouseup={onMouseUp} />

{#if win.open && !win.minimized}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    in:winIn={{}}
    out:winOut={{}}
    class="win"
    class:win--maximized={win.maximized}
    class:win--dragging={dragging}
    class:win--resizing={resizing}

    style:top="{win.maximized ? 10 : win.top}px"
    style:left="{win.maximized ? 50 : win.left}px"
    style:width="{win.maximized ? '95%' : win.w + 'px'}"
    style:height="{win.maximized ? '90%' : win.h + 'px'}"
    style:z-index={win.z}
    onmousedown={() => focusWin(id)}
  >
    <!-- Resize handles (hidden when maximized) -->
    {#if !win.maximized}
      <div class="rz rz--n"  onmousedown={(e) => onResizeDown(e, 'n')}></div>
      <div class="rz rz--s"  onmousedown={(e) => onResizeDown(e, 's')}></div>
      <div class="rz rz--e"  onmousedown={(e) => onResizeDown(e, 'e')}></div>
      <div class="rz rz--w"  onmousedown={(e) => onResizeDown(e, 'w')}></div>
      <div class="rz rz--nw" onmousedown={(e) => onResizeDown(e, 'nw')}></div>
      <div class="rz rz--ne" onmousedown={(e) => onResizeDown(e, 'ne')}></div>
      <div class="rz rz--sw" onmousedown={(e) => onResizeDown(e, 'sw')}></div>
      <div class="rz rz--se" onmousedown={(e) => onResizeDown(e, 'se')}></div>
    {/if}

    <!-- Inner shell clips content to border-radius -->
    <div class="win-shell">
    <!-- Chrome -->
    <div class="win-chrome" onmousedown={onChromeDown}>
      <div class="traffic-lights">
        <button class="tl tl--close"  aria-label="Close"    onclick={handleClose}></button>
        <button class="tl tl--min"    aria-label="Minimize" onclick={handleMin}></button>
        <button class="tl tl--max"    aria-label="Maximize" onclick={() => maximizeWin(id)}></button>
      </div>
      <span class="win-title">{title}</span>
      <div class="win-chrome__spacer"></div>
    </div>

    <!-- Content slot -->
    <div class="win-content">
      {@render children()}
    </div>
    </div> <!-- /win-shell -->
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
    overflow: visible; /* keep visible so resize handles bleed outside */
    box-shadow:
      0 12px 40px rgba(0,0,0,.55),
      0 0 0 .5px rgba(255,255,255,.08);
    transition:
      top .3s cubic-bezier(.4,0,.2,1),
      left .3s cubic-bezier(.4,0,.2,1),
      width .3s cubic-bezier(.4,0,.2,1),
      height .3s cubic-bezier(.4,0,.2,1),
      box-shadow .2s ease;
    min-width: 400px;
    min-height: 300px;
  }

  :global(body.light) .win {
    box-shadow:
      0 8px 28px rgba(0,0,0,.14),
      0 0 0 .5px rgba(0,0,0,.08);
  }

  /* Inner shell handles clipping and border-radius */
  .win-shell {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: .5px solid rgba(255,255,255,.1);
    transition: border-radius .3s cubic-bezier(.4,0,.2,1);
  }

  :global(body.light) .win-shell {
    border-color: rgba(0,0,0,.10);
  }

  .win--maximized .win-shell {
    border-radius: 0;
  }

  /* Disable position/size transitions while dragging or resizing for instant feedback */
  .win--dragging,
  .win--resizing {
    transition: box-shadow .2s ease !important;
  }
  .win--dragging {
    transform: scale(1.012);
  }
  .win--dragging,
  .win--dragging * {
    cursor: grabbing !important;
    user-select: none;
    box-shadow:
      0 28px 64px rgba(0,0,0,.55),
      0 0 0 .5px rgba(255,255,255,.18);
  }
  .win--resizing,
  .win--resizing * { user-select: none; }


  /* ── Resize handles ──────────────────────── */
  .rz {
    position: absolute;
    z-index: 10;
  }

  /* edges */
  .rz--n  { top: -4px;    left: 8px;  right: 8px;  height: 8px;  cursor: url('/cursor-ns.png')    8 10, n-resize; }
  .rz--s  { bottom: -4px; left: 8px;  right: 8px;  height: 8px;  cursor: url('/cursor-ns.png')    8 10, s-resize; }
  .rz--e  { right: -4px;  top: 8px;   bottom: 8px; width: 8px;   cursor: url('/cursor-ew.png')   10  8, e-resize; }
  .rz--w  { left: -4px;   top: 8px;   bottom: 8px; width: 8px;   cursor: url('/cursor-ew.png')   10  8, w-resize; }

  /* corners */
  .rz--nw { top: -4px;    left: -4px;  width: 16px; height: 16px; cursor: url('/cursor-nwse.png') 9 9, nw-resize; }
  .rz--ne { top: -4px;    right: -4px; width: 16px; height: 16px; cursor: url('/cursor-nesw.png') 9 9, ne-resize; }
  .rz--sw { bottom: -4px; left: -4px;  width: 16px; height: 16px; cursor: url('/cursor-nesw.png') 9 9, sw-resize; }
  .rz--se { bottom: -4px; right: -4px; width: 16px; height: 16px; cursor: url('/cursor-nwse.png') 9 9, se-resize; }

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