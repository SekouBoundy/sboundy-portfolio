<script lang="ts">
  let { active, timeStr, back }: {
    active: string
    timeStr: string
    back: () => void
  } = $props()

  // Tabs: Library | Albums
  let tab = $state<'library' | 'albums'>('albums')

  // Active album (null = albums grid view)
  let openAlbum = $state<string | null>(null)

  // ── Albums / Projects ──────────────────────────────────────────────
  // Each album maps to one of your projects.
  // Replace `cover` paths with real screenshots once you have them.
  const albums = [
    {
      id: 'marevision',
      name: 'MaRevision',
      sub: 'Flutter · Mobile App',
      color: 'linear-gradient(135deg,#1a1020,#2d1b69)',
      emoji: '📚',
      count: 6,
      photos: [
        { src: '', label: 'Home screen' },
        { src: '', label: 'Subjects list' },
        { src: '', label: 'Quiz flow' },
        { src: '', label: 'Results' },
        { src: '', label: 'Dark mode' },
        { src: '', label: 'Onboarding' },
      ],
    },
    {
      id: 'design',
      name: 'Design Work',
      sub: 'Figma · UI/UX',
      color: 'linear-gradient(135deg,#0d0d1a,#1a0f33)',
      emoji: '🎨',
      count: 8,
      photos: [
        { src: '', label: 'App concept' },
        { src: '', label: 'Component set' },
        { src: '', label: 'Wireframes' },
        { src: '', label: 'Mobile UI' },
        { src: '', label: 'Web mockup' },
        { src: '', label: 'Dark theme' },
        { src: '', label: 'Brand kit' },
        { src: '', label: 'Prototype' },
      ],
    },
    {
      id: 'illustrations',
      name: 'Illustrations',
      sub: 'Hand drawn · Digital',
      color: 'linear-gradient(135deg,#111,#2a2a2a)',
      emoji: '✏️',
      count: 5,
      photos: [
        { src: '', label: 'Sketch 01' },
        { src: '', label: 'Sketch 02' },
        { src: '', label: 'Flyer' },
        { src: '', label: 'Portrait' },
        { src: '', label: 'Logo study' },
      ],
    },
    {
      id: 'sboundy',
      name: 'Portfolio',
      sub: 'Svelte · Web',
      color: 'linear-gradient(135deg,#0a1628,#1a3a6c)',
      emoji: '🌐',
      count: 4,
      photos: [
        { src: '', label: 'macOS view' },
        { src: '', label: 'iOS view' },
        { src: '', label: 'Mobile' },
        { src: '', label: 'Dark mode' },
      ],
    },
  ]

  const currentAlbum = $derived(albums.find(a => a.id === openAlbum) ?? null)

  // Library: flat list of all photos across albums (newest first)
  const allPhotos = $derived(
    albums.flatMap(a => a.photos.map(p => ({ ...p, album: a.name, emoji: a.emoji, color: a.color })))
  )

  // Selected photo for full-screen preview
  let preview = $state<{ src: string; label: string; album: string; emoji: string; color: string } | null>(null)
</script>

