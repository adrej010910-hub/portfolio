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
- **Собственный ThemeProvider** — тёмная/светлая тема (без внешних зависимостей, синхронизация с системой)
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
│   ├── page.tsx         # сборка секций
│   └── api/contact/     # ⚡ API-роут: проксирует заявки в бэкенд
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

## 🔌 Интеграция с Telegram-ботом (заявки)

Проект содержит **полностью автономного Telegram-бота** для оформления заказов прямо в Next.js — без внешнего бэкенда.

### Возможности бота
- **`/start`** — приветствие и список команд
- **`/order`** — оформление заказа в 5 шагов (имя → Telegram → услуга → бюджет → описание)
- **`/stats`** — статистика заказов (доступно владельцу): пользователи бота, всего заявок, за сегодня / за 7 дней, конверсия, разбивка по источникам и услугам, последние заявки
- **`/help`** — помощь

### Как это работает
1. Форма на сайте (`src/components/sections/contact.tsx`) → `POST /api/contact`
2. Заявки из бота → webhook `POST /api/telegram` → `src/lib/bot.ts`
3. Оба источника сохраняются через `src/lib/db.ts` и **отправляют уведомления владельцу** в Telegram
4. Данные хранятся в **Vercel KV** (Upstash Redis), с in-memory fallback для локальной разработки

### Требуемые переменные окружения (в Vercel → Settings → Environment Variables)

```env
# Токен бота от @BotFather
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...

# ID владельца(ев) для доступа к /stats (через запятую)
TELEGRAM_ADMIN_IDS=123456789

# Секрет для настройки webhook (любая строка)
WEBHOOK_SECRET=my-secret

# Vercel KV (подключите KV Store к проекту — переменные добавятся автоматически)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Токен для просмотра статистики через API (любая строка)
STATS_API_TOKEN=my-stats-token
```

### Настройка webhook (после деплоя)
Откройте один раз в браузере:
```
https://<ВАШ_VERCEL_URL>/api/telegram?setup=webhook&secret=<WEBHOOK_SECRET>
```
Или вручную:
```
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<URL>/api/telegram
```

### Статистика через API
```
GET https://<ВАШ_VERCEL_URL>/api/stats
Authorization: Bearer <STATS_API_TOKEN>
```

## Производительность

- Lazy-load тяжёлых эффектов, `prefers-reduced-motion` поддержка
- Статическая генерация страниц (SSG)
- Минимальный First Load JS ≈ 189 kB
- Адаптивность от 320px до 4K
