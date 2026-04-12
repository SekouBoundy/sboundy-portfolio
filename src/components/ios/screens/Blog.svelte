<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()
</script>

<div class="ios-screen" class:open={active === 'blog'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>
  <div class="ios-navbar">
    <button class="ios-back" onclick={back}>‹ Home</button>
    <span class="ios-navbar__title">Blog</span>
  </div>
  <div class="ios-scroll">
    <div class="ios-section-header">ARTICLES</div>
    <div class="ios-list">
      {#each t.blog.posts as post}
        <div class="ios-list-item">
          <div class="ios-list-icon"
            style="background:{post.cat === 'Dev' ? 'rgba(59,130,246,.2)' : 'rgba(139,92,246,.2)'}; font-size:14px">
            {post.cat === 'Dev' ? '💻' : '🎨'}
          </div>
          <div class="ios-list-label">
            <div class="ios-list-label__main">{post.title}</div>
            <div class="ios-list-label__sub">{post.cat} · {post.read} · {post.date}</div>
          </div>
          <span class="ios-chevron">›</span>
        </div>
      {/each}
    </div>
  </div>
</div>
