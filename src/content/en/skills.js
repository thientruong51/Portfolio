import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMui,
  SiNodedotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiMongoose,
  SiGit,
  SiPostman,
  SiFirebase,
  SiVercel,
  SiFigma,
} from 'react-icons/si'
import { TbBrandAzure } from "react-icons/tb";
const skills = {
  title: 'Skills',
  eyebrow: 'TECH STACK',
  subtitle:
    'Technologies I use to build modern web, mobile, and backend applications.',
  centerTitle: 'SKILLS',
  centerText: 'Fullstack stack',

  groups: {
    frontend: [
      { name: 'React', icon: SiReact, group: 'Frontend' },
      { name: 'React Native', icon: SiReact, group: 'Mobile' },
      { name: 'Next.js', icon: SiNextdotjs, group: 'Frontend' },
      { name: 'TypeScript', icon: SiTypescript, group: 'Programming language' },
      { name: 'JavaScript', icon: SiJavascript, group: 'Programming language' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, group: 'Frontend' },
      { name: 'MUI', icon: SiMui, group: 'Frontend' },
    ],

    backend: [
      { name: 'Node.js', icon: SiNodedotjs, group: 'Backend' },
      { name: 'NestJS', icon: SiNestjs, group: 'Backend' },
      { name: 'Postman', icon: SiPostman, group: 'Backend' },
    ],

    database: [
      { name: 'MongoDB', icon: SiMongodb, group: 'Database' },
      { name: 'PostgreSQL', icon: SiPostgresql, group: 'Database' },
      { name: 'MySQL', icon: SiMysql, group: 'Database' },
      { name: 'Mongoose', icon: SiMongoose, group: 'Database' },
    ],

    tools: [
      { name: 'Git', icon: SiGit, group: 'Tools' },
      { name: 'Azure', icon: TbBrandAzure, group: 'Tools' },
      { name: 'Firebase', icon: SiFirebase, group: 'Tools' },
      { name: 'Vercel', icon: SiVercel, group: 'Tools' },
      { name: 'Figma', icon: SiFigma, group: 'Tools' },
    ],
  },
}

export default skills