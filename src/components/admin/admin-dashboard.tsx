/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { LogOut, RefreshCw, UploadCloud } from "lucide-react";

import { defaultSettings, seedCategories, seedProducts } from "@/data/seed";
import { createSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Category, Product, SiteSettings } from "@/types/menu";

const emptyCategory: Category = {
  id: "",
  slug: "",
  name: "",
  description: "",
  icon: "UtensilsCrossed",
  sortOrder: 99,
  accent: "#ef4444",
  coverImage: "",
};

const emptyProduct: Product = {
  id: "",
  categorySlug: "ofertas-familiares",
  sortOrder: 0,
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  rating: 5,
  tag: "",
  isFeatured: false,
  isPopular: false,
};

function mapSettingsToDb(settings: SiteSettings) {
  return {
    id: 1,
    restaurant_name: settings.restaurantName,
    location_label: settings.locationLabel,
    hero_title: settings.heroTitle,
    hero_subtitle: settings.heroSubtitle,
    whatsapp_url: settings.whatsappUrl,
    delivery_url: settings.deliveryUrl,
    address: settings.address,
    schedule: settings.schedule,
    primary_color: settings.primaryColor,
    secondary_color: settings.secondaryColor,
  };
}

export function AdminDashboard() {
  const isConfigured = hasSupabaseEnv();
  const [loading, setLoading] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Configura Supabase para habilitar administracion completa.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryForm, setCategoryForm] = useState<Category>(emptyCategory);
  const [productForm, setProductForm] = useState<Product>(emptyProduct);
  const [uploading, setUploading] = useState(false);

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        const orderDifference = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        if (orderDifference !== 0) return orderDifference;
        return a.name.localeCompare(b.name);
      }),
    [products],
  );

  const loadDashboardData = useCallback(async () => {
    if (!isConfigured) {
      return;
    }

    setLoading(true);
    setStatusMessage("Cargando panel...");

    try {
      const supabase = createSupabaseBrowserClient();
      const [settingsResult, categoriesResult, productsResult] = await Promise.all([
        supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("categories").select("*").order("sort_order", { ascending: true }),
        supabase
          .from("products")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true }),
      ]);

      if (settingsResult.data) {
        setSettings({
          restaurantName: settingsResult.data.restaurant_name ?? defaultSettings.restaurantName,
          locationLabel: settingsResult.data.location_label ?? defaultSettings.locationLabel,
          heroTitle: settingsResult.data.hero_title ?? defaultSettings.heroTitle,
          heroSubtitle: settingsResult.data.hero_subtitle ?? defaultSettings.heroSubtitle,
          whatsappUrl: settingsResult.data.whatsapp_url ?? defaultSettings.whatsappUrl,
          deliveryUrl: settingsResult.data.delivery_url ?? defaultSettings.deliveryUrl,
          address: settingsResult.data.address ?? defaultSettings.address,
          schedule: settingsResult.data.schedule ?? defaultSettings.schedule,
          primaryColor: settingsResult.data.primary_color ?? defaultSettings.primaryColor,
          secondaryColor: settingsResult.data.secondary_color ?? defaultSettings.secondaryColor,
        });
      }

      setCategories(
        (categoriesResult.data ?? []).map((category) => ({
          id: String(category.id),
          slug: String(category.slug),
          name: String(category.name),
          description: String(category.description ?? ""),
          icon: String(category.icon ?? "UtensilsCrossed"),
          sortOrder: Number(category.sort_order ?? 0),
          accent: String(category.accent ?? "#ef4444"),
          coverImage: String(category.cover_image ?? ""),
        })),
      );

      setProducts(
        (productsResult.data ?? []).map((product) => ({
          id: String(product.id),
          categorySlug: String(product.category_slug),
          sortOrder: Number(product.sort_order ?? 0),
          name: String(product.name),
          description: String(product.description ?? ""),
          price: Number(product.price ?? 0),
          imageUrl: String(product.image_url ?? ""),
          rating: Number(product.rating ?? 5),
          tag: product.tag ? String(product.tag) : "",
          isFeatured: Boolean(product.is_featured),
          isPopular: Boolean(product.is_popular),
        })),
      );

      setStatusMessage("Panel cargado. Ya puedes editar la carta digital.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "No pudimos cargar los datos del panel.",
      );
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      const userEmail = data.session?.user.email ?? null;
      setSessionEmail(userEmail);

      if (userEmail) {
        void loadDashboardData();
      } else {
        setStatusMessage("Inicia sesion con tu usuario de Supabase Auth para administrar el menu.");
      }
    });
  }, [isConfigured, loadDashboardData]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) return;

    setLoading(true);
    setStatusMessage("Iniciando sesion...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      setSessionEmail(data.user.email ?? email);
      setStatusMessage("Sesion iniciada correctamente.");
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "No fue posible iniciar sesion.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    if (!isConfigured) return;

    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setSessionEmail(null);
    setCategories([]);
    setProducts([]);
    setStatusMessage("Sesion cerrada.");
  }

  async function handleImportSeed() {
    if (!isConfigured) return;

    setLoading(true);
    setStatusMessage("Importando datos base del menu...");

    try {
      const supabase = createSupabaseBrowserClient();

      const { error: settingsError } = await supabase
        .from("site_settings")
        .upsert(mapSettingsToDb(defaultSettings));
      if (settingsError) throw settingsError;

      const { error: categoriesError } = await supabase.from("categories").upsert(
        seedCategories
          .filter((category) => category.slug !== "todo-menu")
          .map((category) => ({
            id: category.id,
            slug: category.slug,
            name: category.name,
            description: category.description,
            icon: category.icon,
            sort_order: category.sortOrder,
            accent: category.accent,
            cover_image: category.coverImage,
          })),
      );
      if (categoriesError) throw categoriesError;

      const { error: productsError } = await supabase.from("products").upsert(
        seedProducts.map((product, index) => ({
          id: product.id,
          category_slug: product.categorySlug,
          sort_order: product.sortOrder ?? index + 1,
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.imageUrl,
          rating: product.rating,
          tag: product.tag || null,
          is_featured: Boolean(product.isFeatured),
          is_popular: Boolean(product.isPopular),
          is_active: true,
        })),
      );
      if (productsError) throw productsError;

      setStatusMessage("Datos base importados correctamente.");
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "No pudimos importar el menu base.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings() {
    if (!isConfigured) return;

    setLoading(true);
    setStatusMessage("Guardando configuracion general...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("site_settings").upsert(mapSettingsToDb(settings));

      if (error) throw error;

      setStatusMessage("Configuracion guardada.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos guardar ajustes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) return;

    const slug = categoryForm.slug || slugify(categoryForm.name);
    const id = categoryForm.id || `cat-${slug}`;

    setLoading(true);
    setStatusMessage("Guardando categoria...");

    try {
      const supabase = createSupabaseBrowserClient();
      const payload = {
        id,
        slug,
        name: categoryForm.name,
        description: categoryForm.description,
        icon: categoryForm.icon,
        sort_order: categoryForm.sortOrder,
        accent: categoryForm.accent,
        cover_image: categoryForm.coverImage,
      };

      const { error } = await supabase.from("categories").upsert(payload);
      if (error) throw error;

      setStatusMessage("Categoria guardada.");
      setCategoryForm(emptyCategory);
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos guardar la categoria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCategory() {
    if (!isConfigured || !categoryForm.id) return;

    setLoading(true);
    setStatusMessage("Eliminando categoria...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("categories").delete().eq("id", categoryForm.id);
      if (error) throw error;

      setCategoryForm(emptyCategory);
      setStatusMessage("Categoria eliminada.");
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos eliminar la categoria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) return;

    const generatedId = productForm.id || slugify(productForm.name);

    setLoading(true);
    setStatusMessage("Guardando producto...");

    try {
      const supabase = createSupabaseBrowserClient();
      const payload = {
        id: generatedId,
        category_slug: productForm.categorySlug,
        sort_order: Number(productForm.sortOrder ?? 0),
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        image_url: productForm.imageUrl,
        rating: Number(productForm.rating),
        tag: productForm.tag || null,
        is_featured: Boolean(productForm.isFeatured),
        is_popular: Boolean(productForm.isPopular),
        is_active: true,
      };

      const { error } = await supabase.from("products").upsert(payload);
      if (error) throw error;

      setProductForm(emptyProduct);
      setStatusMessage("Producto guardado.");
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos guardar el producto.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct() {
    if (!isConfigured || !productForm.id) return;

    setLoading(true);
    setStatusMessage("Eliminando producto...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("products").delete().eq("id", productForm.id);
      if (error) throw error;

      setProductForm(emptyProduct);
      setStatusMessage("Producto eliminado.");
      await loadDashboardData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos eliminar el producto.");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File) {
    if (!isConfigured) return;

    setUploading(true);
    setStatusMessage("Subiendo imagen a Supabase Storage...");

    try {
      const supabase = createSupabaseBrowserClient();
      const extension = file.name.split(".").pop() || "jpg";
      const path = `products/${Date.now()}-${slugify(file.name)}.${extension}`;

      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (error) throw error;

      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setProductForm((current) => ({ ...current, imageUrl: data.publicUrl }));
      setStatusMessage("Imagen subida. Ahora guarda el producto para dejarla permanente.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "No pudimos subir la imagen. Revisa el bucket product-images.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-red-300">
                Panel administrador
              </p>
              <h1 className="mt-2 text-4xl font-black text-white">Carta digital El Pollon</h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-300">
                Desde aqui puedes iniciar sesion, importar el menu actual, editar productos, cambiar
                fotos y actualizar la configuracion general que luego consumira la app publica.
              </p>
            </div>

            {sessionEmail ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white"
              >
                <LogOut className="size-4" />
                Cerrar sesion
              </button>
            ) : null}
          </div>
        </header>

        <div className="rounded-[1.7rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-neutral-200">
          {statusMessage}
        </div>

        {!isConfigured ? (
          <div className="rounded-[2rem] border border-amber-400/30 bg-amber-500/10 p-6 text-sm leading-7 text-amber-100">
            <p className="font-black uppercase tracking-[0.2em] text-amber-300">
              Falta conectar Supabase
            </p>
            <p className="mt-3">
              Agrega en tu archivo <code>.env.local</code> las variables{" "}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
              Despues ejecuta el SQL de <code>supabase/sql/setup.sql</code> y vuelve a cargar el
              proyecto.
            </p>
          </div>
        ) : null}

        {isConfigured && !sessionEmail ? (
          <form
            onSubmit={handleSignIn}
            className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-2xl font-black text-white">Iniciar sesion admin</h2>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-neutral-300">Correo</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-neutral-300">Contrasena</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                />
              </label>
              <button
                disabled={loading}
                className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-white disabled:opacity-60"
              >
                {loading ? "Ingresando..." : "Entrar al panel"}
              </button>
            </div>
          </form>
        ) : null}

        {isConfigured && sessionEmail ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void loadDashboardData()}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold"
              >
                <RefreshCw className="size-4" />
                Recargar datos
              </button>
              <button
                type="button"
                onClick={() => void handleImportSeed()}
                className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
              >
                Importar menu base
              </button>
            </div>

            <section className="admin-grid">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-black text-white">Configuracion general</h3>
                  <div className="mt-5 space-y-3">
                    {(
                      [
                        ["restaurantName", "Nombre restaurante"],
                        ["locationLabel", "Ubicacion corta"],
                        ["heroTitle", "Titulo principal"],
                        ["heroSubtitle", "Subtitulo principal"],
                        ["whatsappUrl", "URL WhatsApp"],
                        ["deliveryUrl", "URL delivery"],
                        ["address", "Direccion"],
                        ["schedule", "Horario"],
                        ["primaryColor", "Color primario"],
                        ["secondaryColor", "Color secundario"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1 block text-sm font-semibold text-neutral-300">{label}</span>
                        <input
                          value={settings[key]}
                          onChange={(event) =>
                            setSettings((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                        />
                      </label>
                    ))}
                    <button
                      type="button"
                      onClick={() => void handleSaveSettings()}
                      className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-neutral-900"
                    >
                      Guardar configuracion
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveCategory} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-black text-white">Categoria</h3>
                  <div className="mt-5 space-y-3">
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Slug</span>
                      <input
                        value={categoryForm.slug}
                        onChange={(event) =>
                          setCategoryForm((current) => ({ ...current, slug: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Nombre</span>
                      <input
                        value={categoryForm.name}
                        onChange={(event) =>
                          setCategoryForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Descripcion</span>
                      <textarea
                        value={categoryForm.description}
                        onChange={(event) =>
                          setCategoryForm((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                        rows={3}
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={categoryForm.icon}
                        onChange={(event) =>
                          setCategoryForm((current) => ({ ...current, icon: event.target.value }))
                        }
                        placeholder="Icono lucide"
                        className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                      <input
                        value={categoryForm.sortOrder}
                        onChange={(event) =>
                          setCategoryForm((current) => ({
                            ...current,
                            sortOrder: Number(event.target.value),
                          }))
                        }
                        type="number"
                        className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </div>
                    <input
                      value={categoryForm.accent}
                      onChange={(event) =>
                        setCategoryForm((current) => ({ ...current, accent: event.target.value }))
                      }
                      placeholder="#ef4444"
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                    />
                    <input
                      value={categoryForm.coverImage}
                      onChange={(event) =>
                        setCategoryForm((current) => ({ ...current, coverImage: event.target.value }))
                      }
                      placeholder="https://..."
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <button className="rounded-2xl bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-neutral-900">
                        Guardar categoria
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategoryForm(emptyCategory)}
                        className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-bold text-white"
                      >
                        Nueva categoria
                      </button>
                    </div>
                    {categoryForm.id ? (
                      <button
                        type="button"
                        onClick={() => void handleDeleteCategory()}
                        className="w-full rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200"
                      >
                        Eliminar categoria
                      </button>
                    ) : null}
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-black text-white">Categorias registradas</h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setCategoryForm(category)}
                        className="rounded-[1.5rem] border border-white/10 bg-neutral-950/70 px-4 py-4 text-left"
                      >
                        <p className="text-lg font-bold text-white">{category.name}</p>
                        <p className="mt-1 text-sm text-neutral-400">{category.slug}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSaveProduct} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-black text-white">Producto</h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <label className="block md:col-span-2">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Nombre</span>
                      <input
                        value={productForm.name}
                        onChange={(event) =>
                          setProductForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Categoria</span>
                      <select
                        value={productForm.categorySlug}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            categorySlug: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Precio</span>
                      <input
                        value={productForm.price}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            price: Number(event.target.value),
                          }))
                        }
                        type="number"
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Orden del plato</span>
                      <input
                        value={productForm.sortOrder ?? 0}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            sortOrder: Number(event.target.value),
                          }))
                        }
                        type="number"
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Descripcion</span>
                      <textarea
                        value={productForm.description}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">URL de imagen</span>
                      <input
                        value={productForm.imageUrl}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            imageUrl: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-1 block text-sm font-semibold text-neutral-300">Subir nueva imagen</span>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-neutral-950/70 px-4 py-4 text-sm font-semibold text-neutral-200">
                        <UploadCloud className="size-4" />
                        {uploading ? "Subiendo..." : "Seleccionar archivo"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              void handleImageUpload(file);
                            }
                          }}
                        />
                      </label>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={productForm.tag}
                        onChange={(event) =>
                          setProductForm((current) => ({ ...current, tag: event.target.value }))
                        }
                        placeholder="Promo / Top / Nuevo"
                        className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                      <input
                        value={productForm.rating}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            rating: Number(event.target.value),
                          }))
                        }
                        type="number"
                        min={1}
                        max={5}
                        className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-5 md:col-span-2">
                      <label className="inline-flex items-center gap-2 text-sm text-neutral-200">
                        <input
                          type="checkbox"
                          checked={Boolean(productForm.isFeatured)}
                          onChange={(event) =>
                            setProductForm((current) => ({
                              ...current,
                              isFeatured: event.target.checked,
                            }))
                          }
                        />
                        Destacado
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm text-neutral-200">
                        <input
                          type="checkbox"
                          checked={Boolean(productForm.isPopular)}
                          onChange={(event) =>
                            setProductForm((current) => ({
                              ...current,
                              isPopular: event.target.checked,
                            }))
                          }
                        />
                        Popular
                      </label>
                    </div>
                    <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
                      <button className="rounded-2xl bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-neutral-900">
                        Guardar producto
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductForm(emptyProduct)}
                        className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-bold text-white"
                      >
                        Nuevo producto
                      </button>
                      {productForm.id ? (
                        <button
                          type="button"
                          onClick={() => void handleDeleteProduct()}
                          className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200"
                        >
                          Eliminar
                        </button>
                      ) : null}
                    </div>
                  </div>
                </form>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-black text-white">Productos registrados</h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {sortedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setProductForm(product)}
                        className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-neutral-950/70 text-left"
                      >
                        <img src={product.imageUrl} alt={product.name} className="h-36 w-full object-cover" />
                        <div className="space-y-2 p-4">
                          <p className="text-lg font-bold text-white">{product.name}</p>
                          <p className="line-clamp-2 text-sm text-neutral-400">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-500">
                              #{product.sortOrder ?? 0} · {product.categorySlug}
                            </span>
                            <span className="text-sm font-black text-red-300">${product.price.toLocaleString("es-CL")}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
