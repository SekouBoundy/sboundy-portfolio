<script lang="ts">
  import { openWin, wins } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'
  import { interpolate } from 'popmotion'
  import { Spring } from 'svelte/motion'

  let { mouse_x, item }: {
    mouse_x: number | null
    item: { id?: WinID; img?: string; emoji?: string; text?: string; label: string }
  } = $props()

  const baseWidth     = 64
  const distanceLimit = baseWidth * 6

  const distanceInput = [
    -distanceLimit, -distanceLimit / 1.25, -distanceLimit / 2,
    0,
    distanceLimit / 2, distanceLimit / 1.25, distanceLimit,
  ]
  const widthOutput = [
    baseWidth, baseWidth * 1.1, baseWidth * 1.414,
    baseWidth * 2,
    baseWidth * 1.414, baseWidth * 1.1, baseWidth,
  ]

  const getWidth = interpolate(distanceInput, widthOutput)

  let img_el = $state<HTMLElement | null>(null)
  const width_px = new Spring(baseWidth, { damping: 0.47, stiffness: 0.12 })
  let raf: number

  $effect(() => {
    mouse_x
    raf = requestAnimationFrame(() => {
      if (img_el && mouse_x !== null) {
        const rect   = img_el.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        width_px.target = getWidth(mouse_x - center)
      } else {
        width_px.target = baseWidth
      }
    })
    return () => cancelAnimationFrame(raf)
  })

  const isOpen = $derived(item.id ? wins[item.id]?.open : false)

  function onClick() {
    if (item.id) openWin(item.id as WinID)
  }
</script>

<button class="dock-item" onclick={onClick} aria-label={item.label}>
  <span class="dock-label">{item.label}</span>

  <div
    bind:this={img_el}
    class="dock-icon"
    style:width="{width_px.current}px"
    style:height="{width_px.current}px"
  >
    {#if item.img}
      <img src={item.img} alt={item.label} />
    {:else if item.emoji}
      {item.emoji}
    {:else}
      <span class="dock-text">{item.text}</span>
    {/if}
  </div>

  <div class="dock-dot" class:dock-dot--visible={isOpen}></div>
</button>

<style>
  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: default;
    position: relative;
  }

  .dock-item:hover .dock-label {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .dock-label {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(20, 10, 40, .85);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity .15s, transform .15s;
    pointer-events: none;
    border: .5px solid rgba(255,255,255,.12);
  }

  .dock-icon {
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    overflow: hidden;
    flex-shrink: 0;
    will-change: width, height;
  }

  .dock-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 13px;
    display: block;
  }

  .dock-text {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: white;
  }

  .dock-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,.7);
    margin-top: 3px;
    opacity: 0;
    transition: opacity .2s;
  }

  .dock-dot--visible {
    opacity: 1;
  }
</style>
