const projects = {
  badge: 'PROJECTS',
  viewDetailLabel: 'View Detail',
 viewWebsiteLabel: 'Website',
  viewGithubLabel: 'GitHub',
  detailLabels: {
    back: 'Back',
    breadcrumbProjects: 'Projects',
    technologies: 'Technologies Used',
    features: 'Key Features',
    responsibilities: 'My Responsibilities',
    liveDemo: 'Live Demo',
    github: 'GitHub',
    figma: 'Figma',
    video: 'Video',
    statsTechnologies: 'Technologies',
    statsFeatures: 'Key Features',
    overview: 'Overview',
    projectInfo: 'Project Info',
    role: 'Role',
    teamSize: 'Team Size',
    teamStructure: 'Team Structure',
    duration: 'Duration',
    category: 'Category',
    gallery: 'Gallery',
  },

  years: [
    {
      year: '2025',
      location: 'University Projects',
      featuredProjectId: 'asms-system',

      projects: [
        {
          id: 'asms-system',
          title: 'Apartment Storage Management System',
          shortTitle: 'ASMS',
          category: 'Fullstack Web App',

          role: 'Lead Frontend Developer',
          teamSize: 4,
          teamStructure: '3 Backend Developers, 1 Frontend Developer (Me)',
          duration: '09/2025 - 12/2025',

          headline:
            'Apartment Storage Rental and Management Platform with 3D Simulation',

          overview:
            'A digital platform that allows users to explore, rent, and manage apartment storage units through 3D visualization and real-time availability.',

          description:
            'ASMS (3D-Simulated Apartment Storage Management System) was developed to digitize storage rental services within apartment complexes. The platform integrates 3D simulation, real-time unit availability, and online booking features to deliver a transparent and convenient experience for users.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591792/landing_m7xovz.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591792/landing_m7xovz.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591790/ld2_ipb32c.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/ld3_ifxtfa.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/ld5_gantcu.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591789/dashboard_zraxkt.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591789/dashboard2_rprgah.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591790/dashboard3_i0t54q.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/dashboard4_kkoqat.png',
          ],

          technologies: [
            'React',
            'React Native',
            'TypeScript',
            'C#',
            '.NET',
            'Azure',
            'SQL Server',
            'Cloudinary',
            'PayOS',
            'Google Maps',
            'MailKit',
            'Vercel',
          ],

          features: [
            '3D storage visualization',
            'Real-time storage availability',
            'Online booking and payment via PayOS',
            'Google Maps integration',
            'Admin management dashboard',
          ],

          responsibilities: [
            'Led frontend development and collaborated with backend developers.',
            'Designed the entire UI/UX architecture.',
            'Developed all UI components and interface systems.',
            'Integrated backend APIs into the frontend application.',
          ],

          github: 'https://github.com/thientruong51/FE_ASMS_LandingPage',
          website: 'https://www.asms.website',
          figma: '',
          video: '',
        },

        {
          id: 'nekolingo',
          title: 'Nekolingo Language Learning Platform',
          shortTitle: 'Nekolingo',
          category: 'Web & Mobile App',

          role: 'Lead Backend Developer',
          teamSize: 5,
          teamStructure: '3 Frontend Developers, 2 Backend Developers (I led BE)',
          duration: '06/2025 - 08/2025',

          headline:
            'Multi-platform Language Learning Application with Gamification',

          overview:
            'A Duolingo-like language learning platform integrating gamification and AI to personalize lessons.',

          description:
            'Nekolingo is a language learning application designed to help users improve language skills through interactive lessons, games, challenges, and reward systems. The platform supports both web and mobile environments with synchronized learning progress.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld_rzygq3.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld_rzygq3.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591772/ld2_ue7fai.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld3_zmpdhu.jpg',
          ],

          technologies: [
            'React',
            'React Native',
            'NestJS',
            'MongoDB',
            'Docker',
            'Cloudinary',
            'Cloudflare',
            'VNPay',
            'Gemini API',
            'TypeScript',
          ],

          features: [
            'Game-based language learning',
            'Daily learning streak system',
            'Leaderboard competition system',
            'AI-generated personalized lessons',
            'Cross-platform progress synchronization',
          ],

          responsibilities: [
            'Designed backend architecture and database structure.',
            'Developed core backend business logic.',
            'Integrated AI APIs and payment systems.',
            'Optimized backend performance.',
          ],

          github: 'https://github.com/longbp1606/nekolingo-api',
          website: 'https://nekolingo-web.vercel.app',
          figma: '',
          video: '',
        },

        {
          id: 'smartbus',
          title: 'SmartBus Intelligent Transportation Platform',
          shortTitle: 'SmartBus',
          category: 'Web & Mobile App',

          role: 'Lead Frontend Developer',
          teamSize: 3,
          teamStructure: '2 Backend Developers, 1 Frontend Developer (Me)',
          duration: '03/2025 - 05/2025',

          headline:
            'Smart Public Transportation Application',

          overview:
            'An application that helps users search bus routes, track buses in real time, and find optimal travel routes.',

          description:
            'SmartBus was built to enhance public transportation experiences by integrating real-time data, smart route planning, and electronic ticket payments.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld_tjcyra.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld_tjcyra.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld3_o30iac.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld7_ugbour.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld2_ekgg0x.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld4_vjgu7g.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591804/ld5_ytpgtr.png',
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591804/ld6_xbj96m.png',
          ],

          technologies: [
            'React',
            'React Native',
            'JavaScript',
            'C#',
            '.NET',
            'Azure',
            'Cloudinary',
            'Vercel',
            'PayOS',
            'Google Maps API',
            'Expo',
          ],

          features: [
            'Real-time bus tracking',
            'Smart route planning',
            'Digital ticket payments',
            'Student and senior discount support',
            'Google Maps integration',
          ],

          responsibilities: [
            'Led frontend development and UI/UX design.',
            'Developed the entire web application interface.',
            'Integrated Google Maps APIs and transportation data.',
            'Optimized user experience.',
          ],

          github: 'https://github.com/thientruong51/SmartBusApp',
          website: 'https://smartbusvn.vercel.app/',
          figma:
            'https://www.figma.com/design/wB321v5yHUGvIpN0uja2lI/SmartBus?node-id=0-1&t=c1EnUbk6Mc6MlaGk-1',
          video:
            'https://www.youtube.com/watch?v=uqU-7K4ZLL4&list=LL&index=1&t=12s',
        },
      ],
    },

    {
      year: '2024',
      location: 'Personal UI Projects',
      featuredProjectId: 'august-revolution',

      projects: [
        {
          id: 'august-revolution',
          title: 'August Revolution: Luck or Inevitability?',
          shortTitle: 'August Revolution',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Personal Project',
          duration: '10/2024 - 12/2024',

          headline:
            'Interface Design for Historical Debate Presentation',

          overview:
            'A UI design project presenting historical debates about the August Revolution of 1945.',

          description:
            'This project focuses on presenting historical topics through modern interface design to make historical arguments easier to understand.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591919/Screenshot_2026-03-15_232432_rk02az.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591919/Screenshot_2026-03-15_232432_rk02az.png',
          ],

          technologies: ['React', 'Heyzine Flipbook'],
          website: 'https://vrn202-af1.vercel.app/',
        },

        {
          id: 'socialist-democracy',
          title:
            'Socialist Democracy and the Socialist State',
          shortTitle: 'Socialist Democracy',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Personal Project',
          duration: '10/2024 - 12/2024',

          headline:
            'Political Theory Interface Design',

          overview:
            'A UI project visualizing the concepts of socialist democracy.',

          description:
            'The project focuses on presenting political theory concepts through structured UI layouts.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591925/Screenshot_2026-03-15_232514_d0d9lv.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591925/Screenshot_2026-03-15_232514_d0d9lv.png',
          ],

          technologies: ['React'],
          website: 'https://mln131-nhom4.vercel.app/',
        },

        {
          id: 'national-independence',
          title:
            'National Independence – From Historical Aspirations to Ho Chi Minh Ideology',
          shortTitle: 'National Independence',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Personal Project',
          duration: '11/2024',

          headline:
            'Historical Ideology Interface Design',

          overview:
            'A UI design project illustrating the development of Vietnam’s independence ideology.',

          description:
            'The project focuses on storytelling through UI to explain historical ideological development.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591863/Screenshot_2026-03-15_232414_nddec3.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591863/Screenshot_2026-03-15_232414_nddec3.png',
          ],

          technologies: ['React'],
          website: 'https://hcm202-spirit.vercel.app/',
        },

        {
          id: 'gold-economy',
          title:
            'Is More Gold and Money Always Better for an Economy?',
          shortTitle: 'Gold & Economy',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Personal Project',
          duration: '10/2024 - 12/2024',

          headline:
            'Economic Concept Interface Design',

          overview:
            'A UI project explaining macroeconomic concepts such as money supply and inflation.',

          description:
            'Economic discussions are presented through infographic-style interface design.',

          cover:
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591842/Screenshot_2026-03-15_232351_fzfshq.png',

          images: [
            'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591842/Screenshot_2026-03-15_232351_fzfshq.png',
          ],

          technologies: ['React'],
          website: 'https://mln122-expert.vercel.app/',
        },
      ],
    },
  ],
}

export default projects