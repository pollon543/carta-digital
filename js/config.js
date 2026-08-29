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
  /* Logo de El Pollón (arriba del carrusel) */
  logoUrl: "assets/logo-pollon.svg",

  /* Botón INGRESAR — página web del Pollón */
  ingresarUrl: "https://www.el-pollon.cl",

  /*
   * Platos del carrusel 3D
   * Puedes agregar o quitar platos. Mínimo recomendado: 4
   * Cada plato necesita: url (imagen) y nombre (texto alternativo)
   */
  platos: [
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_h9xkwh9xkwh9xkwh-Photoroom.png",
      nombre: "Pollo a la brasa",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_ee8mp2ee8mp2ee8m-Photoroom.png",
      nombre: "Arroz chaufa",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_335uba335uba335u-Photoroom.png",
      nombre: "Papas fritas",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_mmmwpmmmwpmmmwpm-Photoroom.png",
      nombre: "Ensalada fresca",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_r44sp1r44sp1r44s__1___2_-removebg-preview.png?updatedAt=1787963240954",
      nombre: "Combo familiar",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_ht9rzfht9rzfht9r%20(1).png",
      nombre: "Nuggets crocantes",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_dhec8xdhec8xdhec-Photoroom.png",
      nombre: "Lomo saltado",
    },
    {
      url: "https://ik.imagekit.io/cr9brsund/pollon-iquique-vivar/Gemini_Generated_Image_turdurturdurturd-Photoroom.png",
      nombre: "Bebida refrescante",
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
