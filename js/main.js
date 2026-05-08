// ============================================
// DATOS DE PRODUCTOS (REALES - EL POLLÓN)
// ============================================
// const productsData = {
//   "todo-menu": [],

//   "ofertas-familiares": [
//     { name: "Ofertón más chaufa", description: "Pollo entero, papas fritas, arroz chaufa, ensalada y bebidas 1.5lt.", price: 24500, image: "img/oferton mas chaufa.png", rating: 5 },
//     { name: "Ofertón más fideo", description: "Pollo entero, papas fritas, fideos al pesto, ensalada y bebidas 1.5lt.", price: 24500, image: "img/oferton mas fideo.png", rating: 5 },
//     { name: "Ofertón más chaufa pura papa", description: "Pollo entero, papas fritas, extra papa frita, arroz chaufa y bebidas 1.5lt.", price: 24500, image: "img/oferton mas chaufa pura papa.png", rating: 5 },
//     { name: "Ofertón con fideo", description: "Pollo entero, papas fritas, fideos al pesto y bebidas 1.5lt.", price: 23500, image: "img/oferton con fideo.png", rating: 5 },
//     { name: "Ofertón sin ensalada", description: "Pollo entero, papas fritas, arroz chaufa y bebidas 1.5lt.", price: 23500, image: "img/oferton sin ensalada.png", rating: 5 },
//     { name: "Ofertón pura papa", description: "Pollo entero, papas fritas, 1/2 porcion de papa frita y bebidas 1.5lt.", price: 23500, image: "img/oferton pura papa.png", rating: 5 },
//     { name: "Oferton familiar", description: "Pollo entero, papas fritas, ensalada y bebidas 1.5lt.", price: 22500, image: "img/oferton familiar.png", rating: 5 },
//     { name: "Mega Familiar", description: "Pollo entero, papas fritas, ensalada y bebidas 1.5lt.", price: 22500, image: "img/oferton familiar.png", rating: 5 }
//   ],

//   "ofertas-dos": [
//     { name: "1/2 combo chaufa", description: "Medio pollo, papas fritas, arroz chaufa.", price: 15600, image: "img/medio combo chaufa.png", rating: 5 },
//     { name: "1/2 combo", description: "Medio pollo, papas fritas, ensalada personal.", price: 15100, image: "img/medio combo.png", rating: 5 },
//     { name: "1/2 combo pura papa", description: "Medio pollo, papas fritas mas cantidad.", price: 15100, image: "img/medio combo pura papa.png", rating: 5 }
//   ],

//   "ofertas-personales": [
//     { name: "1/4 combo", description: "1/4 pollo, papas fritas personales, ensalada personal.", price: 8100, image: "img/personal combo.png", rating: 5 },
//     { name: "1/4 combo pura papa", description: "1/4 pollo, papas fritas personales mas cantidad.", price: 8100, image: "img/personal pura papa.png", rating: 5 },
//     { name: "Chaufa brasa", description: "1/4 pollo, arroz chaufa.", price: 8200, image: "img/chaufa brasa.png", rating: 5 },
//     { name: "Fideo al pesto con 1/4 de pollo", description: "1/4 pollo, fideos al pesto.", price: 8100, image: "img/personal pesto con pollo.png", rating: 5 },
//     { name: "Chaufa brasa con papas fritas", description: "1/4 pollo, papas fritas personal, arroz chaufa.", price: 9200, image: "img/chaufa brasa con papas fritas.png", rating: 5 },
//     { name: "1/4 de pollo con fideo y papa", description: "1/4 pollo, papas fritas, fideos al pesto.", price: 9300, image: "img/personal con papa y fideo 01.png", rating: 5 }
//   ],