<div class="ios-screen photos-screen" class:open={active === 'photos'}>

  <!-- Status bar -->
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>

  <!-- ── Full-screen photo preview ── -->
  {#if preview}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="ph-preview" onclick={() => preview = null}>
      <button class="ph-preview__close" onclick={() => preview = null}>✕</button>
      {#if preview.src}
        <img src={preview.src} alt={preview.label} class="ph-preview__img" />
      {:else}
        <div class="ph-preview__placeholder" style="background:{preview.color}">
          <span class="ph-preview__emoji">{preview.emoji}</span>
          <span class="ph-preview__label">{preview.label}</span>
        </div>
      {/if}
      <div class="ph-preview__caption">{preview.label} · {preview.album}</div>
    </div>

  <!-- ── Album detail view ── -->
  {:else if openAlbum && currentAlbum}
    <div class="ph-album-view">
      <div class="ph-album-nav">
        <button class="ph-nav-back" onclick={() => openAlbum = null}>‹ Albums</button>
        <span class="ph-album-nav__title">{currentAlbum.name}</span>
        <span class="ph-count">{currentAlbum.count}</span>
      </div>

      <!-- Album hero -->
      <div class="ph-album-hero" style="background:{currentAlbum.color}">
        <span class="ph-album-hero__emoji">{currentAlbum.emoji}</span>
        <div class="ph-album-hero__info">
          <div class="ph-album-hero__name">{currentAlbum.name}</div>
          <div class="ph-album-hero__sub">{currentAlbum.sub}</div>
        </div>
      </div>

      <!-- Photo grid -->
      <div class="ph-grid-scroll">
        <div class="ph-photo-grid">
          {#each currentAlbum.photos as photo, i}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div
              class="ph-photo-cell"
              onclick={() => preview = { ...photo, album: currentAlbum.name, emoji: currentAlbum.emoji, color: currentAlbum.color }}
            >
              {#if photo.src}
                <img src={photo.src} alt={photo.label} />
              {:else}
                <div class="ph-photo-empty" style="background:{currentAlbum.color}">
                  <span class="ph-photo-empty__emoji">{currentAlbum.emoji}</span>
                  <span class="ph-photo-empty__num">{i + 1}</span>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>

  <!-- ── Main view (Albums / Library tabs) ── -->
  {:else}
    <!-- Large title -->
    <div class="ph-header">
      <button class="ph-header__back ios-back" onclick={back}>‹ Home</button>
      <span class="ph-large-title">
        {tab === 'albums' ? 'Albums' : 'Library'}
      </span>
    </div>

    <!-- Tab bar -->
    <div class="ph-tabs">
      <button class="ph-tab" class:ph-tab--active={tab === 'library'} onclick={() => tab = 'library'}>
        <span class="ph-tab__icon">⊞</span>
        Library
      </button>
      <button class="ph-tab" class:ph-tab--active={tab === 'albums'} onclick={() => tab = 'albums'}>
        <span class="ph-tab__icon">⊟</span>
        Albums
      </button>
    </div>

    <div class="ph-scroll">

      {#if tab === 'albums'}
        <!-- ── ALBUMS TAB ── -->
        <div class="ph-section-label">MY PROJECTS</div>

        <div class="ph-albums-grid">
          {#each albums as album}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="ph-album-card" onclick={() => openAlbum = album.id}>
              <!-- Album cover -->
              <div class="ph-album-cover" style="background:{album.color}">
                <span class="ph-album-cover__emoji">{album.emoji}</span>
                <!-- 4-cell mini preview -->
                <div class="ph-album-cover__grid">
                  {#each Array(4) as _, i}
                    <div class="ph-album-cover__cell" style="background:rgba(255,255,255,{0.04 + i * 0.02})">
                      <span style="font-size:10px;opacity:.4">{album.emoji}</span>
                    </div>
                  {/each}
                </div>
              </div>
              <div class="ph-album-info">
                <div class="ph-album-name">{album.name}</div>
                <div class="ph-album-count">{album.count}</div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Recents row -->
        <div class="ph-section-label" style="margin-top:8px">RECENTS</div>
        <div class="ph-recents-row">
          {#each allPhotos.slice(0, 6) as photo}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="ph-recent-cell" onclick={() => preview = photo}>
              {#if photo.src}
                <img src={photo.src} alt={photo.label} />
              {:else}
                <div class="ph-recent-empty" style="background:{photo.color}">
                  <span>{photo.emoji}</span>
                </div>
              {/if}
            </div>
          {/each}
        </div>

      {:else}
        <!-- ── LIBRARY TAB ── -->
        <div class="ph-section-label">ALL PHOTOS · {allPhotos.length}</div>
        <div class="ph-photo-grid ph-photo-grid--library">
          {#each allPhotos as photo, i}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="ph-photo-cell" onclick={() => preview = photo}>
              {#if photo.src}
                <img src={photo.src} alt={photo.label} />
              {:else}
                <div class="ph-photo-empty" style="background:{photo.color}">
                  <span class="ph-photo-empty__emoji">{photo.emoji}</span>
                  <span class="ph-photo-empty__num">{i + 1}</span>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}

    </div>
  {/if}

</div>

<style>
.photos-screen {
  display: flex;
  flex-direction: column;
  background: #000;
  overflow: hidden;
}

/* ── Header ── */
.ph-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 6px 16px 8px;
  flex-shrink: 0;
}
.ph-header__back {
  font-size: 16px;
  color: var(--color-accent);
  background: none; border: none; cursor: pointer;
  padding: 0;
}
.ph-large-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.3px;
  flex: 1;
  text-align: right;
}

/* ── Tabs ── */
.ph-tabs {
  display: flex;
  border-bottom: .5px solid rgba(255,255,255,.1);
  flex-shrink: 0;
}
.ph-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  background: none; border: none; cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,.35);
  transition: color .15s;
}
.ph-tab__icon { font-size: 16px; }
.ph-tab--active { color: var(--color-accent); border-bottom: 2px solid var(--color-accent); }

/* ── Scrollable body ── */
.ph-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  padding-bottom: 16px;
}
.ph-scroll::-webkit-scrollbar { display: none; }

.ph-section-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,.3);
  letter-spacing: .06em;
  padding: 14px 16px 6px;
}

/* ── Albums grid ── */
.ph-albums-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  padding: 0 16px;
}

.ph-album-card { cursor: pointer; }
.ph-album-card:active .ph-album-cover { opacity: .85; transform: scale(.97); }

.ph-album-cover {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .15s, transform .15s;
}
.ph-album-cover__emoji {
  font-size: 38px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-55%);
  z-index: 2;
}
.ph-album-cover__grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}
.ph-album-cover__cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ph-album-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px 12px;
}
.ph-album-name  { font-size: 13px; font-weight: 600; color: #fff; }
.ph-album-count { font-size: 12px; color: rgba(255,255,255,.35); }

/* ── Recents row ── */
.ph-recents-row {
  display: flex;
  gap: 2px;
  padding: 0 16px;
  overflow-x: auto;
  scrollbar-width: none;
}
.ph-recents-row::-webkit-scrollbar { display: none; }

.ph-recent-cell,
.ph-recent-empty {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
}
.ph-recent-cell img { width: 100%; height: 100%; object-fit: cover; }
.ph-recent-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

/* ── Photo grid ── */
.ph-photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  padding: 0;
}
.ph-photo-grid--library { padding: 0 0 16px; }

