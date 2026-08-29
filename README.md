# Carta Digital El Pollón

Pantalla de presentación estática con **HTML, CSS y JavaScript** (sin React).

## Pantalla actual

- Título **CARTA DIGITAL**
- Logo El Pollón
- Carrusel 3D circular con fotos de platos (giro infinito)
- Botón **INGRESAR** → [el-pollon.cl](https://www.el-pollon.cl)

## Ver en local

```bash
npx serve .
```

Abre: http://localhost:3000

## Cambiar imágenes por URL

Edita el archivo **`js/config.js`**:

```javascript
window.CARTA_CONFIG = {
  logoUrl: "https://tu-link.com/logo-pollon.png",
  ingresarUrl: "https://www.el-pollon.cl",
  platos: [
    {
      url: "https://tu-link.com/pollo-brasa.png",
      nombre: "Pollo a la brasa",
    },
    {
      url: "https://tu-link.com/chaufa.png",
      nombre: "Arroz chaufa",
    },
    // Agrega más platos...
  ],
};
```

### Recomendaciones para las imágenes

- **Formato:** PNG con fondo transparente (mejor efecto 3D)
- **Tamaño:** mínimo 500×500 px
- **URL:** debe ser un enlace directo a la imagen (termina en `.png`, `.jpg`, `.webp`)
- Puedes subir a: Imgur, Cloudinary, Supabase Storage, tu propio servidor, etc.

### También puedes cambiar

| Qué | Dónde |
|-----|--------|
| Logo | `logoUrl` en `js/config.js` |
| Link del botón INGRESAR | `ingresarUrl` en `js/config.js` |
| Platos del carrusel | array `platos` en `js/config.js` |

## Archivos

```
index.html
css/style.css
js/config.js    ← edita aquí tus URLs
js/app.js
assets/
```
