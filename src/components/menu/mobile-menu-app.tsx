/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  ChefHat,
  ChevronRight,
  GlassWater,
  Globe,
  Heart,
  HeartHandshake,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  Package,
  Plus,
  Search,
  Star,
  Store,
  SunMedium,
  UtensilsCrossed,
  Users,
  X,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import type { Category, MenuPayload, Product } from "@/types/menu";

const categoryIconMap: Record<string, ComponentType<{ className?: string }>> = {
  Home,
  Users,
  HeartHandshake,
  UtensilsCrossed,
  ChefHat,
  PlusCircle: Plus,
  GlassWater,
  Package,
};

const HOME_HERO_BUTTONS = [
  "todo-menu",
  "ofertas-familiares",
  "ofertas-dos",
  "ofertas-personales",
  "agregados",
  "platos-extras",
  "bebidas",
] as const;

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80";

type MobileMenuAppProps = {
  initialData: MenuPayload;
};

function getCategoryIcon(iconName: string) {
  return categoryIconMap[iconName] ?? UtensilsCrossed;
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitials(value: string) {
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("");
}

function matchesSmartSearch(query: string, product: Product, categoryName: string) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const productName = normalizeText(product.name);
  const productDescription = normalizeText(product.description);
  const normalizedCategory = normalizeText(categoryName);
  const combined = `${productName} ${productDescription} ${normalizedCategory}`.trim();
  const words = combined.split(/\s+/).filter(Boolean);
  const collapsedQuery = normalizedQuery.replace(/\s+/g, "");
  const initials = getInitials(`${product.name} ${categoryName}`);

  if (
    combined.includes(normalizedQuery) ||
    productName.startsWith(normalizedQuery) ||
    productDescription.startsWith(normalizedQuery) ||
    normalizedCategory.startsWith(normalizedQuery) ||
    initials.startsWith(collapsedQuery)
  ) {
    return true;
  }

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  return queryTokens.every((token) => words.some((word) => word.startsWith(token)));
}

