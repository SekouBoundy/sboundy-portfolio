<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { currentLang } from '../../stores/index'
  import BMICalculator       from '../csharp/BMICalculator.svelte'
  import AgeCalculator      from '../csharp/Age-calculator-master.svelte'
  import AgeCalculatorDiagram from '../csharp/AgeCalculatorDiagram.svelte'
  import bmiThumb from '../../assets/images/projects/csharp/Classification.png'

  type Project = {
    id: string
    name: string
    desc_en: string
    desc_fr: string
    how_en?: string
    how_fr?: string
    thumb: string
    thumb_url: string | null
    color: string
    url: string | null
    year: number
    role: string
    tags: string[]
    screenshots: string[]
    component?: string
  }

  const LOCAL_PROJECTS: Project[] = [
    {
      id: 'bmi-calculator',
      name: 'BMI Calculator',
      desc_en: 'A cross-platform BMI calculator with metric/imperial support, animated gauge, and color-coded results. Originally built as a Windows desktop app in C#, ported to the web.',
      desc_fr: 'Un calculateur d\'IMC multiplateforme avec support métrique/impérial, jauge animée et résultats colorés. Conçu à l\'origine comme application Windows en C#, porté sur le web.',
      how_en: `I started this as a Windows Forms app in C# / .NET. The UI was built with drag-and-drop controls in Visual Studio — two NumericUpDown inputs for weight and height, a Button to trigger the calculation, and a Label to display the result.\n\nThe core formula is simple: BMI = weight (kg) ÷ height² (m²). I convert the height from cm to meters before squaring it, then compare the result against the five WHO thresholds (Underweight < 18.5, Normal 18.5–25, Overweight 25–30, Obesity 30–35, Extreme Obesity ≥ 35) to determine the category.\n\nThe silhouette images change dynamically based on the computed category — each image was manually prepared in Figma and mapped to its key in a dictionary. The classification table highlights the active row so the user can see at a glance where they fall.\n\nFor this portfolio I ported the logic 1-to-1 into a Svelte component: reactive variables replace C# properties, and Svelte's {#if} / {#each} blocks replace the Windows Forms event handlers. The green desktop style was kept intentionally to show the original app's look.`,
      how_fr: `J'ai commencé ce projet comme une application Windows Forms en C# / .NET. L'interface a été construite avec les contrôles glisser-déposer de Visual Studio — deux NumericUpDown pour le poids et la taille, un bouton pour déclencher le calcul, et un Label pour afficher le résultat.\n\nLa formule est simple : IMC = poids (kg) ÷ taille² (m²). Je convertis d'abord la taille de cm en mètres avant de la mettre au carré, puis je compare le résultat aux cinq seuils de l'OMS pour déterminer la catégorie.\n\nLes images de silhouettes changent dynamiquement selon la catégorie calculée — chaque image a été préparée dans Figma et associée à sa clé dans un dictionnaire. Le tableau met en surbrillance la ligne active pour que l'utilisateur voie immédiatement sa catégorie.\n\nPour ce portfolio, j'ai porté la logique à l'identique dans un composant Svelte : les variables réactives remplacent les propriétés C#, et les blocs {#if} / {#each} de Svelte remplacent les gestionnaires d'événements Windows Forms. Le style vert du bureau a été conservé intentionnellement pour montrer l'apparence de l'application originale.`,
      thumb: '⚖️',
      thumb_url: bmiThumb,
      color: '#0f172a',
      url: 'https://github.com/SekouBoundy/BMI_Calulator',
      year: 2024,
      role: 'Solo Developer',
      tags: ['C#', '.NET', 'Desktop', 'Health'],
      screenshots: [],
      component: 'BMICalculator',
    },
    {
      id: 'age-calculator',
      name: 'Age Calculator',
      desc_en: 'A Windows desktop app that calculates your exact age in years, months, days and hours from your birth date. Built in C#, ported to the web.',
      desc_fr: 'Une application Windows qui calcule votre âge exact en années, mois, jours et heures à partir de votre date de naissance. Conçue en C#, portée sur le web.',
      how_en: `I built this as a Windows Forms app in C# / .NET. The form collects four inputs: gender (radio buttons), birth year (TextBox), birth month (ComboBox), and birth day (TextBox). On click, the handler reads and parses the values, constructs a DateTime object, then runs the date-difference logic.\n\nThe tricky part is the day/month borrowing: if today's day is less than the birth day, I subtract one month and add the number of days in the previous month. Same logic for months borrowing from years. This avoids using TimeSpan (which only gives total days) and gives a natural "X years, Y months, Z days" breakdown.\n\nI also extract the day-of-week from the birth date using DayOfWeek, and the current hour to include in the result string. The gender radio button drives the avatar shown in the result panel.\n\nFor the portfolio I ported all of this to Svelte — reactive variables replace C# fields, the calculate function is identical logic in JavaScript, and the SVG avatar replaces the WinForms PictureBox.`,
      how_fr: `J'ai construit cette application comme un formulaire Windows en C# / .NET. Le formulaire collecte quatre entrées : le genre (boutons radio), l'année de naissance (TextBox), le mois (ComboBox) et le jour (TextBox). Au clic, le gestionnaire lit et analyse les valeurs, construit un objet DateTime, puis exécute la logique de différence de dates.\n\nLa partie délicate est l'emprunt jour/mois : si le jour actuel est inférieur au jour de naissance, je soustrais un mois et j'ajoute le nombre de jours du mois précédent. Même logique pour les mois qui empruntent aux années. Cela évite d'utiliser TimeSpan (qui ne donne que des jours totaux) et produit un résultat naturel "X ans, Y mois, Z jours".\n\nJ'extrais aussi le jour de la semaine depuis la date de naissance via DayOfWeek, et l'heure actuelle pour l'inclure dans le résultat. Le bouton radio de genre détermine l'avatar affiché dans le panneau de résultat.\n\nPour le portfolio, j'ai porté tout cela en Svelte : les variables réactives remplacent les champs C#, la fonction calculate est la même logique en JavaScript, et l'avatar SVG remplace le PictureBox WinForms.`,
      thumb: '🎂',
      thumb_url: null,
      color: '#0f172a',
      url: 'https://github.com/SekouBoundy/Age-calculator',
      year: 2024,
      role: 'Solo Developer',
      tags: ['C#', '.NET', 'Desktop'],
      screenshots: [],
      component: 'AgeCalculator',
    },
  ]

  let remoteProjects = $state<Project[]>([])
  let loading        = $state(true)
  let activeTag      = $state('All')
  let selected: Project | null = $state(null)
  let lang = $state('en')

  currentLang.subscribe(v => lang = v)

  $effect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('order_index')
      .then(({ data }: { data: Project[] | null }) => {
        remoteProjects = data ?? []
        loading        = false
      })
  })

  const projects = $derived([...LOCAL_PROJECTS, ...remoteProjects])

  const allTags = $derived(['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))])

  const filtered = $derived(
    activeTag === 'All'
      ? projects
      : projects.filter(p => p.tags.includes(activeTag))
  )

  function tagCount(tag: string) {
    return tag === 'All' ? projects.length : projects.filter(p => p.tags.includes(tag)).length
  }

  function desc(p: Project) { return lang === 'fr' ? p.desc_fr : p.desc_en }
  function how(p: Project)  { return lang === 'fr' ? (p.how_fr ?? '') : (p.how_en ?? '') }
  function open(p: Project)  { selected = p; lightbox = null }
  function close()            { selected = null; lightbox = null }

  let lightbox: string | null = $state(null)
</script>

<div class="proj-layout">

  <!-- Sidebar -->
  <aside class="proj-sidebar">
    <p class="sidebar-label">FILTER</p>
    {#each allTags as tag}
      <button
        class="sidebar-item"
        class:active={activeTag === tag}
        onclick={() => { activeTag = tag; selected = null }}
      >
        <span class="sidebar-item__dot"></span>
        {tag}
        <span class="sidebar-item__count">{tagCount(tag)}</span>
      </button>
    {/each}
  </aside>

  <!-- Main -->
  <main class="proj-main">
    <div class="proj-watermark" aria-hidden="true">WORK</div>

    {#if loading}
      <div class="proj-loading">Loading…</div>
    {:else if selected}
      <!-- Detail panel -->
      <div class="proj-detail" style="animation: panelIn .2s ease">
        <button class="detail-back" onclick={close}>← Back</button>

        {#if selected.component === 'BMICalculator'}
          <div class="proj-live"><BMICalculator /></div>
        {:else if selected.component === 'AgeCalculator'}
          <div class="proj-live"><AgeCalculator /></div>
          <AgeCalculatorDiagram />
        {/if}

        {#if selected.component}
          <div class="detail-meta" style="margin-top:.75rem">
            <div class="detail-header">
              <div>
                <h2 class="detail-name">{selected.name}</h2>
                <p class="detail-role">{selected.role} · {selected.year}</p>
              </div>
              <a class="detail-link" href={selected.url} target="_blank" rel="noopener">GitHub ↗</a>
            </div>
            <p class="detail-desc">{desc(selected)}</p>
            <div class="detail-tags">
              {#each selected.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            {#if how(selected)}
              <div class="how-built">
                <p class="how-built__label">HOW I BUILT IT</p>
                {#each how(selected).split('\n\n') as para}
                  <p class="how-built__para">{para}</p>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
          <div class="detail-thumb" style="background: {selected.color}">
            {#if selected.thumb_url}
              <button class="detail-thumb__btn" onclick={() => lightbox = selected!.thumb_url}>
                <img class="detail-thumb__img" src={selected.thumb_url} alt={selected.name} />
                <span class="detail-thumb__hint">⤢ Expand</span>
              </button>
            {:else}
              <span class="detail-thumb__text">{selected.thumb}</span>
            {/if}
          </div>

          <div class="detail-meta">
            <div class="detail-header">
              <div>
                <h2 class="detail-name">{selected.name}</h2>
                <p class="detail-role">{selected.role} · {selected.year}</p>
              </div>
              {#if selected.url}
                <a class="detail-link" href={selected.url} target="_blank" rel="noopener">
                  Open ↗
                </a>
              {:else}
                <span class="detail-wip">In progress</span>
              {/if}
            </div>

            <p class="detail-desc">{desc(selected)}</p>

            <div class="detail-tags">
              {#each selected.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>

            {#if selected.screenshots?.length}
              <div class="detail-screenshots">
                <p class="screenshots-label">SCREENSHOTS</p>
                <div class="screenshots-strip">
                  {#each selected.screenshots as shot}
                    <button class="screenshot-thumb" onclick={() => lightbox = shot}>
                      <img src={shot} alt="screenshot" />
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Lightbox -->
      {#if lightbox}
        <button class="lightbox" onclick={() => lightbox = null}>
          <img src={lightbox} alt="screenshot preview" />
        </button>
      {/if}

    {:else}
      <!-- Card grid -->
      <div class="proj-grid" style="animation: panelIn .2s ease">
        {#each filtered as project (project.id)}
          <button
            class="proj-card"
            onclick={() => open(project)}
            style="animation: panelIn .15s ease"
          >
            <div class="proj-card__thumb" style="background: {project.color}">
              {#if project.thumb_url}
                <img class="proj-card__thumb-img" src={project.thumb_url} alt={project.name} />
              {:else}
                <span class="proj-card__thumb-text">{project.thumb}</span>
              {/if}
              <div class="proj-card__overlay">
                <span class="proj-card__cta">View →</span>
              </div>
            </div>

            <div class="proj-card__info">
              <div class="proj-card__top">
                <span class="proj-card__name">{project.name}</span>
                <span class="proj-card__year">{project.year}</span>
              </div>
              <div class="proj-card__tags">
                {#each project.tags.slice(0, 3) as tag}
                  <span class="tag tag--sm">{tag}</span>
                {/each}
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

  </main>
</div>

<style>
.proj-layout {
  display: grid;
  grid-template-columns: 175px 1fr;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-body);
}

/* Sidebar */
.proj-sidebar {
  background: rgba(0,0,0,.25);
  border-right: var(--border-subtle);
  padding: 1.1rem .75rem;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  backdrop-filter: blur(8px);
  overflow-y: auto;
}

.sidebar-label {
  font-size: .6rem;
  font-weight: var(--fw-bold);
  letter-spacing: .12em;
  color: var(--color-secondary);
  padding: 0 .5rem;
  margin-bottom: .3rem;
  opacity: .7;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: .5rem;
  width: 100%;
  padding: .38rem .55rem;
  border-radius: var(--radius-sm);
  font-size: .82rem;
  color: var(--color-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.sidebar-item:hover {
  color: var(--color-white);
  background: rgba(255,255,255,.05);
}

.sidebar-item.active {
  background: rgba(139,92,246,.18);
  color: var(--color-accent);
  font-weight: var(--fw-medium);
}

.sidebar-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: .5;
  flex-shrink: 0;
}

.sidebar-item.active .sidebar-item__dot {
  opacity: 1;
}

.sidebar-item__count {
  margin-left: auto;
  font-size: .65rem;
  background: rgba(255,255,255,.08);
  border-radius: var(--radius-pill);
  padding: 1px 7px;
  color: var(--color-secondary);
}

.sidebar-item.active .sidebar-item__count {
  background: rgba(139,92,246,.25);
  color: var(--color-accent);
}

/* Main */
.proj-main {
  position: relative;
  overflow-y: auto;
  padding: 1.25rem;
}

.proj-watermark {
  position: absolute;
  bottom: -10px;
  right: -4px;
  font-family: var(--font-display);
  font-size: 7rem;
  letter-spacing: .08em;
  color: rgba(255,255,255,.025);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

/* Grid */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .85rem;
  position: relative;
  z-index: 1;
}

.proj-card {
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
  padding: 0;
}

.proj-card:hover {
  border-color: rgba(139,92,246,.35);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,.5);
}

.proj-card__thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.proj-card__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

.proj-card__thumb-text {
  font-family: var(--font-display);
  font-size: 2.8rem;
  color: rgba(255,255,255,.2);
  letter-spacing: .06em;
}

.proj-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(139,92,246,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-fast);
}

.proj-card:hover .proj-card__overlay {
  opacity: 1;
}

.proj-card__cta {
  font-size: .85rem;
  font-weight: var(--fw-bold);
  color: #fff;
  letter-spacing: .04em;
}

.proj-card__info {
  padding: .7rem .85rem .8rem;
}

.proj-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .4rem;
}

.proj-card__name {
  font-size: .92rem;
  font-weight: var(--fw-bold);
  color: var(--color-white);
}

.proj-card__year {
  font-size: .68rem;
  color: var(--color-secondary);
}

.proj-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
}

/* Detail */
.proj-detail {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  font-size: .78rem;
  color: var(--color-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-fast);
  font-family: var(--font-body);
}

.detail-back:hover { color: var(--color-white); }

.detail-thumb {
  width: 100%;
  height: 180px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-subtle);
}

.detail-thumb__btn {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
  display: block;
}

.detail-thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.detail-thumb__btn:hover .detail-thumb__img {
  opacity: .75;
}

.detail-thumb__hint {
  position: absolute;
  bottom: .6rem;
  right: .7rem;
  font-size: .7rem;
  font-weight: var(--fw-medium);
  color: #fff;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px);
  border-radius: var(--radius-pill);
  padding: 3px 10px;
  opacity: 0;
  transition: var(--transition-fast);
  pointer-events: none;
}

.detail-thumb__btn:hover .detail-thumb__hint {
  opacity: 1;
}

.detail-thumb__text {
  font-family: var(--font-display);
  font-size: 5rem;
  color: rgba(255,255,255,.15);
  letter-spacing: .06em;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.detail-name {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: .06em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: .25rem;
}

.detail-role {
  font-size: .75rem;
  color: var(--color-accent);
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  font-size: .78rem;
  font-weight: var(--fw-medium);
  color: var(--color-accent);
  background: var(--color-accent-glow);
  border: var(--border-accent);
  border-radius: var(--radius-pill);
  padding: 5px 14px;
  text-decoration: none;
  transition: var(--transition-fast);
}

.detail-link:hover {
  background: var(--color-accent);
  color: #fff;
}

.detail-wip {
  font-size: .72rem;
  color: var(--color-secondary);
  background: rgba(255,255,255,.05);
  border: var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}

.detail-desc {
  font-size: .85rem;
  color: var(--color-secondary);
  line-height: 1.85;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

/* Shared tags */
.tag {
  font-size: .7rem;
  font-weight: var(--fw-medium);
  padding: 4px 11px;
  border-radius: var(--radius-pill);
  background: var(--color-accent-glow);
  border: var(--border-accent);
  color: var(--color-accent);
  transition: var(--transition-fast);
  cursor: default;
}

.tag--sm {
  font-size: .62rem;
  padding: 2px 8px;
}

/* Screenshots */
.detail-screenshots {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.screenshots-label {
  font-size: .6rem;
  font-weight: var(--fw-bold);
  letter-spacing: .12em;
  color: var(--color-secondary);
  opacity: .7;
}

.screenshots-strip {
  display: flex;
  gap: .6rem;
  overflow-x: auto;
  padding-bottom: .4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.1) transparent;
}

.screenshot-thumb {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: var(--border-subtle);
  background: rgba(255,255,255,.04);
  padding: 0;
  cursor: pointer;
  transition: var(--transition-fast);
}

.screenshot-thumb:hover {
  border-color: rgba(139,92,246,.5);
  transform: scale(1.03);
}

.screenshot-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Lightbox */
.lightbox {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border: none;
  cursor: zoom-out;
  padding: 1.5rem;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 24px 64px rgba(0,0,0,.8);
}

/* How I built it */
.how-built {
  display: flex;
  flex-direction: column;
  gap: .6rem;
  background: rgba(255,255,255,.03);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  padding: .9rem 1rem;
}

.how-built__label {
  font-size: .6rem;
  font-weight: var(--fw-bold);
  letter-spacing: .12em;
  color: var(--color-accent);
  opacity: .85;
  margin: 0;
}

.how-built__para {
  font-size: .82rem;
  color: var(--color-secondary);
  line-height: 1.8;
  margin: 0;
}

/* Live component embed */
.proj-live {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: var(--border-subtle);
  max-height: 480px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.1) transparent;
}

.proj-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: .85rem;
  color: var(--color-secondary);
  opacity: .6;
}

@keyframes panelIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
