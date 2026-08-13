"use client";

import { useState } from "react";
import Image from "next/image";
import { ShowcaseHeader } from "@/components/layout/showcase-header";
import {
  Building2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Search,
  SlidersHorizontal,
  Phone,
  Mail,
  CheckCircle2,
  X,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  category: "villa" | "penthouse" | "waterfront" | "apartment";
  categoryLabel: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  agent: { name: string; phone: string; email: string };
}

const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Вилла 'Aura Heights'",
    category: "villa",
    categoryLabel: "Элитная вилла",
    location: "Сочи, Красная Поляна",
    price: "285,000,000 ₽",
    beds: 5,
    baths: 6,
    sqft: 680,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Панорамная вилла в приватном посёлке бизнес-класса с видом на заснеженные горные вершины. Инфинити-бассейн с подогревом, персональный SPA-комплекс и винный погреб.",
    features: ["Инфинити-бассейн", "SPA & Сауна", "Умный дом", "Вертолётная площадка", "Гараж на 4 авто"],
    agent: { name: "Екатерина Воронова", phone: "+7 (999) 000-11-22", email: "voronova@luxeestate.ru" },
  },
  {
    id: "prop-2",
    title: "Пентхаус 'Grand Skyline'",
    category: "penthouse",
    categoryLabel: "Пентхаус",
    location: "Москва-Сити, Башня 'Федерация'",
    price: "420,000,000 ₽",
    beds: 4,
    baths: 4,
    sqft: 450,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Двухуровневый пентхаус на 78-м этаже с круговым панорамным остеклением 360 градусов. Приватная терраса с зимним садом и персональным лифтом.",
    features: ["Вид 360° на столицу", "Приватный лифт", "Терраса с садом", "Консьерж 24/7", "Система очистки воздуха"],
    agent: { name: "Александр Громов", phone: "+7 (999) 333-44-55", email: "gromov@luxeestate.ru" },
  },
  {
    id: "prop-3",
    title: "Резиденция 'Ocean Cove'",
    category: "waterfront",
    categoryLabel: "Побережье",
    location: "Дубай, Palm Jumeirah",
    price: "$ 14,500,000",
    beds: 6,
    baths: 7,
    sqft: 890,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Роскошная вилла на первой линии залива с собственным песчаным пляжем, причалом для яхты и ультрасовременной архитектурой от мирового бюро.",
    features: ["Частный пляж", "Причал для яхты", "Кинотеатр", "Ландшафтный сад", "Система безопасности Grade-A"],
    agent: { name: "Сергей Лебедев", phone: "+7 (999) 777-88-99", email: "lebedev@luxeestate.ru" },
  },
  {
    id: "prop-4",
    title: "Апартаменты 'Park Modern'",
    category: "apartment",
    categoryLabel: "Апартаменты",
    location: "Санкт-Петербург, Крестовский остров",
    price: "195,000,000 ₽",
    beds: 3,
    baths: 3,
    sqft: 280,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Просторные апартаменты в тихом экологичном районе Санкт-Петербурга с видом на парковый ансамбль и Малую Невку. Авторский дизайн-проект.",
    features: ["Вид на парк и воду", "Подземный паркинг", "Каминный зал", "Охрана 24/7", "Высота потолков 3.8м"],
    agent: { name: "Екатерина Воронова", phone: "+7 (999) 000-11-22", email: "voronova@luxeestate.ru" },
  },
];

