export interface PersonalInfo {
  name: string;
  heroHeading: string;
  roles: string[];
  intro: string;
  college: string;
  degree: string;
  location: string;
  email: string;
  availability: string;
  avatarUrl: string;
  avatarFallback: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    x: string;
    email: string;
    codeforces: string;
    codechef: string;
    leetcode: string;
  };
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  screenshots: ProjectScreenshot[];
  techStack: string[];
  highlights?: string[];
  liveUrl?: string;
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  badge: string;
  points: string[];
}

export interface CompetitiveProgrammingProfile {
  platform: string;
  username: string;
  rankTitle: string;
  ratingValue: string | number;
  highlight: string;
  profileUrl: string;
  badgeColor: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  rank: string;
  event: string;
  description: string;
  tag: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export const navLinks: NavLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'CP', href: '#cp' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const portfolioData = {
  personal: {
    name: "Vijay Maheshwari",
    heroHeading: "Hi, I'm Vijay Maheshwari",
    roles: [
      "Full Stack Developer",
      "Competitive Programmer",
    ],
    intro:
      "B.Tech student in Electronics and Communication Engineering at PDPM IIITDM Jabalpur. I focus on building reliable full-stack web applications and solving challenging algorithmic problems.",
    college: "PDPM IIITDM Jabalpur",
    degree: "B.Tech in Electronics and Communication Engineering",
    location: "Jabalpur, India",
    email: "maheshwarivijay484@gmail.com",
    availability: "Open to Software Development Internships",
    avatarUrl: "/profile_photo/profile.png",
    avatarFallback: "/profile.png",
    resumeUrl:
      "https://drive.google.com/file/d/1WwW2hWp0HGkabxDb7-jTAEWUcrKSa1tX/view?usp=sharing",
    socials: {
      github: "https://github.com/mastercoder421",
      linkedin: "http://www.linkedin.com/in/vijay-maheshwari-136a7b2aa",
      instagram: "https://www.instagram.com/__vijay_maheshwari/",
      x: "https://x.com/VijayM29714",
      email: "maheshwarivijay484@gmail.com",
      codeforces: "https://codeforces.com/profile/RoarX2",
      codechef: "https://www.codechef.com/users/thrustycoder",
      leetcode: "https://leetcode.com/u/RoarX2/",
    },
  },

  stats: [
    {
      id: "problems",
      value: "1500+",
      label: "Problems Solved",
      description: "Codeforces, CodeChef, LeetCode",
    },
    {
      id: "cf-peak",
      value: "1409",
      label: "Codeforces Peak",
      description: "Specialist Rank",
    },
    {
      id: "codechef",
      value: "3★",
      label: "CodeChef Coder",
      description: "Consistent Contest Contender",
    },
    {
      id: "mentorship",
      value: "100+",
      label: "Students Mentored",
      description: "Programming & DSA Sessions",
    },
  ],

  about: {
    paragraphs: [
      "I'm a software developer passionate about competitive programming, full-stack development, and building practical solutions to real-world problems. I enjoy solving challenging problems, exploring new technologies, and turning ideas into functional applications.",
      "With a strong foundation in Data Structures and Algorithms, I focus on writing efficient, scalable code and approaching complex problems with logical thinking. I also enjoy understanding software architecture and building applications that are reliable, well-structured, and user-friendly.",
      "Feel free to connect if you'd like to discuss programming, web development, software engineering, or exciting tech ideas. Let's build something meaningful together!",
    ],
    education: {
      institute: "PDPM IIITDM Jabalpur",
      program: "B.Tech in Electronics and Communication Engineering",
      location: "Jabalpur, India",
    },
    whatIEnjoy: [
      {
        title: "Full-Stack Applications",
        description:
          "Building responsive web applications using React, Node.js, Express, and MongoDB, with an emphasis on clean code, useful features, and maintainable architecture.",
      },
      {
        title: "Problem Solving",
        description:
          "Exploring algorithms, optimising solutions, and tackling challenging problems through competitive programming.",
      },
      {
        title: "Learning & Collaboration",
        description:
          "Sharing knowledge, helping fellow students strengthen their programming fundamentals, and learning from people who approach problems differently.",
      },
    ],
    philosophy:
      "Good engineering is about understanding the problem, keeping solutions simple, and making every line of code count.",
    closing:
      "I'm always looking for opportunities to learn from experienced developers, collaborate with talented people, and contribute to projects that solve meaningful problems.",
    currentStatus: "Open to Software Development Internships.",
  },

  skills: [
    {
      title: "Frontend",
      skills: ["React.js", "HTML5", "CSS3", "Vite", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs"],
    },
    {
      title: "Databases & Cloud",
      skills: ["MongoDB", "MySQL", "Firebase", "Supabase"],
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "VS Code", "Android Studio"],
    },
  ],

  projects: [
    {
      id: "campusone",
      title: "CampusOne – Smart Campus Operating System",
      featured: true,
      description:
        "Full-stack campus management platform built to simplify everyday institute operations—handling attendance, course assignments, campus events, club activities, room allocations, grievances, and lost & found tracking.",
      screenshots: [
        {
          url: "/assets/campusone/student_dashboard.png",
          caption: "Student Dashboard & Course Overview",
        },
        {
          url: "/assets/campusone/campus_bot.png",
          caption: "AI Assistant (Gemini API Integration)",
        },
        {
          url: "/assets/campusone/campus_events.png",
          caption: "Campus Events & Clubs Governance",
        },
        {
          url: "/assets/campusone/Admin_dashboard.png",
          caption: "Administrative Control Center",
        },
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini API",
        "JWT",
      ],
      highlights: [
        "Role-based authentication tailored for students, faculty, and administrative staff.",
        "Integrated Google Gemini API to answer campus queries and guide students instantly.",
      ],
      liveUrl: "https://campus-one-nine.vercel.app/",
      githubUrl: "https://github.com/mastercoder421/CampusOne",
    },
    {
      id: "wallgodds",
      title: "WallGodds – Open Source Android Wallpaper App",
      featured: false,
      description:
        "An open-source Android wallpaper platform developed with Kotlin and Jetpack Compose. Integrated Firebase Authentication and backend cloud storage for seamless wallpaper delivery during GirlScript Summer of Code 2025.",
      screenshots: [],
      techStack: [
        "Kotlin",
        "Jetpack Compose",
        "Firebase Auth",
        "Android Studio",
      ],
      githubUrl: "https://github.com/mastercoder421/WallGodds-App/tree/main",
    },
  ],

  experience: [
    {
      id: "tp-mentor",
      role: "Programming Mentor",
      organization: "The Programming Club, IIITDM Jabalpur",
      period: "Aug 2025 – Present",
      location: "Jabalpur, MP",
      badge: "Mentorship",
      points: [
        "Mentored 100+ first-year students in foundational Data Structures & Algorithms.",
        "Conducted practical problem-solving sessions focusing on core algorithmic concepts.",
        "Created practice problems, ran editorial discussions, and supported students starting their competitive programming journey.",
      ],
    },
    {
      id: "bmc-lead",
      role: "Management Lead",
      organization: "Business & Management Club (BMC), IIITDM Jabalpur",
      period: "Aug 2025 – Present",
      location: "Jabalpur, MP",
      badge: "Leadership",
      points: [
        "Organized and managed 5+ campus events with over 500+ student participants.",
        "Led the 'Finance 101' workshop, helping students understand personal finance, budgeting, and investment basics.",
        "Coordinated event operations, publicity, and speaker logistics across student teams.",
      ],
    },
    {
      id: "jagriti-mentor",
      role: "Volunteer Mentor",
      organization: "Jagriti Student Initiative",
      period: "Aug 2024 – Present",
      location: "Jabalpur, MP",
      badge: "Community",
      points: [
        "Mentored 100+ school students from classes 5–12 in Mathematics, Logical Reasoning, and Aptitude for Jawahar Navodaya Vidyalaya entrance examinations.",
      ],
    },
  ],

  cpStats: {
    profiles: [
      {
        platform: "Codeforces",
        username: "RoarX2",
        rankTitle: "Specialist",
        ratingValue: 1409,
        highlight: "Specialist Rank • Max Rating 1409",
        profileUrl: "https://codeforces.com/profile/RoarX2",
        badgeColor: "cyan",
      },
      {
        platform: "CodeChef",
        username: "thrustycoder",
        rankTitle: "3 Star Coder",
        ratingValue: "3★",
        highlight: "Consistent Contest Contender",
        profileUrl: "https://www.codechef.com/users/thrustycoder",
        badgeColor: "amber",
      },
      {
        platform: "LeetCode",
        username: "RoarX2",
        rankTitle: "Knight",
        ratingValue: "Knight",
        highlight: "Knight Designation • Algorithmic Problem Solver",
        profileUrl: "https://leetcode.com/u/RoarX2/",
        badgeColor: "emerald",
      },
    ],
  },

  achievements: [
    {
      id: "starters-218",
      title: "CodeChef Starters 218",
      rank: "Global Rank 150",
      event: "CodeChef Division Contest",
      description: "Secured Global Rank 150.",
      tag: "Competitive Programming",
    },
    {
      id: "coderumble",
      title: "Coderumble National Contest",
      rank: "Top 20 Team Finish",
      event: "National Inter-College ICPC style Contest",
      description:
        "Secured Top 20 finish among 120 collegiate teams across India in intense algorithmic problem solving.",
      tag: "ICPC Style Contest",
    },
    {
      id: "class-12",
      title: "Class 12 Board Examination",
      rank: "District Rank 1",
      event: "Board Examination",
      description: "District Rank 1 (Felicitation by District Collector).",
      tag: "Academic Excellence",
    },
  ],
};
