<script>
  import { interpolate } from 'popmotion'
  import { spring } from 'svelte/motion'
  import { windows } from '../../stores/index.js'

  let { mouse_x, item } = $props()

  const baseWidth = 57.6
  const distanceLimit = baseWidth * 6
  const beyond = distanceLimit + 1

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

  let img_el = $state(null)
  let width_px = spring(baseWidth, { damping: 0.47, stiffness: 0.12 })
  let raf

  $effect(() => {
    mouse_x
    raf = requestAnimationFrame(() => {
      if (img_el && mouse_x !== null) {
        const rect = img_el.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        $width_px = getWidth(mouse_x - center)
      } else {
        $width_px = baseWidth
      }
    })
    return () => cancelAnimationFrame(raf)
  })

  function openWindow() {
    if (!item.id) return
    windows.update(w => ({ ...w, [item.id]: { ...w[item.id], open: true } }))
  }
</script>

<div class="dock-item" onclick={openWindow}>
  <div class="dock-label">{item.label}</div>
  <div
    bind:this={img_el}
    class="dock-icon"
    style="width: {$width_px}px; height: {$width_px}px"
  >
    {#if item.img}
      <img src={item.img} alt={item.label} style="width:100%;height:100%;border-radius:12px;object-fit:cover" />
    {:else if item.emoji}
      {item.emoji}
    {:else}
      <span style="font-family:var(--font-mono);font-weight:700;font-size:1rem">{item.text}</span>
    {/if}
  </div>
  <div class="dock-dot"></div>
</div>