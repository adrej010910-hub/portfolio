"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, User, Mail, Send as TelegramIcon, MessageSquare, Wallet } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services, siteConfig } from "@/config/site";

type FormState = {
  name: string;
  email: string;
  telegram: string;
  service: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  telegram: "",
  service: "",
  budget: "",
  message: "",
};

const budgetOptions = [
  "До 10 000 ₽",
  "10 000 – 25 000 ₽",
  "25 000 – 50 000 ₽",
  "50 000 – 100 000 ₽",
  "Более 100 000 ₽",
];

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Укажите ваше имя";
    if (!form.email.trim()) {
      e.email = "Укажите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Некорректный email";
    }
    if (!form.telegram.trim()) {
      e.telegram = "Укажите Telegram (например @nickname)";
    }
    if (!form.message.trim()) {
      e.message = "Опишите ваш проект";
    } else if (form.message.trim().length < 10) {
      e.message = "Расскажите чуть подробнее (от 10 символов)";
    }
    return e;
  };

const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("loading");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        telegram: form.telegram,
        service: form.service || "Не указано",
        budget: form.budget || "Не указано",
        message: form.message,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Ошибка отправки");
      }
      setStatus("success");
    } catch (err) {
      setErrors({ message: err instanceof Error ? err.message : "Ошибка отправки. Попробуйте ещё раз" });
      setStatus("idle");
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  };

  const set = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" aria-hidden />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: info */}
          <div>
            <Reveal direction="right">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Контакты
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
                Обсудим ваш <span className="text-gradient">проект?</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-slate-400">
                Напишите мне — отвечу в течение дня. Расскажите о задаче, и я предложу
                решение, которое подойдёт именно вашему бизнесу.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {[
                {
                  icon: Send,
                  label: "Telegram",
                  value: "@ShadowwLi",
                  href: siteConfig.telegram,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.12}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-slate-500">{c.label}</div>
                      <div className="text-sm font-semibold text-white">{c.value}</div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.06] px-5 py-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm text-emerald-200/90">
                  Сейчас принимаю новые заявки — свободен для вашего проекта
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal direction="left">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/15 blur-2xl" aria-hidden />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-96 flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 text-emerald-300"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h3 className="font-display mt-6 text-2xl font-bold text-white">Заявка отправлена!</h3>
                    <p className="mt-3 max-w-xs text-sm text-slate-400">
                      Спасибо за доверие. Я свяжусь с вами в ближайшее время.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-8 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    onSubmit={onSubmit}
                    className="relative space-y-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                          <User className="h-3.5 w-3.5 text-cyan-400" />
                          Ваше имя
                        </label>
                        <Input
                          placeholder="Иван"
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          error={!!errors.name}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-xs text-rose-400"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                          <Mail className="h-3.5 w-3.5 text-cyan-400" />
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => set("email")(e.target.value)}
                          error={!!errors.email}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-xs text-rose-400"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        <TelegramIcon className="h-3.5 w-3.5 text-cyan-400" />
                        Telegram
                      </label>
                      <Input
                        placeholder="@nickname"
                        value={form.telegram}
                        onChange={(e) => set("telegram")(e.target.value)}
                        error={!!errors.telegram}
                      />
                      <AnimatePresence>
                        {errors.telegram && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-1.5 text-xs text-rose-400"
                          >
                            {errors.telegram}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

<div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                        Услуга
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => set("service")(e.target.value)}
                        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/50"
                      >
                        <option value="" disabled className="bg-slate-900 text-slate-400">
                          Выберите услугу
                        </option>
                        {services.map((s) => (
                          <option key={s.title} value={s.title} className="bg-slate-900 text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        <Wallet className="h-3.5 w-3.5 text-cyan-400" />
                        Бюджет
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) => set("budget")(e.target.value)}
                        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/50"
                      >
                        <option value="" disabled className="bg-slate-900 text-slate-400">
                          Выберите примерный бюджет
                        </option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                        Описание проекта
                      </label>
                      <Textarea
                        placeholder="Расскажите о вашей задаче: что нужно сделать, какие есть пожелания..."
                        value={form.message}
                        onChange={(e) => set("message")(e.target.value)}
                        error={!!errors.message}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-1.5 text-xs text-rose-400"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)] transition-all duration-500 hover:bg-right disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
