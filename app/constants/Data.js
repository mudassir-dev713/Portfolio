export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Contact', link: '#contact' },
];

export const gridItems = [
  {
    id: 1,
    title:
      'I prioritize collaboration and clear communication to bring out the best in every project.',
    description: '',
    className: 'lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]',
    imgClassName: 'w-full h-full',
    titleClassName: 'justify-end',
    img: '/b1.svg',
    spareImg: '',
  },
  {
    id: 2,
    title: 'Flexible with time zones — I adapt easily to global collaboration.',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '',
    spareImg: '',
  },
  {
    id: 3,
    title: 'My tech stack',
    description: 'I constantly try to improve',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-center',
    img: '',
    spareImg: '',
  },
  {
    id: 4,
    title: 'Tech enthusiast driven by curiosity and a deep love for coding.',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '/grid.svg',
    spareImg: '/b4.svg',
  },

  {
    id: 5,
    title: 'Currently developing a resume building app',
    description: 'The Inside Scoop',
    className: 'md:col-span-3 md:row-span-2',
    imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
    titleClassName: 'justify-center md:justify-start lg:justify-center',
    img: '/b5.svg',
    spareImg: '/grid.svg',
  },
  {
    id: 6,
    title: 'Do you want to start a project together?',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
    img: '',
    spareImg: '',
  },
];

export const projects = [
  {
    id: 1,
    title: 'LinkSnip For Url Shortening',
    des: 'LinkSnip is a full-stack Progressive Web Application (PWA) for shortening URLs, tracking analytics, and generating QR codes. It features real-time click tracking, a user-friendly dashboard, advanced security, and performance optimizations, all built using modern web technologies.',
    img: '/LinkSnip.png',
    iconLists: ['/re.svg', '/tail.svg', '/node.svg', '/mongo.svg', '/js.svg'],
    link: 'https://urlsnip.vercel.app/',
  },
  {
    id: 2,
    title: 'EduConnect',
    des: 'EduConnect is a responsive web app for schools, colleges, and coaching centers. Built with React.js and GSAP, it showcases academics, extracurriculars, and reputation through sleek design and motion effects, leaving a lasting impression on students and parents.',
    img: '/edu.png',
    iconLists: ['/re.svg', '/tail.svg', '/js.svg', '/gsap.svg'],
    link: 'https://educational-site-demo.netlify.app/',
  },
  {
    id: 3,
    title: 'FilmSnaps',
    des: 'FilmSnaps is a responsive web app for movie and TV enthusiasts. Using TMDB API and Firebase Auth, it delivers personalized experiences, letting users discover trending content, explore details, and interact seamlessly across all modern devices.',
    img: '/film.png',
    iconLists: ['/re.svg', '/tail.svg', '/js.svg', 'firebase.svg'],
    link: 'https://filmsnaps.netlify.app/',
  },
];
