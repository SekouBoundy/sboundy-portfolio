<script>
  import DockItem from './DockItem.svelte'

const DOCK_ITEMS = [
  { id: 'about',    img: '/icons/about.png',    label: 'About Me'  },
  { id: 'skills',   img: '/icons/skills.png',   label: 'Skills'    },
  { id: 'projects', img: '/icons/projects.png', label: 'Projects'  },
  { id: 'blog',     img: '/icons/blog.png',      label: 'Blog'     },
  { id: 'contact',  img: '/icons/contact.png',  label: 'Contact'   },
  { separator: true },
  { img: '/icons/github.png', label: 'GitHub' },
  { img: '/icons/trash.png',  label: 'Trash'  },
]

  let mouse_x = $state(null)
</script>

<div id="dock"
  onmousemove={(e) => mouse_x = e.x}
  onmouseleave={() => mouse_x = null}
>
  {#each DOCK_ITEMS as item}
    {#if item.separator}
      <div class="dock-separator"></div>
    {:else}
      <DockItem {mouse_x} {item} />
    {/if}
  {/each}
</div>