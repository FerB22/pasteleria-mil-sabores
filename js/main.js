// ==========================================
// FUNCIONES GENERALES DE LA TIENDA
// ==========================================

// Muestra mensajes flotantes (toasts) de confirmación o alerta
function showToast(message, type = "primary") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Lógica del carrusel de imágenes de la página de inicio
let currentSlide = 0;
let slideInterval = null;

function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  if (slides.length === 0) return;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  }

  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (prevBtn) prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    resetAutoSlide();
  });

  if (nextBtn) nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    resetAutoSlide();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showSlide(idx);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  startAutoSlide();
}

function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Validators.clearFormErrors(form);

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const comment = document.getElementById("contact-comment").value.trim();

    let hasError = false;

    if (!Validators.validarTextoRequerido(name, 2, 100)) {
      Validators.setError(document.getElementById("contact-name"), "El nombre es requerido (máximo 100 caracteres).");
      hasError = true;
    }

    if (!Validators.validarCorreo(email)) {
      Validators.setError(document.getElementById("contact-email"), "El correo debe pertenecer a los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      hasError = true;
    }

    if (!Validators.validarTextoRequerido(comment, 5, 500)) {
      Validators.setError(document.getElementById("contact-comment"), "El comentario es requerido (máximo 500 caracteres).");
      hasError = true;
    }

    if (!hasError) {
      showToast("Mensaje enviado exitosamente. Nos comunicaremos a la brevedad.", "success");
      form.reset();
    }
  });
}

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Validators.clearFormErrors(form);

    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value;

    let hasError = false;

    if (!Validators.validarCorreo(email)) {
      Validators.setError(document.getElementById("login-email"), "Correo requerido con dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      hasError = true;
    }

    if (!Validators.validarPassword(pass)) {
      Validators.setError(document.getElementById("login-password"), "La contraseña debe tener entre 4 y 10 caracteres.");
      hasError = true;
    }

    if (!hasError) {
      const users = JSON.parse(localStorage.getItem("pms_users") || "[]");
      const user = users.find(u => u.correo.toLowerCase() === email.toLowerCase());

      if (user) {
        showToast(`Bienvenido nuevamente, ${user.nombre}. Redirigiendo...`, "success");
        setTimeout(() => {
          if (user.rol === "Administrador" || user.rol === "Vendedor") {
            window.location.href = "admin/index.html";
          } else {
            window.location.href = "index.html";
          }
        }, 1200);
      } else {
        showToast("Inicio de sesión correcto en modo invitado.", "success");
        setTimeout(() => { window.location.href = "index.html"; }, 1000);
      }
    }
  });
}

function initRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;

  initRegionComunaSelectors("reg-region", "reg-comuna");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Validators.clearFormErrors(form);

    const run = document.getElementById("reg-run").value.trim().toUpperCase();
    const name = document.getElementById("reg-name").value.trim();
    const lastname = document.getElementById("reg-lastname").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value;
    const region = document.getElementById("reg-region").value;
    const comuna = document.getElementById("reg-comuna").value;
    const address = document.getElementById("reg-address").value.trim();
    const birth = document.getElementById("reg-birth").value;

    let hasError = false;

    if (!Validators.validarRUN(run)) {
      Validators.setError(document.getElementById("reg-run"), "RUN inválido. Ingrese entre 7 y 9 caracteres sin puntos ni guion.");
      hasError = true;
    }

    if (!Validators.validarTextoRequerido(name, 2, 50)) {
      Validators.setError(document.getElementById("reg-name"), "El nombre es requerido (máximo 50 caracteres).");
      hasError = true;
    }

    if (!Validators.validarTextoRequerido(lastname, 2, 100)) {
      Validators.setError(document.getElementById("reg-lastname"), "Los apellidos son requeridos (máximo 100 caracteres).");
      hasError = true;
    }

    if (!Validators.validarCorreo(email)) {
      Validators.setError(document.getElementById("reg-email"), "Solo se admiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
      hasError = true;
    }

    if (!Validators.validarPassword(pass)) {
      Validators.setError(document.getElementById("reg-password"), "La contraseña debe tener entre 4 y 10 caracteres.");
      hasError = true;
    }

    if (!region) {
      Validators.setError(document.getElementById("reg-region"), "Seleccione su región.");
      hasError = true;
    }

    if (!comuna) {
      Validators.setError(document.getElementById("reg-comuna"), "Seleccione su comuna.");
      hasError = true;
    }

    if (!Validators.validarTextoRequerido(address, 5, 300)) {
      Validators.setError(document.getElementById("reg-address"), "La dirección es requerida (máximo 300 caracteres).");
      hasError = true;
    }

    if (!hasError) {
      const users = JSON.parse(localStorage.getItem("pms_users") || "[]");
      if (users.some(u => u.run === run)) {
        Validators.setError(document.getElementById("reg-run"), "Este RUN ya se encuentra registrado.");
        return;
      }

      users.push({
        run,
        nombre: name,
        apellidos: lastname,
        correo: email,
        rol: "Cliente",
        region,
        comuna,
        direccion: address,
        fechaNacimiento: birth
      });

      localStorage.setItem("pms_users", JSON.stringify(users));
      showToast("Cuenta creada exitosamente. Ya puede iniciar sesión.", "success");
      setTimeout(() => { window.location.href = "login.html"; }, 1500);
    }
  });
}

function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (!Validators.validarCorreo(emailInput.value)) {
      showToast("Por favor, ingrese un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).", "warning");
      return;
    }
    showToast("Gracias por suscribirse al Club Dulce de Pastelería Mil Sabores.", "success");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCarousel();
  initContactForm();
  initLoginForm();
  initRegisterForm();
  initNewsletter();
});
