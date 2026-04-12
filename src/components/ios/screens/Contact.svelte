<script lang="ts">
  let { active, timeStr, t, back }: {
    active: string
    timeStr: string
    t: any
    back: () => void
  } = $props()

  import { supabase } from '../../../lib/supabase'

  let name = $state(''), email = $state(''), subject = $state(''), msg = $state('')
  let sent = $state(false), sending = $state(false), error = $state('')

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const touched  = $state({ name: false, email: false, msg: false })
  const nameErr  = $derived(touched.name  && !name.trim()         ? 'Required' : '')
  const emailErr = $derived(touched.email && !emailRe.test(email) ? 'Invalid email' : '')
  const msgErr   = $derived(touched.msg   && !msg.trim()          ? 'Required' : '')

  async function sendMsg(e: SubmitEvent) {
    e.preventDefault()
    touched.name = touched.email = touched.msg = true
    if (!name.trim() || !emailRe.test(email) || !msg.trim()) return
    sending = true
    error = ''
    const { error: err } = await supabase
      .from('messages')
      .insert({
        name:    name.trim(),
        email:   email.trim(),
        subject: subject || t.contact.form.subjects[0],
        message: msg.trim(),
      })
    sending = false
    if (err) {
      error = err.message
    } else {
      sent = true
    }
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
        <button class="ios-sent__btn" onclick={() => { sent = false; name = ''; email = ''; subject = ''; msg = ''; touched.name = false; touched.email = false; touched.msg = false }}>
          {t.contact.sent.again}
        </button>
      </div>
    {:else}
      <form class="ios-form" onsubmit={sendMsg}>
        <div class="ios-section-header">{t.contact.form.name.toUpperCase()}</div>
        <div class="ios-list" class:ios-list-invalid={!!nameErr}>
          <div class="ios-list-item" style="padding:0">
            <input class="ios-input" type="text" bind:value={name}
              placeholder={t.contact.form.namePlaceholder}
              onblur={() => touched.name = true} />
          </div>
        </div>
        {#if nameErr}<p class="ios-field-err">{nameErr}</p>{/if}

        <div class="ios-section-header">{t.contact.form.email.toUpperCase()}</div>
        <div class="ios-list" class:ios-list-invalid={!!emailErr}>
          <div class="ios-list-item" style="padding:0">
            <input class="ios-input" type="email" bind:value={email}
              placeholder="you@example.com"
              onblur={() => touched.email = true} />
          </div>
        </div>
        {#if emailErr}<p class="ios-field-err">{emailErr}</p>{/if}

        <div class="ios-section-header">{t.contact.form.subject.toUpperCase()}</div>
        <div class="ios-subject-pills">
          {#each t.contact.form.subjects as s}
            <button type="button" class="ios-subject-pill"
              class:active={subject === s}
              onclick={() => subject = s}>{s}</button>
          {/each}
        </div>

        <div class="ios-section-header">{t.contact.form.message.toUpperCase()}</div>
        <div class="ios-list" class:ios-list-invalid={!!msgErr}>
          <div class="ios-list-item" style="padding:0">
            <textarea class="ios-input ios-textarea" bind:value={msg}
              placeholder={t.contact.form.messagePlaceholder} rows="4"
              onblur={() => touched.msg = true}></textarea>
          </div>
        </div>
        {#if msgErr}<p class="ios-field-err">{msgErr}</p>{/if}

        {#if error}
          <p class="ios-form-error">{error}</p>
        {/if}

        <div class="ios-contact-btns">
          <button type="submit" class="ios-submit-btn" disabled={sending}>
            {sending ? '...' : t.contact.form.submit}
          </button>
        </div>
      </form>
    {/if}

    <div class="ios-section-header">LINKS</div>
    <div class="ios-list">
      {#each t.contact.links as link}
        <a class="ios-list-item" href={link.href} target="_blank" rel="noopener" style="text-decoration:none">
          <div class="ios-list-icon" style="background:rgba(139,92,246,.18)">{link.icon}</div>
          <span class="ios-list-label__main">{link.label}</span>
          <span class="ios-chevron">›</span>
        </a>
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
.ios-submit-btn:disabled { opacity: .5; cursor: default; }

.ios-list-invalid { border-color: rgba(255,107,107,.4) !important; }

.ios-field-err {
  margin: -6px 16px 4px;
  font-size: 11px;
  color: #ff6b6b;
}

.ios-subject-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 16px 12px;
}

.ios-subject-pill {
  padding: 5px 14px;
  border-radius: 20px;
  border: .5px solid rgba(255,255,255,.15);
  background: transparent;
  color: rgba(255,255,255,.5);
  font-size: 13px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all .15s;
}

.ios-subject-pill.active {
  background: rgba(139,92,246,.25);
  border-color: rgba(139,92,246,.5);
  color: #fff;
}

.ios-form-error {
  margin: 0 16px 8px;
  font-size: 12px;
  color: #ff6b6b;
  padding: 8px 12px;
  background: rgba(255,107,107,.08);
  border-radius: 10px;
  border: .5px solid rgba(255,107,107,.2);
}

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
