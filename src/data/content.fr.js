/* src/data/content.fr.js */
// ═══════════════════════════════════════
//  Content — Français
// ═══════════════════════════════════════

export const content = {
  nav: {
    about:      'À propos',
    skills:     'Compétences',
    projects:   'Projets',
    experience: 'Parcours',
    blog:       'Blog',
    contact:    'Contact',
  },
  status: 'Étudiant · Disponible',
  hero: {
    label: 'Développeur · Designer · Créatif',
  },
  about: {
    title:  'SBOUNDY',
    status: 'Étudiant · Disponible',
    bio:    "Je suis SBOUNDY — un étudiant qui <strong>construit</strong>, <strong>conçoit</strong> et <strong>crée</strong> sur tous les supports. Des apps Flutter & React Native, aux expériences web React, aux maquettes Figma, aux illustrations dessinées à la main.",
    stats: {
      exp:   'Ans d\'exp.',
      lang:  'FR · EN',
      ideas: 'Idées',
      base:  'Basé',
    },
    tabs: {
      profile: 'Profil',
      stack:   'Stack',
      journey: 'Parcours',
    },
    journey: [
      { date: '2024 — now', role: 'Freelance Dev & Designer',  desc: 'Construction de produits, design d\'interfaces, contenu visuel.' },
      { date: '2023',       role: 'MaRevision — Dev Principal', desc: 'App Flutter pour la révision BAC & DEF — étudiants maliens.' },
      { date: '2022 — now', role: 'Étudiant Info · Mali',       desc: 'Étudier tout en construisant. Apprendre par la pratique.' },
    ],
  },
  projects: {
    title: 'Projets — SBOUNDY',
    items: [
      {
        id:    'marevision',
        name:  'MaRevision',
        desc:  'Application mobile pour les étudiants maliens préparant le BAC et le DEF. Conçue avec Flutter.',
        tags:  ['Flutter', 'Mobile', 'Éducation', 'Mali'],
        thumb: 'MR',
        color: 'linear-gradient(135deg, #1a1020, #2d1b69)',
      },
      {
        id:    'design',
        name:  'Travaux Design',
        desc:  'Projets UI/UX — interfaces web et mobile sur Figma.',
        tags:  ['Figma', 'UI/UX', 'Web', 'Mobile'],
        thumb: 'UI',
        color: 'linear-gradient(135deg, #0d0d1a, #1a0f33)',
      },
      {
        id:    'illustration',
        name:  'Illustrations',
        desc:  'Flyers, créations graphiques et illustrations dessinées à la main.',
        tags:  ['Illustration', 'Flyers', 'Design Graphique'],
        thumb: '✏',
        color: 'linear-gradient(135deg, #111, #2a2a2a)',
      },
    ],
  },
  blog: {
    title: 'Notes — Blog',
    items: [
      { cat: 'Tutoriel',    title: 'Créer votre première app Flutter de zéro',    date: 'Bientôt' },
      { cat: 'Design',      title: 'Comment designer une belle UI mobile Figma',   date: 'Bientôt' },
      { cat: 'Astuces Dev', title: 'React vs React Native : ce qu\'il faut savoir', date: 'Bientôt' },
    ],
  },
  contact: {
    title:    'On discute.',
    subtitle: 'Un projet ? Envie de collaborer ? Ou juste dire bonjour.',
    links: [
      { icon: '✉️', label: 'hello@sboundy.com' },
      { icon: '⌥',  label: 'GitHub'            },
      { icon: '▲',  label: 'Figma Community'   },
      { icon: 'in', label: 'LinkedIn'           },
    ],
  },
}