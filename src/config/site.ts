export const siteConfig = {
  name: "Андрей",
  role: "Веб-разработчик и дизайнер",
  tagline: "Создаю современные сайты и продающий дизайн карточек для маркетплейсов.",
  subheading:
    "Помогаю бизнесу выделяться среди конкурентов благодаря качественному дизайну, современным сайтам и вниманию к деталям.",
  email: "adrej010910@gmail.com",
  telegram: "https://t.me/ShadowwLi",
  github: "https://github.com/andrey",
  behance: "https://behance.net/andrey",
  location: "Россия · работаю удалённо по всему миру",
  stats: [
    { value: 4, suffix: "+", label: "Проекта в портфолио" },
    { value: 3, suffix: "", label: "Карточки для маркетплейсов" },
    { value: 24, suffix: "/7", label: "На связи для клиентов" },
    { value: 100, suffix: "%", label: "Вовлечённость в проект" },
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
  {
    title: "Web Design",
    desc: "Современные макеты, сетки и визуальная иерархия.",
    icon: "pen",
    accent: "from-sky-500 to-blue-600",
  },
  {
    title: "Landing Page",
    desc: "Продающие одностраничники под конкретную цель.",
    icon: "rocket",
    accent: "from-violet-500 to-purple-600",
  },
  {
    title: "UI/UX",
    desc: "Продуманные интерфейсы и удобные пользовательские пути.",
    icon: "layers",
    accent: "from-teal-400 to-cyan-600",
  },
  {
    title: "HTML",
    desc: "Семантичная, валидная и доступная разметка.",
    icon: "code",
    accent: "from-orange-500 to-rose-500",
  },
  {
    title: "CSS",
    desc: "Анимации, сетки, адаптив и современные свойства.",
    icon: "palette",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    title: "JavaScript",
    desc: "Интерактивность, динамика и плавный UX.",
    icon: "terminal",
    accent: "from-yellow-400 to-amber-500",
  },
  {
    title: "React",
    desc: "Компонентный подход и быстрые интерфейсы.",
    icon: "atom",
    accent: "from-cyan-400 to-blue-600",
  },
  {
    title: "Figma",
    desc: "Дизайн, прототипирование и дизайн-системы.",
    icon: "figma",
    accent: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "Photoshop",
    desc: "Ретушь, обработка изображений и превью.",
    icon: "image",
    accent: "from-sky-600 to-blue-800",
  },
  {
    title: "Карточки Wildberries",
    desc: "Инфографика и контент, которые продают.",
    icon: "shopping",
    accent: "from-pink-500 to-rose-600",
  },
  {
    title: "Карточки Ozon",
    desc: "Адаптация под требования площадки.",
    icon: "package",
    accent: "from-blue-500 to-cyan-600",
  },
  {
    title: "Карточки Я.Маркет",
    desc: "Структура, атрибуты и визуал под ранжирование.",
    icon: "grid",
    accent: "from-red-500 to-orange-600",
  },
] as const;

export const projects = [
  {
    title: "Продающий баннер для карточки товара",
    tag: "Маркетплейсы · WB",
    desc: "Широкий инфографический баннер с преимуществами товара: яркие акценты, иконки и структура, которая ведёт покупателя к решению о покупке.",
    tech: ["Figma", "Photoshop", "Wildberries"],
    accent: "from-violet-500 via-purple-600 to-indigo-600",
    image: "/portfolio/work-1.png",
    href: "#",
    link: undefined,
  },
  {
    title: "Комплект инфографики для Wildberries",
    tag: "Маркетплейсы · WB",
    desc: "Полный набор карточек: главное фото, размерная сетка, преимущества и стоп-мотивы. Контент, который продаёт без слов.",
    tech: ["Figma", "Photoshop", "Wildberries"],
    accent: "from-pink-500 via-rose-500 to-fuchsia-500",
    image: "/portfolio/work-2.png",
    href: "#",
    link: undefined,
  },
  {
    title: "Карточка товара для Ozon",
    tag: "Маркетплейсы · Ozon",
    desc: "Инфографика, адаптированная под требования Ozon: чёткая структура, характеристики и комплектация в удобном для покупателя формате.",
    tech: ["Photoshop", "Figma", "Ozon"],
    accent: "from-cyan-400 via-blue-500 to-indigo-500",
    image: "/portfolio/work-3.png",
    href: "#",
    link: undefined,
  },
  {
    title: "IRON PEAK — премиальный фитнес-клуб",
    tag: "Сайт · HTML/CSS/JS",
    desc: "Полноценный многостраничный сайт для премиального фитнес-клуба с анимациями, видео-фоном, адаптивным дизайном, галереей, тарифами и формой записи. Современный премиум-дизайн.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis"],
    accent: "from-orange-500 via-red-500 to-rose-500",
    image: "/portfolio/iron-peak.png",
    href: "#",
    link: "https://iron-peak-gamma.vercel.app",
  },
] as const;

export const services = [
  {
    num: "01",
    title: "Создание сайтов",
    desc: "Разрабатываю сайты с нуля: от структуры и прототипа до готового адаптивного сайта с анимациями.",
    icon: "monitor",
  },
  {
    num: "02",
    title: "Лендинги",
    desc: "Одностраничные сайты под продажу товара или услуги. Фокус на конверсию и скорость загрузки.",
    icon: "target",
  },
  {
    num: "03",
    title: "Дизайн карточек маркетплейсов",
    desc: "Продающая инфографика для Wildberries, Ozon и Яндекс Маркета. Учитываю требования каждой площадки.",
    icon: "shopping",
  },
  {
    num: "04",
    title: "Редизайн существующих сайтов",
    desc: "Обновляю устаревшие сайты: современный дизайн, адаптивность, скорость и новые смыслы.",
    icon: "refresh",
  },
] as const;

export const advantages = [
  { title: "Современный дизайн", desc: "Актуальные тренды и свежие визуальные решения.", icon: "sparkles" },
  { title: "Быстрая обратная связь", desc: "Отвечаю оперативно и держу в курсе на каждом этапе.", icon: "zap" },
  { title: "Индивидуальный подход", desc: "Учитываю цели, аудиторию и характер вашего бизнеса.", icon: "user" },
  { title: "Работа на результат", desc: "Моя цель — не просто красиво, а чтобы это работало.", icon: "target" },
  { title: "Адаптивная вёрстка", desc: "Идеально на любом устройстве: телефон, планшет, десктоп.", icon: "smartphone" },
  { title: "Аккуратный код", desc: "Чистая и понятная структура, которую легко развивать.", icon: "code" },
  { title: "Внимание к деталям", desc: "Мелочи решают: отступы, типографика, микроанимации.", icon: "eye" },
] as const;

