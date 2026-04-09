<script>
  import { windows } from '../../stores/index.js'

  const icons = [
    { id: 'about',    emoji: '🗂️', label: 'About Me'  },
    { id: 'projects', emoji: '📁', label: 'Projects'  },
  ]

  function openWindow(id) {
    windows.update(w => ({ ...w, [id]: { ...w[id], open: true } }))
  }
</script>

<div class="desktop-icons">
  {#each icons as icon}
    <div class="desk-icon" ondblclick={() => openWindow(icon.id)}>
      <div class="desk-icon__img">{icon.emoji}</div>
      <div class="desk-icon__name">{icon.label}</div>
    </div>
  {/each}
</div>