// ==========================================
// RENDERIZADO Y FILTRADO DE PRODUCTOS
// ==========================================

// Formatea números a pesos chilenos (ej: $ 24 990)
function formatCLP(amount) {
  if (amount === '' || amount === null || isNaN(amount)) return '$ 0';
  const num = Math.round(Number(amount));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `$ ${formatted}`;
}

// Genera la tarjeta HTML para mostrar cada producto en el catálogo
function renderProductCard(p) {
  const isCritical = p.stock <= p.stockCritico && p.stock > 0;
  const isOutOfStock = p.stock <= 0;

  let stockBadge = `<span class="stock-indicator stock-available">Disponibles: ${p.stock}</span>`;
  if (isOutOfStock) stockBadge = `<span class="stock-indicator stock-empty">Agotado</span>`;
  else if (isCritical) stockBadge = `<span class="stock-indicator stock-critical">Ultimas ${p.stock} unidades</span>`;

  const finalPrice = (p.enOferta && p.precioOferta) ? p.precioOferta : p.precio;
  const oldPriceHtml = p.enOferta && p.precioOferta ? `<span class="product-old-price">${formatCLP(p.precio)}</span>` : '';
  const offerBadgeHtml = p.enOferta ? `<span class="badge-offer">Oferta</span>` : '';

  return `
    <div class="product-card">
      <div class="product-img-wrapper">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';">
        ${offerBadgeHtml}
        <span class="badge-category">${p.categoria}</span>
      </div>
      <div class="product-info">
        <span class="product-code">${p.codigo}</span>
        <h3 class="product-title">${p.nombre}</h3>
        <p class="product-desc">${p.descripcion}</p>
        <div class="product-price-row">
          <span class="product-price">${finalPrice === 0 ? 'Sin costo' : formatCLP(finalPrice)}</span>
          ${oldPriceHtml}
        </div>
        ${stockBadge}
        <div class="card-actions">
          <a href="detalle-producto.html?id=${p.codigo}" class="btn btn-sm btn-outline btn-block">Ver detalle</a>
          <button class="btn btn-sm btn-primary btn-block" onclick="Cart.addToCart('${p.codigo}')" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function loadProducts(categoriaFiltro = "Todas", busqueda = "") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("pms_products") || "[]");
  
  let filtered = products;
  if (categoriaFiltro !== "Todas") {
    filtered = filtered.filter(p => p.categoria === categoriaFiltro);
  }
  if (busqueda.trim() !== "") {
    const term = busqueda.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.nombre.toLowerCase().includes(term) || 
      p.codigo.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <h3>No se encontraron productos con el criterio especificado.</h3>
        <p class="text-muted">Pruebe seleccionando otra categoría o modificando el término de búsqueda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(renderProductCard).join("");
}

function loadFeaturedProducts() {
  const container = document.getElementById("featured-products-grid");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("pms_products") || "[]");
  const featured = products.filter(p => p.destacado).slice(0, 4);

  container.innerHTML = featured.map(renderProductCard).join("");
}

function loadProductDetail() {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("id");

  const products = JSON.parse(localStorage.getItem("pms_products") || "[]");
  const product = products.find(p => p.codigo === code) || products[0];

  if (!product) {
    container.innerHTML = `<h2>Producto no encontrado.</h2><a href="productos.html" class="btn btn-primary">Volver al catálogo</a>`;
    return;
  }

  const finalPrice = (product.enOferta && product.precioOferta) ? product.precioOferta : product.precio;
  const isCritical = product.stock <= product.stockCritico && product.stock > 0;
  const isOutOfStock = product.stock <= 0;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; background: #fff; padding: 35px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <div>
        <img src="${product.imagen}" alt="${product.nombre}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';" style="width: 100 %; border-radius: var(--radius-md); max-height: 420px; object-fit: cover; box-shadow: var(--shadow-sm);">
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <span class="product-code">Código: ${product.codigo}</span>
        <span class="badge-category" style="position: static; display: inline-block; width: fit-content; margin-bottom: 10px;">${product.categoria}</span>
        <h1 style="color: var(--accent); margin-bottom: 12px;">${product.nombre}</h1>
        <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 20px;">${product.descripcion}</p>
        
        <div style="display: flex; align-items: baseline; gap: 15px; margin-bottom: 15px;">
          <span style="font-size: 2rem; font-weight: 800; color: var(--primary-dark);">${finalPrice === 0 ? 'Sin costo' : formatCLP(finalPrice)}</span>
          ${product.enOferta && product.precioOferta ? `<span class="product-old-price" style="font-size: 1.2rem;">${formatCLP(product.precio)}</span>` : ''}
        </div>

        <div style="margin-bottom: 20px;">
          ${isOutOfStock ? '<span class="stock-indicator stock-empty">Agotado</span>' : isCritical ? `<span class="stock-indicator stock-critical">Existencias críticas: quedan ${product.stock} unidades</span>` : `<span class="stock-indicator stock-available">Existencias disponibles: ${product.stock} unidades</span>`}
        </div>

        <div style="margin-bottom: 20px;">
          <label for="detail-custom-msg" style="font-weight: 600; display: block; margin-bottom: 6px; font-size: 0.9rem;">Mensaje o dedicatoria personalizada (opcional):</label>
          <input type="text" id="detail-custom-msg" placeholder="Ej: ¡Feliz 50 Aniversario Familia González!" maxlength="80" class="form-control" style="font-size: 0.9rem;">
          <small class="form-hint" style="margin-top: 4px;">Máximo 80 caracteres para decoración en placa de chocolate o cinta.</small>
        </div>

        <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 25px;">
          <label for="detail-qty" style="font-weight: 600;">Cantidad:</label>
          <input type="number" id="detail-qty" value="1" min="1" max="${product.stock}" style="width: 70px; padding: 8px; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); text-align: center;" ${isOutOfStock ? 'disabled' : ''}>
          <button class="btn btn-primary" onclick="addDetailToCart('${product.codigo}')" ${isOutOfStock ? 'disabled' : ''} style="flex-grow: 1;">
            Añadir al carrito
          </button>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 15px; font-size: 0.88rem; color: var(--text-muted);">
          <p>• Elaboración artesanal con ingredientes frescos del día.</p>
          <p>• Despacho a comunas seleccionadas de la Región Metropolitana.</p>
          <p>• Garantía de frescura y empaque refrigerado.</p>
        </div>
      </div>
    </div>
  `;
}

function addDetailToCart(code) {
  const input = document.getElementById("detail-qty");
  const msgInput = document.getElementById("detail-custom-msg");
  const qty = input ? parseInt(input.value, 10) || 1 : 1;
  const customMsg = msgInput ? msgInput.value.trim() : "";
  Cart.addToCart(code, qty, customMsg);
}
