/**
 * CONFIGURACIÓN — Carta Digital El Pollón
 * ========================================
 * Edita solo este archivo para cambiar imágenes y enlaces.
 * Pega la URL completa de cada imagen (debe empezar con https://)
 *
 * Recomendado para los platos:
 * - Formato PNG con fondo transparente
 * - Tamaño mínimo 500 x 500 px
 * - Imagen cuadrada o casi cuadrada
 */

window.CARTA_CONFIG = {
  /*
   * LOGO DE EL POLLÓN
   * -----------------
   * Pega aquí la URL de tu logo (PNG, JPG, WEBP o SVG).
   * Debe empezar con https://
   *
   * Ejemplo:
   * logoUrl: "https://tu-servidor.com/logo-pollon.png",
   */
  logoUrl: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/logo.png?updatedAt=1781831566358",

  /* Botón INGRESAR — página web del Pollón */
  ingresarUrl: "https://carta-digital-el-pollon.vercel.app/",

  /*
   * Rendimiento móvil (no necesitas cambiar esto)
   * Reduce peso de imágenes automáticamente en celular
   */
  rendimiento: {
    optimizarImagenes: true,
    anchoLogo: 320,
    anchoPlato: 280,
    calidad: 78,
  },

  /*
   * Platos del carrusel 3D
   * Puedes agregar o quitar platos. Mínimo recomendado: 4
   * Cada plato necesita: url (imagen) y nombre (texto alternativo)
   */
  platos: [
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/pechuga%20.png",
      nombre: "Pechuga a la plancha",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/pechuga%20.png?updatedAt=1788044935915",
      nombre: "Arroz chaufa",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/arroz%20chaufa.webp",
      nombre: "Arroz Chaufa",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/fideo%20al%20pesto%20.webp",
      nombre: "Fideos al pesto",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/bistec%20a%20lo%20pobre.webp",
      nombre: "Bistec a lo pobre",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/bistec%20%20con%20fideo%20%20al%20pesto.webp",
      nombre: "Bistec con fideos al pesto",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/saltado%20de%20pollo.webp",
      nombre: "Lomo saltado",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/chuleta%20de%20cerdo.webp",
      nombre: "Chuleta de cerdo",
    },

    /* --- EJEMPLO: tus imágenes por URL (descomenta y pega tus links) --- */
    /*
    {
      url: "https://tu-servidor.com/imagenes/pollo-brasa.png",
      nombre: "Pollo a la brasa",
    },
    {
      url: "https://tu-servidor.com/imagenes/oferton-familiar.png",
      nombre: "Ofertón familiar",
    },
    {
      url: "https://tu-servidor.com/imagenes/chaufa.png",
      nombre: "Chaufa brasa",
    },
    */
  ],
};
