"use client";

import type { SiteSettings } from "@/types/menu";

type SettingsViewProps = {
  settings: SiteSettings;
  loading: boolean;
  onChange: (settings: SiteSettings) => void;
  onSave: () => Promise<void>;
  onImportSeed: () => Promise<void>;
};

export function SettingsView({
  settings,
  loading,
  onChange,
  onSave,
  onImportSeed,
}: SettingsViewProps) {
  function updateField<Key extends keyof SiteSettings>(key: Key, value: SiteSettings[Key]) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void onSave()}
          disabled={loading}
          className="rounded-xl bg-[#ef2b2d] px-5 py-2.5 text-sm font-bold text-white"
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={() => void onImportSeed()}
          disabled={loading}
          className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold"
        >
          Importar menu base
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#111]">Header de la carta</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Titulo, subtitulo y datos visibles en la parte superior
          </p>
          <div className="mt-5 space-y-4">
            {(
              [
                ["restaurantName", "Nombre del restaurante"],
                ["locationLabel", "Ubicacion corta"],
                ["heroTitle", "Titulo principal"],
                ["heroSubtitle", "Subtitulo principal"],
                ["primaryColor", "Color primario"],
                ["secondaryColor", "Color secundario"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm font-semibold text-neutral-600">{label}</span>
                <input
                  value={settings[key]}
                  onChange={(event) => updateField(key, event.target.value)}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#111]">Footer y contacto</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Enlaces, direccion y horarios del pie de pagina
          </p>
          <div className="mt-5 space-y-4">
            {(
              [
                ["whatsappUrl", "URL de WhatsApp"],
                ["deliveryUrl", "URL del sitio web"],
                ["address", "Direccion"],
                ["schedule", "Horario de atencion"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm font-semibold text-neutral-600">{label}</span>
                <input
                  value={settings[key]}
                  onChange={(event) => updateField(key, event.target.value)}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none"
                />
              </label>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#111]">Vista previa rapida</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/8">
          <div
            className="px-6 py-8 text-white"
            style={{
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
              {settings.locationLabel}
            </p>
            <h3 className="mt-2 text-3xl font-black">{settings.heroTitle}</h3>
            <p className="mt-2 max-w-xl text-sm text-white/85">{settings.heroSubtitle}</p>
          </div>
          <div className="grid gap-2 bg-neutral-50 px-6 py-5 text-sm text-neutral-700 sm:grid-cols-3">
            <p>{settings.address}</p>
            <p>{settings.schedule}</p>
            <p className="truncate">{settings.whatsappUrl}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
