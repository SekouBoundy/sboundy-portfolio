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
    ui: {
      categories: 'CATÉGORIES',
      sections: 'SECTIONS',
      designNote: 'La pensée design,\nécrite noir sur blanc.',
      allNote: 'Dev · Design · Les deux.',
      comingSoon: 'Bientôt',
    },
    posts: [
      {
        id: 1, cat: 'Dev',
        title:   'Créer ta première app Flutter de zéro',
        excerpt: 'De zéro à une app mobile qui tourne — structure, état, et publication.',
        date: 'Bientôt', read: '8 min',
        outline: ['01 — Installer Flutter & structurer le projet', '02 — Widgets, état & la méthode build', '03 — Navigation entre les écrans', '04 — Connexion à une API', '05 — Build & publication sur le store'],
      },
      {
        id: 2, cat: 'Design',
        title:   'Comment je design mes UIs mobiles sur Figma',
        excerpt: 'Mon workflow perso — composants, auto-layout, et conseils de passation.',
        date: 'Bientôt', read: '6 min',
        outline: ['01 — Commencer par un moodboard', '02 — Mettre en place composants & tokens', '03 — Les astuces auto-layout que j\'utilise au quotidien', '04 — Prototyper les flux clés', '05 — Passer les specs au dev sans friction'],
      },
      {
        id: 3, cat: 'Dev',
        title:   'React vs React Native — ce qu\'il faut vraiment savoir',
        excerpt: 'Pas juste une comparaison. Un vrai guide pour quelqu\'un qui vient du web.',
        date: 'Bientôt', read: '5 min',
        outline: ['01 — Ce qu\'ils partagent (et ce qu\'ils ne partagent pas)', '02 — Style : CSS vs StyleSheet', '03 — Différences de navigation', '04 — Quand choisir quoi', '05 — Mon avis honnête'],
      },
      {
        id: 4, cat: 'Design',
        title:   'Créer une identité visuelle de A à Z',
        excerpt: 'Logo, couleurs, typographie — comment j\'aborde le brand design.',
        date: 'Bientôt', read: '7 min',
        outline: ['01 — Découverte : comprendre la marque', '02 — Choisir une direction typographique', '03 — Construire le système de couleurs', '04 — Construction du logo', '05 — Livrer le kit d\'identité'],
      },
      {
        id: 5, cat: 'Dev',
        title:   'Svelte 5 runes — une intro pratique',
        excerpt: 'Ce qui a changé, ce qui reste, et pourquoi les runes font sens.',
        date: 'Bientôt', read: '6 min',
        outline: ['01 — C\'est quoi les runes ?', '02 — $state vs l\'ancien système de stores', '03 — $derived & $effect en pratique', '04 — Props & snippets', '05 — Faut-il migrer maintenant ?'],
      },
    ],
  },
  skills: {
    groups: [
      {
        label: 'DÉVELOPPEMENT',
        items: [
          { skill: 'React',           desc: 'Apps web & SPAs' },
          { skill: 'Flutter',         desc: 'Mobile multiplateforme' },
          { skill: 'React Native',    desc: 'Mobile (iOS & Android)' },
          { skill: 'Svelte',          desc: 'UI web rapide et moderne' },
          { skill: 'HTML / CSS / JS', desc: 'Fondamentaux du web' },
        ],
      },
      {
        label: 'DESIGN & UI',
        items: [
          { skill: 'Figma',         desc: 'UI/UX & Prototypage' },
          { skill: 'Web Mockups',   desc: 'Systèmes de design complets' },
          { skill: 'Mobile Design', desc: 'UX iOS & Android' },
        ],
      },
      {
        label: 'CRÉATIF',
        items: [
          { skill: 'Dessin à la main', desc: 'Illustration & croquis' },
          { skill: 'Graphic Design',   desc: 'Flyers & identité visuelle' },
        ],
      },
    ],
    status: 'Étudiant | Disponible | Basé au Mali | FR · EN',
  },
  contact: {
    title:    'On discute.',
    subtitle: 'Un projet, une collab, ou juste dire bonjour — écris-moi.',
    sent: { title: 'Message envoyé.', sub: 'Je te réponds très vite.', again: 'Envoyer un autre →' },
    form: {
      name: 'Nom', namePlaceholder: 'Ton prénom',
      email: 'Email',
      message: 'Message', messagePlaceholder: 'De quoi veux-tu parler ?',
      submit: 'Envoyer →',
    },
    links: [
      { icon: '✉️', label: 'hello@sboundy.com' },
      { icon: '⌥',  label: 'GitHub'            },
      { icon: '▲',  label: 'Figma Community'   },
      { icon: 'in', label: 'LinkedIn'           },
    ],
  },
}