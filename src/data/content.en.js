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
    items: [
      { cat: 'Tutorial', title: 'Building your first Flutter app from scratch', date: 'Coming soon' },
      { cat: 'Design',   title: 'How to design a great mobile UI in Figma',     date: 'Coming soon' },
      { cat: 'Dev Tips', title: 'React vs React Native: what you need to know', date: 'Coming soon' },
    ],
  },
  contact: {
    title:    "Let's talk.",
    subtitle: 'Have a project? Want to collaborate? Or just say hi.',
    links: [
      { icon: '✉️', label: 'hello@sboundy.com' },
      { icon: '⌥',  label: 'GitHub'            },
      { icon: '▲',  label: 'Figma Community'   },
      { icon: 'in', label: 'LinkedIn'           },
    ],
  },
}