export default function RealEstatePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Form states
  const [viewingDate, setViewingDate] = useState<string>("");
  const [viewingName, setViewingName] = useState<string>("");
  const [viewingPhone, setViewingPhone] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleBookViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingName || !viewingPhone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedProperty(null);
      setViewingDate("");
      setViewingName("");
      setViewingPhone("");
      alert("Ваша заявка на просмотр успешно отправлена! Менеджер свяжется с вами в течение 15 минут.");
    }, 800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30">
      <ShowcaseHeader title="LUXE ESTATE" category="Real Estate" currentSlug="real-estate" />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Villa background"
            className="h-full w-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Премиальная недвижимость
          </span>
          <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
            Коллекция <span className="font-serif italic text-amber-400">исключительной</span> недвижимости
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light text-stone-300 sm:text-lg">
            Архитектурные шедевры, закрытые резиденции и элитные апартаменты в лучших локациях мира.
          </p>

          {/* Search / Filter Bar */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-stone-900/80 p-3 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Локация или название (например: Сочи, Москва)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-stone-950/60 py-3 pl-10 pr-4 text-sm text-white placeholder-stone-500 border border-white/5 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <button
                onClick={() => {}}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110"
              >
                <SlidersHorizontal className="h-4 w-4" /> Найти недвижимость
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs & Properties Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Каталог объектов</span>
            <h2 className="mt-2 text-3xl font-light text-white sm:text-4xl">
              Доступные <span className="font-serif italic text-amber-300">резиденции</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-stone-900/60 p-1.5 backdrop-blur-md">
            {[
              { id: "all", label: "Все объекты" },
              { id: "villa", label: "Виллы" },
              { id: "penthouse", label: "Пентхаусы" },
              { id: "waterfront", label: "Побережье" },
              { id: "apartment", label: "Апартаменты" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? "bg-amber-500 text-stone-950 font-semibold shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-stone-900/40 transition-all duration-500 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-stone-950/60 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md">
                  {property.categoryLabel}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="text-2xl font-semibold text-white tracking-tight">{property.price}</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium text-white transition-colors group-hover:text-amber-300">
                  {property.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-400">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  {property.location}
                </p>

                <p className="mt-3 line-clamp-2 text-sm text-stone-300/80 leading-relaxed">
                  {property.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-stone-400">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-amber-400" /> {property.beds} спален
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-amber-400" /> {property.baths} санузлов
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-4 w-4 text-amber-400" /> {property.sqft} м²
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProperty(property)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-500 hover:text-stone-950"
                >
                  Просмотреть объект <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-stone-900 p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {selectedProperty.gallery.slice(1).map((img, idx) => (
                    <img key={idx} src={img} alt="Gallery" className="h-24 w-full rounded-xl object-cover" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {selectedProperty.categoryLabel}
                </span>
                <h2 className="mt-1 text-2xl font-light text-white">{selectedProperty.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-stone-400">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  {selectedProperty.location}
                </p>

                <div className="mt-4 text-3xl font-semibold text-amber-400">{selectedProperty.price}</div>

                <div className="mt-4 flex gap-4 rounded-xl bg-stone-950/60 p-3 text-xs text-stone-300">
                  <div><span className="text-stone-500">Спален:</span> {selectedProperty.beds}</div>
                  <div><span className="text-stone-500">Санузлов:</span> {selectedProperty.baths}</div>
                  <div><span className="text-stone-500">Площадь:</span> {selectedProperty.sqft} м²</div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-stone-300">{selectedProperty.description}</p>

                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase text-stone-400">Особенности:</h4>
                  <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-stone-300">
                    {selectedProperty.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleBookViewing} className="mt-6 rounded-2xl border border-white/10 bg-stone-950 p-4">
                  <h4 className="text-xs font-semibold uppercase text-amber-300">Записаться на просмотр</h4>
                  <div className="mt-3 grid gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Ваше имя *"
                      value={viewingName}
                      onChange={(e) => setViewingName(e.target.value)}
                      className="rounded-lg bg-stone-900 px-3 py-2 text-xs text-white placeholder-stone-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Номер телефона *"
                      value={viewingPhone}
                      onChange={(e) => setViewingPhone(e.target.value)}
                      className="rounded-lg bg-stone-900 px-3 py-2 text-xs text-white placeholder-stone-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="date"
                      value={viewingDate}
                      onChange={(e) => setViewingDate(e.target.value)}
                      className="rounded-lg bg-stone-900 px-3 py-2 text-xs text-white border border-white/10 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={formSubmitted}
                      className="mt-1 rounded-lg bg-amber-500 py-2.5 text-xs font-semibold text-stone-950 transition-all hover:bg-amber-400"
                    >
                      {formSubmitted ? "Отправка..." : "Забронировать просмотр"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="border-t border-white/10 bg-stone-900/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">О компании</span>
              <h2 className="mt-2 text-3xl font-light text-white sm:text-4xl">
                Безупречный сервис и <span className="font-serif italic text-amber-300">приватность</span>
              </h2>
              <p className="mt-4 text-sm text-stone-300 leading-relaxed">
                LUXE ESTATE — закрытое агентство элитной недвижимости. Мы сопровождаем сделки по покупке и инвестициям в уникальные жилые объекты премиум-класса по всему миру.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="text-2xl font-light text-amber-400">12+</div>
                  <div className="text-xs text-stone-400">Лет на рынке</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-amber-400">€ 1.2B+</div>
                  <div className="text-xs text-stone-400">Объём сделок</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-amber-400">100%</div>
                  <div className="text-xs text-stone-400">Конфиденциальность</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury interior"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Связаться с нами</span>
        <h2 className="mt-2 text-3xl font-light text-white sm:text-4xl">
          Индивидуальный подбор <span className="font-serif italic text-amber-300">объекта</span>
        </h2>
        <p className="mt-2 text-sm text-stone-400">Оставьте заявку, и персональный брокер подготовит закрытый каталог объектов.</p>

        {contactSuccess ? (
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-300 text-sm">
            Спасибо! Ваш персональный брокер свяжется с вами в течение 10 минут.
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Имя Фамилия *"
              className="rounded-xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
            <input
              type="tel"
              required
              placeholder="Телефон *"
              className="rounded-xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="sm:col-span-2 rounded-xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="Предпочтения по объекту (бюджет, страна, тип)..."
              className="sm:col-span-2 rounded-xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              className="sm:col-span-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110"
            >
              Запросить приватную презентацию
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-stone-950 py-8 text-center text-xs text-stone-500">
        <p>© LUXE ESTATE. Все права защищены. Демонстрационный проект портфолио.</p>
      </footer>
    </div>
  );
}
