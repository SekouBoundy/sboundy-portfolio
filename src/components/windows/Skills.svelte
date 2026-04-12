<script lang="ts">
  let step = $state(0)
  let showCursor = $state(true)

  const PROMPT = 'sboundy@portfolio ~ %'

  const sections = [
    {
      cmd: 'sboundy skills --list',
      groups: [
        {
          label: 'DEVELOPMENT',
          items: [
            { skill: 'React',        desc: 'Web apps & SPAs' },
            { skill: 'Flutter',      desc: 'Cross-platform mobile' },
            { skill: 'React Native', desc: 'Mobile (iOS & Android)' },
            { skill: 'Svelte',       desc: 'Fast, modern web UIs' },
            { skill: 'HTML / CSS / JS', desc: 'Web fundamentals' },
          ],
        },
        {
          label: 'DESIGN & UI',
          items: [
            { skill: 'Figma',        desc: 'UI/UX & Prototyping' },
            { skill: 'Web Mockups',  desc: 'Full design systems' },
            { skill: 'Mobile Design',desc: 'iOS & Android UX' },
          ],
        },
        {
          label: 'CREATIVE',
          items: [
            { skill: 'Hand Drawing', desc: 'Illustration & sketches' },
            { skill: 'Graphic Design', desc: 'Flyers & visual identity' },
          ],
        },
      ],
    },
    {
      cmd: 'sboundy --status',
      output: 'Student | Open to work | Based in Mali | FR · EN',
    },
  ]

  // Animate sections in sequence
  $effect(() => {
    const t = setInterval(() => {
      step += 1
    }, 320)

    const cursor = setInterval(() => {
      showCursor = !showCursor
    }, 530)

    return () => {
      clearInterval(t)
      clearInterval(cursor)
    }
  })

  // Total steps: 1 (first cmd) + groups*items + 1 (second cmd) + 1 (status)
  const totalGroups = sections[0].groups!
  let groupSteps: number[] = []
  let acc = 1 // step 0 = first cmd typed
  for (const g of totalGroups) {
    groupSteps.push(acc)
    acc += 1 + g.items.length // 1 for label + items
  }
  const secondCmdStep = acc
  const statusStep = acc + 1
  const doneStep = acc + 2

  function visible(minStep: number) {
    return step >= minStep
  }
</script>

<div class="terminal">
  <!-- title bar -->
  <!-- <div class="term-bar">
    <div class="term-dots">
      <span class="dot dot--red"></span>
      <span class="dot dot--yellow"></span>
      <span class="dot dot--green"></span>
    </div>
    <span class="term-title">sboundy@portfolio — skills -zsh</span>
  </div> -->

  <!-- body -->
  <div class="term-body">

    <!-- Command 1 -->
    {#if visible(0)}
      <div class="term-line fade-in">
        <span class="prompt">{PROMPT}</span>
        <span class="cmd"> sboundy skills --list</span>
      </div>
    {/if}

    <!-- Groups -->
    {#each sections[0].groups! as group, gi}
      {#if visible(groupSteps[gi])}
        <div class="term-spacer"></div>
        <div class="term-line fade-in">
          <span class="section">[ {group.label} ]</span>
        </div>
      {/if}
      {#each group.items as item, ii}
        {#if visible(groupSteps[gi] + 1 + ii)}
          <div class="term-line fade-in">
            <span class="check">✓</span>
            <span class="skill">{item.skill}</span>
            <span class="arrow"> → </span>
            <span class="desc">{item.desc}</span>
          </div>
        {/if}
      {/each}
    {/each}

    <!-- Command 2 -->
    {#if visible(secondCmdStep)}
      <div class="term-spacer"></div>
      <div class="term-line fade-in">
        <span class="prompt">{PROMPT}</span>
        <span class="cmd"> sboundy --status</span>
      </div>
    {/if}

    {#if visible(statusStep)}
      <div class="term-line fade-in">
        <span class="status-out">&nbsp;&nbsp;{sections[1].output}</span>
      </div>
    {/if}

    <!-- Cursor -->
    <div class="term-line">
      <span class="prompt">{PROMPT}</span>
      <span class="cursor" class:blink={step >= doneStep}>{showCursor ? '█' : '\u00a0'}</span>
    </div>

  </div>
</div>

<style>
.terminal {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0d0d0d;
  font-family: var(--font-mono);
  border-radius: inherit;
  overflow: hidden;
}

/* Title bar */
.term-bar {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .5rem 1rem;
  background: #1a1a1a;
  border-bottom: .5px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}

.term-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot--red    { background: #FF5F57; }
.dot--yellow { background: #FEBC2E; }
.dot--green  { background: #28C840; }

.term-title {
  flex: 1;
  text-align: center;
  font-size: .72rem;
  color: rgba(255,255,255,.4);
  letter-spacing: .02em;
}

/* Body */
.term-body {
  flex: 1;
  padding: 1.4rem 1.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: .18rem;
}

.term-spacer {
  height: .7rem;
}

.term-line {
  display: flex;
  align-items: baseline;
  font-size: .82rem;
  line-height: 1.7;
  white-space: pre;
}

/* Colors */
.prompt { color: #8B5CF6; }
.cmd    { color: #ffffff; font-weight: 600; }

.section {
  color: #FEBC2E;
  font-weight: 700;
  letter-spacing: .08em;
}

.check  { color: #28C840; margin-right: .5rem; }
.skill  { color: #8B5CF6; }
.arrow  { color: rgba(255,255,255,.3); }
.desc   { color: #28C840; }

.status-out {
  color: #8B8BFF;
  font-size: .82rem;
}

.cursor {
  color: #fff;
  font-size: .85rem;
  line-height: 1;
}

/* Animations */
.fade-in {
  animation: fadeIn .18s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
