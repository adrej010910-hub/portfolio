# Портфолио — современный сайт фрилансера

Premium-портфолио для начинающего фрилансера: разработка сайтов и продающих карточек для маркетплейсов (Wildberries, Ozon, Яндекс Маркет).

## Стек

- **Next.js 15** (App Router, SSR/SSG)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — reveal, parallax, stagger, магнитные кнопки
- **GSAP** — плавные scroll-анимации
- **Lenis** — smooth scroll
- **Three.js / React Three Fiber** — 3D-эффекты
- **next-themes** — тёмная/светлая тема
- **Lucide Icons**

## Быстрый старт

```bash
# установка зависимостей
npm install

# dev-сервер
npm run dev
# → http://localhost:3000

# продакшен-сборка
npm run build
npm start
```

## Структура проекта

```
src/
├── app/                 # страницы и глобальные стили (design system)
│   ├── globals.css      # токены, glassmorphism, mesh-gradient, анимации
│   ├── layout.tsx       # SEO-метаданные, шрифты, тема
│   └── page.tsx         # сборка секций
├── components/
│   ├── ui/              # Button, Input, Textarea, Badge (shadcn-style)
│   ├── effects/         # частицы, 3D-сетка, магнит, tilt, counter, ...
│   ├── layout/          # Navbar, Footer, ScrollProgress, BackToTop, ThemeToggle
│   └── sections/        # Hero, About, Skills, Portfolio, Services, WhyMe, Contact
└── config/
    └── site.ts          # ⚡ ВСЯ информация о вас: имя, навыки, проекты, контакты
```

## Настройка под себя

Все данные редактируются в **`src/config/site.ts`**:

- `siteConfig` — имя, email, Telegram, GitHub, статистика
- `skills` — карточки навыков (добавляйте/удаляйте)
- `projects` — работы в портфолио
- `services` — услуги
- `advantages` — блок «Почему я»

## Подключение формы

Форма в `Contact` сейчас имитирует отправку. Чтобы отправлять заявки реально (например, в Telegram-бот), замените блок в `src/components/sections/contact.tsx`:

```ts
// вместо await new Promise(...)
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

## Производительность

- Lazy-load тяжёлых эффектов, `prefers-reduced-motion` поддержка
- Статическая генерация страниц (SSG)
- Минимальный First Load JS ≈ 189 kB
- Адаптивность от 320px до 4K

