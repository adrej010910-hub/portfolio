"use client";

import { useState } from "react";
import { ShowcaseHeader } from "@/components/layout/showcase-header";
import {
  Sparkles,
  ArrowUpRight,
  Check,
  Globe,
  Layers,
  Palette,
  Code,
  Zap,
  Smartphone,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  description: string;
  metrics: string;
  tech: string[];
}

const CASES: CaseStudy[] = [
  {
    id: "case-1",
    title: "NEO BANK — Финтех Платформа 3.0",
    client: "Neo Financial Inc.",
    category: "Fintech App & Web",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description: "Разработка экосистемы нового цифрового банка: от нейминга и дизайна мобильного приложения до веб-платформы с генеративными финансовыми советами.",
    metrics: "+280% конверсия в регистрацию",
    tech: ["Next.js", "React Native", "Tailwind CSS", "WebGL"],
  },
  {
    id: "case-2",
    title: "AETHER — 3D Платформа для Модельеров",
    client: "Aether World Ltd.",
    category: "3D Web & Interactive",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    description: "Интерактивная 3D-платформа для демонстрации виртуальных коллекций одежды с подгрузкой Three.js моделей в реальном времени.",
    metrics: "4.8 миллиона визитов за 1-й месяц",
    tech: ["Three.js", "WebGL", "GSAP", "Next.js"],
  },
  {
    id: "case-3",
    title: "KINETIC — Бренд-система и Медиа",
    client: "Kinetic Energy",
    category: "Branding & Strategy",
    year: "2024",
    image: "https://images.unsplash.com/photo-1542744094-3a3172720177?q=80&w=1200&auto=format&fit=crop",
    description: "Полный ребрендинг технологической компании: айдентика, гайдлайны, 3D иллюстрации, рекламный видеопродакшн и презентационный сайт.",
    metrics: "Победитель Red Dot Award 2024",
    tech: ["Figma", "Blender", "Brand Strategy"],
  },
];

export default function DigitalAgencyPage() {
  const [selectedService, setSelectedService] = useState<string>("Web Development");
  const [budget, setBudget] = useState<number>(300000);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-500/30">
      <ShowcaseHeader title="VORTEX STUDIO" category="Digital Agency" currentSlug="digital-agency" />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Принимаем проекты на Q2 / Q3 2025
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-8xl leading-none">
            Мы создаём <br />
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              цифровые продукты
            </span>{" "}
            будущего
          </h1>

          <p className="mt-8 max-w-2xl text-base text-neutral-400 sm:text-xl font-light leading-relaxed">
            VORTEX — независимая креативная студия. Объединяем смелый дизайн, трехмерную графику и безупречную инженерию для лидеров рынка.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
            >
              Запустить проект <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#works"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-8 py-4 text-sm font-semibold text-neutral-200 transition-all hover:border-neutral-600 hover:text-white"
            >
              Смотреть кейсы
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-neutral-900 bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Услуги</span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-5xl">Чем мы занимаемся</h2>
            </div>
            <p className="max-w-md text-xs text-neutral-400 leading-relaxed">
              Полный цикл создания цифрового продукта — от продуктовой аналитики до разработки и глобального запуска.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Palette,
                title: "UI/UX & Web Design",
                desc: "Продуманные интерактивные интерфейсы, дизайн-системы и визуальные концепты.",
              },
              {
                icon: Code,
                title: "Custom Development",
                desc: "Высоконагруженные Next.js приложения, интеграции API, анимации и быстродействие.",
              },
              {
                icon: Layers,
                title: "Brand Identity",
                desc: "Нейминг, логотипы, 3D-графика, брендбуки и визуальная стратегия для брендов.",
              },
              {
                icon: Zap,
                title: "Motion & 3D Interactive",
                desc: "Впечатляющие 3D-сцены WebGL, промо-сайты и кинематографичные микроанимации.",
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-rose-500/50 hover:bg-neutral-900"
              >
                <div>
                  <srv.icon className="h-8 w-8 text-rose-500 transition-transform group-hover:scale-110" />
                  <h3 className="mt-4 text-xl font-bold text-white">{srv.title}</h3>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-rose-400">
                  Подробнее <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Портфолио</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-5xl">Избранные кейсы</h2>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {CASES.map((cs, idx) => (
            <div
              key={cs.id}
              className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 transition-all duration-500 hover:border-rose-500/40"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>{cs.category}</span>
                      <span>{cs.year}</span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {cs.title}
                    </h3>

                    <p className="mt-3 text-xs text-neutral-400 leading-relaxed">{cs.description}</p>

                    <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs font-semibold text-rose-300">
                      🔥 {cs.metrics}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {cs.tech.map((t) => (
                        <span key={t} className="rounded-full bg-neutral-800 px-3 py-1 text-[11px] text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCase(cs)}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
                  >
                    Изучить кейс подробнее <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute right-4 top-4 rounded-full bg-neutral-800 p-2 text-neutral-300 hover:text-white"
            >
              ✕
            </button>
            <span className="text-xs font-mono uppercase text-rose-400">{selectedCase.category} · {selectedCase.year}</span>
            <h2 className="mt-1 text-2xl font-bold text-white">{selectedCase.title}</h2>
            <img src={selectedCase.image} alt={selectedCase.title} className="mt-4 h-64 w-full rounded-2xl object-cover" />
            <p className="mt-4 text-xs text-neutral-300 leading-relaxed">{selectedCase.description}</p>
            <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 font-semibold">
              Результат: {selectedCase.metrics}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Contact & Budget Calculator */}
      <section id="contact" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Обсудить проект</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-5xl">Давайте создадим что-то мощное</h2>
          <p className="mt-2 text-xs text-neutral-400">Выберите услугу и примерный бюджет для рассчёта параметров проекта.</p>
        </div>

        {contactSuccess ? (
          <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-300 text-sm">
            Спасибо! Наш арт-директор свяжется с вами в течение 2 часов.
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-10 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-xl">
            {/* Service Chips */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Тип проекта:</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Web Development", "UI/UX Design", "Brand Identity", "Motion / 3D"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSelectedService(s)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      selectedService === s
                        ? "bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/25"
                        : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-semibold uppercase text-neutral-400">
                <span>Примерный бюджет:</span>
                <span className="text-rose-400 font-mono text-sm">{budget.toLocaleString()} ₽</span>
              </div>
              <input
                type="range"
                min={150000}
                max={1500000}
                step={50000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-3 w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Ваше имя *"
                className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Email *"
                className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="Расскажите о вашей задаче и сроках..."
                className="sm:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
              />
              <button
                type="submit"
                className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:brightness-110 transition-all"
              >
                Отправить брифинг
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-center text-xs text-neutral-500">
        <p>© VORTEX Creative Studio. Все права защищены. Демонстрационный проект портфолио.</p>
      </footer>
    </div>
  );
}
