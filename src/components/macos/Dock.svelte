<script lang="ts">
  import { openWin } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'
  import DockItem from './DockItem.svelte'

  const ITEMS: { id?: WinID; img?: string; emoji?: string; text?: string; label: string; separator?: boolean }[] = [
    { id: 'about',    img: '/icons/about.png',    label: 'About Me' },
    { id: 'skills',   img: '/icons/skills.png',   label: 'Skills'   },
    { id: 'projects', img: '/icons/projects.png', label: 'Projects' },
    { id: 'blog',     img: '/icons/blog.png',     label: 'Blog'     },
    { id: 'contact',  img: '/icons/contact.png',  label: 'Contact'  },
    { separator: true, label: '' },
    { img: '/icons/github.png', label: 'GitHub' },
    { img: '/icons/trash.png',  label: 'Trash'  },
  ]

  let mouse_x = $state<number | null>(null)
</script>

<div id="dock"
  onmousemove={(e) => (mouse_x = e.clientX)}
  onmouseleave={() => (mouse_x = null)}
>
  {#each ITEMS as item}
    {#if item.separator}
      <div class="dock-sep"></div>
    {:else}
      <DockItem {mouse_x} {item} />
    {/if}
  {/each}
</div>

<style>
  #dock {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    margin: 0 auto 12px;
    width: fit-content;
    background: rgba(255,255,255,.12);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: .5px solid rgba(255,255,255,.18);
    border-radius: 18px;
    height: 76px;
  }

  .dock-sep {
    width: .5px;
    height: 48px;
    background: rgba(255,255,255,.2);
    margin: 0 4px;
    align-self: center;
  }
</style>
