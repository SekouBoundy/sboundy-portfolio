<script lang="ts">
  import { supabase } from '$lib/supabase.js'
  import { currentLang } from '../../../stores/index'

  let { active, timeStr, back }: {
    active: string
    timeStr: string
    back: () => void
  } = $props()

  type Post = {
    id: string; cat: string; title_en: string; title_fr: string
    body_en: string; body_fr: string; read: string; created_at: string; outline: string[]
  }
  type Comment = { id: string; author: string; text: string; created_at: string }

  let posts    = $state<Post[]>([])
  let loading  = $state(true)
  let lang     = $state('en')
  let selected = $state<Post | null>(null)

  let comments   = $state<Comment[]>([])
  let likeCount  = $state(0)
  let isLiked    = $state(false)
  let newComment = $state('')
  let authorName = $state('')
  let submitting = $state(false)

  let fingerprint = ''

  currentLang.subscribe(v => lang = v)

  $effect(() => {
    fingerprint = localStorage.getItem('_fp') ?? (() => {
      const id = crypto.randomUUID()
      localStorage.setItem('_fp', id)
      return id
    })()

    supabase
      .from('posts')
      .select('id, cat, title_en, title_fr, body_en, body_fr, read, created_at, outline')
      .eq('published', true)
      .then(({ data }: { data: Post[] | null }) => {
        posts   = data ?? []
        loading = false
      })
  })

  async function openPost(post: Post) {
    selected = post

    // load likes
    const { data: lk } = await supabase
      .from('post_likes').select('fingerprint').eq('post_id', post.id)
    likeCount = lk?.length ?? 0
    isLiked   = lk?.some(r => r.fingerprint === fingerprint) ?? false

    // load comments
    const { data: cm } = await supabase
      .from('post_comments')
      .select('id, author, text, created_at')
      .eq('post_id', post.id)
      .order('created_at')
    comments = cm ?? []
  }

  async function toggleLike() {
    if (!selected) return
    if (isLiked) {
      await supabase.from('post_likes').delete()
        .eq('post_id', selected.id).eq('fingerprint', fingerprint)
      likeCount--; isLiked = false
    } else {
      await supabase.from('post_likes').insert({ post_id: selected.id, fingerprint })
      likeCount++; isLiked = true
    }
  }

  async function postComment() {
    if (!selected || !newComment.trim() || submitting) return
    submitting = true
    const author = authorName.trim() || 'Anonymous'
    await supabase.from('post_comments').insert({ post_id: selected.id, author, text: newComment.trim() })
    const { data: cm } = await supabase
      .from('post_comments').select('id, author, text, created_at')
      .eq('post_id', selected.id).order('created_at')
    comments   = cm ?? []
    newComment = ''
    submitting = false
  }

  function title(p: Post)   { return lang === 'fr' ? p.title_fr : p.title_en }
  function excerpt(p: Post) { return lang === 'fr' ? p.body_fr  : p.body_en  }

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric' })
  }
</script>

