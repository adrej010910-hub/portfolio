export const siteConfig = {
  name: "Андрей",
  role: "Web Developer & UI/UX Designer",
  tagline: "Создаю современные цифровые продукты, сайты и интерфейсы.",
  subheading:
    "Соединяю сильный визуальный дизайн, продуманный UX и качественную frontend-разработку, чтобы цифровые продукты выглядели дорого и работали быстро.",
  email: "adrej010910@gmail.com",
  telegram: "https://t.me/ShadowwLi",
  github: "https://github.com/adrej010910-hub/portfolio",
  behance: "https://behance.net/andrey",
  location: "Россия · работаю удалённо по всему миру",
  stats: [
    { value: 6, suffix: "+", label: "web-проектов" },
    { value: 5, suffix: "", label: "концептуальных сайтов" },
    { value: 5, suffix: "+", label: "frontend-технологий" },
    { value: 100, suffix: "%", label: "внимания к деталям" },
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Навыки" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#services", label: "Услуги" },
  { href: "#contact", label: "Контакты" },
] as const;

export const skills = [
  { title: "Web Design", desc: "Сильная композиция, сетки и визуальная иерархия.", icon: "pen", accent: "from-sky-500 to-blue-600" },
  { title: "UI/UX", desc: "Продуманные интерфейсы и пользовательские сценарии.", icon: "layers", accent: "from-teal-400 to-cyan-600" },
  { title: "HTML / CSS", desc: "Семантика, адаптивность и современные layout-системы.", icon: "code", accent: "from-orange-500 to-rose-500" },
  { title: "JavaScript", desc: "Интерактивность, динамика и качественный UX.", icon: "terminal", accent: "from-yellow-400 to-amber-500" },
  { title: "React", desc: "Компонентные интерфейсы и масштабируемая архитектура.", icon: "atom", accent: "from-cyan-400 to-blue-600" },
  { title: "Figma", desc: "Прототипирование, UI и дизайн-системы.", icon: "figma", accent: "from-fuchsia-500 to-purple-600" },
  { title: "GSAP", desc: "Плавные scroll-анимации и выразительный motion.", icon: "rocket", accent: "from-violet-500 to-purple-600" },
  { title: "Lenis", desc: "Smooth scrolling и аккуратное ощущение движения.", icon: "sparkles", accent: "from-emerald-400 to-cyan-500" },
  { title: "Responsive", desc: "От мобильного экрана до больших desktop-разрешений.", icon: "smartphone", accent: "from-blue-500 to-indigo-600" },
  { title: "Git / GitHub", desc: "Контроль версий и production workflow.", icon: "github", accent: "from-slate-400 to-slate-700" },
  { title: "Vercel", desc: "Быстрый deployment и современная web-инфраструктура.", icon: "globe", accent: "from-white to-slate-500" },
  { title: "Accessibility", desc: "Доступные интерфейсы и внимательная семантика.", icon: "eye", accent: "from-cyan-400 to-indigo-500" },
] as const;

export const projects = [
  {
    title: "IRON PEAK — премиальный фитнес-клуб",
    tag: "Website · Premium Fitness",
    category: "websites",
    desc: "Многостраничный premium-сайт с видео-фоном, галереей, тарифами, формой записи и выразительными GSAP/Lenis-анимациями.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis"],
    accent: "from-orange-500 via-red-500 to-rose-500",
    image: "/portfolio/iron-peak.png",
    href: "https://iron-peak-gamma.vercel.app",
    link: "https://iron-peak-gamma.vercel.app",
  },
  {
    title: "LUXE ESTATE — Премиальная недвижимость",
    tag: "Website · Real Estate",
    category: "websites",
    desc: "Современный digital experience для премиальной недвижимости: объекты, фильтрация, планировки, галерея и форма заявки.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    accent: "from-amber-500 via-emerald-600 to-teal-700",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    href: "/projects/real-estate",
    link: "/projects/real-estate",
  },
  {
    title: "SYNTHEX AI — SaaS & AI Startup",
    tag: "Website · AI / SaaS",
    category: "websites",
    desc: "Футуристичный AI/SaaS experience с технологичной визуальной системой, тарифами, интерактивными блоками и motion-дизайном.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "from-purple-600 via-indigo-600 to-cyan-500",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    href: "/projects/ai-saas",
    link: "/projects/ai-saas",
  },
  {
    title: "AURA STUDIO — Premium E-Commerce",
    tag: "Website · Fashion Brand",
    category: "websites",
    desc: "Элегантный e-commerce концепт с каталогом, фильтрацией, карточками товаров, выбором размеров и интерактивной корзиной.",
    tech: ["Next.js", "React", "Tailwind CSS", "Cart State"],
    accent: "from-stone-600 via-zinc-800 to-neutral-900",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    href: "/projects/fashion-store",
    link: "/projects/fashion-store",
  },
  {
    title: "VORTEX — Digital & Web Agency",
    tag: "Website · Digital Agency",
    category: "websites",
    desc: "Креативный agency-сайт с editorial typography, интерактивными кейсами, процессом работы и выразительной системой motion.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Editorial UI"],
    accent: "from-rose-500 via-fuchsia-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    href: "/projects/digital-agency",
    link: "/projects/digital-agency",
  },
  {
    title: "L'ÉTOILE — Fine Dining",
    tag: "Website · Fine Dining",
    category: "websites",
    desc: "Атмосферный ресторанный experience с интерактивным меню, галереей, онлайн-бронированием и кинематографичным визуалом.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Validation"],
    accent: "from-amber-700 via-rose-900 to-stone-900",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    href: "/projects/restaurant",
    link: "/projects/restaurant",
  },
] as const;

export const services = [
  { num: "01", title: "Website Development", desc: "Разработка современных сайтов с нуля: структура, frontend, адаптивность и motion.", icon: "monitor" },
  { num: "02", title: "Landing Pages", desc: "Фокусные лендинги с сильной визуальной подачей, UX и понятным CTA.", icon: "target" },
  { num: "03", title: "UI/UX Design", desc: "Интерфейсы, прототипы и визуальные системы, которые помогают продукту выглядеть цельно.", icon: "palette" },
  { num: "04", title: "Website Redesign", desc: "Переработка устаревшего сайта: новая структура, визуал, responsive и интерактив.", icon: "refresh" },
  { num: "05", title: "Interactive Web Experiences", desc: "Нестандартные digital experiences с motion, scroll-анимациями и микроинтеракциями.", icon: "sparkles" },
] as const;

export const advantages = [
  { title: "Современный дизайн", desc: "Актуальная визуальная система без шаблонного ощущения.", icon: "sparkles" },
  { title: "Внимание к деталям", desc: "Типографика, ритм, spacing и микроинтеракции проработаны до мелочей.", icon: "eye" },
  { title: "Frontend-first", desc: "Дизайн сразу учитывает реальную реализацию и производительность.", icon: "code" },
  { title: "Индивидуальный подход", desc: "Каждый проект получает собственную визуальную систему и характер.", icon: "user" },
  { title: "Responsive", desc: "Опыт одинаково аккуратен на телефоне, планшете и desktop.", icon: "smartphone" },
  { title: "Аккуратный код", desc: "Понятная компонентная структура, которую легко развивать.", icon: "code" },
  { title: "Motion с целью", desc: "Анимации усиливают интерфейс, а не превращают его в набор эффектов.", icon: "zap" },
] as const;
