<script lang="ts">
  import { onMount } from 'svelte'
  import { currentLang } from '../../stores/index'
  import { content as en } from '../../data/content.en.js'
  import { content as fr } from '../../data/content.fr.js'

  const translations: Record<string, typeof en> = { en, fr }

  type Post = {
    id:      number
    cat:     'Dev' | 'Design'
    title:   string
    excerpt: string
    date:    string
    read:    string
    outline: string[]
  }

  const posts = $derived(translations[$currentLang].blog.posts as Post[])
  const blogUI = $derived(translations[$currentLang].blog.ui)

  const categories = ['All', 'Dev', 'Design'] as const
  type Cat = typeof categories[number]

  let activecat: Cat = $state('All')
  let selected: Post | null = $state(null)

  // When lang changes, refresh selected post to get translated content
  $effect(() => {
    if (selected !== null) {
      const id = selected.id
      selected = posts.find(p => p.id === id) ?? null
    }
  })

  // mode derived from selection or active filter
  const mode = $derived((() => {
    const s = selected
    if (s !== null) return s.cat === 'Dev' ? 'dev' : 'design'
    if (activecat === 'Dev')    return 'dev'
    if (activecat === 'Design') return 'design'
    return 'all'
  })())

  let likes:    Record<number, number>                                      = $state({})
  let liked:    Record<number, boolean>                                     = $state({})
  let comments: Record<number, {author: string; text: string; ts: number}[]> = $state({})
  let newComment  = $state('')
  let authorName  = $state('')
  let showToast   = $state(false)
  let toastMsg    = $state('')
  let outlineStep = $state(0)

  onMount(() => {
    likes    = JSON.parse(localStorage.getItem('blog_likes')    || '{}')
    liked    = JSON.parse(localStorage.getItem('blog_liked')    || '{}')
    comments = JSON.parse(localStorage.getItem('blog_comments') || '{}')
  })

  function saveLikes()    { localStorage.setItem('blog_likes',    JSON.stringify(likes))    }
  function saveLiked()    { localStorage.setItem('blog_liked',    JSON.stringify(liked))    }
  function saveComments() { localStorage.setItem('blog_comments', JSON.stringify(comments)) }

  function getLikes(id: number)    { return likes[id]    ?? 0 }
  function isLiked(id: number)     { return liked[id]    ?? false }
  function getComments(id: number) { return comments[id] ?? [] }

  function toggleLike(id: number) {
    if (liked[id]) {
      likes[id] = Math.max(0, (likes[id] ?? 1) - 1)
      liked[id] = false
    } else {
      likes[id] = (likes[id] ?? 0) + 1
      liked[id] = true
    }
    saveLikes(); saveLiked()
    likes = { ...likes }
    liked = { ...liked }
  }

  function addComment(id: number) {
    const text   = newComment.trim()
    const author = authorName.trim() || 'Anonymous'
    if (!text) return
    if (!comments[id]) comments[id] = []
    comments[id] = [...comments[id], { author, text, ts: Date.now() }]
    saveComments()
    comments    = { ...comments }
    newComment  = ''
  }

  function share(post: Post) {
    navigator.clipboard.writeText(`"${post.title}" — sboundy.com`).catch(() => {})
    toast('Link copied ✓')
  }

  function toast(msg: string) {
    toastMsg  = msg
    showToast = true
    setTimeout(() => showToast = false, 2400)
  }

  function openPost(post: Post) {
    selected    = post
    outlineStep = 0
    let i = 0
    const t = setInterval(() => {
      outlineStep = ++i
      if (i >= post.outline.length) clearInterval(t)
    }, 220)
  }

  function scrollToBottom() {
    document.querySelector('.article-scroll')?.scrollTo({ top: 99999, behavior: 'smooth' })
  }

  const filtered = $derived(
    activecat === 'All' ? posts : posts.filter(p => p.cat === activecat)
  )

  function catCount(c: Cat) {
    return c === 'All' ? posts.length : posts.filter(p => p.cat === c).length
  }

  function fmtDate(ts: number) {
    const locale = $currentLang === 'fr' ? 'fr-FR' : 'en-US'
    return new Date(ts).toLocaleDateString(locale, { month: 'short', day: 'numeric' })
  }
</script>

