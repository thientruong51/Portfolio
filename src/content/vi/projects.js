const projects = {
  badge: 'DỰ ÁN',
  viewDetailLabel: 'Xem chi tiết',
  viewWebsiteLabel: 'Trang web',
  viewGithubLabel: 'GitHub',
  
  detailLabels: {
    back: 'Quay lại',
    breadcrumbProjects: 'Dự án',
    technologies: 'Công nghệ sử dụng',
    features: 'Tính năng chính',
    responsibilities: 'Vai trò của tôi',
    liveDemo: 'Trang web',
    github: 'GitHub',
    figma: 'Figma',
    video: 'Video',
    statsTechnologies: 'Công nghệ',
    statsFeatures: 'Tính năng',
    overview: 'Tổng quan',
    projectInfo: 'Thông tin dự án',
    role: 'Vai trò',
    teamSize: 'Quy mô nhóm',
    teamStructure: 'Cấu trúc nhóm',
    duration: 'Thời gian thực hiện',
    category: 'Loại dự án',
    gallery: 'Bộ sưu tập',
  },

  years: [
    {
      year: '2025',
      location: 'Dự án đại học',
      featuredProjectId: 'asms-system',

      projects: [
        {
          id: 'asms-system',
          title: 'Hệ thống quản lý và cho thuê kho căn hộ',
          shortTitle: 'ASMS',
          category: 'Web App Fullstack',

          role: 'Lead Frontend Developer',
          teamSize: 4,
          teamStructure: '3 Backend Developer, 1 Frontend Developer (tôi)',
          duration: '09/2025 - 12/2025',

          headline:
            'Nền tảng quản lý và cho thuê kho căn hộ với mô phỏng 3D',

          overview:
            'Một nền tảng số cho phép người dùng khám phá, đặt thuê và quản lý kho căn hộ thông qua mô phỏng 3D và dữ liệu trạng thái theo thời gian thực.',

          description:
            'ASMS (3D-Simulated Apartment Storage Management System) là hệ thống được xây dựng nhằm số hóa dịch vụ thuê kho trong các khu căn hộ. Hệ thống tích hợp mô phỏng 3D, hiển thị trạng thái kho theo thời gian thực và chức năng đặt thuê trực tuyến nhằm mang lại trải nghiệm minh bạch và tiện lợi cho người dùng.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591792/landing_m7xovz.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591792/landing_m7xovz.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591790/ld2_ipb32c.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/ld3_ifxtfa.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/ld5_gantcu.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591789/dashboard_zraxkt.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591789/dashboard2_rprgah.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591790/dashboard3_i0t54q.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591791/dashboard4_kkoqat.png',''],

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
            'Mô phỏng kho bằng công nghệ 3D',
            'Hiển thị trạng thái kho theo thời gian thực',
            'Đặt thuê và thanh toán trực tuyến qua PayOS',
            'Tích hợp Google Maps để định vị',
            'Dashboard quản lý dành cho admin',
          ],

          responsibilities: [
            'Lead frontend của dự án và phối hợp với team backend.',
            'Thiết kế toàn bộ kiến trúc giao diện và trải nghiệm người dùng.',
            'Phát triển toàn bộ component và hệ thống giao diện.',
            'Tích hợp API backend vào hệ thống frontend.',
          ],

          github: 'https://github.com/thientruong51/FE_ASMS_LandingPage',
          website: 'https://www.asms.website',
          figma: '',
          video: '',
        },

        {
          id: 'nekolingo',
          title: 'Nền tảng học ngôn ngữ Nekolingo',
          shortTitle: 'Nekolingo',
          category: 'Web & Mobile App',

          role: 'Lead Backend Developer',
          teamSize: 5,
          teamStructure: '3 Frontend Developer, 2 Backend Developer (tôi lead BE)',
          duration: '06/2025 - 08/2025',

          headline:
            'Ứng dụng học ngôn ngữ đa nền tảng với gamification',

          overview:
            'Một nền tảng học ngôn ngữ tương tự Duolingo, tích hợp gamification và AI để cá nhân hóa bài học.',

          description:
            'Nekolingo là ứng dụng học ngôn ngữ được thiết kế nhằm giúp người dùng cải thiện kỹ năng ngoại ngữ thông qua các bài học tương tác, trò chơi, thử thách và hệ thống phần thưởng. Ứng dụng hỗ trợ cả web và mobile với khả năng đồng bộ tiến độ học tập.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld_rzygq3.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld_rzygq3.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591772/ld2_ue7fai.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591773/ld3_zmpdhu.jpg'],

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
            'Học ngôn ngữ thông qua game và thử thách',
            'Hệ thống streak học tập mỗi ngày',
            'Bảng xếp hạng cạnh tranh giữa người học',
            'AI tạo bài học cá nhân hóa',
            'Đồng bộ tiến độ giữa web và mobile',
          ],

          responsibilities: [
            'Thiết kế kiến trúc backend và database.',
            'Phát triển toàn bộ logic nghiệp vụ backend.',
            'Tích hợp AI API và hệ thống thanh toán.',
            'Tối ưu hiệu năng hệ thống backend.',
          ],

          github: 'https://github.com/longbp1606/nekolingo-api',
          website: 'https://nekolingo-web.vercel.app/welcome',
          figma: '',
          video: '',
        },

        {
          id: 'smartbus',
          title: 'Nền tảng giao thông thông minh SmartBus',
          shortTitle: 'SmartBus',
          category: 'Web & Mobile App',

          role: 'Lead Frontend Developer',
          teamSize: 3,
          teamStructure: '2 Backend Developer, 1 Frontend Developer (tôi)',
          duration: '03/2025 - 05/2025',

          headline:
            'Ứng dụng giao thông công cộng thông minh',

          overview:
            'Ứng dụng giúp người dùng tra cứu tuyến xe buýt, theo dõi xe theo thời gian thực và tìm lộ trình tối ưu.',

          description:
            'SmartBus được xây dựng nhằm nâng cao trải nghiệm sử dụng xe buýt công cộng bằng cách tích hợp dữ liệu thời gian thực, tìm tuyến đường tối ưu và thanh toán điện tử.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld_tjcyra.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld_tjcyra.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld3_o30iac.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591807/ld7_ugbour.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld2_ekgg0x.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591803/ld4_vjgu7g.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591804/ld5_ytpgtr.png','https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591804/ld6_xbj96m.png'],

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
            'Theo dõi xe buýt theo thời gian thực',
            'Tìm tuyến đường tối ưu',
            'Thanh toán vé điện tử',
            'Hỗ trợ giảm giá cho sinh viên và người cao tuổi',
            'Tích hợp Google Maps',
          ],

          responsibilities: [
            'Lead frontend và thiết kế UI/UX.',
            'Phát triển toàn bộ giao diện web app.',
            'Tích hợp Google Maps API và dữ liệu giao thông.',
            'Tối ưu trải nghiệm người dùng.',
          ],

          github: 'https://github.com/thientruong51/SmartBusApp',
          website: 'https://smartbusvn.vercel.app/',
          figma: 'https://www.figma.com/design/wB321v5yHUGvIpN0uja2lI/SmartBus?node-id=0-1&t=c1EnUbk6Mc6MlaGk-1',
          video: 'https://www.youtube.com/watch?v=uqU-7K4ZLL4&list=LL&index=1&t=12s',
        },
      ],
    },

    {
      year: '2024',
      location: 'Dự án UI cá nhân',
      featuredProjectId: 'august-revolution',

      projects: [
        {
          id: 'august-revolution',
          title: 'Cách mạng tháng 8: Ăn may hay tất yếu?',
          shortTitle: 'Cách mạng tháng 8',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Dự án cá nhân',
          duration: '10/2024 - 12/2024',

          headline:
            'Thiết kế giao diện trình bày tranh luận lịch sử',

          overview:
            'Thiết kế giao diện trực quan nhằm trình bày các quan điểm tranh luận về Cách mạng tháng 8 năm 1945.',

          description:
            'Dự án tập trung vào việc trình bày nội dung lịch sử thông qua thiết kế giao diện hiện đại giúp người đọc dễ dàng tiếp cận các luận điểm và bối cảnh lịch sử.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591919/Screenshot_2026-03-15_232432_rk02az.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591919/Screenshot_2026-03-15_232432_rk02az.png'],

          technologies: ['React', 'Heyzine Flipbook'],
           website: 'https://vrn202-af1.vercel.app/',
        },

        {
          id: 'socialist-democracy',
          title:
            'Dân chủ xã hội chủ nghĩa và nhà nước xã hội chủ nghĩa',
          shortTitle: 'Dân chủ XHCN',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Dự án cá nhân',
          duration: '10/2024 - 12/2024',

          headline:
            'Thiết kế giao diện trình bày lý thuyết chính trị',

          overview:
            'Dự án thiết kế giao diện giúp trực quan hóa các khái niệm về dân chủ xã hội chủ nghĩa.',

          description:
            'Thiết kế tập trung vào việc trình bày các khái niệm lý thuyết chính trị một cách trực quan và dễ hiểu thông qua bố cục UI khoa học.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591925/Screenshot_2026-03-15_232514_d0d9lv.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591925/Screenshot_2026-03-15_232514_d0d9lv.png'],

          technologies: ['React'],
          website: 'https://mln131-nhom4.vercel.app/',
        },

        {
          id: 'national-independence',
          title:
            'Độc lập dân tộc – Từ khát vọng tiền nhân đến tư tưởng Hồ Chí Minh',
          shortTitle: 'Độc lập dân tộc',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Dự án cá nhân',
          duration: '11/2024',

          headline:
            'Thiết kế giao diện trình bày tư tưởng lịch sử',

          overview:
            'Dự án thiết kế giao diện giúp thể hiện quá trình phát triển của tư tưởng độc lập dân tộc.',

          description:
            'Thiết kế tập trung vào việc kể câu chuyện lịch sử thông qua bố cục UI hiện đại và dễ tiếp cận.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591863/Screenshot_2026-03-15_232414_nddec3.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591863/Screenshot_2026-03-15_232414_nddec3.png'],

          technologies: ['React'],
          website: 'https://hcm202-spirit.vercel.app/',
        },

        {
          id: 'gold-economy',
          title:
            'Có phải trong mọi nền kinh tế, càng nhiều vàng và tiền thì càng tốt?',
          shortTitle: 'Vàng và kinh tế',
          category: 'UI/UX Design',

          role: 'Frontend Developer',
          teamSize: 1,
          teamStructure: 'Dự án cá nhân',
          duration: '10/2024 - 12/2024',

          headline:
            'Thiết kế giao diện giải thích khái niệm kinh tế',

          overview:
            'Dự án UI nhằm giải thích các khái niệm kinh tế vĩ mô như cung tiền và lạm phát.',

          description:
            'Nội dung kinh tế được trình bày thông qua giao diện infographic giúp người đọc dễ dàng hiểu các lập luận kinh tế.',

          cover: 'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591842/Screenshot_2026-03-15_232351_fzfshq.png',
          images: ['https://res.cloudinary.com/dkfykdjlm/image/upload/v1773591842/Screenshot_2026-03-15_232351_fzfshq.png'],

          technologies: ['React'],
          website: 'https://mln122-expert.vercel.app/',
        },
      ],
    },
  ],
}

export default projects