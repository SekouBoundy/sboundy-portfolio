<script>
  import { currentLang } from '../../stores/index.js'
  import { t } from '../../stores/lang.js'

  let time = $state(formatTime())

  function formatTime() {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    })
  }

  $effect(() => {
    const id = setInterval(() => time = formatTime(), 1000)
    return () => clearInterval(id)
  })
</script>

<div id="menubar">
  <div class="menu-left">
    <div class="menu-item">&#63743;</div>
    <div class="menu-item menu-item--brand">SBOUNDY</div>
    <div class="menu-item">File</div>
    <div class="menu-item">View</div>
    <div class="menu-item">Window</div>
    <div class="menu-item">Help</div>
  </div>
  <div class="menu-right">
    <div class="lang-pill">
      <button class="lang-btn" class:active={$currentLang === 'en'} onclick={() => currentLang.set('en')}>EN</button>
      <button class="lang-btn" class:active={$currentLang === 'fr'} onclick={() => currentLang.set('fr')}>FR</button>
    </div>
    <span>● {$t('status')}</span>
    <span>{time}</span>
  </div>
</div>