<script lang="ts">
import './styles/tokens.css'
import './styles/reset.css'
import './styles/macos.css'
import './styles/ios.css'
import './styles/windows.css'
import './styles/animations.css'
import './styles/responsive.css'
import { onMount } from 'svelte'
import { currentTheme, currentWallpaper } from './stores/index'
import Menubar from './components/macos/Menubar.svelte'
import Desktop from './components/macos/Desktop.svelte'
import Dock    from './components/macos/Dock.svelte'
import { Cursor } from './components/shared/Cursor.ts'

const isMobile = window.innerWidth <= 768

// ← ADD: sync body class with theme store
$effect(() => {
  document.body.classList.remove('dark', 'light')
  document.body.classList.add($currentTheme)
})

onMount(() => {
  if (!isMobile) new Cursor()
})
</script>

{#if !isMobile}
  <div id="macos" style:background-image={$currentWallpaper ? `url('${$currentWallpaper}')` : undefined} style:background-size="cover" style:background-position="center">
    <Menubar />
    <div class="macos-body">
      <Desktop />
    </div>
    <Dock />
  </div>
{:else}
  <div id="ios"></div>
{/if}

<style>
  #macos {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .macos-body {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
</style>