//   "platos-extras": [
//     { name: "Lomo saltado de carne con chaufa", description: "Plato extra con chaufa.", price: 12200, image: "img/lomo saltado con arroz chaufa.png", rating: 5 },
//     { name: "Lomo saltado de carne con arroz blanco", description: "Plato extra con arroz blanco.", price: 11700, image: "img/lomo saltado de carne con arroz blanco.png", rating: 5 },
//     { name: "Lomo saltado de pollo con arroz blanco", description: "Plato extra con arroz blanco.", price: 11700, image: "img/lomo saltado de pollo con arroz blanco.png", rating: 5 },
//     { name: "Tallarin saltado", description: "Tallarín saltado de carne.", price: 11700, image: "img/tallarin saltado de carne 01.png", rating: 5 },
//     { name: "Bistec a lo pobre", description: "Bistec a lo pobre.", price: 10700, image: "img/bistec a lo pobre.png", rating: 5 },
//     { name: "Bistec con fideos al pesto", description: "Bistec con fideos al pesto.", price: 10700, image: "", rating: 5 },
//     { name: "Chuleta de cerdo", description: "Chuleta de cerdo.", price: 10700, image: "img/chuleta de cerdo.png", rating: 5 },
//     { name: "Pechuga a la plancha", description: "Pechuga a la plancha.", price: 10200, image: "img/pechuga a la plancha.png", rating: 5 },
//     { name: "Combo nuggets", description: "Combo nuggets.", price: 6700, image: "img/nugget.png", rating: 5 },
//     { name: "Salchipapas", description: "Salchipapas.", price: 6700, image: "img/salchipapa.png", rating: 5 }
//   ],

//   "agregados": [
//     { name: "1 Pollo entero solo", description: "1 pollo entero.", price: 15000, image: "img/pollo solo01.png", rating: 5 },
//     { name: "1/2 Pollo solo", description: "1/2 pollo - parte truto y pechuga.", price: 9900, image: "img/medio pollo solo.png", rating: 5 },
//     { name: "1/4 pollo solo", description: "1/4 de pollo -- truto o pechuga según stock.", price: 5800, image: "", rating: 5 },
//     { name: "Porcion de papas fritas familiar", description: "Porción grande de papas crujientes.", price: 9000, image: "img/porcion de papa.png", rating: 5 },
//     { name: "1/2 porcion de papas fritas", description: "Media porción de papas crujientes.", price: 6100, image: "img/media porcion papa.png", rating: 5 },
//     { name: "Porcion de arroz chaufa", description: "1 porción de arroz chaufa.", price: 5300, image: "img/porcion arroz chaufa.png", rating: 5 },
//     { name: "Porcion de fideos al pesto", description: "1 porción de fideos al pesto.", price: 5300, image: "img/porcion de fideo.png", rating: 5 },
//     { name: "Porcion de ensalada familiar", description: "Ensalada surtida - familiar.", price: 5400, image: "img/ensalada familiar.png", rating: 5 },
//     { name: "Porcion de ensalada personal", description: "Ensalada surtida - personal.", price: 3700, image: "img/ensalada personal.png", rating: 5 }
//   ],

//   "bebidas": [
//     { name: "Coca Cola", description: "Bebida 350ml.", price: 3800, image: "img/coca cola.png", rating: 5 },
//     { name: "Coca Cola Cero", description: "Bebida 350ml.", price: 3800, image: "img/coca cola cero.png", rating: 5 },
//     { name: "Inca Kola", description: "Bebida 350ml.", price: 3800, image: "img/inca kola.png", rating: 5 },
//     { name: "Fanta", description: "Bebida 350ml.", price: 3800, image: "img/fanta.png", rating: 5 },
//     { name: "Sprite", description: "Bebida 350ml.", price: 3800, image: "img/sprite.png", rating: 5 },
//     { name: "Sprite Cero", description: "Bebida 350ml.", price: 3800, image: "img/sprite cero.png", rating: 5 },
//     { name: "Agua Sin Gas", description: "500ml.", price: 1200, image: "img/agua sin gas.png", rating: 5 },
//     { name: "Agua Con Gas", description: "500ml.", price: 1200, image: "img/agua con gas.png", rating: 5 }
//   ],

//   "descartables": [
//     { name: "Aluza CT5", description: "Para llevar.", price: 300, image: "img/aluza ct5.png", rating: 5 },
//     { name: "Aluza CT3", description: "Para llevar.", price: 400, image: "img/aluza ct3.png", rating: 5 },
//     { name: "Tenedor descartable", description: "Servicio descartable.", price: 200, image: "img/servicio descartable.png", rating: 5 },
//     { name: "Bolsa ecológica", description: "Para llevar.", price: 200, image: "img/bolsa ecologica.png", rating: 5 },
//     { name: "Vaso descartable", description: "Unidad.", price: 50, image: "img/vaso.png", rating: 5 }
//   ]
// };



