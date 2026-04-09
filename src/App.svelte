<script>
  import './styles/tokens.css'
  import './styles/reset.css'
  import './styles/macos.css'
  import './styles/ios.css'
  import './styles/windows.css'
  import './styles/animations.css'
  import './styles/responsive.css'
  import Menubar from './components/macos/Menubar.svelte'


  import Desktop from './components/macos/Desktop.svelte'
  import Dock    from './components/macos/Dock.svelte'

  const isMobile = window.innerWidth <= 768
</script>

{#if !isMobile}
  <div id="macos">
    <Menubar />
    <Desktop />
    <Dock />
    </div>

{:else}
  <div id="ios"></div>
{/if}