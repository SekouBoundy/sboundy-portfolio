<!-- src/components/macos/Desktop.svelte -->
<script lang="ts">
  import WindowsArea from './WindowsArea.svelte'
  import { openWin } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'
</script>

<div class="desktop">

  <!-- Desktop icons -->
  <div class="desktop-icons">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="desk-icon" ondblclick={() => openWin('about')}>
      <div class="desk-icon__img">🗂️</div>
      <div class="desk-icon__name">About Me</div>
    </div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="desk-icon" ondblclick={() => openWin('projects')}>
      <div class="desk-icon__img">📁</div>
      <div class="desk-icon__name">Projects</div>
    </div>
  </div>

  <!-- All windows render here -->
  <WindowsArea />

</div>

<style>
  .desktop {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .desktop-icons {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 1;
  }
</style>