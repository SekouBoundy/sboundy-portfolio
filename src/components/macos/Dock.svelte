<script lang="ts">
  import { openWin } from '$state/windows.svelte.ts'
  import type { WinID } from '$state/windows.svelte.ts'

  const ITEMS: { id?: WinID; img?: string; emoji?: string; text?: string; label: string; separator?: boolean }[] = [
    { id: 'about',    img: '/icons/about.png',   label: 'About Me' },
    { id: 'skills',   img: '/icons/skills.png',  label: 'Skills'   },
    { id: 'projects', img: '/icons/projects.png',label: 'Projects' },
    { id: 'blog',     img: '/icons/blog.png',    label: 'Blog'     },
    { id: 'contact',  img: '/icons/contact.png', label: 'Contact'  },
    { separator: true, label: '' },
    { img: '/icons/github.png', label: 'GitHub' },
    { img: '/icons/trash.png',  label: 'Trash'  },
  ]
</script>

<div id="dock">
  {#each ITEMS as item}
    {#if item.separator}
      <div class="dock-sep"></div>
    {:else}
      <button
        class="dock-item"
        onclick={() => item.id && openWin(item.id)}
      >
        <div class="dock-label">{item.label}</div>
        <div class="dock-icon">
          {#if item.img}
            <img src={item.img} alt={item.label} />
          {:else if item.emoji}
            {item.emoji}
          {:else}
            <span class="dock-text">{item.text}</span>
          {/if}
        </div>
        <div class="dock-dot"></div>
      </button>
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

  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: default;
    position: relative;
    transition: transform .2s cubic-bezier(.34,1.56,.64,1);
  }

  .dock-item:hover { transform: translateY(-10px) scale(1.15); }
  .dock-item:hover .dock-label { opacity: 1; transform: translateY(0); }

  .dock-icon {
    width: 52px;
    height: 52px;
    border-radius: 13px;
    background: rgba(255,255,255,.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 2px 8px rgba(0,0,0,.4);
  }

  .dock-text {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: white;
  }

  .dock-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,.6);
    margin-top: 3px;
  }

  .dock-label {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(0,0,0,.75);
    color: #fff;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity .15s, transform .15s;
    pointer-events: none;
  }

  .dock-sep {
    width: .5px;
    height: 48px;
    background: rgba(255,255,255,.2);
    margin: 0 4px;
    align-self: center;
  }
  .dock-icon img {
  width: 100%;
  height: 100%;
  border-radius: 13px;
  object-fit: cover;
}
</style>
