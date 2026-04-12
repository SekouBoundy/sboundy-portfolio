<!-- src/components/macos/WindowsArea.svelte -->
<script lang="ts">
  import { wins }    from '$state/windows.svelte.ts'
  import Window      from './Window.svelte'
  import type { WinID } from '$state/windows.svelte.ts'
  import { SvelteSet } from 'svelte/reactivity'

  // App windows — each maps an id to its title + content component
  // We lazy-import content so unused windows cost zero on load
  const WIN_CONFIG: Record<WinID, { title: string; component: () => Promise<any> }> = {
    about:    { title: 'About — SBOUNDY',    component: () => import('../windows/About.svelte')    },
    skills:   { title: 'sboundy@portfolio — skills -zsh<',  component: () => import('../windows/Skills.svelte')   },
    projects: { title: 'Projects — SBOUNDY', component: () => import('../windows/Projects.svelte') },
    blog:     { title: 'Blog — Notes',       component: () => import('../windows/Blog.svelte')     },
    design:   { title: 'Design — SBOUNDY',   component: () => import('../windows/Design.svelte')   },
    contact:  { title: "Let's talk.",        component: () => import('../windows/Contact.svelte')  },
    trash:    { title: 'Trash — Graveyard', component: () => import('../windows/Trash.svelte')    },
    engineer: { title: 'Engineer — SBOUNDY', component: () => import('../windows/Engineer.svelte') },
  }

  const WIN_IDS = Object.keys(WIN_CONFIG) as WinID[]

  // Once a window has been opened, keep it mounted so out-transitions can play.
  // The Window component's internal {#if} handles show/hide with animation.
  const mounted = new SvelteSet<WinID>()

  $effect(() => {
    WIN_IDS.forEach(id => { if (wins[id].open) mounted.add(id) })
  })
</script>

<div id="windows-area">
  {#each WIN_IDS as id (id)}
    {#if mounted.has(id)}
      <Window {id} title={WIN_CONFIG[id].title}>
        {#await WIN_CONFIG[id].component() then { default: C }}
          <C />
        {/await}
      </Window>
    {/if}
  {/each}
</div>

<style>
  #windows-area {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  #windows-area :global(.win) {
    pointer-events: all;
  }
</style>