const productsData = {
  "todo-menu": [],

  "ofertas-familiares": [
    { name: "Ofertón más chaufa", description: "Pollo entero, papas fritas, arroz chaufa, ensalada y bebidas 1.5lt.", price: 25500, image: "img/oferton mas chaufa.png", rating: 5 },
    { name: "Ofertón c/ fideos al pesto + ensalada", description: "Pollo entero, papas fritas, fideos al pesto, ensalada y bebidas 1.5lt.", price: 25500, image: "img/oferton mas fideo.png", rating: 5 },
    { name: "Ofertón con fideos al pesto pura papa", description: "Pollo entero, papas fritas, fideos al pesto, extra papa frita y bebida 1.5lt.", price: 25500, image: "img/oferton con fideo.png", rating: 5 },
    { name: "Ofertón más chaufa pura papa", description: "Pollo entero, papas fritas, extra papa frita, arroz chaufa y bebidas 1.5lt.", price: 25500, image: "img/oferton mas chaufa pura papa.png", rating: 5 },
    { name: "Ofertón c/ fideos al pesto", description: "Pollo entero, papas fritas, fideos al pesto y bebidas 1.5lt.", price: 24500, image: "img/oferton con fideo.png", rating: 5 },
    { name: "Ofertón sin ensalada", description: "Pollo entero, papas fritas, arroz chaufa y bebidas 1.5lt.", price: 24500, image: "img/oferton sin ensalada.png", rating: 5 },
    { name: "Ofertón pura papa", description: "Pollo entero, papas fritas, 1/2 porción de papa frita y bebidas 1.5lt.", price: 24500, image: "img/oferton pura papa.png", rating: 5 },
    { name: "Ofertón familiar", description: "Pollo entero, papas fritas, ensalada y bebidas 1.5lt.", price: 23500, image: "img/oferton familiar.png", rating: 5 },
    { name: "Ofertón solo ensalada", description: "Pollo entero, 2 ensaladas familiar y bebida 1.5lt.", price: 24500, image: "img/oferton familiar.png", rating: 5 }
  ],

  "ofertas-dos": [
    { name: "1/2 combo con fideo al pesto", description: "Medio pollo, papas fritas, fideos al pesto.", price: 16800, image: "img/medio combo con fideo.png", rating: 5 },
    { name: "1/2 combo chaufa", description: "Medio pollo, papas fritas, arroz chaufa.", price: 16100, image: "img/medio combo chaufa.png", rating: 5 },
    { name: "1/2 combo", description: "Medio pollo, papas fritas, ensalada personal.", price: 15600, image: "img/medio combo.png", rating: 5 },
    { name: "1/2 combo pura papa", description: "Medio pollo, papas fritas más cantidad.", price: 15600, image: "img/medio combo pura papa.png", rating: 5 },
    { name: "1/2 pollo solo ensalada", description: "Medio pollo, ensalada familiar.", price: 15600, image: "img/medio pollo solo.png", rating: 5 }
  ],

  "ofertas-personales": [
    { name: "Chaufa brasa c/ papa + ensalada", description: "1/4 pollo, arroz chaufa, papas fritas personales y ensalada personal.", price: 10500, image: "img/chaufa brasa con papas fritas.png", rating: 5 },
    { name: "1/4 combo", description: "1/4 pollo, papas fritas personales, ensalada personal.", price: 8600, image: "img/personal combo.png", rating: 5 },
    { name: "1/4 combo pura papa", description: "1/4 pollo, papas fritas personales más cantidad.", price: 8600, image: "img/personal pura papa.png", rating: 5 },
    { name: "Chaufa brasa", description: "1/4 pollo, arroz chaufa.", price: 8500, image: "img/chaufa brasa.png", rating: 5 },
    { name: "1/4 de pollo c/ fideos al pesto", description: "1/4 pollo, fideos al pesto.", price: 8400, image: "img/personal pesto con pollo.png", rating: 5 },
    { name: "Chaufa brasa c/ ensalada", description: "1/4 pollo, arroz chaufa y ensalada personal.", price: 9500, image: "img/chaufa brasa.png", rating: 5 },
    { name: "Chaufa brasa c/ papa", description: "1/4 pollo, papas fritas personal, arroz chaufa.", price: 9500, image: "img/chaufa brasa con papas fritas.png", rating: 5 },
    { name: "1/4 de pollo c/ fideos + papa", description: "1/4 pollo, papas fritas, fideos al pesto.", price: 9600, image: "img/personal con papa y fideo 01.png", rating: 5 },
    { name: "1/4 de pollo solo ensalada", description: "1/4 pollo + 1 ensalada familiar.", price: 8400, image: "img/personal combo.png", rating: 5 }
  ],

  "platos-extras": [
    { name: "Lomo saltado de carne c/ chaufa", description: "Lomo saltado de carne acompañado con arroz chaufa.", price: 12500, image: "img/lomo saltado con arroz chaufa.png", rating: 5 },
    { name: "Saltado de pollo c/ arroz chaufa", description: "Saltado de pollo acompañado con arroz chaufa.", price: 12500, image: "img/lomo saltado con arroz chaufa.png", rating: 5 },
    { name: "Lomo saltado de carne con arroz blanco", description: "Lomo saltado de carne acompañado con arroz blanco.", price: 12000, image: "img/lomo saltado de carne con arroz blanco.png", rating: 5 },
    { name: "Lomo saltado de pollo con arroz blanco", description: "Lomo saltado de pollo acompañado con arroz blanco.", price: 12000, image: "img/lomo saltado de pollo con arroz blanco.png", rating: 5 },
    { name: "Tallarín saltado de carne", description: "Tallarín saltado preparado con carne.", price: 12000, image: "img/tallarin saltado de carne 01.png", rating: 5 },
    { name: "Tallarín saltado de pollo", description: "Tallarín saltado preparado con pollo.", price: 12000, image: "img/tallarin saltado de carne 01.png", rating: 5 },
    { name: "Bistec a lo pobre", description: "Bistec a lo pobre.", price: 11000, image: "img/bistec a lo pobre.png", rating: 5 },
    { name: "Bistec a lo pobre c/ chaufa", description: "Bistec a lo pobre acompañado con arroz chaufa.", price: 11300, image: "img/bistec a lo pobre.png", rating: 5 },
    { name: "Bistec con fideos al pesto", description: "Bistec acompañado con fideos al pesto.", price: 11000, image: "", rating: 5 },
    { name: "Chuleta de cerdo", description: "Chuleta de cerdo.", price: 11000, image: "img/chuleta de cerdo.png", rating: 5 },
    { name: "Chuleta de cerdo c/ chaufa", description: "Chuleta de cerdo acompañada con arroz chaufa.", price: 11300, image: "img/chuleta de cerdo.png", rating: 5 },
    { name: "Pechuga a la plancha", description: "Pechuga de pollo a la plancha.", price: 10500, image: "img/pechuga a la plancha.png", rating: 5 },
    { name: "Combo nuggets", description: "Combo de nuggets.", price: 7000, image: "img/nugget.png", rating: 5 },
    { name: "Salchipapas", description: "Salchipapas.", price: 7000, image: "img/salchipapa.png", rating: 5 }
  ],

  "agregados": [
    { name: "1 Pollo entero solo", description: "1 pollo entero.", price: 17000, image: "img/pollo solo01.png", rating: 5 },
    { name: "1/2 Pollo solo", description: "1/2 pollo - parte truto y pechuga.", price: 10400, image: "img/medio pollo solo.png", rating: 5 },
    { name: "1/4 pollo solo", description: "1/4 de pollo - truto o pechuga, según el stock.", price: 6100, image: "", rating: 5 },
    { name: "Porción de papas fritas familiar", description: "Porción grande de papas crujientes.", price: 9500, image: "img/porcion de papa.png", rating: 5 },
    { name: "1/2 porción de papas fritas", description: "Media porción de papas crujientes.", price: 6400, image: "img/media porcion papa.png", rating: 5 },
    { name: "Porción de arroz chaufa", description: "1 porción de arroz chaufa.", price: 5500, image: "img/porcion arroz chaufa.png", rating: 5 },
    { name: "Porción de fideos al pesto", description: "1 porción de fideos al pesto.", price: 5500, image: "img/porcion de fideo.png", rating: 5 },
    { name: "Porción de ensalada familiar", description: "Ensalada surtida - familiar.", price: 5700, image: "img/ensalada familiar.png", rating: 5 },
    { name: "Porción de ensalada personal", description: "Ensalada surtida - personal.", price: 3800, image: "img/ensalada personal.png", rating: 5 }
  ],

  "bebidas": [
    { name: "Coca Cola", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/coca cola.png", rating: 5 },
    { name: "Coca Cola Cero", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/coca cola cero.png", rating: 5 },
    { name: "Inca Kola", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/inca kola.png", rating: 5 },
    { name: "Fanta", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/fanta.png", rating: 5 },
    { name: "Sprite", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/sprite.png", rating: 5 },
    { name: "Sprite Cero", description: "Bebida 1.5L, según stock.", price: 4000, image: "img/sprite cero.png", rating: 5 },
    { name: "Agua Sin Gas", description: "Benedictino de 500 ml, según stock.", price: 1200, image: "img/agua sin gas.png", rating: 5 },
    { name: "Agua Con Gas", description: "Benedictino de 500 ml, según stock.", price: 1200, image: "img/agua con gas.png", rating: 5 }
  ],

  "descartables": [
    { name: "Aluza CT5", description: "Envase descartable Aluza CT5.", price: 300, image: "img/aluza ct5.png", rating: 5 },
    { name: "Aluza CT3", description: "Envase descartable Aluza CT3.", price: 400, image: "img/aluza ct3.png", rating: 5 },
    { name: "Tenedor descartable", description: "Tenedor y cuchillo plástico descartable.", price: 200, image: "img/servicio descartable.png", rating: 5 },
    { name: "Bolsa ecológica", description: "Bolsa ecológica, unidad.", price: 200, image: "img/bolsa ecologica.png", rating: 5 },
    { name: "Vaso descartable", description: "Vaso de 10 oz, unidad.", price: 50, image: "img/vaso.png", rating: 5 }
  ]
};

// Combinar todos los productos para "Todo el Menú"
productsData["todo-menu"] = [
  ...productsData["ofertas-familiares"],
  ...productsData["ofertas-dos"],
  ...productsData["ofertas-personales"],
  ...productsData["platos-extras"],
  ...productsData["agregados"],
  ...productsData["bebidas"],
  ...productsData["descartables"]
];

// ============================================
// VARIABLES GLOBALES
// ============================================
let currentCategory = "todo-menu";
const ITEMS_PER_PAGE = 12;

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Genera las estrellas de calificación
 * @param {number} rating - Calificación de 1 a 5
 * @returns {string} HTML de las estrellas
 */
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<span class="star">★</span>';
        } else {
            starsHTML += '<span class="star empty">★</span>';
        }
    }
    return starsHTML;
}

/**
 * Crea el HTML de una tarjeta de producto
 * @param {Object} product - Objeto del producto
 * @returns {string} HTML de la tarjeta
 */
function createProductCard(product) {
    const imgSrc = product.image && product.image.trim() ? product.image : 'img/sin-foto.png';
    const desc = product.description || '';
    return `
        <div class="product-card menu-card card-shine">
            <div class="product-card-image-wrap">
                <img src="${imgSrc}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${desc ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-footer">
                    <div class="product-rating">${generateStars(product.rating)}</div>
                    <div class="product-price">${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(product.price)}</div>
                </div>
            </div>
        </div>
    `;
}

/** Escapa HTML para evitar que nombres/descripciones rompan el DOM */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/** Tarjeta vertical: imagen arriba, nombre, descripción y precio (Platos Extras, Agregados, Bebidas, Descartables) */
function createProductCardVertical(product) {
    const imgSrc = product.image && product.image.trim() ? product.image : 'img/sin-foto.png';
    const name = escapeHtml(product.name || 'Producto');
    const desc = (product.description || '').trim();
    const descSafe = escapeHtml(desc);
    const priceFormatted = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(product.price);
    const descHtml = descSafe ? `<p class="product-card-vertical-desc">${descSafe}</p>` : '<p class="product-card-vertical-desc">&nbsp;</p>';
    return (
        '<div class="product-card product-card-vertical menu-card card-shine">' +
        '<div class="product-card-vertical-image">' +
        '<img src="' + escapeHtml(imgSrc) + '" alt="' + name + '" class="product-image" loading="lazy">' +
        '</div>' +
        '<div class="product-card-vertical-info">' +
        '<h3 class="product-card-vertical-name">' + name + '</h3>' +
        descHtml +
        '<div class="product-card-vertical-footer">' +
        '<div class="product-rating">' + generateStars(product.rating) + '</div>' +
        '<div class="product-price">' + priceFormatted + '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

/**
 * Renderiza los productos en el grid (para modal u otros contenedores)
 */
function renderProducts(category, container, limit = null) {
    const products = productsData[category] || [];
    const productsToShow = limit ? products.slice(0, limit) : products;
    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

/** Metadatos de sección: título, subtítulo e icono (diseño referencia) */
const sectionMeta = {
    "ofertas-familiares": { title: "Ofertas Familiares", subtitle: "Perfectos para compartir en familia", icon: "👨‍👩‍👧‍👦" },
    "ofertas-dos": { title: "Ofertas para Dos", subtitle: "Ideal para compartir en pareja", icon: "👫" },
    "ofertas-personales": { title: "Ofertas Personales", subtitle: "Para disfrutar solo", icon: "🍽️" },
    "platos-extras": { title: "Platos Extras", subtitle: "Más opciones para acompañar", icon: "🍗" },
    "agregados": { title: "Agregados", subtitle: "Complementos para tu pedido", icon: "➕" },
    "bebidas": { title: "Bebidas", subtitle: "Refrescantes y variadas", icon: "🥤" },
    "descartables": { title: "Descartables", subtitle: "Servicio para llevar", icon: "🛍️" }
};

/**
 * Genera el HTML de una sección (título con icono, subtítulo, grid de platos)
 * @param {string} categoryId
 * @param {Object} opts - { limit, verticalCards, gridCols3 } tarjeta vertical, 3 columnas
 */
function renderMenuSection(categoryId, opts = {}) {
    const { limit = null, verticalCards = false, gridCols3 = false } = typeof opts === 'number' ? { limit: opts } : opts;
    const meta = sectionMeta[categoryId] || { title: modalCategoryTitles[categoryId] || categoryId, subtitle: "", icon: "🍽️" };
    const products = productsData[categoryId] || [];
    const list = limit ? products.slice(0, limit) : products;
    const cardFn = verticalCards ? createProductCardVertical : createProductCard;
    const cardsHtml = list.map(p => cardFn(p)).join('');
    const gridClass = 'products-grid menu-section-grid';
    return `
        <div class="menu-section" data-category="${categoryId}">
            <div class="menu-section-header">
                <div class="menu-section-icon">${meta.icon}</div>
                <div>
                    <h3 class="menu-section-title">${meta.title}</h3>
                    ${meta.subtitle ? `<p class="menu-section-subtitle">${meta.subtitle}</p>` : ''}
                </div>
            </div>
            <div class="${gridClass}">${cardsHtml}</div>
        </div>
    `;
}

/**
 * Renderiza la zona principal de platos: "Todo el Menú" = Ofertas Familiares + Ofertas para Dos (diseño referencia)
 */
function renderProductsBySections(category) {
    const container = document.getElementById('productsSectionContent');
    if (!container) return;

    const verticalOpts = { verticalCards: true };

    if (category === 'todo-menu') {
        container.innerHTML =
            renderMenuSection('ofertas-familiares', verticalOpts) +
            renderMenuSection('ofertas-dos', verticalOpts) +
            renderMenuSection('ofertas-personales', verticalOpts) +
            renderMenuSection('platos-extras', verticalOpts) +
            renderMenuSection('agregados', verticalOpts) +
            renderMenuSection('bebidas', verticalOpts) +
            renderMenuSection('descartables', verticalOpts);
        return;
    }
    container.innerHTML = renderMenuSection(category, verticalOpts);
}

/**
 * Actualiza el título de la sección (ya no hay un solo título; se usa en categoría activa)
 */
function updateSectionTitle(category) {
    const sectionTitle = document.getElementById('sectionTitle');
    if (sectionTitle) {
        sectionTitle.textContent = modalCategoryTitles[category] || "Nuestro Menú";
    }
}

/**
 * Marca la categoría activa
 * @param {string} category - Categoría activa
 */
function setActiveCategory(category) {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const activeCard = document.querySelector(`[data-category="${category}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
}

const modalCategoryTitles = {
    "todo-menu": "Todo el Menú",
    "ofertas-familiares": "Ofertas Familiares",
    "ofertas-dos": "Ofertas para Dos",
    "ofertas-personales": "Ofertas Personales",
    "platos-extras": "Platos Extras",
    "agregados": "Agregados",
    "bebidas": "Bebidas",
    "descartables": "Descartables"
};

const categoryIdsOrder = [
    "todo-menu",
    "ofertas-familiares",
    "ofertas-dos",
    "ofertas-personales",
    "platos-extras",
    "agregados",
    "bebidas",
    "descartables"
];

/**
 * Abre el modal con las categorías del menú (misma lista que el menú hamburguesa)
 */
function openCategoriesModal() {
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const categoriesList = document.getElementById('modalCategoriesList');
    const productsWrap = document.getElementById('modalProductsWrap');
    if (!modal || !categoriesList || !productsWrap) return;

    modalTitle.textContent = "Categorías";
    productsWrap.style.display = "none";
    categoriesList.style.display = "block";

    categoriesList.innerHTML = categoryIdsOrder.map(catId => {
        const label = modalCategoryTitles[catId] || catId;
        return `<button type="button" class="modal-category-btn" data-category="${catId}">${label}</button>`;
    }).join('');

    categoriesList.querySelectorAll('.modal-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            closeCategoryModal();
            currentCategory = category;
            renderProductsBySections(category);
            updateSectionTitle(category);
            setActiveCategory(category);
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    modal.classList.add('active');
}

/**
 * Abre el modal con todos los productos de una categoría
 * @param {string} category - Categoría a mostrar
 */
function openCategoryModal(category) {
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalGrid = document.getElementById('modalProductsGrid');
    const categoriesList = document.getElementById('modalCategoriesList');
    const productsWrap = document.getElementById('modalProductsWrap');
    if (!modal || !modalGrid) return;

    modalTitle.textContent = modalCategoryTitles[category] || "Platos";
    if (categoriesList) categoriesList.style.display = "none";
    if (productsWrap) productsWrap.style.display = "block";
    renderProducts(category, modalGrid, null);
    modal.classList.add('active');
}

/**
 * Cierra el modal
 */
function closeCategoryModal() {
    const modal = document.getElementById('categoryModal');
    modal.classList.remove('active');
}

// ============================================
// EVENT LISTENERS
// ============================================

// ============================================
// CARRUSEL HERO (panel publicitario)
// ============================================
const HERO_INTERVAL_MS = 2000;
const HERO_SLIDE_COUNT = 10;

function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    if (!slides.length || !dotsContainer) return;

    let currentIndex = 0;
    let carouselTimer = null;

    function goToSlide(index) {
        currentIndex = (index + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT;
        slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
        dotsContainer.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startTimer() {
        stopTimer();
        carouselTimer = setInterval(nextSlide, HERO_INTERVAL_MS);
    }

    function stopTimer() {
        if (carouselTimer) {
            clearInterval(carouselTimer);
            carouselTimer = null;
        }
    }

    // Crear puntos de navegación
    dotsContainer.innerHTML = '';
    for (let i = 0; i < HERO_SLIDE_COUNT; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
        dot.addEventListener('click', () => {
            goToSlide(i);
            startTimer();
        });
        dotsContainer.appendChild(dot);
    }

    // Pausar al pasar el mouse (solo en pantallas que usan hover)
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);
    }

    startTimer();
}

// Pantalla de entrada: al hacer clic en "Ver Menú" se oculta la landing y se muestra la carta
function initLanding() {
    const landingSection = document.getElementById('landing-section');
    const mainContent = document.getElementById('main-content');
    const btnVerMenu = document.getElementById('landingVerMenu');
    if (!landingSection || !mainContent || !btnVerMenu) return;
    document.body.classList.add('landing-visible');
    btnVerMenu.addEventListener('click', () => {
        landingSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
        document.body.classList.remove('landing-visible');
        window.scrollTo(0, 0);
    });
}

// Cargar productos iniciales
document.addEventListener('DOMContentLoaded', () => {
    initLanding();

    const goHome = document.getElementById('goHome');
    const goToOrdersBtn = document.getElementById('goToOrders');
    
    // Renderizar secciones (Ofertas Familiares + Ofertas para Dos en diseño referencia)
    renderProductsBySections(currentCategory);
    updateSectionTitle(currentCategory);
    setActiveCategory(currentCategory);
    // ============================================
  // En celular: centrar "Todo el Menú" al cargar
   // ============================================
   const categoriesScroll = document.getElementById('categoriesScroll');
   const todoMenuCard = document.querySelector('.category-card[data-category="todo-menu"]');

   function centerTodoMenuOnMobile() {
      if (!categoriesScroll || !todoMenuCard) return;
      if (window.matchMedia('(max-width: 768px)').matches) {
          // centra la tarjeta en el carrusel
          todoMenuCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
   }

      // Ejecutar al cargar (con pequeño delay para asegurar render)
    setTimeout(centerTodoMenuOnMobile, 150);

    
    // Botón "Ir a la página de pedidos"
    if (goToOrdersBtn) {
        goToOrdersBtn.addEventListener('click', () => {
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Click en tarjetas de categoría
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Si se hace click en "Ver todos" / "Ver más platos" → abrir modal con productos de esa categoría
            if (e.target.classList.contains('btn-view-more')) {
                e.stopPropagation();
                const category = card.dataset.category;
                openCategoryModal(category);
                return;
            }
            
            // Si se hace click en la tarjeta, cambiar categoría
            const category = card.dataset.category;
            currentCategory = category;
            renderProductsBySections(category);
            updateSectionTitle(category);
            setActiveCategory(category);
            
            // Scroll suave a la sección de productos
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Botones "Ver todos" / "Ver más platos" → abren modal con productos de esa categoría
    document.querySelectorAll('.btn-view-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.category-card');
            const category = card ? card.dataset.category : null;
            if (category) openCategoryModal(category);
        });
    });
    
    // Cerrar modal
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeCategoryModal);
    }
    
    // Cerrar modal al hacer click fuera
    const modal = document.getElementById('categoryModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCategoryModal();
            }
        });
    }
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCategoryModal();
        }
    });

    // ============================================
    // MENÚ HAMBURGUESA: panel lateral (abrir/cerrar, categorías funcionales)
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const hamburgerOverlay = document.getElementById('hamburgerOverlay');

    function closeHamburgerMenu() {
        if (hamburgerMenu) {
            hamburgerMenu.classList.remove('open');
            hamburgerMenu.setAttribute('aria-hidden', 'true');
        }
        if (hamburgerOverlay) {
            hamburgerOverlay.classList.remove('open');
            hamburgerOverlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('hamburger-open');
    }

    function openHamburgerMenu() {
        if (hamburgerMenu) {
            hamburgerMenu.classList.add('open');
            hamburgerMenu.setAttribute('aria-hidden', 'false');
        }
        if (hamburgerOverlay) {
            hamburgerOverlay.classList.add('open');
            hamburgerOverlay.setAttribute('aria-hidden', 'false');
        }
        document.body.classList.add('hamburger-open');
    }

    if (menuToggle && hamburgerMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = hamburgerMenu.classList.contains('open');
            if (isOpen) closeHamburgerMenu();
            else openHamburgerMenu();
        });
    }

    if (hamburgerOverlay) {
        hamburgerOverlay.addEventListener('click', closeHamburgerMenu);
    }

    const hamburgerClose = document.getElementById('hamburgerClose');
    if (hamburgerClose) {
        hamburgerClose.addEventListener('click', closeHamburgerMenu);
    }

    // Clic en una categoría del menú lateral: cerrar panel y navegar
    if (hamburgerMenu) {
        hamburgerMenu.querySelectorAll('.hamburger-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                closeHamburgerMenu();
                currentCategory = category;
                renderProductsBySections(category);
                updateSectionTitle(category);
                setActiveCategory(category);
                const productsSection = document.querySelector('.products-section');
                if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // ============================================
    // VOLVER AL INICIO AL HACER CLICK EN LOGO
    // ============================================
// ============================================
// VOLVER AL INICIO (LOGO / TÍTULO) - PC + CELULAR
// ============================================
if (goHome) {
    const goHomeAction = (e) => {
        e.preventDefault();

        // Volver a categoría principal
        currentCategory = "todo-menu";
        renderProductsBySections(currentCategory);
        updateSectionTitle(currentCategory);
        setActiveCategory(currentCategory);

        // Cerrar modal si está abierto
        closeCategoryModal();

        // Cerrar menú hamburguesa y overlay si están abiertos
        const hm = document.getElementById('hamburgerMenu');
        const ho = document.getElementById('hamburgerOverlay');
        if (hm) hm.classList.remove('open');
        if (ho) ho.classList.remove('open');
        document.body.classList.remove('hamburger-open');

        // Scroll suave arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ✅ Click normal (PC)
    goHome.addEventListener('click', goHomeAction);

    // ✅ Touch en celular (algunos móviles lo requieren)
    goHome.addEventListener('touchstart', goHomeAction, { passive: false });
}



});
