<script lang="ts">
  type Screen = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'design' | 'photos'

  let { open = $bindable(), recents, appMeta, timeStr, onOpen, onClose }: {
    open: boolean
    recents: Screen[]
    appMeta: Record<string, { label: string; img: string; color: string }>
    timeStr: string
    onOpen: (s: Screen) => void
    onClose: (s: Screen) => void
  } = $props()
</script>

{#if open}
  <div class="sw-overlay" role="button" tabindex="0"
    onclick={() => open = false}
    onkeydown={(e) => e.key === 'Escape' && (open = false)}>

    <div class="sw-header">
      <span class="sw-time">{timeStr}</span>
      <span class="sw-label">Recent Apps</span>
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="sw-cards" role="list" onclick={(e) => e.stopPropagation()}>
      {#if recents.length === 0}
        <div class="sw-empty">No recent apps</div>
      {:else}
        {#each recents as screen}
          {@const meta = appMeta[screen]}
          <div class="sw-card-wrap">
            <button class="sw-card"
              onclick={() => { onOpen(screen); open = false }}
              style="background: linear-gradient(135deg,{meta.color}33,{meta.color}11)">
              <div class="sw-card__topbar">
                <img src={meta.img} alt={meta.label} class="sw-card__icon" />
                <span class="sw-card__name">{meta.label}</span>
              </div>
              <div class="sw-card__preview" style="background:{meta.color}18">
                <img src={meta.img} alt="" class="sw-card__preview-icon" />
              </div>
            </button>
            <button class="sw-card__close" onclick={() => onClose(screen)} aria-label="Close {meta.label}">✕</button>
          </div>
        {/each}
      {/if}
    </div>

    <div class="sw-home-pill" onclick={() => open = false} role="button" tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && (open = false)}>
    </div>
  </div>
{/if}

<style>
.sw-overlay {
  position: absolute; inset: 0; z-index: 80;
  background: rgba(0,0,0,.7);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  display: flex; flex-direction: column;
  animation: swFadeIn .25s ease; outline: none;
}

@keyframes swFadeIn {
  from { opacity: 0; transform: scale(.97); }
  to   { opacity: 1; transform: scale(1); }
}

.sw-header {
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 0 10px; gap: 2px; flex-shrink: 0;
}
.sw-time { font-size: 42px; font-weight: 200; color: #fff; letter-spacing: -1px; }
.sw-label { font-size: 11px; color: rgba(255,255,255,.4); letter-spacing: .06em; text-transform: uppercase; }

.sw-cards {
  flex: 1; display: flex; gap: 12px; padding: 16px 18px;
  overflow-x: auto; align-items: flex-end; scrollbar-width: none;
}
.sw-cards::-webkit-scrollbar { display: none; }

.sw-empty { width: 100%; text-align: center; color: rgba(255,255,255,.3); font-size: 13px; align-self: center; }

.sw-card-wrap { position: relative; flex-shrink: 0; width: 140px; }

.sw-card {
  width: 100%; height: 240px; border-radius: 18px;
  border: .5px solid rgba(255,255,255,.1); overflow: hidden;
  display: flex; flex-direction: column; cursor: pointer;
  transition: transform .15s; box-shadow: 0 12px 40px rgba(0,0,0,.5);
}
.sw-card:active { transform: scale(.96); }

.sw-card__topbar {
  display: flex; align-items: center; gap: 7px;
  padding: 10px 12px; background: rgba(0,0,0,.25);
}
.sw-card__icon   { width: 22px; height: 22px; border-radius: 6px; }
.sw-card__name   { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.9); }

.sw-card__preview {
  flex: 1; display: flex; align-items: center; justify-content: center;
}
.sw-card__preview-icon { width: 56px; height: 56px; border-radius: 14px; opacity: .6; }

.sw-card__close {
  position: absolute; top: -8px; right: -8px;
  width: 24px; height: 24px; border-radius: 50%;
  background: rgba(60,60,70,.9); border: .5px solid rgba(255,255,255,.2);
  color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; line-height: 1; z-index: 2;
}

.sw-home-pill {
  width: 130px; height: 5px; border-radius: 3px;
  background: rgba(255,255,255,.4); margin: 12px auto 20px;
  cursor: pointer; flex-shrink: 0;
}
</style>
