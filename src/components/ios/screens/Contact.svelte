<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()

  let name = $state(''), email = $state(''), msg = $state(''), sent = $state(false)

  function sendMsg(e: SubmitEvent) {
    e.preventDefault()
    if (name && email && msg) sent = true
  }
</script>

<div class="ios-screen" class:open={active === 'contact'}>
  <div class="ios-screen-bar">
    <span class="ios-time">{timeStr}</span>
    <div class="ios-status-icons"><span>●●●</span><span>🔋</span></div>
  </div>
  <div class="ios-navbar">
    <button class="ios-back" onclick={back}>‹ Home</button>
    <span class="ios-navbar__title">Contact</span>
  </div>
  <div class="ios-scroll">

    <div class="ios-contact-hero">
      <h2>{t.contact.title.replace("'", "'")}</h2>
      <p>{t.contact.subtitle}</p>
    </div>

    {#if sent}
      <div class="ios-sent">
        <div class="ios-sent__icon">✓</div>
        <div class="ios-sent__title">{t.contact.sent.title}</div>
        <div class="ios-sent__sub">{t.contact.sent.sub}</div>
        <button class="ios-sent__btn" onclick={() => { sent = false; name = ''; email = ''; msg = '' }}>
          {t.contact.sent.again}
        </button>
      </div>
    {:else}
      <form class="ios-form" onsubmit={sendMsg}>
        <div class="ios-section-header">{t.contact.form.name.toUpperCase()}</div>
        <div class="ios-list">
          <div class="ios-list-item" style="padding:0">
            <input class="ios-input" type="text" bind:value={name}
              placeholder={t.contact.form.namePlaceholder} required />
          </div>
        </div>

        <div class="ios-section-header">{t.contact.form.email.toUpperCase()}</div>
        <div class="ios-list">
          <div class="ios-list-item" style="padding:0">
            <input class="ios-input" type="email" bind:value={email}
              placeholder="you@example.com" required />
          </div>
        </div>

        <div class="ios-section-header">{t.contact.form.message.toUpperCase()}</div>
        <div class="ios-list">
          <div class="ios-list-item" style="padding:0">
            <textarea class="ios-input ios-textarea" bind:value={msg}
              placeholder={t.contact.form.messagePlaceholder} rows="4" required></textarea>
          </div>
        </div>

        <div class="ios-contact-btns">
          <button type="submit" class="ios-submit-btn">{t.contact.form.submit}</button>
        </div>
      </form>
    {/if}

    <div class="ios-section-header">LINKS</div>
    <div class="ios-list">
      {#each t.contact.links as link}
        <div class="ios-list-item">
          <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">{link.icon}</div>
          <span class="ios-list-label__main">{link.label}</span>
          <span class="ios-chevron">›</span>
        </div>
      {/each}
    </div>

  </div>
</div>

<style>
.ios-form { padding-bottom: 8px; }

.ios-input {
  width: 100%; background: transparent; border: none; outline: none;
  color: var(--color-white); font-size: 14px; padding: 13px 16px;
  font-family: var(--font-body);
}
.ios-input::placeholder { color: rgba(255,255,255,.3); }
.ios-textarea { resize: none; height: 90px; }

.ios-submit-btn {
  width: 100%; padding: 15px; border-radius: var(--radius-lg);
  background: var(--color-accent); color: #fff;
  font-size: 15px; font-weight: 600; border: none;
  cursor: pointer; transition: opacity .15s; font-family: var(--font-body);
}
.ios-submit-btn:active { opacity: .8; }

.ios-sent {
  margin: 32px 16px; padding: 32px 20px;
  border-radius: var(--radius-xl);
  background: rgba(139,92,246,.12);
  border: .5px solid rgba(139,92,246,.25);
  text-align: center;
}
.ios-sent__icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--color-accent); color: #fff; font-size: 22px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.ios-sent__title { font-size: 18px; font-weight: 700; color: var(--color-white); margin-bottom: 4px; }
.ios-sent__sub   { font-size: 13px; color: var(--color-secondary); margin-bottom: 16px; }
.ios-sent__btn {
  background: none; border: .5px solid var(--color-accent);
  color: var(--color-accent); font-size: 13px; padding: 8px 20px;
  border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-body);
}
</style>
