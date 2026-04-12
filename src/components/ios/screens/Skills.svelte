<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()

  const stack: Record<string, string[]> = {
    'Frontend':  ['React', 'Svelte', 'Flutter', 'React Native'],
    'Backend':   ['Node.js', 'Firebase', 'Supabase'],
    'Design':    ['Figma', 'Illustrator'],
    'Tools':     ['Git', 'VS Code', 'Vite'],
  }
</script>

<div class="ios-screen" class:open={active === 'skills'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>
  <div class="ios-navbar">
    <button class="ios-back" onclick={back}>‹ Home</button>
    <span class="ios-navbar__title">Skills</span>
  </div>
  <div class="ios-scroll">

    {#each Object.entries(stack) as [group, items]}
      <div class="ios-section-header">{group.toUpperCase()}</div>
      <div class="ios-list">
        {#each items as skill}
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.18); font-size:13px">
              {skill === 'React' ? '⚛' : skill === 'Flutter' ? '🐦' : skill === 'Figma' ? '🎨' : skill === 'Git' ? '⎇' : '•'}
            </div>
            <span class="ios-list-label__main">{skill}</span>
          </div>
        {/each}
      </div>
    {/each}

    <div class="ios-section-header">ALSO</div>
    <div class="ios-list">
      {#each ['Illustration', 'Graphic Design', 'Hand Drawing'] as sk}
        <div class="ios-list-item">
          <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">✏️</div>
          <span class="ios-list-label__main">{sk}</span>
        </div>
      {/each}
    </div>

  </div>
</div>
