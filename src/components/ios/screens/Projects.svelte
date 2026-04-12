<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()
</script>

<div class="ios-screen" class:open={active === 'projects'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>
  <div class="ios-navbar">
    <button class="ios-back" onclick={back}>‹ Home</button>
    <span class="ios-navbar__title">Projects</span>
  </div>
  <div class="ios-scroll">
    <div class="ios-proj-list">
      {#each t.projects.items as proj}
        <div class="ios-proj-card">
          <div class="ios-proj-thumb" style:background={proj.color}>
            <span class="ios-proj-thumb__label">{proj.thumb}</span>
          </div>
          <div class="ios-proj-body">
            <div class="ios-proj-title">{proj.name}</div>
            <div class="ios-proj-desc">{proj.desc}</div>
            <div class="ios-proj-tags">
              {#each proj.tags as tag}
                <span class="ios-proj-tag">{tag}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