<div class="ios-screen" class:open={active === 'blog'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>

  {#if selected}
    <!-- ── Post detail ── -->
    <div class="ios-navbar">
      <button class="ios-back" onclick={() => selected = null}>‹ Blog</button>
      <span class="ios-navbar__title">{selected.cat}</span>
    </div>
    <div class="ios-scroll">
      <div class="post-detail">
        <span class="post-cat-badge" class:post-cat-badge--dev={selected.cat === 'Dev'}>
          {selected.cat === 'Dev' ? '💻' : '🎨'} {selected.cat}
        </span>
        <h1 class="post-title">{title(selected)}</h1>
        <p class="post-meta">{selected.read} read · {fmtDate(selected.created_at)}</p>
        <p class="post-excerpt">{excerpt(selected)}</p>

        {#if selected.outline?.length}
          <div class="post-outline">
            <p class="post-outline-label">In this article</p>
            {#each selected.outline as line, i}
              <div class="post-outline-item">
                <span class="post-outline-num">{String(i+1).padStart(2,'0')}</span>
                <span>{line.replace(/^\d+ — /, '')}</span>
              </div>
            {/each}
          </div>
        {/if}

        <div class="post-wip">✦ Article coming soon</div>

        <!-- Reactions -->
        <div class="post-reactions">
          <button class="react-pill" class:react-pill--liked={isLiked} onclick={toggleLike}>
            {isLiked ? '♥' : '♡'} {likeCount}
          </button>
          <span class="react-pill">💬 {comments.length}</span>
        </div>

        <!-- Comments -->
        <div class="post-comments">
          <p class="comments-label">Comments {comments.length > 0 ? `(${comments.length})` : ''}</p>

          {#if comments.length === 0}
            <p class="comments-empty">No comments yet — be the first.</p>
          {:else}
            {#each comments as c}
              <div class="comment-item">
                <div class="comment-avatar">{c.author[0].toUpperCase()}</div>
                <div class="comment-content">
                  <div class="comment-meta">
                    <span class="comment-author">{c.author}</span>
                    <span class="comment-date">{fmtDate(c.created_at)}</span>
                  </div>
                  <p class="comment-text">{c.text}</p>
                </div>
              </div>
            {/each}
          {/if}

          <div class="comment-form">
            <input class="ios-input" type="text" placeholder="Your name (optional)" bind:value={authorName} />
            <textarea class="ios-input ios-textarea" placeholder="Leave a thought…" rows="3" bind:value={newComment}></textarea>
            <button class="ios-btn" onclick={postComment} disabled={!newComment.trim() || submitting}>
              {submitting ? 'Posting…' : 'Post comment →'}
            </button>
          </div>
        </div>
      </div>
    </div>

  {:else}
    <!-- ── Post list ── -->
    <div class="ios-navbar">
      <button class="ios-back" onclick={back}>‹ Home</button>
      <span class="ios-navbar__title">Blog</span>
    </div>
    <div class="ios-scroll">
      <div class="ios-section-header">ARTICLES</div>
      {#if loading}
        <p class="ios-loading">Loading…</p>
      {:else}
        <div class="ios-list">
          {#each posts as post}
            <button class="ios-list-item" onclick={() => openPost(post)}>
              <div class="ios-list-icon"
                style="background:{post.cat === 'Dev' ? 'rgba(59,130,246,.2)' : 'rgba(139,92,246,.2)'}; font-size:14px">
                {post.cat === 'Dev' ? '💻' : '🎨'}
              </div>
              <div class="ios-list-label">
                <div class="ios-list-label__main">{title(post)}</div>
                <div class="ios-list-label__sub">{post.cat} · {post.read}</div>
              </div>
              <span class="ios-chevron">›</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
.ios-loading {
  text-align: center;
  padding: 2rem;
  font-size: .85rem;
  opacity: .5;
}

/* Post detail */
.post-detail {
  padding: 1.25rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

.post-cat-badge {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  font-size: .68rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(139,92,246,.15);
  color: #a78bfa;
  width: fit-content;
}

.post-cat-badge--dev {
  background: rgba(59,130,246,.15);
  color: #60a5fa;
}

.post-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  margin: 0;
}

.post-meta {
  font-size: .72rem;
  color: rgba(255,255,255,.4);
  margin: 0;
}

.post-excerpt {
  font-size: .85rem;
  color: rgba(255,255,255,.65);
  line-height: 1.7;
  margin: 0;
}

.post-outline {
  background: rgba(255,255,255,.04);
  border-radius: 10px;
  padding: .85rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.post-outline-label {
  font-size: .65rem;
  font-weight: 600;
  letter-spacing: .1em;
  color: rgba(255,255,255,.4);
  margin: 0 0 .25rem;
}

.post-outline-item {
  display: flex;
  gap: .6rem;
  font-size: .78rem;
  color: rgba(255,255,255,.7);
}

.post-outline-num {
  color: rgba(255,255,255,.3);
  flex-shrink: 0;
  font-size: .65rem;
  padding-top: 1px;
}

.post-wip {
  font-size: .78rem;
  color: rgba(255,255,255,.35);
  text-align: center;
  padding: .5rem 0;
}

/* Reactions */
.post-reactions {
  display: flex;
  gap: .5rem;
}

.react-pill {
  font-size: .78rem;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.1);
  color: rgba(255,255,255,.6);
  cursor: pointer;
  transition: all .15s;
}

.react-pill--liked {
  background: rgba(239,68,68,.15);
  border-color: rgba(239,68,68,.3);
  color: #f87171;
}

/* Comments */
.post-comments {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.comments-label {
  font-size: .65rem;
  font-weight: 600;
  letter-spacing: .1em;
  color: rgba(255,255,255,.4);
  margin: 0;
}

.comments-empty {
  font-size: .78rem;
  color: rgba(255,255,255,.3);
  margin: 0;
}

.comment-item {
  display: flex;
  gap: .6rem;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(139,92,246,.25);
  color: #a78bfa;
  font-size: .75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.comment-content { flex: 1; }

.comment-meta {
  display: flex;
  gap: .5rem;
  align-items: baseline;
  margin-bottom: .2rem;
}

.comment-author {
  font-size: .75rem;
  font-weight: 600;
  color: #fff;
}

.comment-date {
  font-size: .65rem;
  color: rgba(255,255,255,.35);
}

.comment-text {
  font-size: .78rem;
  color: rgba(255,255,255,.65);
  line-height: 1.5;
  margin: 0;
}

/* Form */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-top: .25rem;
}

.ios-input {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px;
  padding: .55rem .75rem;
  color: #fff;
  font-size: .82rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  outline: none;
}

.ios-input:focus {
  border-color: rgba(139,92,246,.5);
}

.ios-textarea {
  resize: none;
}

.ios-btn {
  background: rgba(139,92,246,.25);
  border: 1px solid rgba(139,92,246,.4);
  border-radius: 8px;
  color: #a78bfa;
  font-size: .82rem;
  font-weight: 600;
  padding: .6rem;
  cursor: pointer;
  transition: all .15s;
  font-family: inherit;
}

.ios-btn:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.ios-btn:not(:disabled):hover {
  background: rgba(139,92,246,.4);
}
</style>
