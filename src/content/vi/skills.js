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
  SiGit,
  SiPostman,
  SiFirebase,
  SiVercel,
  SiFigma,
} from 'react-icons/si'
import { TbBrandAzure } from "react-icons/tb";
const skillsVi = {
  title: 'Kỹ năng',
  eyebrow: 'CÔNG NGHỆ ĐƯỢC SỬ DỤNG',
  subtitle:
    'Các công nghệ tôi sử dụng để xây dựng ứng dụng web, mobile và backend hiện đại.',
  centerTitle: 'KỸ NĂNG',
  centerText: 'Fullstack',

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

export default skillsVi