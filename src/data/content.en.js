/* src/data/content.en.js */
// ═══════════════════════════════════════
//  Content — English
// ═══════════════════════════════════════

export const content = {
  nav: {
    about:      'About Me',
    skills:     'Skills',
    projects:   'Projects',
    experience: 'Journey',
    blog:       'Blog',
    contact:    'Contact',
  },
  status: 'Student · Open to work',
  hero: {
    label: 'Developer · Designer · Creative',
  },
  about: {
    title:  'SBOUNDY',
    status: 'Student · Open to work',
    bio:    "I'm SBOUNDY — a student who <strong>builds</strong>, <strong>designs</strong>, and <strong>creates</strong> across every medium. From Flutter & React Native apps, to React web, to Figma mockups, to hand-drawn illustrations — I don't stay in one lane.",
    stats: {
      exp:   'Yrs Exp',
      lang:  'FR · EN',
      ideas: 'Ideas',
      base:  'Based',
    },
    tabs: {
      profile: 'Profile',
      stack:   'Tech Stack',
      journey: 'Journey',
    },
    journey: [
      { date: '2024 — now', role: 'Freelance Dev & Designer',  desc: 'Building products, designing interfaces, creating visual content.' },
      { date: '2023',       role: 'MaRevision — Lead Dev',     desc: 'Flutter app for BAC & DEF revision — built for Malian students.' },
      { date: '2022 — now', role: 'CS Student · Mali',         desc: 'Studying while building. Learning by doing — always.' },
    ],
  },
  projects: {
    title: 'Projects — SBOUNDY',
    items: [
      {
        id:    'marevision',
        name:  'MaRevision',
        desc:  'Mobile app for Malian students preparing for the BAC and DEF exams. Built with Flutter.',
        tags:  ['Flutter', 'Mobile', 'Education', 'Mali'],
        thumb: 'MR',
        color: 'linear-gradient(135deg, #1a1020, #2d1b69)',
      },
      {
        id:    'design',
        name:  'Design Work',
        desc:  'UI/UX projects — web and mobile interfaces crafted in Figma.',
        tags:  ['Figma', 'UI/UX', 'Web', 'Mobile'],
        thumb: 'UI',
        color: 'linear-gradient(135deg, #0d0d1a, #1a0f33)',
      },
      {
        id:    'illustration',
        name:  'Illustrations',
        desc:  'Flyers, graphics, and hand-drawn illustrations.',
        tags:  ['Illustration', 'Flyers', 'Graphic Design'],
        thumb: '✏',
        color: 'linear-gradient(135deg, #111, #2a2a2a)',
      },
    ],
  },
  blog: {
    title: 'Notes — Blog',
    ui: {
      categories: 'CATEGORIES',
      sections: 'SECTIONS',
      designNote: 'Design thinking,\nwritten down.',
      allNote: 'Dev · Design · Both.',
      comingSoon: 'Coming soon',
    },
    posts: [
      {
        id: 1, cat: 'Dev',
        title:   'Building your first Flutter app from scratch',
        excerpt: 'From zero to a working mobile app — structure, state, and shipping.',
        date: 'Coming soon', read: '8 min',
        outline: ['01 — Setting up Flutter & the project structure', '02 — Widgets, state & the build method', '03 — Navigation between screens', '04 — Connecting to an API', '05 — Building & shipping to the store'],
      },
      {
        id: 2, cat: 'Design',
        title:   'How I design mobile UIs in Figma',
        excerpt: 'My personal workflow — components, auto-layout, and handoff tips.',
        date: 'Coming soon', read: '6 min',
        outline: ['01 — Starting with a moodboard', '02 — Setting up components & tokens', '03 — Auto-layout tricks I use every day', '04 — Prototyping the key flows', '05 — Handing off to dev without pain'],
      },
      {
        id: 3, cat: 'Dev',
        title:   'React vs React Native — what you actually need to know',
        excerpt: 'Not just a comparison. A real guide for someone coming from web.',
        date: 'Coming soon', read: '5 min',
        outline: ['01 — What they share (and what they don\'t)', '02 — Styling: CSS vs StyleSheet', '03 — Navigation differences', '04 — When to pick which', '05 — My honest take'],
      },
      {
        id: 4, cat: 'Design',
        title:   'Creating a visual identity from scratch',
        excerpt: 'Logo, colors, type — how I approach brand design for small projects.',
        date: 'Coming soon', read: '7 min',
        outline: ['01 — Discovery: understanding the brand', '02 — Choosing a type direction', '03 — Building the color system', '04 — Logo construction', '05 — Delivering the identity kit'],
      },
      {
        id: 5, cat: 'Dev',
        title:   'Svelte 5 runes — a practical intro',
        excerpt: 'What changed, what stayed, and why runes actually make sense.',
        date: 'Coming soon', read: '6 min',
        outline: ['01 — What are runes?', '02 — $state vs the old store system', '03 — $derived & $effect in practice', '04 — Props & snippets', '05 — Should you migrate now?'],
      },
    ],
  },
  skills: {
    groups: [
      {
        label: 'DEVELOPMENT',
        items: [
          { skill: 'React',           desc: 'Web apps & SPAs' },
          { skill: 'Flutter',         desc: 'Cross-platform mobile' },
          { skill: 'React Native',    desc: 'Mobile (iOS & Android)' },
          { skill: 'Svelte',          desc: 'Fast, modern web UIs' },
          { skill: 'HTML / CSS / JS', desc: 'Web fundamentals' },
        ],
      },
      {
        label: 'DESIGN & UI',
        items: [
          { skill: 'Figma',         desc: 'UI/UX & Prototyping' },
          { skill: 'Web Mockups',   desc: 'Full design systems' },
          { skill: 'Mobile Design', desc: 'iOS & Android UX' },
        ],
      },
      {
        label: 'CREATIVE',
        items: [
          { skill: 'Hand Drawing',   desc: 'Illustration & sketches' },
          { skill: 'Graphic Design', desc: 'Flyers & visual identity' },
        ],
      },
    ],
    status: 'Student | Open to work | Based in Mali | FR · EN',
  },
  contact: {
    title:    "Let's talk.",
    subtitle: 'Have a project, a collab idea, or just want to say hi — reach out.',
    sent: { title: 'Message sent.', sub: "I'll get back to you soon.", again: 'Send another →' },
    form: {
      name: 'Name', namePlaceholder: 'Your name',
      email: 'Email',
      message: 'Message', messagePlaceholder: "What's on your mind?",
      submit: 'Send message →',
    },
    links: [
      { icon: '✉️', label: 'hello@sboundy.com' },
      { icon: '⌥',  label: 'GitHub'            },
      { icon: '▲',  label: 'Figma Community'   },
      { icon: 'in', label: 'LinkedIn'           },
    ],
  },
}