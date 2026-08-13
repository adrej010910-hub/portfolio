"use client";

import { useState } from "react";
import { ShowcaseHeader } from "@/components/layout/showcase-header";
import {
  Sparkles,
  Zap,
  Code2,
  Cpu,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Terminal,
  Play,
  Copy,
  Check,
} from "lucide-react";

export default function AiSaasPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [activeTab, setActiveTab] = useState<string>("content");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [promptInput, setPromptInput] = useState<string>("Напиши рекламный текст для запуска нового веб-сервиса...");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<string>(
    "🚀 Встречайте Synthex AI: Ваш интеллектуальный ассистент следующего поколения. Автоматизируйте рутину, генерируйте убойный контент и оптимизируйте код в 10 раз быстрее."
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(
        `✨ [Сгенерировано Synthex AI v4.5]\n\nАнализ запроса: "${promptInput}"\n\nРезультат:\n1. Увеличение конверсии на +140%\n2. Оптимизированная задержка отклика: 12ms\n3. Готовый шаблон интегрирован в вашу CRM.`
      );
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#05050d] text-slate-100 font-sans selection:bg-purple-500/30">
      <ShowcaseHeader title="SYNTHEX AI" category="SaaS / AI Startup" currentSlug="ai-saas" />

      {/* Glow Effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-cyan-500/15 via-fuchsia-600/15 to-transparent blur-[160px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Synthex AI Engine 4.5 Released
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Искусственный интеллект для <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              взрывного роста продуктивности
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
            Единая AI-платформа для генерации текста, анализа данных, написания кода и автоматизации бизнес-процессов в реальном времени.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
            >
              Начать бесплатно <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <Play className="h-4 w-4 text-cyan-400" /> Смотреть демо
            </a>
          </div>

          {/* Interactive AI Sandbox Demo */}
          <div id="demo" className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/15 bg-slate-900/80 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">synthex-playground-v4.5</span>
              </div>
              <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-400">GPU Accelerated</span>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Введите ваш запрос к AI..."
                className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                {isGenerating ? <Zap className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {isGenerating ? "Генерация..." : "Сгенерировать"}
              </button>
            </div>

            <div className="relative mt-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-left font-mono text-xs leading-relaxed text-slate-300 min-h-[100px]">
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">{generatedResult}</pre>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Возможности</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Всё необходимое для современной команды
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Bot,
                title: "Умные AI Агенты",
                desc: "Автономные агенты для решения рутинных задач, ответов клиентам и мониторинга данных.",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Code2,
                title: "Code Copilot 2.0",
                desc: "Генерация кода, авто-рефакторинг и поиск багов на 20+ языках программирования.",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: BarChart3,
                title: "Предиктивная аналитика",
                desc: "Превращайте сырые данные в наглядные графики и точно прогнозируйте метрики продаж.",
                color: "from-fuchsia-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "Мгновенные интеграции",
                desc: "Подключение к Telegram, Slack, Notion, GitHub и CRM за пару кликов через REST API.",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: ShieldCheck,
                title: "Enterprise Безопасность",
                desc: "Шифрование данных SOC2, приватные LLM-модели без обучения на ваших данных.",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Globe,
                title: "Мультиязычность 100+",
                desc: "Безупречный перевод и адаптированная генерация на более чем 100 языках мира.",
                color: "from-blue-500 to-cyan-500",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feat.color} text-white shadow-lg`}>
                  <feat.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feat.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Тарифные планы</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Прозрачные цены без скрытых платежей
            </h2>

            {/* Monthly / Annual Toggle */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>Ежемесячно</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="relative h-7 w-14 rounded-full bg-slate-800 p-1 transition-colors"
              >
                <div className={`h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform ${billingCycle === "annual" ? "translate-x-7" : "translate-x-0"}`} />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "annual" ? "text-white" : "text-slate-400"}`}>
                Ежегодно <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400 font-semibold">-20%</span>
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: billingCycle === "annual" ? "$19" : "$24",
                period: "/ месяц",
                desc: "Для фрилансеров и небольших стартапов",
                features: ["50,000 AI токенов/мес", "Доступ к GPT-4o Mini", "1 рабочий агент", "Базовая поддержка"],
                cta: "Попробовать бесплатно",
                popular: false,
              },
              {
                name: "Pro Business",
                price: billingCycle === "annual" ? "$49" : "$59",
                period: "/ месяц",
                desc: "Для растущих команд и регулярной работы",
                features: ["500,000 AI токенов/мес", "Доступ к GPT-4o & Claude 3.5", "10 рабочих агентов", "API доступ & Интеграции", "Приоритетная поддержка"],
                cta: "Начать 14 дней триала",
                popular: true,
              },
              {
                name: "Enterprise",
                price: billingCycle === "annual" ? "$149" : "$179",
                period: "/ месяц",
                desc: "Для крупных компаний с особыми требованиями",
                features: ["Неограниченные токены", "Персональные LLM модели", "Безлимитные агенты", "SLA 99.99%", "Выделенный менеджер"],
                cta: "Связаться с отделом продаж",
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-3xl border p-8 backdrop-blur-2xl transition-all duration-300 ${
                  plan.popular
                    ? "border-cyan-500/60 bg-gradient-to-b from-indigo-900/40 via-slate-900/80 to-slate-950 shadow-2xl shadow-cyan-500/10 scale-105"
                    : "border-white/10 bg-slate-900/40"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
                    Самый популярный
                  </span>
                )}

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{plan.desc}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => alert(`Вы выбрали тариф ${plan.name}!`)}
                  className={`mt-8 w-full rounded-2xl py-3.5 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Часто задаваемые вопросы</span>
            <h2 className="mt-2 text-3xl font-bold text-white">FAQ</h2>
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                q: "Обучаются ли ваши AI-модели на наших приватных данных?",
                a: "Нет, абсолютно. Мы строго придерживаемся стандартов безопасности SOC2 и GDPR. Все ваши данные шифруются и никогда не используются для дообучения глобальных моделей.",
              },
              {
                q: "Могу ли я отменить подписку в любой момент?",
                a: "Да, вы можете отменить или изменить свой тарифный план в личном кабинете в любое время без штрафов и скрытых комиссий.",
              },
              {
                q: "Какие модели ИИ используются в сервисе?",
                a: "Мы подключаем новейшие модели включая OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Llama 3 и собственные оптимизированные микро-модели Synthex.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left font-semibold text-white text-sm"
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && <p className="mt-3 text-xs leading-relaxed text-slate-400">{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-indigo-900/80 via-slate-900 to-purple-900/80 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Готовы ускорить работу в 10 раз?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
              Присоединяйтесь к более чем 15,000+ разработчиков и команд, использующих Synthex AI каждый день.
            </p>
            <button
              onClick={() => alert("Регистрация успешна! Добро пожаловать в Synthex AI.")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl hover:scale-105 transition-all"
            >
              Создать бесплатный аккаунт <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-950 py-8 text-center text-xs text-slate-500">
          <p>© Synthex AI Inc. Все права защищены. Демонстрационный проект портфолио.</p>
        </footer>
      </div>
    </div>
  );
}
