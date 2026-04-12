<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { currentLang } from '../../../stores/index'

  let { active, timeStr, back }: {
    active: string
    timeStr: string
    back: () => void
  } = $props()

  type Project = {
    id: string; name: string; desc_en: string; desc_fr: string
    thumb: string; thumb_url: string | null; color: string; tags: string[]
  }

  let projects = $state<Project[]>([])
  let loading  = $state(true)
  let lang     = $state('en')

  currentLang.subscribe(v => lang = v)

  $effect(() => {
    supabase
      .from('projects')
      .select('id, name, desc_en, desc_fr, thumb, color, tags')
      .order('order_index')
      .then(({ data }: { data: Project[] | null }) => {
        projects = data ?? []
        loading  = false
      })
  })

  function desc(p: Project) { return lang === 'fr' ? p.desc_fr : p.desc_en }
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
    {#if loading}
      <p class="ios-loading">Loading…</p>
    {:else}
      <div class="ios-proj-list">
        {#each projects as proj}
          <div class="ios-proj-card">
            <div class="ios-proj-thumb" style:background={proj.color}>
              {#if proj.thumb_url}
                <img class="ios-proj-thumb__img" src={proj.thumb_url} alt={proj.name} />
              {:else}
                <span class="ios-proj-thumb__label">{proj.thumb}</span>
              {/if}
            </div>
            <div class="ios-proj-body">
              <div class="ios-proj-title">{proj.name}</div>
              <div class="ios-proj-desc">{desc(proj)}</div>
              <div class="ios-proj-tags">
                {#each proj.tags as tag}
                  <span class="ios-proj-tag">{tag}</span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
.ios-loading {
  text-align: center;
  padding: 2rem;
  font-size: .85rem;
  opacity: .5;
}

.ios-proj-thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>
