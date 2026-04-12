<script lang="ts">
  import { currentLang, currentTheme } from '../../stores/index'

  let { open = $bindable(), timeStr, ccBrightness = $bindable(), ccVolume = $bindable() }: {
    open: boolean
    timeStr: string
    ccBrightness: number
    ccVolume: number
  } = $props()

  let ccWifi      = $state(true)
  let ccBluetooth = $state(true)
  let ccAirplane  = $state(false)
  let ccAirdrop   = $state(false)
  let ccFlash     = $state(false)

  const ccMusic = { title: 'Afrobeats Mix', artist: 'SB Playlist', icon: '🎵' }
  let ccPlaying = $state(false)

  let ccCalcOpen = $state(false)
  let ccCalcExpr = $state('')
  let ccCalcDisp = $state('0')

  function calcPress(v: string) {
    if (v === 'C') { ccCalcExpr = ''; ccCalcDisp = '0'; return }
    if (v === '=') {
      try { ccCalcDisp = String(Function('"use strict";return (' + ccCalcExpr + ')')()) }
      catch { ccCalcDisp = 'Error' }
      ccCalcExpr = ''
      return
    }
    if (v === '⌫') { ccCalcExpr = ccCalcExpr.slice(0,-1); ccCalcDisp = ccCalcExpr || '0'; return }
    ccCalcExpr += v
    ccCalcDisp = ccCalcExpr
  }

  const isDark = $derived($currentTheme === 'dark')
  function toggleTheme() { currentTheme.set(isDark ? 'light' : 'dark') }
  function toggleLang()  { currentLang.set($currentLang === 'en' ? 'fr' : 'en') }
</script>

