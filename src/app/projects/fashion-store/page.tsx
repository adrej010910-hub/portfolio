"use client";

import { useState } from "react";
import { ShowcaseHeader } from "@/components/layout/showcase-header";
import {
  ShoppingBag,
  Heart,
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "outerwear" | "knitwear" | "dresses" | "accessories";
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Двубортное пальто из кашемира 'Lumière'",
    category: "outerwear",
    categoryLabel: "Верхняя одежда",
    price: 89000,
    priceFormatted: "89 000 ₽",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
    description: "Премиальное пальто свободного кроя из 100% итальянского кашемира. Ручная отделка швов, шелковая подкладка и глубокий бежевый оттенок.",
    colors: ["Бежевый", "Черный", "Экри"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "prod-2",
    name: "Шелковое платье-миди 'Aura Noir'",
    category: "dresses",
    categoryLabel: "Платья",
    price: 45000,
    priceFormatted: "45 000 ₽",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    description: "Лаконичное вечернее платье из натурального шелка mulberry с изящным вырезом на спине и плавным драпирующимся силуэтом.",
    colors: ["Глубокий черный", "Шампань"],
    sizes: ["XS", "S", "M"],
  },
  {
    id: "prod-3",
    name: "Оверсайз джемпер из мериноса 'Minimal'",
    category: "knitwear",
    categoryLabel: "Трикотаж",
    price: 32000,
    priceFormatted: "32 000 ₽",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    description: "Уютный свитер крупной вязки из тончайшей шерсти мериноса. Идеальная базовая вещь для капсульного гардероба.",
    colors: ["Молочный", "Графит", "Песочный"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "prod-4",
    name: "Кожаная сумка 'Structured Tote'",
    category: "accessories",
    categoryLabel: "Аксессуары",
    price: 58000,
    priceFormatted: "58 000 ₽",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    description: "Архитектурная сумка из гладкой телячьей кожи с латунной фурнитурой и замшевым внутренним отделением.",
    colors: ["Шоколадный", "Черный"],
    sizes: ["One Size"],
  },
  {
    id: "prod-5",
    name: "Шерстяной жакет строгого кроя 'Atelier'",
    category: "outerwear",
    categoryLabel: "Верхняя одежда",
    price: 64000,
    priceFormatted: "64 000 ₽",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    description: "Двубортный жакет с акцентными плечами из фактурной шерсти. Вдохновлен мужским кроем haute couture.",
    colors: ["Темно-синий", "Черный"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "prod-6",
    name: "Шелковый шарф 'Botanical Gold'",
    category: "accessories",
    categoryLabel: "Аксессуары",
    price: 18000,
    priceFormatted: "18 000 ₽",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
    description: "Платок из натурального шелкового твила с ручной обработкой края и авторским принтом.",
    colors: ["Золотой / Охра"],
    sizes: ["One Size"],
  },
];

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export default function FashionStorePage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (categoryFilter === "all") return true;
    return p.category === categoryFilter;
  });

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || "S");
    setSelectedColor(product.colors[0] || "Стандарт");
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = { ...item, quantity: newQty };
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-stone-200 selection:text-stone-900">
      <ShowcaseHeader title="AURA STUDIO" category="E-Commerce Fashion" currentSlug="fashion-store" />

      {/* Brand Navigation Bar */}
      <nav className="sticky top-[57px] z-40 border-b border-stone-800 bg-stone-950/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-serif tracking-[0.25em] uppercase font-light text-white">
            A U R A
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-light uppercase tracking-widest text-stone-400">
            <a href="#catalog" className="hover:text-white transition-colors">Коллекции</a>
            <a href="#about" className="hover:text-white transition-colors">О бренде</a>
            <a href="#editorial" className="hover:text-white transition-colors">Editorial</a>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/80 px-4 py-2 text-xs uppercase tracking-widest text-stone-200 hover:border-stone-500 hover:text-white transition-all"
          >
            <ShoppingBag className="h-4 w-4 text-stone-300" />
            <span>Корзина</span>
            {cart.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-[10px] font-bold text-stone-900">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="Fashion editorial background"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="text-xs font-light uppercase tracking-[0.3em] text-stone-300">
            Осень — Зима 2025 / 2026
          </span>
          <h1 className="mt-4 text-4xl font-serif font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
            Эстетика чистых линий и кашемира
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xs font-light tracking-wider uppercase text-stone-300">
            Капсульная коллекция вне времени. Натуральные ткани, совершенный крой и ручная сборка.
          </p>
          <a
            href="#catalog"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-stone-100 px-8 py-4 text-xs font-medium uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-300 hover:scale-105"
          >
            Исследовать каталог <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-light uppercase tracking-[0.2em] text-stone-400">Каталог</span>
            <h2 className="mt-2 text-3xl font-serif font-light text-white">Новые поступления</h2>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-2">
            {[
              { id: "all", label: "Все изделия" },
              { id: "outerwear", label: "Верхняя одежда" },
              { id: "dresses", label: "Платья" },
              { id: "knitwear", label: "Трикотаж" },
              { id: "accessories", label: "Аксессуары" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                  categoryFilter === cat.id
                    ? "border-b-2 border-stone-100 text-white font-medium"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/60 transition-all hover:border-stone-600"
              onClick={() => handleOpenProduct(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full bg-stone-950/60 p-2 text-stone-300 backdrop-blur-md transition-colors hover:text-white">
                  <Heart className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-[10px] font-light uppercase tracking-widest text-stone-500">
                  {product.categoryLabel}
                </span>
                <h3 className="mt-1 text-base font-serif font-light text-white group-hover:text-stone-300 transition-colors">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-light text-stone-200">{product.priceFormatted}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProduct(product);
                    }}
                    className="rounded-full border border-stone-700 px-4 py-1.5 text-[11px] uppercase tracking-wider text-stone-300 hover:border-stone-100 hover:text-white"
                  >
                    Выбрать размер
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stone-800 bg-stone-950 p-6 sm:p-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 rounded-full bg-stone-800 p-2 text-stone-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-900">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-stone-500">{selectedProduct.categoryLabel}</span>
                <h2 className="mt-1 text-2xl font-serif font-light text-white">{selectedProduct.name}</h2>
                <div className="mt-3 text-xl font-light text-stone-200">{selectedProduct.priceFormatted}</div>

                <p className="mt-4 text-xs font-light text-stone-400 leading-relaxed">{selectedProduct.description}</p>

                {/* Color Selector */}
                <div className="mt-6">
                  <label className="text-[11px] font-light uppercase tracking-widest text-stone-400">Цвет:</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`rounded-full border px-3 py-1 text-xs transition-all ${
                          selectedColor === c
                            ? "border-stone-100 bg-stone-100 text-stone-900 font-medium"
                            : "border-stone-800 text-stone-400 hover:border-stone-600"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6">
                  <label className="text-[11px] font-light uppercase tracking-widest text-stone-400">Размер:</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`h-9 min-w-[36px] rounded-full border px-3 text-xs uppercase transition-all ${
                          selectedSize === s
                            ? "border-stone-100 bg-stone-100 text-stone-900 font-medium"
                            : "border-stone-800 text-stone-400 hover:border-stone-600"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(selectedProduct, selectedSize, selectedColor)}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-stone-100 py-4 text-xs font-medium uppercase tracking-widest text-stone-900 hover:bg-stone-300 transition-all"
                >
                  <ShoppingBag className="h-4 w-4" /> Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-md flex-col bg-stone-950 p-6 shadow-2xl border-l border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-lg font-serif font-light text-white uppercase tracking-widest">
                Ваша корзина ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isCheckoutSuccess ? (
              <div className="my-auto text-center p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-lg font-serif text-white">Заказ успешно оформлен!</h4>
                <p className="mt-2 text-xs text-stone-400">Менеджер AURA STUDIO свяжется с вами для подтверждения доставки.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="my-auto text-center text-xs text-stone-500 uppercase tracking-widest">
                Ваша корзина пока пуста.
              </div>
            ) : (
              <>
                <div className="my-4 flex-1 overflow-y-auto space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-stone-800 pb-4">
                      <img src={item.product.image} alt={item.product.name} className="h-20 w-16 rounded-lg object-cover" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-serif text-white">{item.product.name}</h4>
                          <span className="text-[10px] text-stone-400">
                            Размер: {item.size} | Цвет: {item.color}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-stone-800 px-2 py-0.5 text-xs text-stone-300">
                            <button onClick={() => updateQuantity(idx, -1)} className="hover:text-white">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="hover:text-white">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-light text-stone-200">
                            {(item.product.price * item.quantity).toLocaleString()} ₽
                          </span>
                          <button onClick={() => removeFromCart(idx)} className="text-stone-500 hover:text-rose-400">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-800 pt-4">
                  <div className="flex items-center justify-between text-sm font-light text-white">
                    <span>Итого к оплате:</span>
                    <span className="text-lg font-serif text-stone-100">{cartTotal.toLocaleString()} ₽</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full rounded-full bg-stone-100 py-4 text-xs font-medium uppercase tracking-widest text-stone-900 hover:bg-stone-300 transition-all"
                  >
                    Перейти к оформлению
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Editorial Section */}
      <section id="editorial" className="border-t border-stone-800 bg-stone-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-stone-400">Манифест бренда</span>
              <h2 className="mt-3 text-3xl font-serif font-light text-white sm:text-4xl">
                Искусство замедления и бескомпромиссное качество
              </h2>
              <p className="mt-4 text-xs font-light text-stone-400 leading-relaxed">
                AURA STUDIO создаёт одежду для тех, кто ценит форму, силуэт и тактильное совершенство. Каждая модель отшивается небольшими тиражами на семейной мануфактуре.
              </p>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
                alt="Aura studio atelier"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 text-center text-xs text-stone-500 uppercase tracking-widest">
        <p>© AURA STUDIO. Все права защищены. Демонстрационный проект портфолио.</p>
      </footer>
    </div>
  );
}