export function MobileMenuApp({ initialData }: MobileMenuAppProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todo-menu");
  const [categoryScreenOpen, setCategoryScreenOpen] = useState(false);
  const [categorySearchOpen, setCategorySearchOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = window.localStorage.getItem("pollon-theme");
    return storedTheme === "dark" ? "dark" : "light";
  });
  const [exploreTick, setExploreTick] = useState(0);

  const categories = initialData.categories;
  const visibleCategories = useMemo(
    () => categories.filter((category) => category.slug !== "todo-menu"),
    [categories],
  );

  const categoryNameBySlug = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [category.slug, category.name]),
      ) as Record<string, string>,
    [categories],
  );

  const homeHeroCategories = useMemo(
    () =>
      HOME_HERO_BUTTONS.map((slug) => categories.find((category) => category.slug === slug)).filter(
        Boolean,
      ) as Category[],
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const baseProducts =
      activeCategory === "todo-menu"
        ? initialData.products
        : initialData.products.filter((product) => product.categorySlug === activeCategory);

    const searchedProducts = search.trim()
      ? baseProducts.filter((product) =>
          matchesSmartSearch(search, product, categoryNameBySlug[product.categorySlug] ?? ""),
        )
      : baseProducts;

    return showFavoritesOnly
      ? searchedProducts.filter((product) => favoriteIds.includes(product.id))
      : searchedProducts;
  }, [
    activeCategory,
    categoryNameBySlug,
    favoriteIds,
    initialData.products,
    search,
    showFavoritesOnly,
  ]);

  const globalSearchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) {
      return [];
    }

    return initialData.products
      .filter((product) =>
        matchesSmartSearch(globalSearchQuery, product, categoryNameBySlug[product.categorySlug] ?? ""),
      )
      .slice(0, 18);
  }, [categoryNameBySlug, globalSearchQuery, initialData.products]);

  const currentCategoryMeta = useMemo<Category | undefined>(() => {
    return categories.find((category) => category.slug === activeCategory);
  }, [activeCategory, categories]);

  const activeLabel =
    activeCategory === "todo-menu"
      ? "TODO EL MENU"
      : currentCategoryMeta?.name.toUpperCase() ?? "NUESTRA CARTA";

  const activeDescription =
    activeCategory === "todo-menu"
      ? "Todos los platos de todas las categorias."
      : currentCategoryMeta?.description ?? "Platos de esta categoria.";

  const isDark = theme === "dark";

  useEffect(() => {
    window.localStorage.setItem("pollon-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setExploreTick((current) => current + 1);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  function openCategory(slug: string, openFullscreen = true) {
    setActiveCategory(slug);
    setDrawerOpen(false);
    setCategoryScreenOpen(openFullscreen);
    setCategorySearchOpen(false);
    setSearch("");
    setShowFavoritesOnly(false);
    setGlobalSearchOpen(false);
    setGlobalSearchQuery("");
  }

  function closeCategoryScreen() {
    setCategoryScreenOpen(false);
    setCategorySearchOpen(false);
    setSearch("");
    setShowFavoritesOnly(false);
  }

  function toggleFavorite(productId: string) {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function openProductFromSearch(product: Product) {
    setGlobalSearchOpen(false);
    setGlobalSearchQuery("");
    setActiveCategory(product.categorySlug);
    setCategoryScreenOpen(true);
    setCategorySearchOpen(false);
    setSearch("");
    setShowFavoritesOnly(false);
    setSelectedProduct(product);
  }

  return (
    <main className={`desktop-frame ${isDark ? "bg-[#050505]" : ""}`}>
      <div
        className={`mobile-shell transition-colors ${
          isDark
            ? "border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#171717] text-white shadow-none"
            : "border-black/10 bg-gradient-to-b from-[#fffdfa] to-[#f5f1ea] text-neutral-900"
        }`}
      >
        <div className="px-3 pb-28 pt-4">
          <header
            className={`sticky top-3 z-30 mb-4 rounded-[2rem] border px-4 py-3 backdrop-blur-xl transition-colors ${
              isDark
                ? "border-white/10 bg-black/80"
                : "border-black/10 bg-white/90"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={`flex size-11 items-center justify-center rounded-2xl border ${
                  isDark
                    ? "border-white/15 bg-white/5 text-white"
                    : "border-black/10 bg-white text-neutral-900"
                }`}
                aria-label="Abrir menu"
              >
                <Menu className="size-6" />
              </button>

              <div className="flex-1 text-center">
                <div className={`text-[1.02rem] font-black tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                  CARTA <span className="text-[var(--brand-red)]">DIGITAL</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGlobalSearchOpen(true)}
                  className={`flex size-11 items-center justify-center rounded-2xl border ${
                    isDark
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-black/10 bg-white text-neutral-900"
                  }`}
                  aria-label="Buscar platos"
                >
                  <Search className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                  className={`inline-flex h-11 items-center gap-2 rounded-full border px-3 ${
                    isDark
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-black/10 bg-white text-neutral-900"
                  }`}
                  aria-label="Cambiar tema"
                >
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.18em]">
                    {isDark ? "Night" : "Day"}
                  </span>
                  <span className="flex size-5 items-center justify-center rounded-full bg-[var(--brand-red)] text-white">
                    {isDark ? <MoonStar className="size-3.5" /> : <SunMedium className="size-3.5" />}
                  </span>
                </button>
              </div>
            </div>
          </header>

          <section className="relative overflow-hidden rounded-[2.25rem] border border-black/10">
            <img
              src={HERO_BACKGROUND}
              alt="Local de El Pollon"
              className="h-[455px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/75" />

            <div className="absolute inset-x-0 top-0 p-5 text-center text-white">
              <div className="mx-auto max-w-[220px] rounded-full bg-black/35 px-4 py-2 backdrop-blur">
                <p className="font-[var(--font-display)] text-[2rem] font-bold leading-none text-[var(--brand-red)]">
                  El Pollon
                </p>
                <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.24em] text-white/90">
                  Pollo a la brasa
                </p>
              </div>
            </div>

            <div className="absolute inset-x-3 bottom-5">
              <div className="mb-3 flex justify-center">
                {homeHeroCategories
                  .filter((category) => category.slug === "todo-menu")
                  .map((category) => {
                    const Icon = getCategoryIcon(category.icon);

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => openCategory(category.slug, true)}
                        className="inline-flex items-center gap-2 rounded-[1rem] bg-brand-gradient px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(239,43,45,0.32)]"
                      >
                        <Icon className="size-4" />
                        {category.name}
                      </button>
                    );
                  })}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {homeHeroCategories
                  .filter((category) => category.slug !== "todo-menu")
                  .map((category) => {
                    const Icon = getCategoryIcon(category.icon);

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => openCategory(category.slug, true)}
                        className="rounded-[1.1rem] bg-brand-gradient px-2 py-4 text-center text-white shadow-[0_14px_32px_rgba(239,43,45,0.28)] transition hover:scale-[1.02]"
                      >
                        <Icon className="mx-auto mb-2 size-6" />
                        <span className="block text-[0.72rem] font-bold leading-4">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className={`mb-4 text-[2rem] font-black uppercase tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
              EXPLORE
            </div>

            <div className="space-y-4 px-0.5">
              {visibleCategories.map((category, categoryIndex) => {
                const products = initialData.products.filter(
                  (product) => product.categorySlug === category.slug,
                );

                if (!products.length) {
                  return null;
                }

                const currentProduct =
                  products[(exploreTick + categoryIndex) % products.length] ?? products[0];
                const Icon = getCategoryIcon(category.icon);

                return (
                  <button
                    key={`explore-${category.id}`}
                    type="button"
                    onClick={() => openCategory(category.slug, true)}
                    className={`product-card-shadow mx-auto block w-full overflow-hidden rounded-[2rem] border text-left ${
                      isDark
                        ? "border-white/10 bg-white/5"
                        : "border-black/8 bg-white"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={currentProduct.imageUrl}
                        alt={currentProduct.name}
                        className="h-[230px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="size-5 text-white" />
                          <p className="text-[1.05rem] font-black uppercase tracking-[0.08em]">
                            {category.name}
                          </p>
                        </div>
                        <p className="line-clamp-2 text-[1.2rem] font-semibold leading-6">
                          {currentProduct.name}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[var(--brand-red)]">
                            {formatCurrency(currentProduct.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <nav
          className={`fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-t px-4 py-3 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-black/90"
              : "border-black/10 bg-white/92"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setCategoryScreenOpen(false);
              setDrawerOpen(false);
              setSearch("");
              setShowFavoritesOnly(false);
              setGlobalSearchOpen(false);
              setGlobalSearchQuery("");
              setActiveCategory("todo-menu");
            }}
            className="flex flex-col items-center gap-1 text-[0.72rem] font-semibold text-[var(--brand-red)]"
          >
            <Home className="size-5" />
            Inicio
          </button>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center gap-1 text-[0.72rem] font-medium ${isDark ? "text-white/75" : "text-neutral-600"}`}
          >
            <Store className="size-5" />
            Menu
          </button>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-1 text-[0.72rem] font-medium ${isDark ? "text-white/75" : "text-neutral-600"}`}
          >
            <MapPin className="size-5" />
            Ubicacion
          </button>
          <button
            type="button"
            onClick={() => {
              setShowFavoritesOnly((current) => {
                const next = !current;
                setActiveCategory("todo-menu");
                setCategoryScreenOpen(next);
                setCategorySearchOpen(false);
                setSearch("");
                return next;
              });
            }}
            className={`flex flex-col items-center gap-1 text-[0.72rem] font-medium ${isDark ? "text-white/75" : "text-neutral-600"}`}
          >
            <Heart
              className={`size-5 ${
                showFavoritesOnly ? "fill-[var(--brand-red)] text-[var(--brand-red)]" : ""
              }`}
            />
            Favoritos
          </button>
          <a
            href={initialData.settings.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex flex-col items-center gap-1 text-[0.72rem] font-medium ${isDark ? "text-white/75" : "text-neutral-600"}`}
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </a>
          <a
            href={initialData.settings.deliveryUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex flex-col items-center gap-1 text-[0.72rem] font-medium ${isDark ? "text-white/75" : "text-neutral-600"}`}
          >
            <Globe className="size-5" />
            Web
          </a>
        </nav>

        <div
          className={`fixed inset-0 z-50 bg-black/50 transition ${
            drawerOpen || globalSearchOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => {
            setDrawerOpen(false);
            setGlobalSearchOpen(false);
          }}
        />

        <aside
          className={`menu-drawer fixed left-0 top-0 z-[60] h-full w-[84%] max-w-[340px] transform text-white transition duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-white/10 bg-brand-gradient px-5 pb-6 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex size-24 items-center justify-center rounded-full bg-white shadow-lg">
                <div className="text-center leading-none">
                  <div className="font-[var(--font-display)] text-3xl font-bold text-[var(--brand-red)]">
                    Pollon
                  </div>
                  <div className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.28em] text-neutral-500">
                    Pollo a la brasa
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10"
                aria-label="Cerrar menu"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100%-152px)] flex-col overflow-y-auto px-5 py-6 hide-scrollbar">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[1.8rem] font-black text-white">Categorias</h3>
              <ChevronRight className="size-5 text-white/70" />
            </div>

            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.icon);
                const active = activeCategory === category.slug;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => openCategory(category.slug, true)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-[var(--brand-red)] bg-white/10"
                        : "border-white/10 bg-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-5 text-[var(--brand-red)]" />
                      <span className="text-lg font-medium text-white">{category.name}</span>
                    </span>
                    <ChevronRight className="size-4 text-white/40" />
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--brand-red)]/70" />
                <span className="text-2xl font-black uppercase tracking-wide text-[var(--brand-red)]">
                  Delivery
                </span>
                <span className="h-px flex-1 bg-[var(--brand-red)]/70" />
              </div>
              <a
                href={initialData.settings.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-5 text-center"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">Web oficial</p>
                <p className="mt-2 text-lg font-semibold text-white">{initialData.settings.deliveryUrl}</p>
              </a>
            </div>
          </div>
        </aside>

        {globalSearchOpen ? (
          <div className="fixed inset-x-0 top-0 z-[65] mx-auto w-full max-w-[430px] px-3 pt-20">
            <div
              className={`rounded-[2rem] border p-4 shadow-2xl ${
                isDark
                  ? "border-white/10 bg-[#0f0f0f] text-white"
                  : "border-black/10 bg-white text-neutral-900"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-black uppercase tracking-[0.12em] text-[var(--brand-red)]">
                  Buscar platos
                </p>
                <button
                  type="button"
                  onClick={() => setGlobalSearchOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-black/10"
                >
                  <X className="size-4" />
                </button>
              </div>

              <label
                className={`flex items-center gap-3 rounded-full border px-4 py-3 ${
                  isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
                }`}
              >
                <Search className="size-4 text-[var(--brand-red)]" />
                <input
                  autoFocus
                  value={globalSearchQuery}
                  onChange={(event) => setGlobalSearchQuery(event.target.value)}
                  placeholder="Escribe una inicial o nombre del plato..."
                  className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </label>

              <div className="hide-scrollbar mt-4 max-h-[58vh] overflow-y-auto space-y-3">
                {globalSearchQuery.trim() ? (
                  globalSearchResults.length > 0 ? (
                    globalSearchResults.map((product) => (
                      <button
                        key={`search-${product.id}`}
                        type="button"
                        onClick={() => openProductFromSearch(product)}
                        className={`flex w-full items-center gap-3 rounded-[1.4rem] border p-3 text-left ${
                          isDark
                            ? "border-white/10 bg-white/5"
                            : "border-black/10 bg-neutral-50"
                        }`}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-16 w-16 rounded-[1rem] object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black">{product.name}</p>
                          <p className="mt-1 truncate text-xs text-neutral-500">
                            {categoryNameBySlug[product.categorySlug] ?? "Categoria"}
                          </p>
                        </div>
                        <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-black text-white">
                          {formatCurrency(product.price)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-black/10 px-4 py-7 text-center text-sm text-neutral-500">
                      No encontramos platos con esa busqueda.
                    </div>
                  )
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-black/10 px-4 py-7 text-center text-sm text-neutral-500">
                    Escribe por ejemplo: <strong>pollo</strong>, <strong>chaufa</strong>,{" "}
                    <strong>coca</strong> o incluso una inicial para filtrar mas rapido.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {categoryScreenOpen ? (
          <div
            className={`fixed inset-x-0 top-0 z-[45] mx-auto flex h-[calc(100dvh-74px)] w-full max-w-[430px] flex-col overflow-hidden ${
              isDark ? "bg-[#111111]" : "bg-[#f7f4ef]"
            }`}
          >
            <div className="bg-brand-gradient px-4 pb-4 pt-5 text-white shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeCategoryScreen}
                  className="flex size-10 items-center justify-center rounded-full bg-white/12"
                  aria-label="Cerrar categoria"
                >
                  <ArrowLeft className="size-5" />
                </button>

                <h2 className="flex-1 text-center text-[1.45rem] font-black uppercase tracking-tight">
                  {activeLabel}
                </h2>

                <button
                  type="button"
                  onClick={() => setCategorySearchOpen((current) => !current)}
                  className="flex size-10 items-center justify-center rounded-full bg-white/12"
                  aria-label="Buscar en la categoria"
                >
                  <Search className="size-5" />
                </button>
              </div>

              <p className="mt-3 text-center text-sm text-white/80">{activeDescription}</p>

              {categorySearchOpen ? (
                <div className="mt-4">
                  <label className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-neutral-900">
                    <Search className="size-4 text-neutral-500" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={`Buscar en ${activeLabel.toLowerCase()}...`}
                      className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
                    />
                  </label>
                </div>
              ) : null}
            </div>

            <div className="hide-scrollbar flex-1 overflow-y-auto px-3 pb-6 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div className={`text-sm font-black uppercase tracking-[0.18em] ${isDark ? "text-white/75" : "text-neutral-600"}`}>
                  {showFavoritesOnly ? "Favoritos" : "Platos"}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFavoritesOnly((current) => !current)}
                  className={`rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.16em] ${
                    showFavoritesOnly
                      ? "bg-[var(--brand-red)] text-white"
                      : isDark
                        ? "border border-white/10 bg-white/5 text-white"
                        : "border border-black/10 bg-white text-neutral-700"
                  }`}
                >
                  {showFavoritesOnly ? "Ver todo" : "Solo favoritos"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <button
                    key={`screen-${product.id}`}
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className={`overflow-hidden rounded-[1.55rem] border text-left shadow-[0_8px_24px_rgba(15,23,42,0.12)] ${
                      isDark
                        ? "border-white/10 bg-[#1b1b1b] text-white"
                        : "border-black/10 bg-white text-neutral-900"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-32 w-full object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-[var(--brand-red)] px-2 py-1 text-[0.55rem] font-black uppercase tracking-[0.15em] text-white">
                        {product.tag?.toUpperCase() ?? "Oferta"}
                      </span>
                    </div>

                    <div className="space-y-1 p-3 pt-2">
                      <p className={`line-clamp-3 min-h-[2.7rem] text-center text-[0.95rem] font-medium leading-5 ${isDark ? "text-white" : "text-neutral-900"}`}>
                        {product.name}
                      </p>

                      <div className="flex justify-center">
                        <span className="rounded-[0.7rem] bg-brand-gradient px-4 py-1.5 text-[1.02rem] font-black text-white shadow-sm">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {filteredProducts.length === 0 ? (
                <div
                  className={`mt-6 rounded-[1.6rem] border border-dashed px-4 py-8 text-center text-sm ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white/65"
                      : "border-black/15 bg-white text-neutral-500"
                  }`}
                >
                  No encontramos platos en esta categoria con esa busqueda.
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {selectedProduct ? (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
            <div
              className={`w-full max-w-[390px] overflow-hidden rounded-[2rem] shadow-2xl ${
                isDark ? "bg-[#111111] text-white" : "bg-white text-neutral-900"
              }`}
            >
              <div className="bg-brand-gradient px-5 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-white/75">
                      {selectedProduct.tag ?? "Especial"}
                    </p>
                    <h3 className="mt-1 text-[1.8rem] font-black leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="flex size-10 items-center justify-center rounded-full bg-white/15"
                    aria-label="Cerrar producto"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-5">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="h-[240px] w-full rounded-[1.7rem] object-cover"
                />

                <div className="flex justify-center gap-1 text-[var(--brand-red)]">
                  {Array.from({ length: selectedProduct.rating }).map((_, index) => (
                    <Star
                      key={`${selectedProduct.id}-modal-${index}`}
                      className="size-4 fill-current"
                    />
                  ))}
                </div>

                <p className={`text-balance text-center text-[1.12rem] leading-8 ${isDark ? "text-white/80" : "text-neutral-600"}`}>
                  {selectedProduct.description}
                </p>

                <div className="grid grid-cols-[64px_1fr] gap-3">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className={`flex h-16 items-center justify-center rounded-2xl border ${
                      isDark
                        ? "border-white/10 bg-white/5 text-[var(--brand-red)]"
                        : "border-black/10 bg-white text-[var(--brand-red)]"
                    }`}
                  >
                    <Heart
                      className={`size-6 ${
                        favoriteIds.includes(selectedProduct.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <div className="flex h-16 items-center justify-center rounded-2xl bg-brand-gradient px-6 text-[2rem] font-black text-white shadow-lg">
                    {formatCurrency(selectedProduct.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