{#if open}
  <div class="cc-overlay" onclick={() => open = false} role="presentation">

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="cc-panel" onclick={(e) => e.stopPropagation()}>

      {#if ccCalcOpen}
        <!-- CALCULATOR -->
        <div class="cc-calc-screen">
          <button class="cc-calc-back" onclick={() => ccCalcOpen = false}>‹ Back</button>
          <div class="cc-calc-display">{ccCalcDisp}</div>
          <div class="cc-calc-grid">
            {#each ['C','⌫','%','/',
                    '7','8','9','×',
                    '4','5','6','−',
                    '1','2','3','+',
                    '±','0','.','='] as k}
              <button
                class="cc-calc-key"
                class:cc-key-op={['/','+','−','×','='].includes(k)}
                class:cc-key-fn={['C','⌫','%','±'].includes(k)}
                onclick={() => calcPress(k === '×' ? '*' : k === '−' ? '-' : k)}
              >{k}</button>
            {/each}
          </div>
        </div>

      {:else}
        <!-- MAIN CONTROL CENTER -->

        <div class="cc-statusbar">
          <span class="cc-time">{timeStr}</span>
          <div class="cc-status-icons"><span>●●●</span><span>WiFi</span><span>🔋</span></div>
        </div>

        <div class="cc-top-row">

          <div class="cc-conn-block">
            <button class="cc-conn-btn" class:cc-on={ccWifi && !ccAirplane} onclick={() => ccWifi = !ccWifi}>
              <span class="cc-conn-icon">📶</span>
              <div>
                <div class="cc-conn-name">Wi-Fi</div>
                <div class="cc-conn-sub">{ccWifi && !ccAirplane ? 'Home' : 'Off'}</div>
              </div>
            </button>
            <div class="cc-conn-divider-h"></div>
            <button class="cc-conn-btn" class:cc-on={ccBluetooth && !ccAirplane} onclick={() => ccBluetooth = !ccBluetooth}>
              <span class="cc-conn-icon">🔵</span>
              <div>
                <div class="cc-conn-name">Bluetooth</div>
                <div class="cc-conn-sub">{ccBluetooth && !ccAirplane ? 'On' : 'Off'}</div>
              </div>
            </button>
            <div class="cc-conn-divider-v"></div>
            <button class="cc-conn-btn" class:cc-on={ccAirdrop} onclick={() => ccAirdrop = !ccAirdrop}>
              <span class="cc-conn-icon">📡</span>
              <div>
                <div class="cc-conn-name">AirDrop</div>
                <div class="cc-conn-sub">{ccAirdrop ? 'Contacts' : 'Off'}</div>
              </div>
            </button>
            <div class="cc-conn-divider-h"></div>
            <button class="cc-conn-btn" class:cc-on={!ccAirplane} onclick={() => ccAirplane = !ccAirplane}>
              <span class="cc-conn-icon">✈️</span>
              <div>
                <div class="cc-conn-name">Airplane</div>
                <div class="cc-conn-sub">{ccAirplane ? 'On' : 'Off'}</div>
              </div>
            </button>
          </div>

          <div class="cc-music-block">
            <div class="cc-music-top">
              <span class="cc-music-thumb">{ccMusic.icon}</span>
              <div class="cc-music-meta">
                <div class="cc-music-title">{ccMusic.title}</div>
                <div class="cc-music-artist">{ccMusic.artist}</div>
              </div>
            </div>
            <div class="cc-music-ctrl">
              <button class="cc-mc-btn" onclick={() => ccPlaying = false}>⏮</button>
              <button class="cc-mc-btn cc-mc-play" onclick={() => ccPlaying = !ccPlaying}>
                {ccPlaying ? '⏸' : '▶'}
              </button>
              <button class="cc-mc-btn" onclick={() => ccPlaying = false}>⏭</button>
            </div>
          </div>

        </div>

        <div class="cc-sliders">
          <div class="cc-slider-card">
            <span class="cc-sl-icon">☀️</span>
            <input type="range" min="20" max="100" bind:value={ccBrightness} class="cc-sl" />
          </div>
          <div class="cc-slider-card">
            <span class="cc-sl-icon">🔊</span>
            <input type="range" min="0" max="100" bind:value={ccVolume} class="cc-sl" />
          </div>
        </div>

        <div class="cc-mid-row">
          <button class="cc-tile cc-tile--wide" onclick={toggleLang}>
            <span class="cc-tile__icon">🌐</span>
            <div class="cc-tile__text">
              <div class="cc-tile__name">Language</div>
              <div class="cc-tile__sub">{$currentLang === 'en' ? 'English' : 'Français'}</div>
            </div>
          </button>
          <button class="cc-tile cc-tile--wide" onclick={toggleTheme}>
            <span class="cc-tile__icon">{isDark ? '🌙' : '☀️'}</span>
            <div class="cc-tile__text">
              <div class="cc-tile__name">Appearance</div>
              <div class="cc-tile__sub">{isDark ? 'Dark' : 'Light'}</div>
            </div>
          </button>
        </div>

        <div class="cc-bottom-row">
          <button class="cc-tile cc-tile--sq" class:cc-on={ccFlash} onclick={() => ccFlash = !ccFlash}>
            <span class="cc-tile__icon">🔦</span>
            <span class="cc-tile__name">Flash</span>
          </button>
          <button class="cc-tile cc-tile--sq" onclick={() => ccCalcOpen = true}>
            <span class="cc-tile__icon">🧮</span>
            <span class="cc-tile__name">Calc</span>
          </button>
          <button class="cc-tile cc-tile--sq" onclick={() => open = false}>
            <span class="cc-tile__icon">📷</span>
            <span class="cc-tile__name">Camera</span>
          </button>
          <button class="cc-tile cc-tile--sq" onclick={() => open = false}>
            <span class="cc-tile__icon">⏱</span>
            <span class="cc-tile__name">Timer</span>
          </button>
        </div>

      {/if}

      <div class="cc-handle"></div>
    </div>
  </div>
{/if}

<style>
.cc-overlay {
  position: absolute; inset: 0; z-index: 90;
  cursor: default; background: rgba(0,0,0,.25);
}

.cc-panel {
  position: absolute; top: 0; left: 0; right: 0;
  max-height: 88%;
  background: rgba(18, 18, 28, 0.92);
  backdrop-filter: blur(50px) saturate(1.8);
  -webkit-backdrop-filter: blur(50px) saturate(1.8);
  border-radius: 0 0 32px 32px;
  display: flex; flex-direction: column; gap: 10px;
  padding: 12px 14px 20px;
  animation: ccSlideDown .3s cubic-bezier(.25,.46,.45,.94);
  overflow-y: auto;
}

@keyframes ccSlideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

.cc-statusbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 2px 4px;
}
.cc-time { font-size: 14px; font-weight: 600; color: #fff; }
.cc-status-icons { display: flex; gap: 6px; font-size: 11px; color: rgba(255,255,255,.8); }

.cc-top-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.cc-conn-block {
  background: rgba(255,255,255,.1); border-radius: 18px;
  border: .5px solid rgba(255,255,255,.1);
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  position: relative; overflow: hidden;
}

.cc-conn-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 12px 10px; background: none; border: none;
  cursor: pointer; transition: background .15s;
}
.cc-conn-btn:active { background: rgba(255,255,255,.08); }
.cc-conn-btn.cc-on .cc-conn-name { color: #fff; }
.cc-conn-btn.cc-on .cc-conn-icon { filter: none; }
.cc-conn-btn:not(.cc-on) .cc-conn-icon { opacity: .4; }
.cc-conn-icon { font-size: 16px; line-height: 1; }
.cc-conn-name { font-size: 10px; font-weight: 600; color: rgba(255,255,255,.85); }
.cc-conn-sub  { font-size: 9px; color: rgba(255,255,255,.45); }

.cc-conn-divider-h { grid-column: 1 / -1; height: .5px; background: rgba(255,255,255,.12); }
.cc-conn-divider-v {
  position: absolute; left: 50%; top: 0; bottom: 0;
  width: .5px; background: rgba(255,255,255,.12);
}

.cc-music-block {
  background: rgba(255,255,255,.1); border-radius: 18px;
  border: .5px solid rgba(255,255,255,.1); padding: 14px 12px;
  display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
}
.cc-music-top { display: flex; align-items: center; gap: 8px; }
.cc-music-thumb { font-size: 28px; }
.cc-music-meta { flex: 1; overflow: hidden; }
.cc-music-title {
  font-size: 11px; font-weight: 700; color: #fff;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cc-music-artist { font-size: 9px; color: rgba(255,255,255,.5); }
.cc-music-ctrl { display: flex; justify-content: space-between; align-items: center; }
.cc-mc-btn {
  background: none; border: none; color: rgba(255,255,255,.8);
  font-size: 18px; cursor: pointer; line-height: 1; padding: 0;
}
.cc-mc-play {
  background: rgba(255,255,255,.18); border-radius: 50%;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center; font-size: 15px;
}

.cc-sliders { display: flex; flex-direction: column; gap: 8px; }
.cc-slider-card {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.08); border-radius: 14px;
  padding: 10px 14px; border: .5px solid rgba(255,255,255,.08);
}
.cc-sl-icon { font-size: 16px; }
.cc-sl {
  flex: 1; -webkit-appearance: none; appearance: none;
  height: 4px; border-radius: 2px;
  background: rgba(255,255,255,.25); outline: none;
}
.cc-sl::-webkit-slider-thumb {
  -webkit-appearance: none; width: 18px; height: 18px;
  border-radius: 50%; background: #fff; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.4);
}

.cc-mid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.cc-bottom-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }

.cc-tile {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 12px; border-radius: 16px;
  background: rgba(255,255,255,.1); border: .5px solid rgba(255,255,255,.1);
  cursor: pointer; transition: background .15s, transform .1s;
}
.cc-tile:active { transform: scale(.96); }
.cc-tile.cc-on  { background: rgba(255,220,50,.2); border-color: rgba(255,220,50,.3); }
.cc-tile--sq {
  flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; padding: 12px 4px;
}
.cc-tile__icon { font-size: 22px; line-height: 1; }
.cc-tile__text { display: flex; flex-direction: column; gap: 1px; }
.cc-tile__name { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.9); }
.cc-tile__sub  { font-size: 9px; color: rgba(255,255,255,.45); }

.cc-handle {
  width: 36px; height: 4px; border-radius: 2px;
  background: rgba(255,255,255,.3); margin: 8px auto 0; flex-shrink: 0;
}

/* Calculator */
.cc-calc-screen { flex: 1; display: flex; flex-direction: column; gap: 14px; padding-top: 8px; }
.cc-calc-back {
  background: none; border: none; color: var(--color-accent);
  font-size: 14px; cursor: pointer; text-align: left; padding: 0;
}
.cc-calc-display {
  font-size: 42px; font-weight: 200; color: #fff;
  text-align: right; padding: 0 4px; min-height: 56px;
  word-break: break-all; letter-spacing: -1px;
  flex: 1; display: flex; align-items: flex-end; justify-content: flex-end;
}
.cc-calc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.cc-calc-key {
  aspect-ratio: 1; border-radius: 50%; border: none;
  background: rgba(255,255,255,.15); color: #fff;
  font-size: 20px; font-weight: 400; cursor: pointer;
  transition: opacity .12s, transform .1s; font-family: var(--font-body);
}
.cc-calc-key:active { opacity: .6; transform: scale(.92); }
.cc-key-op { background: var(--color-accent); }
.cc-key-fn { background: rgba(255,255,255,.28); }
</style>
