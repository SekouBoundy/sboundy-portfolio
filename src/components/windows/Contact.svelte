<script lang="ts">
  let name    = $state('')
  let email   = $state('')
  let message = $state('')
  let sent    = $state(false)
  let sending = $state(false)

  const links = [
    { icon: '✉', label: 'sekouboundy55@gmail.com', href: 'mailto:sekouboundy55@gmail.com' },
    { icon: '⌥', label: 'GitHub',                  href: 'https://github.com/' },
    { icon: '▲', label: 'Figma Community',          href: 'https://figma.com/@sboundy' },
    { icon: 'in', label: 'LinkedIn',                href: '#' },
    { icon: 'W', label: 'WhatsApp',                href: '#' },
  ]

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return
    sending = true
    // Simulate send — replace with real endpoint if needed
    setTimeout(() => {
      sending = false
      sent    = true
    }, 1200)
  }
</script>

<div class="contact-layout">

  <!-- Left — links -->
  <aside class="contact-aside">
    <div class="aside-watermark" aria-hidden="true">TALK</div>

    <div class="aside-content">
      <h2 class="aside-title">Let's<br/>talk.</h2>
      <p class="aside-sub">Have a project, a collab idea, or just want to say hi — reach out.</p>

      <div class="aside-links">
        {#each links as link}
          <a class="aside-link" href={link.href} target="_blank" rel="noopener">
            <span class="aside-link__icon">{link.icon}</span>
            <span class="aside-link__label">{link.label}</span>
            <span class="aside-link__arrow">↗</span>
          </a>
        {/each}
      </div>
    </div>
  </aside>

  <!-- Right — form -->
  <main class="contact-main">

    {#if sent}
      <div class="sent-state" style="animation: panelIn .3s ease">
        <div class="sent-icon">✓</div>
        <h3 class="sent-title">Message sent.</h3>
        <p class="sent-sub">I'll get back to you soon.</p>
        <button class="sent-reset" onclick={() => { sent = false; name = ''; email = ''; message = '' }}>
          Send another →
        </button>
      </div>

    {:else}
      <form
        class="contact-form"
        onsubmit={(e) => { e.preventDefault(); handleSubmit() }}
        style="animation: panelIn .2s ease"
      >
        <div class="form-group">
          <label class="form-label" for="cf-name">Name</label>
          <input
            id="cf-name"
            class="form-input"
            type="text"
            placeholder="Your name"
            bind:value={name}
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="cf-email">Email</label>
          <input
            id="cf-email"
            class="form-input"
            type="email"
            placeholder="your@email.com"
            bind:value={email}
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="cf-msg">Message</label>
          <textarea
            id="cf-msg"
            class="form-input form-textarea"
            placeholder="What's on your mind?"
            rows="5"
            bind:value={message}
            required
          ></textarea>
        </div>

        <button
          class="form-submit"
          type="submit"
          disabled={sending || !name.trim() || !email.trim() || !message.trim()}
        >
          {#if sending}
            <span class="submit-dot"></span>
            <span class="submit-dot"></span>
            <span class="submit-dot"></span>
          {:else}
            Send message →
          {/if}
        </button>
      </form>
    {/if}

  </main>
</div>

<style>
.contact-layout {
  display: grid;
  grid-template-columns: 210px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* Aside */
.contact-aside {
  position: relative;
  background: rgba(139,92,246,.08);
  border-right: var(--border-accent);
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.aside-watermark {
  position: absolute;
  bottom: -16px;
  left: -8px;
  font-family: var(--font-display);
  font-size: 6.5rem;
  letter-spacing: .06em;
  color: rgba(139,92,246,.08);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.aside-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.aside-title {
  font-family: var(--font-display);
  font-size: 2.8rem;
  letter-spacing: .06em;
  color: var(--color-white);
  line-height: 1;
}

.aside-sub {
  font-size: .75rem;
  color: var(--color-secondary);
  line-height: 1.75;
}

.aside-links {
  display: flex;
  flex-direction: column;
  gap: .3rem;
  margin-top: auto;
}

.aside-link {
  display: flex;
  align-items: center;
  gap: .55rem;
  padding: .45rem .5rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: .75rem;
  color: var(--color-secondary);
  transition: var(--transition-fast);
}

.aside-link:hover {
  color: var(--color-white);
  background: rgba(139,92,246,.12);
}

.aside-link:hover .aside-link__arrow { opacity: 1; }

.aside-link__icon {
  width: 18px;
  text-align: center;
  font-size: .8rem;
  opacity: .6;
  flex-shrink: 0;
}

.aside-link__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.aside-link__arrow {
  font-size: .7rem;
  opacity: 0;
  transition: var(--transition-fast);
  color: var(--color-accent);
}

/* Main */
.contact-main {
  padding: 1.75rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: .35rem;
}

.form-label {
  font-size: .65rem;
  font-weight: var(--fw-bold);
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--color-secondary);
}

.form-input {
  background: rgba(255,255,255,.04);
  border: var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: .6rem .75rem;
  color: var(--color-white);
  font-size: .82rem;
  font-family: var(--font-body);
  outline: none;
  transition: var(--transition-fast);
  resize: none;
}

.form-input:focus {
  border-color: rgba(139,92,246,.45);
  background: rgba(139,92,246,.06);
}

.form-input::placeholder { color: rgba(255,255,255,.2); }

.form-textarea { min-height: 110px; }

.form-submit {
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .3rem;
  padding: 9px 22px;
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-pill);
  color: #fff;
  font-size: .82rem;
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: var(--transition-fast);
  font-family: var(--font-body);
  min-width: 140px;
  margin-top: auto;
}

.form-submit:hover:not(:disabled) {
  background: var(--color-accent-dark);
  transform: translateY(-1px);
}

.form-submit:disabled { opacity: .4; cursor: default; }

/* Sending dots */
.submit-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  animation: dotPulse 1s infinite ease-in-out;
}

.submit-dot:nth-child(2) { animation-delay: .15s; }
.submit-dot:nth-child(3) { animation-delay: .3s; }

/* Sent state */
.sent-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: .75rem;
  text-align: center;
}

.sent-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(40,200,64,.15);
  border: .5px solid rgba(40,200,64,.3);
  color: #28C840;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sent-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: .06em;
  color: var(--color-white);
}

.sent-sub {
  font-size: .8rem;
  color: var(--color-secondary);
}

.sent-reset {
  background: transparent;
  border: var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 6px 16px;
  color: var(--color-secondary);
  font-size: .75rem;
  cursor: pointer;
  transition: var(--transition-fast);
  font-family: var(--font-body);
  margin-top: .5rem;
}

.sent-reset:hover { color: var(--color-white); border-color: rgba(255,255,255,.2); }

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(.6); opacity: .4; }
  40%           { transform: scale(1);  opacity: 1;  }
}
</style>
