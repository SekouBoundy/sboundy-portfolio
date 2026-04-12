<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()
</script>

<div class="ios-screen" class:open={active === 'about'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>
  <div class="ios-scroll abt-scroll">

    <div class="abt-large-title">About</div>

    <div class="abt-id-card">
      <div class="abt-id-photo">
        <img src="/icons/about.png" alt="SBOUNDY"
          onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display='none')} />
      </div>
      <div class="abt-id-info">
        <div class="abt-id-name">SB<em>OUNDY</em></div>
        <div class="abt-id-sub">Developer · Designer · Creative</div>
        <div class="abt-id-sub">Mali 🇲🇱 · FR · EN</div>
      </div>
      <span class="abt-chevron">›</span>
    </div>

    <div class="abt-banner">
      <span class="abt-banner__dot"></span>
      {t.about.status}
    </div>

    <div class="abt-section-label">IDENTITY</div>
    <div class="abt-group">
      <div class="abt-row">
        <div class="abt-row__icon" style="background:#f97316">👤</div>
        <div class="abt-row__body">
          <span class="abt-row__label">Name</span>
          <span class="abt-row__value">Sekou Boundy</span>
        </div>
        <span class="abt-chevron">›</span>
      </div>
      <div class="abt-divider"></div>
      <div class="abt-row">
        <div class="abt-row__icon" style="background:#3b82f6">📍</div>
        <div class="abt-row__body">
          <span class="abt-row__label">Location</span>
          <span class="abt-row__value">Bamako, Mali 🇲🇱</span>
        </div>
        <span class="abt-chevron">›</span>
      </div>
      <div class="abt-divider"></div>
      <div class="abt-row">
        <div class="abt-row__icon" style="background:#8b5cf6">🌐</div>
        <div class="abt-row__body">
          <span class="abt-row__label">Languages</span>
          <span class="abt-row__value">FR · EN</span>
        </div>
        <span class="abt-chevron">›</span>
      </div>
    </div>

    <div class="abt-section-label">STATS</div>
    <div class="abt-group">
      <div class="abt-row">
        <div class="abt-row__icon" style="background:#10b981">⏱</div>
        <div class="abt-row__body">
          <span class="abt-row__label">{t.about.stats.exp}</span>
          <span class="abt-row__value">3+</span>
        </div>
        <span class="abt-chevron">›</span>
      </div>
      <div class="abt-divider"></div>
      <div class="abt-row">
        <div class="abt-row__icon" style="background:#f59e0b">💡</div>
        <div class="abt-row__body">
          <span class="abt-row__label">{t.about.stats.ideas}</span>
          <span class="abt-row__value">∞</span>
        </div>
        <span class="abt-chevron">›</span>
      </div>
    </div>

    <div class="abt-section-label">BIO</div>
    <div class="abt-group abt-group--text">
      {@html t.about.bio}
    </div>

    <div class="abt-section-label">JOURNEY</div>
    <div class="abt-group">
      {#each t.about.journey as item, i}
        {#if i > 0}<div class="abt-divider"></div>{/if}
        <div class="abt-row abt-row--tall">
          <div class="abt-row__icon" style="background:#6366f1">🗺</div>
          <div class="abt-row__body">
            <span class="abt-row__label">{item.role}</span>
            <span class="abt-row__sub">{item.date}</span>
            <span class="abt-row__desc">{item.desc}</span>
          </div>
          <span class="abt-chevron">›</span>
        </div>
      {/each}
    </div>

    <div style="height: 32px"></div>
  </div>
</div>

<style>
.abt-scroll { background: rgba(0,0,0,.18); }

.abt-large-title {
  font-size: 30px; font-weight: 700;
  color: #fff; padding: 18px 18px 10px;
  letter-spacing: -.3px;
}

.abt-id-card {
  display: flex; align-items: center; gap: 14px;
  margin: 0 14px 8px; padding: 14px 16px;
  background: rgba(255,255,255,.07);
  border-radius: 14px; border: .5px solid rgba(255,255,255,.1);
}
.abt-id-photo {
  width: 56px; height: 56px; border-radius: 50%;
  overflow: hidden; flex-shrink: 0;
  border: 2px solid var(--color-accent);
}
.abt-id-photo img { width: 100%; height: 100%; object-fit: cover; }
.abt-id-info { flex: 1; }
.abt-id-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -.2px; }
.abt-id-name em { color: var(--color-accent); font-style: normal; }
.abt-id-sub { font-size: 11px; color: rgba(255,255,255,.5); margin-top: 1px; }

.abt-banner {
  display: flex; align-items: center; gap: 7px;
  margin: 0 14px 14px; padding: 10px 14px;
  background: rgba(139,92,246,.15);
  border-radius: 12px; border: .5px solid rgba(139,92,246,.3);
  font-size: 12px; color: rgba(255,255,255,.8);
}
.abt-banner__dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #34d399; box-shadow: 0 0 6px #34d399; flex-shrink: 0;
}

.abt-section-label {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,.35); letter-spacing: .06em;
  padding: 0 18px 6px; margin-top: 6px;
}

.abt-group {
  margin: 0 14px 14px;
  background: rgba(255,255,255,.07);
  border-radius: 14px; border: .5px solid rgba(255,255,255,.1);
  overflow: hidden;
}
.abt-group--text {
  padding: 14px 16px; font-size: 13px;
  color: rgba(255,255,255,.65); line-height: 1.75;
}
.abt-group--text :global(strong) { color: #fff; font-weight: 600; }

.abt-divider {
  height: .5px; background: rgba(255,255,255,.08); margin-left: 52px;
}

.abt-row {
  display: flex; align-items: center; gap: 12px; padding: 11px 14px;
}
.abt-row--tall { align-items: flex-start; padding: 12px 14px; }

.abt-row__icon {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.abt-row__body { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.abt-row__label { font-size: 14px; color: rgba(255,255,255,.9); }
.abt-row__value { font-size: 13px; color: rgba(255,255,255,.4); }
.abt-row__sub   { font-size: 11px; color: rgba(255,255,255,.4); }
.abt-row__desc  { font-size: 11px; color: rgba(255,255,255,.45); line-height: 1.5; margin-top: 2px; }
.abt-chevron    { font-size: 16px; color: rgba(255,255,255,.25); flex-shrink: 0; }
</style>
