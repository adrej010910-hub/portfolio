"use client";

import { useState } from "react";
import { ShowcaseHeader } from "@/components/layout/showcase-header";
import {
  Utensils,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  Phone,
  Sparkles,
  Wine,
  Flame,
  Award,
} from "lucide-react";

interface Dish {
  id: string;
  name: string;
  category: "starters" | "mains" | "chef" | "desserts" | "wine";
  categoryLabel: string;
  price: string;
  description: string;
  tags: string[];
  image: string;
}

const MENU: Dish[] = [
  {
    id: "dish-1",
    name: "Тартар из камчатского краба с авокадо и черной икрой",
    category: "starters",
    categoryLabel: "Закуски",
    price: "3 800 ₽",
    description: "Мясо королевского краба, мусс из авокадо, соус юдзу и премиальная икра осетра.",
    tags: ["Chef Choice", "Seafood"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dish-2",
    name: "Филе миньон Wagyu A5 с трюфельным демигласом",
    category: "mains",
    categoryLabel: "Горячие блюда",
    price: "7 900 ₽",
    description: "Японская мраморная говядина Вагю, пюре из пастернака и свежий черный трюфель из Пьемонта.",
    tags: ["Signature", "Gluten Free"],
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dish-3",
    name: "Дикий сибас в соли с травяным эмульгированным соусом",
    category: "mains",
    categoryLabel: "Горячие блюда",
    price: "5 400 ₽",
    description: "Запеченный в морской соли дикий сибас, подается со спаржей на гриле и лимонным беарнезом.",
    tags: ["Seafood", "Fresh Catch"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dish-4",
    name: "Сет автора 'Symphonie de la Mer' (8 курсов)",
    category: "chef",
    categoryLabel: "Шеф-сет",
    price: "14 500 ₽",
    description: "Авторское гастрономическое путешествие от шеф-повара Марка Дюбуа: гребешки, устрицы, омар и десерты.",
    tags: ["Tasting Menu", "Exclusive"],
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dish-5",
    name: "Десерт 'Сфера L'Étoile' из сусального золота и маракуйи",
    category: "desserts",
    categoryLabel: "Десерты",
    price: "1 900 ₽",
    description: "Сфера из белого шоколада Valrhona, начинка из жидкой маракуйи, малиновое кули и пищевое золото 24K.",
    tags: ["Gold 24K", "Sweet"],
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dish-6",
    name: "Château Margaux Premier Grand Cru Classé 2015",
    category: "wine",
    categoryLabel: "Вина & Коктейли",
    price: "125 000 ₽",
    description: "Легендарное бордоское вино со сложным букетом спелой вишни, кедра, фиалки и шелковистыми танинами.",
    tags: ["Vintage 2015", "Sommelier Selection"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Reservation Form State
  const [resDate, setResDate] = useState<string>("");
  const [resTime, setResTime] = useState<string>("19:00");
  const [resGuests, setResGuests] = useState<number>(2);
  const [resArea, setResArea] = useState<string>("Main Hall");
  const [resName, setResName] = useState<string>("");
  const [resPhone, setResPhone] = useState<string>("");
  const [resSubmitted, setResSubmitted] = useState<boolean>(false);

  const filteredMenu = MENU.filter((d) => {
    if (activeCategory === "all") return true;
    return d.category === activeCategory;
  });

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone || !resDate) return;
    setResSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600/30">
      <ShowcaseHeader title="L'ÉTOILE RESTAURANT" category="Fine Dining" currentSlug="restaurant" />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 text-center">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
          alt="Fine Dining Restaurant interior"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md">
            <Award className="h-3.5 w-3.5 text-amber-400" /> Michelin Guide Selected 2025
          </span>

          <h1 className="mt-6 text-4xl font-serif font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
            L ' É T O I L E
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light uppercase tracking-widest text-stone-300">
            Высокая авторская кухня французского прованса с азиатскими нотами
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#reservation"
              className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-stone-950 shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all"
            >
              Забронировать столик
            </a>
            <a
              href="#menu"
              className="rounded-full border border-stone-700 bg-stone-900/60 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-stone-200 hover:border-amber-500/50 hover:text-white transition-all"
            >
              Меню ресторации
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-serif uppercase tracking-[0.3em] text-amber-400">Гастрономия</span>
          <h2 className="mt-2 text-3xl font-serif font-light text-white sm:text-4xl">
            Авторское меню от Шефа
          </h2>
        </div>

        {/* Menu Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-stone-800 pb-4">
          {[
            { id: "all", label: "Всё меню" },
            { id: "starters", label: "Закуски" },
            { id: "mains", label: "Горячее" },
            { id: "chef", label: "Шеф-сет" },
            { id: "desserts", label: "Десерты" },
            { id: "wine", label: "Вина & Коктейли" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeCategory === tab.id
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "bg-stone-900 text-stone-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dish Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMenu.map((dish) => (
            <div
              key={dish.id}
              className="group overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/40 transition-all hover:border-amber-500/40 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full bg-stone-950/70 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                  {dish.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-2">
                  {dish.tags.map((t) => (
                    <span key={t} className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-serif font-light text-white group-hover:text-amber-300 transition-colors">
                  {dish.name}
                </h3>
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className="border-t border-stone-800 bg-stone-900/30 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-amber-400">Онлайн Бронирование</span>
            <h2 className="mt-2 text-3xl font-serif font-light text-white sm:text-4xl">Забронировать гастрономический вечер</h2>
            <p className="mt-2 text-xs text-stone-400">Выберите удобную дату, время и количество гостей.</p>
          </div>

          {resSubmitted ? (
            <div className="mt-10 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 text-center text-amber-300">
              <CheckCircle2 className="mx-auto h-12 w-12 text-amber-400" />
              <h3 className="mt-4 text-xl font-serif text-white">Столик забронирован!</h3>
              <p className="mt-2 text-xs text-stone-300">
                Ждём вас {resDate} в {resTime} ({resGuests} чел.). Детали бронирования отправлены на ваш телефон.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservation} className="mt-10 rounded-3xl border border-stone-800 bg-stone-900 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-stone-400 font-serif">Дата визита *</label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 font-serif">Время визита *</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    {["18:00", "19:00", "20:00", "21:00", "22:00"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-400 font-serif">Количество гостей *</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={resGuests}
                    onChange={(e) => setResGuests(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 font-serif">Зона ресторана</label>
                  <select
                    value={resArea}
                    onChange={(e) => setResArea(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Main Hall">Главный Зал</option>
                    <option value="Chef Table">Шеф-Стол (Вид на кухню)</option>
                    <option value="VIP Lounge">VIP Кабинет</option>
                  </select>
                </div>

                <input
                  type="text"
                  required
                  placeholder="Ваше имя *"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
                />

                <input
                  type="tel"
                  required
                  placeholder="Телефон для подтверждения *"
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value)}
                  className="rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
                />

                <button
                  type="submit"
                  className="sm:col-span-2 mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-xs font-semibold uppercase tracking-widest text-stone-950 hover:brightness-110 transition-all"
                >
                  Затвердить бронирование
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 text-center text-xs text-stone-500 uppercase tracking-widest">
        <p>© L'ÉTOILE Fine Dining. Все права защищены. Демонстрационный проект портфолио.</p>
      </footer>
    </div>
  );
}
