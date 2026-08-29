// ==========================================
// VALIDACIONES DE FORMULARIOS (JavaScript)
// ==========================================

const Validators = {
  // Validación de RUT chileno usando el algoritmo Módulo 11
  validarRUN(runStr) {
    if (!runStr) return false;
    // Quitamos puntos y guiones por si el usuario los puso
    const clean = runStr.replace(/[.\-]/g, '').trim().toUpperCase();
    if (!/^[0-9]{7,8}[0-9K]$/.test(clean)) return false;

    const cuerpo = clean.slice(0, -1);
    const dvIngresado = clean.slice(-1);

    // Multiplicamos de derecha a izquierda por la serie 2,3,4,5,6,7
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    // Calculamos el dígito verificador esperado
    const dvEsperadoNum = 11 - (suma % 11);
    let dvEsperado = '';
    if (dvEsperadoNum === 11) dvEsperado = '0';
    else if (dvEsperadoNum === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperadoNum.toString();

    return dvIngresado === dvEsperado;
  },

  // Valida que el correo termine en @duoc.cl, @profesor.duoc.cl o @gmail.com
  validarCorreo(email) {
    if (!email) return false;
    if (email.length > 100) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(email.trim());
  },

  // Valida que la contraseña tenga entre 4 y 10 caracteres
  validarPassword(pass) {
    if (!pass) return false;
    return pass.length >= 4 && pass.length <= 10;
  },

  // Valida campos de texto requeridos y largo min/max
  validarTextoRequerido(texto, minLen = 1, maxLen = 100) {
    if (!texto) return false;
    const trimmed = texto.trim();
    return trimmed.length >= minLen && trimmed.length <= maxLen;
  },

  // Valida que el precio sea un número positivo o cero
  validarPrecio(precio) {
    if (precio === '' || precio === null || isNaN(precio)) return false;
    const num = Number(precio);
    return num >= 0;
  },

  // Valida que el stock sea un número entero mayor o igual a cero
  validarStock(stock) {
    if (stock === '' || stock === null || isNaN(stock)) return false;
    const num = Number(stock);
    return Number.isInteger(num) && num >= 0;
  },

  // Muestra el mensaje de error debajo del input
  setError(inputEl, mensaje) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    let feedback = inputEl.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      inputEl.parentElement.appendChild(feedback);
    }
    feedback.textContent = mensaje;
  },

  // Limpia el error de un input individual
  clearError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    const feedback = inputEl.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  },

  // Limpia todos los errores del formulario
  clearFormErrors(formEl) {
    if (!formEl) return;
    formEl.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
  }
};