<!-- Toast -->
{#if showToast}
  <div class="toast" class:toast--design={mode === 'design'}>{toastMsg}</div>
{/if}

<div class="blog-layout" data-mode={mode}>

  <!-- ── Sidebar ── -->
  <aside class="blog-sidebar">

    {#if mode === 'dev'}
      <!-- DEV sidebar — terminal style -->
      <div class="dev-sidebar-header">
        <span class="dev-sidebar-prompt">sboundy ~ %</span>
      </div>
      <div class="dev-sidebar-cmd">ls posts/</div>
      <div class="dev-sidebar-spacer"></div>
      {#each categories as cat}
        <button
          class="dev-sidebar-item"
          class:active={activecat === cat}
          onclick={() => { activecat = cat; selected = null }}
        >
          <span class="dev-check">{activecat === cat ? '▶' : ' '}</span>
          {cat === 'All' ? 'all/' : cat === 'Dev' ? 'dev/' : 'design/'}
          <span class="dev-count">{catCount(cat)}</span>
        </button>
      {/each}

    {:else if mode === 'design'}
      <!-- DESIGN sidebar — editorial style -->
      <p class="design-sidebar-label">{blogUI.sections}</p>
      {#each categories as cat}
        <button
          class="design-sidebar-item"
          class:active={activecat === cat}
          onclick={() => { activecat = cat; selected = null }}
        >
          {cat}
          <span class="design-sidebar-count">{catCount(cat)}</span>
        </button>
      {/each}
      <div class="design-sidebar-divider"></div>
      <p class="design-sidebar-note">{@html blogUI.designNote.replace('\n', '<br/>')}</p>

    {:else}
      <!-- ALL — neutral sidebar -->
      <p class="sidebar-label">{blogUI.categories}</p>
      {#each categories as cat}
        <button
          class="sidebar-item"
          class:active={activecat === cat}
          onclick={() => { activecat = cat; selected = null }}
        >
          <span class="sidebar-dot"></span>
          {cat}
          <span class="sidebar-count">{catCount(cat)}</span>
        </button>
      {/each}
      <div class="sidebar-divider"></div>
      <p class="sidebar-note">{blogUI.allNote}</p>
    {/if}

  </aside>

  <!-- ── Main ── -->
  <main class="blog-main">

    {#if selected}

      {#if selected.cat === 'Dev'}
        <!-- ═══ DEV ARTICLE — terminal reader ═══ -->
        <div class="article-scroll dev-article" style="animation: panelIn .2s ease">

          <div class="dev-article-bar">
            <button class="dev-back" onclick={() => selected = null}>← cd ..</button>
            <span class="dev-article-path">~/posts/dev/{selected.id}.md</span>
            <button class="dev-read-btn" onclick={scrollToBottom}>scroll ↓</button>
          </div>

          <div class="dev-terminal">
            <div class="dev-term-bar">
              <span class="dot dot--r"></span>
              <span class="dot dot--y"></span>
              <span class="dot dot--g"></span>
              <span class="dev-term-title">sboundy@portfolio — {selected.title.slice(0,28)}...</span>
            </div>
            <div class="dev-term-body">
              <div class="dev-line">
                <span class="dev-prompt">sboundy ~ %</span>
                <span class="dev-cmd"> cat "{selected.title}"</span>
              </div>
              <div class="dev-spacer"></div>
              <div class="dev-line dev-line--comment"># {selected.excerpt}</div>
              <div class="dev-spacer"></div>
              <div class="dev-line dev-line--label">## Table of contents</div>
              {#each selected.outline as line, i}
                {#if i < outlineStep}
                  <div class="dev-line dev-line--outline fade-in">{line}</div>
                {/if}
              {/each}
              {#if outlineStep >= selected.outline.length}
                <div class="dev-line fade-in" style="margin-top:.6rem">
                  <span class="dev-prompt">sboundy ~ %</span>
                  <span class="dev-writing"> writing in progress... ▌</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Reactions -->
          <div class="reactions dev-reactions">
            <button class="react-btn" class:liked={isLiked(selected.id)} onclick={() => toggleLike(selected!.id)}>
              <span>{isLiked(selected.id) ? '♥' : '♡'}</span>
              <span class="react-count">{getLikes(selected.id)}</span>
            </button>
            <button class="react-btn" onclick={scrollToBottom}>
              <span>💬</span>
              <span class="react-count">{getComments(selected.id).length}</span>
            </button>
            <button class="react-btn react-btn--share" onclick={() => share(selected!)}>
              <span>↗</span> Share
            </button>
          </div>

          <!-- Comments -->
          {#if true}
            {@render commentsBlock(selected.id)}
          {/if}

        </div>

      {:else}
        <!-- ═══ DESIGN ARTICLE — editorial reader ═══ -->
        <div class="article-scroll design-article" style="animation: panelIn .2s ease">

          <button class="design-back" onclick={() => selected = null}>← Back</button>

          <div class="design-article-header">
            <span class="design-cat-label">Design</span>
            <h1 class="design-article-title">{selected.title}</h1>
            <p class="design-article-sub">{selected.excerpt}</p>
            <div class="design-article-meta">
              <span>{selected.read} read</span>
              <span class="design-dot-sep">·</span>
              <span>{selected.date}</span>
            </div>
            <button class="design-read-btn" onclick={scrollToBottom}>Read ↓</button>
          </div>

          <!-- Outline as editorial chapters -->
          <div class="design-chapters">
            <p class="design-chapters-label">In this article</p>
            {#each selected.outline as line, i}
              {#if i < outlineStep}
                <div class="design-chapter fade-in">
                  <span class="design-chapter-num">{String(i+1).padStart(2,'0')}</span>
                  <span class="design-chapter-title">{line.replace(/^\d+ — /, '')}</span>
                </div>
              {/if}
            {/each}
            {#if outlineStep >= selected.outline.length}
              <div class="design-wip fade-in">✦ Article coming soon</div>
            {/if}
          </div>

          <!-- Reactions -->
          <div class="reactions design-reactions">
            <button class="design-react-btn" class:liked={isLiked(selected.id)} onclick={() => toggleLike(selected!.id)}>
              {isLiked(selected.id) ? '♥' : '♡'} {getLikes(selected.id)}
            </button>
            <button class="design-react-btn" onclick={scrollToBottom}>
              💬 {getComments(selected.id).length}
            </button>
            <button class="design-react-btn design-react-share" onclick={() => share(selected!)}>
              ↗ Share
            </button>
          </div>

          <!-- Comments -->
          {#if true}
            {@render commentsBlock(selected.id)}
          {/if}

        </div>
      {/if}

    {:else}
      <!-- ── Post list ── -->

      {#if mode === 'dev'}
        <!-- DEV LIST — terminal file listing -->
        <div class="dev-list" style="animation: panelIn .2s ease">
          <div class="dev-list-header">
            <span class="dev-prompt">sboundy ~ %</span>
            <span class="dev-cmd"> ls -l posts/dev/</span>
          </div>
          <div class="dev-list-spacer"></div>
          {#each filtered as post (post.id)}
            <button class="dev-post-row" onclick={() => openPost(post)}>
              <span class="dev-row-perm">-rw-r--r--</span>
              <span class="dev-row-read">{post.read}</span>
              <span class="dev-row-title">{post.title}</span>
              <span class="dev-row-arrow">→</span>
            </button>
          {/each}
        </div>

      {:else if mode === 'design'}
        <!-- DESIGN LIST — magazine / editorial -->
        <div class="design-list" style="animation: panelIn .2s ease">
          <div class="design-list-eyebrow">Design Journal</div>
          {#each filtered as post (post.id)}
            <button class="design-post-card" onclick={() => openPost(post)}>
              <div class="design-post-card__inner">
                <div class="design-post-card__num">0{post.id}</div>
                <div class="design-post-card__content">
                  <h2 class="design-post-title">{post.title}</h2>
                  <p class="design-post-excerpt">{post.excerpt}</p>
                  <span class="design-post-meta">{post.read} read</span>
                </div>
                <span class="design-post-arrow">↗</span>
              </div>
            </button>
          {/each}
        </div>

      {:else}
        <!-- ALL — mixed neutral list -->
        <div class="all-list" style="animation: panelIn .2s ease">
          {#each filtered as post (post.id)}
            <button class="post-card" onclick={() => openPost(post)}>
              <div class="post-card__left">
                <span class="cat-badge cat-badge--{post.cat.toLowerCase()}">{post.cat}</span>
                <h2 class="post-card__title">{post.title}</h2>
                <p class="post-card__excerpt">{post.excerpt}</p>
              </div>
              <div class="post-card__right">
                <span class="post-card__read">{post.read}</span>
                {#if getLikes(post.id) > 0 || getComments(post.id).length > 0}
                  <div class="post-card__stats">
                    {#if getLikes(post.id) > 0}<span class="post-stat">♥ {getLikes(post.id)}</span>{/if}
                    {#if getComments(post.id).length > 0}<span class="post-stat">💬 {getComments(post.id).length}</span>{/if}
                  </div>
                {/if}
                <span class="post-card__arrow">→</span>
              </div>
            </button>
          {/each}
        </div>
      {/if}

    {/if}
  </main>
</div>

<!-- ── Shared comments snippet ── -->
{#snippet commentsBlock(postId: number)}
  <div class="comments-section" class:comments-section--design={mode === 'design'}>
    <p class="comments-title">
      Comments
      {#if getComments(postId).length > 0}
        <span class="comments-count">{getComments(postId).length}</span>
      {/if}
    </p>

    {#if getComments(postId).length === 0}
      <p class="comments-empty">No comments yet — be the first.</p>
    {:else}
      <div class="comments-list">
        {#each getComments(postId) as c}
          <div class="comment">
            <div class="comment-avatar">{c.author[0].toUpperCase()}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">{c.author}</span>
                <span class="comment-date">{fmtDate(c.ts)}</span>
              </div>
              <p class="comment-text">{c.text}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <div class="comment-form">
      <input class="comment-input" type="text" placeholder="Your name (optional)" bind:value={authorName} />
      <textarea class="comment-input comment-input--area" placeholder="Leave a thought..." rows="3" bind:value={newComment}></textarea>
      <button class="comment-submit" onclick={() => addComment(postId)} disabled={!newComment.trim()}>
        Post comment →
      </button>
    </div>
  </div>
{/snippet}

<style>
/* ══════════════════════════════
   LAYOUT
══════════════════════════════ */
.blog-layout {
  display: grid;
  grid-template-columns: 185px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
  transition: background .3s ease;
}

/* DEV mode — dark terminal bg */
.blog-layout[data-mode="dev"] {
  background: #0d0d0d;
}

/* DESIGN mode — slightly warmer */
.blog-layout[data-mode="design"] {
  background: #111118;
}

/* ══════════════════════════════
   SIDEBAR — ALL mode (neutral)
══════════════════════════════ */
.blog-sidebar {
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  backdrop-filter: blur(8px);
  transition: background .3s ease;
}

[data-mode="all"]    .blog-sidebar { background: rgba(0,0,0,.25); }
[data-mode="dev"]    .blog-sidebar { background: #111; border-right: .5px solid rgba(255,255,255,.06); }
[data-mode="design"] .blog-sidebar { background: rgba(255,255,255,.02); }

.sidebar-label {
  font-size: .6rem; font-weight: var(--fw-bold); letter-spacing: .12em;
  color: var(--color-secondary); padding: 0 .5rem; margin-bottom: .3rem; opacity: .7;
}

.sidebar-item {
  display: flex; align-items: center; gap: .5rem; width: 100%;
  padding: .38rem .55rem; border-radius: var(--radius-sm); font-size: .82rem;
  color: var(--color-secondary); background: transparent; border: none;
  cursor: pointer; transition: var(--transition-fast); text-align: left;
}
.sidebar-item:hover { color: var(--color-white); background: rgba(255,255,255,.05); }
.sidebar-item.active { background: rgba(139,92,246,.18); color: var(--color-accent); font-weight: var(--fw-medium); }

.sidebar-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: .5; flex-shrink: 0; }
.sidebar-item.active .sidebar-dot { opacity: 1; }

.sidebar-count {
  margin-left: auto; font-size: .65rem; background: rgba(255,255,255,.08);
  border-radius: var(--radius-pill); padding: 1px 7px; color: var(--color-secondary);
}
.sidebar-item.active .sidebar-count { background: rgba(139,92,246,.25); color: var(--color-accent); }

.sidebar-divider { height: 1px; background: var(--border-subtle); margin: .6rem 0; }
.sidebar-note { font-size: .68rem; color: var(--color-secondary); padding: 0 .55rem; opacity: .5; line-height: 1.5; }

/* ══════════════════════════════
   SIDEBAR — DEV mode
══════════════════════════════ */
.dev-sidebar-header { padding: .2rem .4rem .05rem; }
.dev-sidebar-prompt { font-family: var(--font-mono); font-size: .7rem; color: #8B5CF6; }
.dev-sidebar-cmd { font-family: var(--font-mono); font-size: .7rem; color: rgba(255,255,255,.5); padding: 0 .4rem .5rem; }
.dev-sidebar-spacer { height: .4rem; }

.dev-sidebar-item {
  display: flex; align-items: center; gap: .4rem; width: 100%;
  padding: .3rem .4rem; border: none; background: transparent;
  font-family: var(--font-mono); font-size: .75rem; color: rgba(255,255,255,.4);
  cursor: pointer; transition: var(--transition-fast); text-align: left;
  border-radius: 3px;
}
.dev-sidebar-item:hover { color: #28C840; background: rgba(40,200,64,.06); }
.dev-sidebar-item.active { color: #28C840; }

.dev-check { width: 10px; font-size: .7rem; color: #28C840; }
.dev-count { margin-left: auto; font-size: .65rem; color: rgba(255,255,255,.25); }

/* ══════════════════════════════
   SIDEBAR — DESIGN mode
══════════════════════════════ */
.design-sidebar-label {
  font-size: .58rem; font-weight: 700; letter-spacing: .14em;
  color: rgba(255,255,255,.25); padding: 0 .6rem; margin-bottom: .5rem;
}

.design-sidebar-item {
  display: flex; align-items: center; width: 100%;
  padding: .45rem .6rem; border: none; background: transparent;
  font-size: .88rem; color: rgba(255,255,255,.35);
  cursor: pointer; transition: var(--transition-fast); text-align: left;
  font-weight: 500; border-radius: var(--radius-sm);
  font-family: var(--font-body);
}
.design-sidebar-item:hover { color: rgba(255,255,255,.8); }
.design-sidebar-item.active {
  color: #fff; font-weight: 700;
  background: rgba(255,255,255,.06);
}

.design-sidebar-count {
  margin-left: auto; font-size: .65rem;
  color: rgba(255,255,255,.2);
}
.design-sidebar-item.active .design-sidebar-count { color: rgba(255,255,255,.4); }

.design-sidebar-divider { height: 1px; background: rgba(255,255,255,.06); margin: .7rem 0; }
.design-sidebar-note {
  font-size: .72rem; line-height: 1.6;
  color: rgba(255,255,255,.2); padding: 0 .6rem;
  font-style: italic;
}

/* ══════════════════════════════
   MAIN area
══════════════════════════════ */
.blog-main { position: relative; overflow: hidden; height: 100%; }

.article-scroll {
  height: 100%; overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex; flex-direction: column; gap: 1.25rem;
}

/* ══════════════════════════════
   DEV — post list
══════════════════════════════ */
.dev-list {
  padding: 1.25rem 1.5rem;
  height: 100%; overflow-y: auto;
  font-family: var(--font-mono);
}

.dev-list-header {
  font-size: .78rem; margin-bottom: .2rem;
}
.dev-list-spacer { height: .5rem; }

.dev-post-row {
  display: flex; align-items: center; gap: .75rem; width: 100%;
  padding: .3rem 0; border: none; background: transparent;
  font-family: var(--font-mono); font-size: .75rem;
  color: rgba(255,255,255,.45); cursor: pointer;
  transition: var(--transition-fast); text-align: left;
}
.dev-post-row:hover { color: #28C840; }
.dev-post-row:hover .dev-row-arrow { transform: translateX(4px); color: #28C840; }

.dev-row-perm  { color: rgba(255,255,255,.2); font-size: .68rem; flex-shrink: 0; }
.dev-row-read  { color: #8B5CF6; flex-shrink: 0; font-size: .7rem; width: 40px; }
.dev-row-title { flex: 1; color: rgba(255,255,255,.7); }
.dev-row-arrow { color: rgba(255,255,255,.2); transition: var(--transition-fast); }

/* ══════════════════════════════
   DESIGN — post list
══════════════════════════════ */
.design-list {
  padding: 1.5rem;
  height: 100%; overflow-y: auto;
  display: flex; flex-direction: column; gap: .1rem;
}

.design-list-eyebrow {
  font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(255,255,255,.2); margin-bottom: 1rem;
  font-weight: 600;
}

.design-post-card {
  width: 100%; border: none; background: transparent;
  cursor: pointer; text-align: left; padding: 0;
  border-bottom: .5px solid rgba(255,255,255,.06);
  transition: var(--transition-fast);
}
.design-post-card:first-of-type { border-top: .5px solid rgba(255,255,255,.06); }
.design-post-card:hover { background: rgba(255,255,255,.02); }
.design-post-card:hover .design-post-arrow { opacity: 1; transform: translate(2px, -2px); }

.design-post-card__inner {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem .75rem;
}

.design-post-card__num {
  font-family: var(--font-display); font-size: 1.5rem;
  color: rgba(255,255,255,.08); flex-shrink: 0; width: 36px;
}

.design-post-card__content { flex: 1; display: flex; flex-direction: column; gap: .25rem; }

.design-post-title { font-size: .92rem; font-weight: 700; color: rgba(255,255,255,.75); line-height: 1.3; }
.design-post-card:hover .design-post-title { color: #fff; }
.design-post-excerpt { font-size: .73rem; color: rgba(255,255,255,.3); line-height: 1.5; }
.design-post-meta { font-size: .65rem; color: rgba(255,255,255,.2); }

.design-post-arrow {
  font-size: 1rem; color: rgba(255,255,255,.3);
  opacity: 0; transition: var(--transition-fast);
}

/* ══════════════════════════════
   ALL — neutral post list
══════════════════════════════ */
.all-list {
  padding: 1.25rem 1.5rem; height: 100%; overflow-y: auto;
  display: flex; flex-direction: column; gap: .6rem;
  position: relative; z-index: 1;
}

.post-card {
  display: flex; align-items: center; gap: 1rem; padding: .9rem 1rem;
  background: rgba(255,255,255,.03); border: var(--border-subtle);
  border-radius: var(--radius-md); cursor: pointer; transition: var(--transition-fast);
  text-align: left; width: 100%;
}
.post-card:hover { border-color: rgba(139,92,246,.3); background: rgba(139,92,246,.05); transform: translateX(3px); }
.post-card:hover .post-card__arrow { color: var(--color-accent); transform: translateX(3px); }

.post-card__left { flex: 1; display: flex; flex-direction: column; gap: .3rem; }
.post-card__title { font-size: .9rem; font-weight: 700; color: var(--color-white); line-height: 1.3; }
.post-card__excerpt { font-size: .75rem; color: var(--color-secondary); line-height: 1.6; }
.post-card__right { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; flex-shrink: 0; }
.post-card__read { font-size: .65rem; color: var(--color-secondary); white-space: nowrap; }
.post-card__stats { display: flex; gap: .4rem; }
.post-stat { font-size: .65rem; color: var(--color-secondary); }
.post-card__arrow { color: var(--color-secondary); font-size: .9rem; transition: var(--transition-fast); }

/* ══════════════════════════════
   DEV — article
══════════════════════════════ */
.dev-article { background: #0d0d0d; }

.dev-article-bar {
  display: flex; align-items: center; gap: .75rem;
  font-family: var(--font-mono); font-size: .72rem;
}

.dev-back {
  background: transparent; border: .5px solid rgba(255,255,255,.1);
  border-radius: 4px; padding: 3px 10px; color: rgba(255,255,255,.4);
  cursor: pointer; font-family: var(--font-mono); font-size: .72rem;
  transition: var(--transition-fast);
}
.dev-back:hover { color: #28C840; border-color: rgba(40,200,64,.3); }

.dev-article-path { flex: 1; color: rgba(255,255,255,.2); font-size: .68rem; }

.dev-read-btn {
  background: rgba(139,92,246,.15); border: .5px solid rgba(139,92,246,.3);
  border-radius: 4px; padding: 3px 10px; color: #8B5CF6;
  cursor: pointer; font-family: var(--font-mono); font-size: .72rem;
  transition: var(--transition-fast);
}
.dev-read-btn:hover { background: rgba(139,92,246,.3); }

.dev-terminal { background: #0a0a0a; border: .5px solid rgba(255,255,255,.06); border-radius: var(--radius-md); overflow: hidden; }

.dev-term-bar {
  display: flex; align-items: center; gap: .5rem;
  padding: .45rem .9rem; background: #161616; border-bottom: .5px solid rgba(255,255,255,.05);
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot--r { background: #FF5F57; } .dot--y { background: #FEBC2E; } .dot--g { background: #28C840; }
.dev-term-title { font-family: var(--font-mono); font-size: .62rem; color: rgba(255,255,255,.25); margin-left: .3rem; }

.dev-term-body { padding: 1rem 1.25rem; font-family: var(--font-mono); display: flex; flex-direction: column; gap: .12rem; }
.dev-spacer { height: .4rem; }
.dev-line { font-size: .75rem; line-height: 1.7; color: rgba(255,255,255,.3); }
.dev-prompt { color: #8B5CF6; }
.dev-cmd { color: #fff; }
.dev-line--comment { color: rgba(255,255,255,.2); font-style: italic; }
.dev-line--label { color: #FEBC2E; margin-top: .2rem; }
.dev-line--outline { color: #28C840; }
.dev-writing { color: #FEBC2E; animation: blink 1s infinite; }

/* ══════════════════════════════
   DESIGN — article
══════════════════════════════ */
.design-article { background: #111118; }

.design-back {
  display: inline-flex; align-items: center;
  font-size: .75rem; color: rgba(255,255,255,.25); background: transparent;
  border: none; cursor: pointer; padding: 0; transition: var(--transition-fast);
  font-family: var(--font-body); width: fit-content;
}
.design-back:hover { color: rgba(255,255,255,.7); }

.design-article-header { display: flex; flex-direction: column; gap: .6rem; }

.design-cat-label {
  font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(255,255,255,.25); font-weight: 600;
}

.design-article-title {
  font-family: var(--font-display); font-size: 2rem; letter-spacing: .04em;
  color: #fff; line-height: 1.1;
}

.design-article-sub { font-size: .85rem; color: rgba(255,255,255,.4); line-height: 1.7; }

.design-article-meta {
  display: flex; align-items: center; gap: .5rem;
  font-size: .7rem; color: rgba(255,255,255,.25);
}
.design-dot-sep { opacity: .4; }

.design-read-btn {
  display: inline-flex; align-items: center; width: fit-content;
  padding: 7px 18px; border: .5px solid rgba(255,255,255,.12);
  border-radius: var(--radius-pill); background: transparent;
  color: rgba(255,255,255,.5); font-size: .78rem; cursor: pointer;
  transition: var(--transition-fast); font-family: var(--font-body);
  margin-top: .25rem;
}
.design-read-btn:hover { border-color: rgba(255,255,255,.4); color: #fff; }

.design-chapters { display: flex; flex-direction: column; gap: .5rem; }

.design-chapters-label {
  font-size: .6rem; letter-spacing: .14em; text-transform: uppercase;
  color: rgba(255,255,255,.2); font-weight: 600; margin-bottom: .25rem;
}

.design-chapter {
  display: flex; align-items: baseline; gap: .75rem;
  padding: .5rem 0; border-bottom: .5px solid rgba(255,255,255,.04);
}

.design-chapter-num { font-family: var(--font-display); font-size: .85rem; color: rgba(255,255,255,.15); flex-shrink: 0; }
.design-chapter-title { font-size: .82rem; color: rgba(255,255,255,.5); line-height: 1.4; }

.design-wip {
  font-size: .75rem; color: rgba(255,255,255,.2);
  font-style: italic; padding-top: .5rem;
}

/* ══════════════════════════════
   REACTIONS
══════════════════════════════ */
.reactions {
  display: flex; align-items: center; gap: .75rem;
  padding: .75rem 1rem; border-radius: var(--radius-md);
}

.dev-reactions {
  background: rgba(255,255,255,.03);
  border: .5px solid rgba(255,255,255,.06);
  font-family: var(--font-mono);
}

.design-reactions {
  background: rgba(255,255,255,.02);
  border: .5px solid rgba(255,255,255,.06);
}

.react-btn {
  display: flex; align-items: center; gap: .35rem; padding: .3rem .65rem;
  border-radius: var(--radius-pill); border: .5px solid rgba(255,255,255,.08);
  background: transparent; color: rgba(255,255,255,.4); font-size: .75rem;
  cursor: pointer; transition: var(--transition-fast); font-family: inherit;
}
.react-btn:hover { background: rgba(255,255,255,.06); color: #fff; }
.react-btn.liked { background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.3); color: #f87171; }
.react-btn--share { margin-left: auto; }
.react-count { font-weight: 700; }

.design-react-btn {
  display: flex; align-items: center; gap: .35rem; padding: .35rem .75rem;
  border-radius: var(--radius-pill); border: .5px solid rgba(255,255,255,.08);
  background: transparent; color: rgba(255,255,255,.35); font-size: .78rem;
  cursor: pointer; transition: var(--transition-fast); font-family: var(--font-body);
}
.design-react-btn:hover { color: #fff; border-color: rgba(255,255,255,.2); }
.design-react-btn.liked { background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.25); color: #f87171; }
.design-react-share { margin-left: auto; }

/* ══════════════════════════════
   COMMENTS
══════════════════════════════ */
.comments-section { display: flex; flex-direction: column; gap: .85rem; padding-bottom: 1.5rem; }

.comments-title {
  font-size: .82rem; font-weight: 700; color: var(--color-white);
  display: flex; align-items: center; gap: .5rem;
}

.comments-section--design .comments-title { color: rgba(255,255,255,.6); font-weight: 400; font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; }

.comments-count {
  font-size: .65rem; background: rgba(139,92,246,.2);
  color: var(--color-accent); border-radius: var(--radius-pill); padding: 1px 8px;
}

.comments-empty { font-size: .78rem; color: var(--color-secondary); opacity: .6; }

.comments-list { display: flex; flex-direction: column; gap: .75rem; }

.comment { display: flex; gap: .75rem; align-items: flex-start; }

.comment-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--color-accent-glow); border: var(--border-accent);
  color: var(--color-accent); font-size: .72rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.comment-body { flex: 1; }
.comment-header { display: flex; align-items: center; gap: .5rem; margin-bottom: .2rem; }
.comment-author { font-size: .78rem; font-weight: 700; color: var(--color-white); }
.comment-date   { font-size: .65rem; color: var(--color-secondary); }
.comment-text   { font-size: .78rem; color: var(--color-secondary); line-height: 1.65; }

.comment-form { display: flex; flex-direction: column; gap: .5rem; margin-top: .25rem; }

.comment-input {
  background: rgba(255,255,255,.04); border: var(--border-subtle);
  border-radius: var(--radius-sm); padding: .55rem .75rem;
  color: var(--color-white); font-size: .8rem; font-family: var(--font-body);
  outline: none; transition: var(--transition-fast); resize: none; height: 34px;
}
.comment-input--area { height: auto; }
.comment-input:focus { border-color: rgba(139,92,246,.4); background: rgba(139,92,246,.05); }

.comment-submit {
  align-self: flex-end; padding: 6px 16px;
  background: var(--color-accent); border: none; border-radius: var(--radius-pill);
  color: #fff; font-size: .75rem; font-weight: 500; cursor: pointer;
  transition: var(--transition-fast); font-family: var(--font-body);
}
.comment-submit:hover:not(:disabled) { background: var(--color-accent-dark); }
.comment-submit:disabled { opacity: .35; cursor: default; }

/* Badge */
.cat-badge {
  display: inline-flex; align-items: center; font-size: .62rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; padding: 2px 9px;
  border-radius: var(--radius-pill); width: fit-content;
}
.cat-badge--dev    { background: rgba(139,92,246,.15); border: .5px solid rgba(139,92,246,.35); color: #a78bfa; }
.cat-badge--design { background: rgba(251,191,36,.1);  border: .5px solid rgba(251,191,36,.3);  color: #fbbf24; }

/* Toast */
.toast {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
  background: rgba(20,20,20,.95); border: var(--border-accent);
  border-radius: var(--radius-pill); padding: 7px 18px;
  font-size: .78rem; color: var(--color-accent); z-index: 9999;
  pointer-events: none; backdrop-filter: blur(8px);
  animation: toastIn .25s ease;
}
.toast--design { border-color: rgba(255,255,255,.15); color: rgba(255,255,255,.7); }

.fade-in { animation: fadeIn .18s ease both; }

@keyframes fadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
@keyframes panelIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</style>
