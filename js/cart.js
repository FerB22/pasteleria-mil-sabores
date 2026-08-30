// ==========================================
// CARRITO DE COMPRAS CON LOCALSTORAGE
// ==========================================

const Cart = {
  // Obtiene los productos del carrito desde el localStorage
  getCart() {
    const raw = localStorage.getItem("pms_cart");
    return raw ? JSON.parse(raw) : [];
  },

  // Guarda el carrito actualizado en localStorage y actualiza el contador
  saveCart(cart) {
    localStorage.setItem("pms_cart", JSON.stringify(cart));
    this.updateBadge();
  },

  // Añade un producto al carrito verificando stock disponible
  addToCart(codigo, cantidad = 1, mensajePersonalizado = "") {
    const products = JSON.parse(localStorage.getItem("pms_products") || "[]");
    const product = products.find(p => p.codigo === codigo);
    if (!product) {
      if (typeof showToast === "function") showToast("Producto no encontrado.", "danger");
      return false;
    }

    if (product.stock <= 0) {
      if (typeof showToast === "function") showToast("Producto sin existencias disponibles.", "warning");
      return false;
    }

    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.codigo === codigo);
    const unitPrice = (product.enOferta && product.precioOferta) ? product.precioOferta : product.precio;

    if (itemIndex > -1) {
      const currentQty = cart[itemIndex].cantidad;
      if (currentQty + cantidad > product.stock) {
        if (typeof showToast === "function") showToast(`Existencias insuficientes (${product.stock} unidades disponibles).`, "warning");
        return false;
      }
      cart[itemIndex].cantidad += cantidad;
      if (mensajePersonalizado) {
        cart[itemIndex].mensajePersonalizado = mensajePersonalizado;
      }
    } else {
      if (cantidad > product.stock) {
        if (typeof showToast === "function") showToast(`Existencias insuficientes (${product.stock} unidades disponibles).`, "warning");
        return false;
      }
      cart.push({
        codigo: product.codigo,
        nombre: product.nombre,
        precio: unitPrice,
        imagen: product.imagen,
        categoria: product.categoria,
        cantidad: cantidad,
        stockMax: product.stock,
        mensajePersonalizado: mensajePersonalizado || ""
      });
    }

    this.saveCart(cart);
    if (typeof showToast === "function") showToast(`El producto "${product.nombre}" fue añadido al carrito.`, "success");
    return true;
  },

  removeFromCart(codigo) {
    let cart = this.getCart();
    cart = cart.filter(item => item.codigo !== codigo);
    this.saveCart(cart);
    if (typeof showToast === "function") showToast("Producto eliminado del carrito.", "info");
    this.renderCartPage();
  },

  updateQuantity(codigo, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.codigo === codigo);
    if (!item) return;

    const newQty = item.cantidad + delta;
    if (newQty <= 0) {
      this.removeFromCart(codigo);
      return;
    }

    if (newQty > item.stockMax) {
      if (typeof showToast === "function") showToast(`Límite de existencias alcanzado (${item.stockMax} unidades).`, "warning");
      return;
    }

    item.cantidad = newQty;
    this.saveCart(cart);
    this.renderCartPage();
  },

  clearCart() {
    this.saveCart([]);
    if (typeof showToast === "function") showToast("El carrito ha sido vaciado.", "info");
    this.renderCartPage();
  },

  getCount() {
    return this.getCart().reduce((sum, i) => sum + i.cantidad, 0);
  },

  discountPercent: 0,
  couponCode: "",

  applyCoupon() {
    const input = document.getElementById('coupon-code');
    const feedback = document.getElementById('coupon-feedback');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (code === "FELICES50") {
      this.discountPercent = 10;
      this.couponCode = code;
      if (feedback) {
        feedback.textContent = "¡Cupón FELICES50 aplicado! 10 % de descuento por 50° Aniversario.";
        feedback.style.color = "var(--success)";
      }
      if (typeof showToast === "function") showToast("Cupón del 10 % de descuento aplicado.", "success");
      this.renderCartPage();
    } else if (code === "") {
      this.discountPercent = 0;
      this.couponCode = "";
      if (feedback) feedback.textContent = "";
      this.renderCartPage();
    } else {
      if (feedback) {
        feedback.textContent = "Cupón no válido o vencido.";
        feedback.style.color = "var(--danger)";
      }
      if (typeof showToast === "function") showToast("El cupón ingresado no es válido.", "warning");
    }
  },

  getTotals() {
    const rawTotal = this.getCart().reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    const discountAmount = Math.round(rawTotal * (this.discountPercent / 100));
    const totalWithDiscount = Math.max(0, rawTotal - discountAmount);
    const neto = Math.round(totalWithDiscount / 1.19);
    const iva = totalWithDiscount - neto;
    return { rawTotal, discountAmount, neto, iva, total: totalWithDiscount };
  },

  formatCLP(amount) {
    if (amount === '' || amount === null || isNaN(amount)) return '$ 0';
    const num = Math.round(Number(amount));
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `$ ${formatted}`;
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach(b => b.textContent = count);
  },

  renderCartPage() {
    const tableBody = document.getElementById('cart-table-body');
    const emptyState = document.getElementById('cart-empty-state');
    const contentState = document.getElementById('cart-content-state');
    if (!tableBody) return;

    const cart = this.getCart();
    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (contentState) contentState.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (contentState) contentState.style.display = 'grid';

    tableBody.innerHTML = cart.map(item => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);">
            <div>
              <strong style="color: var(--accent); font-size: 0.95rem;">${item.nombre}</strong><br>
              <small class="text-muted">${item.categoria} (${item.codigo})</small>
              ${item.mensajePersonalizado ? `<br><small style="color: var(--secondary); font-style: italic;">Dedicatoria: "${item.mensajePersonalizado}"</small>` : ''}
            </div>
          </div>
        </td>
        <td style="font-weight: 600;">${this.formatCLP(item.precio)}</td>
        <td>
          <div class="cart-qty-control">
            <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.codigo}', -1)" aria-label="Restar una unidad">-</button>
            <input type="text" class="cart-qty-val" value="${item.cantidad}" readonly>
            <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.codigo}', 1)" aria-label="Sumar una unidad">+</button>
          </div>
        </td>
        <td style="font-weight: 700; color: var(--primary-dark);">${this.formatCLP(item.precio * item.cantidad)}</td>
        <td>
          <button class="btn btn-sm btn-outline" style="color: var(--danger); border-color: var(--danger); padding: 4px 8px;" onclick="Cart.removeFromCart('${item.codigo}')" aria-label="Eliminar producto">&times; Quitar</button>
        </td>
      </tr>
    `).join('');

    const { rawTotal, discountAmount, neto, iva, total } = this.getTotals();
    const netoEl = document.getElementById('summary-neto');
    const ivaEl = document.getElementById('summary-iva');
    const totalEl = document.getElementById('summary-total');
    const discountRow = document.getElementById('summary-discount-row');
    const discountEl = document.getElementById('summary-discount');

    if (netoEl) netoEl.textContent = this.formatCLP(neto);
    if (ivaEl) ivaEl.textContent = this.formatCLP(iva);
    if (totalEl) totalEl.textContent = this.formatCLP(total);

    if (discountRow && discountEl) {
      if (this.discountPercent > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `- ${this.formatCLP(discountAmount)} (${this.discountPercent} %)`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Cart.renderCartPage();
});
