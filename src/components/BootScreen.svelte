<script lang="ts">
  let visible = $state(true)
  let progress = $state(0)
  let fadeOut = $state(false)
  let started = $state(false)

  function startBoot() {
    if (started) return
    started = true

    // Play sound — works because it's inside a user gesture
    const audio = new Audio('/sounds/startup.mp3')
    audio.volume = 0.8
    audio.play().catch(() => {})

    // Animate progress bar
    const duration = 3800
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      progress = Math.min(t < 0.7 ? t * t * 1.3 : 0.637 + (t - 0.7) * 2.1, 0.97) * 100

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        progress = 100
        setTimeout(() => {
          fadeOut = true
          setTimeout(() => { visible = false }, 700)
        }, 300)
      }
    }

    requestAnimationFrame(tick)
  }
</script>

{#if visible}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="boot" class:fade-out={fadeOut} onclick={startBoot} role="button" tabindex="0">
    <svg class="apple-logo" viewBox="0 0 170 200" xmlns="http://www.w3.org/2000/svg" fill="white">
      <path d="M150.37 130.25c-3.61 8.22-5.33 11.89-9.96 19.14-6.46 9.84-15.57 22.1-26.84 22.2-10.03.1-12.6-6.53-26.19-6.45-13.59.08-16.43 6.57-26.47 6.47-11.27-.1-19.9-11.17-26.37-21-18.06-27.52-19.97-59.82-8.83-77.05 7.87-12.26 20.27-19.44 31.92-19.44 11.87 0 19.34 6.51 29.16 6.51 9.53 0 15.33-6.52 29.07-6.52 10.35 0 21.3 5.63 29.15 15.37-25.61 14.05-21.46 50.67 4.36 60.77zM107.75 32.66C113.02 26.07 117 16.76 115.55 7.2c-8.46.59-18.37 5.98-24.17 12.93-5.24 6.27-9.65 15.65-7.94 24.78 9.3.3 18.87-5.27 24.31-12.25z"/>
    </svg>

    {#if !started}
      <p class="hint">Click anywhere to start</p>
    {/if}

    <div class="progress-track">
      <div class="progress-bar" style:width="{progress}%"></div>
    </div>
  </div>
{/if}

<style>
  .boot {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.7s ease;
  }

  .boot.fade-out {
    opacity: 0;
    pointer-events: none;
  }

  .apple-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 60px;
    animation: logo-appear 0.6s ease forwards;
    opacity: 0;
  }

  @keyframes logo-appear {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }

  .hint {
    position: fixed;
    bottom: 7%;
    color: rgba(255, 255, 255, 0.35);
    font-size: 12px;
    letter-spacing: 0.08em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    animation: blink 1.6s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.35; }
    50%       { opacity: 0.9; }
  }

  .progress-track {
    position: fixed;
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.18);
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.85);
    transition: width 0.12s linear;
  }
</style>
