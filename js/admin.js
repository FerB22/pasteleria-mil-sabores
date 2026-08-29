// ==========================================
// PANEL DE ADMINISTRACIÓN (BACKOFFICE)
// ==========================================

// Carga las regiones y comunas en los formularios del admin
function initRegionComunaSelectors(regionSelectId, comunaSelectId) {
  const regionSelect = document.getElementById(regionSelectId);
  const comunaSelect = document.getElementById(comunaSelectId);
  if (!regionSelect || !comunaSelect) return;

  regionSelect.innerHTML = '<option value="">-- Seleccionar región --</option>' + 
    CHILE_REGIONES_COMUNAS.map(r => `<option value="${r.region}">${r.region}</option>`).join('');

  regionSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    const found = CHILE_REGIONES_COMUNAS.find(r => r.region === selected);
    if (found) {
      comunaSelect.innerHTML = '<option value="">-- Seleccionar comuna --</option>' + 
        found.comunas.map(c => `<option value="${c}">${c}</option>`).join('');
      comunaSelect.disabled = false;
    } else {
      comunaSelect.innerHTML = '<option value="">-- Seleccione una región primero --</option>';
      comunaSelect.disabled = true;
    }
  });
}

// Renderiza la tabla de productos en el mantenedor del administrador
function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;

  const products = JSON.parse(localStorage.getItem('pms_products') || '[]');
  
  tbody.innerHTML = products.map(p => {
    const isCritical = p.stock <= p.stockCritico && p.stock > 0;
    const isOutOfStock = p.stock <= 0;
    let stockBadge = `<span style="color:var(--success); font-weight:700;">${p.stock}</span>`;
    if (isOutOfStock) stockBadge = `<span style="color:var(--danger); font-weight:700;">0 (Agotado)</span>`;
    else if (isCritical) stockBadge = `<span style="color:var(--warning); font-weight:700;">${p.stock} (Crítico: ${p.stockCritico})</span>`;

    return `
      <tr>
        <td><strong>${p.codigo}</strong></td>
        <td><img src="${p.imagen}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 4px;" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td><span class="badge-role role-client">${p.categoria}</span></td>
        <td><strong>${p.precio === 0 ? 'Sin costo' : `$ ${Math.round(p.precio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}</strong></td>
        <td>${stockBadge}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="openProductModal('${p.codigo}')">Editar</button>
          <button class="btn btn-sm btn-outline" style="color:var(--danger); border-color:var(--danger);" onclick="deleteProduct('${p.codigo}')">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openProductModal(codigo = null) {
  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');
  const title = document.getElementById('product-modal-title');
  if (!modal || !form) return;

  Validators.clearFormErrors(form);

  if (codigo) {
    title.textContent = 'Editar producto';
    const products = JSON.parse(localStorage.getItem('pms_products') || '[]');
    const p = products.find(item => item.codigo === codigo);
    if (p) {
      document.getElementById('prod-code').value = p.codigo;
      document.getElementById('prod-code').disabled = true;
      document.getElementById('prod-name').value = p.nombre;
      document.getElementById('prod-category').value = p.categoria;
      document.getElementById('prod-price').value = p.precio;
      document.getElementById('prod-stock').value = p.stock;
      document.getElementById('prod-critical').value = p.stockCritico || 0;
      document.getElementById('prod-desc').value = p.descripcion || '';
      document.getElementById('prod-img').value = p.imagen || '';
      document.getElementById('prod-is-new').value = 'false';
    }
  } else {
    title.textContent = 'Nuevo producto';
    form.reset();
    document.getElementById('prod-code').disabled = false;
    document.getElementById('prod-is-new').value = 'true';
  }

  modal.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('active');
}

function saveProductFromForm(e) {
  e.preventDefault();
  const form = document.getElementById('product-form');
  Validators.clearFormErrors(form);

  const isNew = document.getElementById('prod-is-new').value === 'true';
  const code = document.getElementById('prod-code').value.trim();
  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value;
  const price = document.getElementById('prod-price').value;
  const stock = document.getElementById('prod-stock').value;
  const critical = document.getElementById('prod-critical').value;
  const desc = document.getElementById('prod-desc').value.trim();
  const img = document.getElementById('prod-img').value.trim() || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';

  let hasError = false;

  if (isNew) {
    if (!Validators.validarTextoRequerido(code, 3, 50)) {
      Validators.setError(document.getElementById('prod-code'), 'El código es requerido (mínimo 3 caracteres).');
      hasError = true;
    }
    const products = JSON.parse(localStorage.getItem('pms_products') || '[]');
    if (products.some(p => p.codigo.toUpperCase() === code.toUpperCase())) {
      Validators.setError(document.getElementById('prod-code'), 'El código ingresado ya se encuentra registrado.');
      hasError = true;
    }
  }

  if (!Validators.validarTextoRequerido(name, 2, 100)) {
    Validators.setError(document.getElementById('prod-name'), 'El nombre es requerido (máximo 100 caracteres).');
    hasError = true;
  }

  if (!category) {
    Validators.setError(document.getElementById('prod-category'), 'Debe seleccionar una categoría.');
    hasError = true;
  }

  if (!Validators.validarPrecio(price)) {
    Validators.setError(document.getElementById('prod-price'), 'El precio debe ser un número mayor o igual a cero.');
    hasError = true;
  }

  if (!Validators.validarStock(stock)) {
    Validators.setError(document.getElementById('prod-stock'), 'Las existencias deben ser un número entero mayor o igual a cero.');
    hasError = true;
  }

  if (critical !== '' && !Validators.validarStock(critical)) {
    Validators.setError(document.getElementById('prod-critical'), 'El nivel crítico debe ser un número entero.');
    hasError = true;
  }

  if (desc.length > 500) {
    Validators.setError(document.getElementById('prod-desc'), 'La descripción no puede superar los 500 caracteres.');
    hasError = true;
  }

  if (hasError) return;

  const products = JSON.parse(localStorage.getItem('pms_products') || '[]');
  const parsedPrice = parseFloat(price);
  const parsedStock = parseInt(stock, 10);
  const parsedCritical = critical !== '' ? parseInt(critical, 10) : 3;

  if (isNew) {
    products.push({
      codigo: code.toUpperCase(),
      nombre: name,
      categoria: category,
      precio: parsedPrice,
      stock: parsedStock,
      stockCritico: parsedCritical,
      descripcion: desc,
      imagen: img,
      destacado: false,
      enOferta: false,
      precioOferta: null
    });
    if (typeof showToast === 'function') showToast('Producto registrado exitosamente.', 'success');
  } else {
    const idx = products.findIndex(p => p.codigo === code);
    if (idx > -1) {
      products[idx].nombre = name;
      products[idx].categoria = category;
      products[idx].precio = parsedPrice;
      products[idx].stock = parsedStock;
      products[idx].stockCritico = parsedCritical;
      products[idx].descripcion = desc;
      products[idx].imagen = img;
      if (typeof showToast === 'function') showToast('Producto actualizado exitosamente.', 'success');
    }
  }

  localStorage.setItem('pms_products', JSON.stringify(products));
  closeProductModal();
  renderAdminProducts();
}

function deleteProduct(codigo) {
  if (!confirm(`¿Está seguro de que desea eliminar el producto con código ${codigo}?`)) return;
  let products = JSON.parse(localStorage.getItem('pms_products') || '[]');
  products = products.filter(p => p.codigo !== codigo);
  localStorage.setItem('pms_products', JSON.stringify(products));
  if (typeof showToast === 'function') showToast('Producto eliminado.', 'info');
  renderAdminProducts();
}

function renderAdminUsers() {
  const tbody = document.getElementById('admin-users-tbody');
  if (!tbody) return;

  const users = JSON.parse(localStorage.getItem('pms_users') || '[]');

  tbody.innerHTML = users.map(u => {
    let roleClass = 'role-client';
    if (u.rol === 'Administrador') roleClass = 'role-admin';
    else if (u.rol === 'Vendedor') roleClass = 'role-seller';

    return `
      <tr>
        <td><strong>${u.run}</strong></td>
        <td>${u.nombre} ${u.apellidos}</td>
        <td>${u.correo}</td>
        <td><span class="badge-role ${roleClass}">${u.rol}</span></td>
        <td>${u.comuna}, ${u.region}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="openUserModal('${u.run}')">Editar</button>
          <button class="btn btn-sm btn-outline" style="color:var(--danger); border-color:var(--danger);" onclick="deleteUser('${u.run}')">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openUserModal(run = null) {
  const modal = document.getElementById('user-modal');
  const form = document.getElementById('user-form');
  const title = document.getElementById('user-modal-title');
  if (!modal || !form) return;

  Validators.clearFormErrors(form);

  if (run) {
    title.textContent = 'Editar usuario';
    const users = JSON.parse(localStorage.getItem('pms_users') || '[]');
    const u = users.find(item => item.run === run);
    if (u) {
      document.getElementById('user-run').value = u.run;
      document.getElementById('user-run').disabled = true;
      document.getElementById('user-name').value = u.nombre;
      document.getElementById('user-lastname').value = u.apellidos;
      document.getElementById('user-email').value = u.correo;
      document.getElementById('user-role').value = u.rol;
      document.getElementById('user-birth').value = u.fechaNacimiento || '';
      document.getElementById('user-address').value = u.direccion || '';
      
      const regSelect = document.getElementById('user-region');
      regSelect.value = u.region;
      regSelect.dispatchEvent(new Event('change'));
      
      setTimeout(() => {
        document.getElementById('user-comuna').value = u.comuna;
      }, 50);

      document.getElementById('user-is-new').value = 'false';
    }
  } else {
    title.textContent = 'Nuevo usuario';
    form.reset();
    document.getElementById('user-run').disabled = false;
    document.getElementById('user-is-new').value = 'true';
    document.getElementById('user-comuna').disabled = true;
  }

  modal.classList.add('active');
}

function closeUserModal() {
  const modal = document.getElementById('user-modal');
  if (modal) modal.classList.remove('active');
}

function saveUserFromForm(e) {
  e.preventDefault();
  const form = document.getElementById('user-form');
  Validators.clearFormErrors(form);

  const isNew = document.getElementById('user-is-new').value === 'true';
  const run = document.getElementById('user-run').value.trim().toUpperCase();
  const nombre = document.getElementById('user-name').value.trim();
  const apellidos = document.getElementById('user-lastname').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const rol = document.getElementById('user-role').value;
  const fechaNac = document.getElementById('user-birth').value;
  const region = document.getElementById('user-region').value;
  const comuna = document.getElementById('user-comuna').value;
  const direccion = document.getElementById('user-address').value.trim();

  let hasError = false;

  if (isNew) {
    if (!Validators.validarRUN(run)) {
      Validators.setError(document.getElementById('user-run'), 'RUN inválido. Debe contener entre 7 y 9 caracteres sin puntos ni guion, con dígito verificador correcto.');
      hasError = true;
    }
    const users = JSON.parse(localStorage.getItem('pms_users') || '[]');
    if (users.some(u => u.run === run)) {
      Validators.setError(document.getElementById('user-run'), 'Este RUN ya se encuentra registrado.');
      hasError = true;
    }
  }

  if (!Validators.validarTextoRequerido(nombre, 2, 50)) {
    Validators.setError(document.getElementById('user-name'), 'El nombre es requerido (máximo 50 caracteres).');
    hasError = true;
  }

  if (!Validators.validarTextoRequerido(apellidos, 2, 100)) {
    Validators.setError(document.getElementById('user-lastname'), 'Los apellidos son requeridos (máximo 100 caracteres).');
    hasError = true;
  }

  if (!Validators.validarCorreo(email)) {
    Validators.setError(document.getElementById('user-email'), 'Solo se aceptan correos con dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.');
    hasError = true;
  }

  if (!region) {
    Validators.setError(document.getElementById('user-region'), 'Debe seleccionar una región.');
    hasError = true;
  }

  if (!comuna) {
    Validators.setError(document.getElementById('user-comuna'), 'Debe seleccionar una comuna.');
    hasError = true;
  }

  if (!Validators.validarTextoRequerido(direccion, 5, 300)) {
    Validators.setError(document.getElementById('user-address'), 'La dirección es requerida (máximo 300 caracteres).');
    hasError = true;
  }

  if (hasError) return;

  const users = JSON.parse(localStorage.getItem('pms_users') || '[]');

  if (isNew) {
    users.push({
      run,
      nombre,
      apellidos,
      correo: email,
      rol,
      region,
      comuna,
      direccion,
      fechaNacimiento: fechaNac
    });
    if (typeof showToast === 'function') showToast('Usuario creado exitosamente.', 'success');
  } else {
    const idx = users.findIndex(u => u.run === run);
    if (idx > -1) {
      users[idx].nombre = nombre;
      users[idx].apellidos = apellidos;
      users[idx].correo = email;
      users[idx].rol = rol;
      users[idx].region = region;
      users[idx].comuna = comuna;
      users[idx].direccion = direccion;
      users[idx].fechaNacimiento = fechaNac;
      if (typeof showToast === 'function') showToast('Usuario actualizado exitosamente.', 'success');
    }
  }

  localStorage.setItem('pms_users', JSON.stringify(users));
  closeUserModal();
  renderAdminUsers();
}

function deleteUser(run) {
  if (!confirm(`¿Está seguro de que desea eliminar al usuario con RUN ${run}?`)) return;
  let users = JSON.parse(localStorage.getItem('pms_users') || '[]');
  users = users.filter(u => u.run !== run);
  localStorage.setItem('pms_users', JSON.stringify(users));
  if (typeof showToast === 'function') showToast('Usuario eliminado.', 'info');
  renderAdminUsers();
}

function renderDashboardStats() {
  const totalProductsEl = document.getElementById('stat-total-products');
  const criticalStockEl = document.getElementById('stat-critical-stock');
  const totalUsersEl = document.getElementById('stat-total-users');

  if (!totalProductsEl) return;

  const products = JSON.parse(localStorage.getItem('pms_products') || '[]');
  const users = JSON.parse(localStorage.getItem('pms_users') || '[]');

  const critical = products.filter(p => p.stock <= p.stockCritico).length;

  totalProductsEl.textContent = products.length;
  if (criticalStockEl) criticalStockEl.textContent = critical;
  if (totalUsersEl) totalUsersEl.textContent = users.length;
}