.ph-photo-cell {
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.ph-photo-cell:active { opacity: .8; }
.ph-photo-cell img { width: 100%; height: 100%; object-fit: cover; display: block; }

.ph-photo-empty {
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.ph-photo-empty__emoji { font-size: 20px; }
.ph-photo-empty__num   { font-size: 10px; color: rgba(255,255,255,.4); }

/* ── Album detail view ── */
.ph-album-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.ph-album-nav {
  display: flex;
  align-items: center;
  padding: 8px 16px 10px;
  flex-shrink: 0;
  gap: 8px;
}
.ph-nav-back {
  font-size: 16px; color: var(--color-accent);
  background: none; border: none; cursor: pointer; padding: 0;
  flex-shrink: 0;
}
.ph-album-nav__title {
  flex: 1;
  font-size: 17px; font-weight: 700; color: #fff;
  text-align: center;
}
.ph-count { font-size: 12px; color: rgba(255,255,255,.35); flex-shrink: 0; }

.ph-album-hero {
  margin: 0 16px 12px;
  border-radius: 16px;
  padding: 20px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.ph-album-hero__emoji { font-size: 40px; }
.ph-album-hero__name  { font-size: 18px; font-weight: 700; color: #fff; }
.ph-album-hero__sub   { font-size: 12px; color: rgba(255,255,255,.5); margin-top: 2px; }

.ph-grid-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}
.ph-grid-scroll::-webkit-scrollbar { display: none; }

/* ── Full-screen preview ── */
.ph-preview {
  position: absolute;
  inset: 0;
  z-index: 200;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: phFadeIn .2s ease;
}
@keyframes phFadeIn {
  from { opacity: 0; transform: scale(.96); }
  to   { opacity: 1; transform: scale(1); }
}

.ph-preview__close {
  position: absolute;
  top: 56px; right: 16px;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,.15);
  border: none; color: #fff;
  font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

.ph-preview__img {
  width: 100%; max-height: 75%;
  object-fit: contain;
}
.ph-preview__placeholder {
  width: 80%; aspect-ratio: 1;
  border-radius: 20px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px;
}
.ph-preview__emoji { font-size: 56px; }
.ph-preview__label { font-size: 14px; color: rgba(255,255,255,.6); }

.ph-preview__caption {
  position: absolute;
  bottom: 40px;
  font-size: 13px;
  color: rgba(255,255,255,.5);
  text-align: center;
  padding: 0 24px;
}
</style>
