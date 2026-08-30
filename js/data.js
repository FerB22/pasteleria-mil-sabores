const DEFAULT_PRODUCTS = [
  {
    codigo: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    categoria: "Tortas Cuadradas",
    precio: 45000,
    stock: 12,
    stockCritico: 3,
    descripcion: "Deliciosa torta de chocolate con capas de <em>ganache</em> y un toque de avellanas. Personalizable con mensajes especiales.",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: true,
    precioOferta: 39990
  },
  {
    codigo: "TC002",
    nombre: "Torta Cuadrada de Frutas",
    categoria: "Tortas Cuadradas",
    precio: 50000,
    stock: 8,
    stockCritico: 2,
    descripcion: "Una mezcla de frutas frescas y crema <em>chantilly</em> sobre un suave bizcocho de vainilla, ideal para celebraciones.",
    imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "TT001",
    nombre: "Torta Circular de Vainilla",
    categoria: "Tortas Circulares",
    precio: 40000,
    stock: 15,
    stockCritico: 4,
    descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
    imagen: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "TT002",
    nombre: "Torta Circular de Manjar",
    categoria: "Tortas Circulares",
    precio: 42000,
    stock: 10,
    stockCritico: 3,
    descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    imagen: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: true,
    precioOferta: 37990
  },
  {
    codigo: "PI001",
    nombre: "<em>Mousse</em> de Chocolate",
    categoria: "Postres Individuales",
    precio: 5000,
    stock: 25,
    stockCritico: 5,
    descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
    imagen: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PI002",
    nombre: "Tiramisú Clásico",
    categoria: "Postres Individuales",
    precio: 5500,
    stock: 18,
    stockCritico: 4,
    descripcion: "Un postre italiano individual con capas de café, queso mascarpone y cacao, perfecto para finalizar cualquier comida.",
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PSA001",
    nombre: "Torta Sin Azúcar de Naranja",
    categoria: "Productos Sin Azúcar",
    precio: 48000,
    stock: 6,
    stockCritico: 2,
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
    imagen: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: true,
    precioOferta: 42990
  },
  {
    codigo: "PSA002",
    nombre: "<em>Cheesecake</em> Sin Azúcar",
    categoria: "Productos Sin Azúcar",
    precio: 47000,
    stock: 5,
    stockCritico: 2,
    descripcion: "Suave y cremoso, este <em>cheesecake</em> es una opción perfecta para disfrutar sin culpa.",
    imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PT001",
    nombre: "Empanada de Manzana",
    categoria: "Pastelería Tradicional",
    precio: 3000,
    stock: 30,
    stockCritico: 5,
    descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PT002",
    nombre: "Tarta de Santiago",
    categoria: "Pastelería Tradicional",
    precio: 6000,
    stock: 14,
    stockCritico: 3,
    descripcion: "Tradicional tarta española hecha con almendras, azúcar y huevos, una delicia para los amantes de los postres clásicos.",
    imagen: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PG001",
    nombre: "<em>Brownie</em> Sin Gluten",
    categoria: "Productos Sin Gluten",
    precio: 4000,
    stock: 20,
    stockCritico: 4,
    descripcion: "Rico y denso, este <em>brownie</em> es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
    imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PG002",
    nombre: "Pan Sin Gluten",
    categoria: "Productos Sin Gluten",
    precio: 3500,
    stock: 12,
    stockCritico: 3,
    descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PV001",
    nombre: "Torta Vegana de Chocolate",
    categoria: "Productos Vegana",
    precio: 50000,
    stock: 7,
    stockCritico: 2,
    descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
    imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "PV002",
    nombre: "Galletas Veganas de Avena",
    categoria: "Productos Vegana",
    precio: 4500,
    stock: 25,
    stockCritico: 5,
    descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un refrigerio saludable y vegano.",
    imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    destacado: false,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "TE001",
    nombre: "Torta Especial de Cumpleaños",
    categoria: "Tortas Especiales",
    precio: 55000,
    stock: 6,
    stockCritico: 2,
    descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
    imagen: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  },
  {
    codigo: "TE002",
    nombre: "Torta Especial de Boda",
    categoria: "Tortas Especiales",
    precio: 60000,
    stock: 4,
    stockCritico: 1,
    descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    imagen: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
    destacado: true,
    enOferta: false,
    precioOferta: null
  }
];

// ==========================================
// ARREGLO DE BLOGS Y NOTICIAS
// ==========================================
const BLOG_POSTS = [
  {
    id: 1,
    titulo: "El secreto del hojaldre crujiente y nuestro récord <em>Guinness</em> de 1995",
    autor: "Equipo de Pastelería Mil Sabores",
    fecha: "24 de Agosto, 2026",
    categoria: "Historia y Tradición",
    resumen: "Revivimos la historia de la torta más grande del mundo y compartimos los secretos del hojaldre casero.",
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    contenidoCompleto: `
      <p>En Pastelería Mil Sabores llevamos 50 años horneando historias. Uno de nuestros hitos más recordados ocurrió en 1995, cuando participamos en la elaboración de la torta más grande de Chile y del mundo, un hito que marcó nuestra pasión por la repostería a gran escala.</p>
      
      <h3>1. El control de la mantequilla en el hojaldre</h3>
      <p>Para lograr capas perfectas en las tortas de mil hojas, el secreto está en que la mantequilla mantenga la misma textura plástica que la masa. Si está muy fría se quiebra, y si está muy blanda se absorbe.</p>
      
      <h3>2. Tiempos de reposo en frío</h3>
      <p>Es indispensable refrigerar la masa entre vuelta y vuelta (al menos 30 minutos). Así relajamos el gluten y evitamos que la masa se encoja al hornear.</p>
      
      <h3>3. Horneado parejo</h3>
      <p>Horneamos las hojarascas pinchadas con tenedor a 190°C con un peso liviano encima los primeros minutos para que queden crocantes y parejas.</p>
    `
  },
  {
    id: 2,
    titulo: "Consejos de estudiantes de Gastronomía Duoc UC: Repostería sin azúcar",
    autor: "Estudiantes de Gastronomía Duoc UC",
    fecha: "18 de Agosto, 2026",
    categoria: "Innovación y Salud",
    resumen: "<em>Tips</em> prácticos para reemplazar azúcar por alulosa y tagatosa sin perder humedad ni textura.",
    imagen: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=800&q=80",
    contenidoCompleto: `
      <p>Junto a los estudiantes en práctica de la Escuela de Gastronomía de Duoc UC, desarrollamos nuestra línea Dulce Bienestar. Hornear sin azúcar tradicional tiene sus trucos, y aquí te dejamos los principales consejos:</p>
      
      <h3>1. ¿Alulosa, tagatosa o eritritol?</h3>
      <p>La alulosa es la que mejor carameliza y mantiene la humedad en bizcochos y <em>cheesecakes</em>. Recomendamos usar un 20% adicional de alulosa comparado con el peso de azúcar de la receta original.</p>
      
      <h3>2. Compensar la humedad perdida</h3>
      <p>El azúcar retiene agua. Al sacarla, es bueno añadir una cucharada de yogur natural o puré de manzana para que el queque no quede seco al día siguiente.</p>
      
      <h3>3. Conservación</h3>
      <p>Los postres sin azúcar no tienen los conservantes naturales del azúcar glas, así que es ideal mantenerlos siempre refrigerados y consumirlos dentro de 3 a 4 días.</p>
    `
  }
];

const CHILE_REGIONES_COMUNAS = [
  {
    region: "Región de Arica y Parinacota",
    comunas: ["Arica", "Camarones", "General Lagos", "Putre"]
  },
  {
    region: "Región de Tarapacá",
    comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
  },
  {
    region: "Región de Antofagasta",
    comunas: ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]
  },
  {
    region: "Región de Atacama",
    comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]
  },
  {
    region: "Región de Coquimbo",
    comunas: ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paiguano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]
  },
  {
    region: "Región de Valparaíso",
    comunas: [
      "Algarrobo", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", 
      "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Calera", 
      "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", 
      "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", 
      "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", 
      "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"
    ]
  },
  {
    region: "Región Metropolitana de Santiago",
    comunas: [
      "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", 
      "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", 
      "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", 
      "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", 
      "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", 
      "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", 
      "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", 
      "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"
    ]
  },
  {
    region: "Región del Libertador General Bernardo O'Higgins",
    comunas: [
      "Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", 
      "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigüe", 
      "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", 
      "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", 
      "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"
    ]
  },
  {
    region: "Región del Maule",
    comunas: [
      "Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", 
      "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", 
      "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", 
      "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"
    ]
  },
  {
    region: "Región de Ñuble",
    comunas: [
      "Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", 
      "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", 
      "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"
    ]
  },
  {
    region: "Región del Biobío",
    comunas: [
      "Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", 
      "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", 
      "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", 
      "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", 
      "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"
    ]
  },
  {
    region: "Región de La Araucanía",
    comunas: [
      "Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", 
      "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", 
      "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", 
      "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", 
      "Traiguén", "Victoria", "Vilcún", "Villarrica"
    ]
  },
  {
    region: "Región de Los Ríos",
    comunas: [
      "Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", 
      "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"
    ]
  },
  {
    region: "Región de Los Lagos",
    comunas: [
      "Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", 
      "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", 
      "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", 
      "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", 
      "Río Negro", "San Juan de la Costa", "San Pablo"
    ]
  },
  {
    region: "Región de Aysén del General Carlos Ibáñez del Campo",
    comunas: [
      "Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", 
      "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"
    ]
  },
  {
    region: "Región de Magallanes y de la Antártica Chilena",
    comunas: [
      "Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", 
      "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"
    ]
  }
];

const DEFAULT_USERS = [
  {
    run: "190110222",
    nombre: "Usuario",
    apellidos: "Administrador",
    correo: "admin@duoc.cl",
    rol: "Administrador",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Avenida España 8, Santiago Centro",
    fechaNacimiento: "1990-01-01"
  },
  {
    run: "18456789K",
    nombre: "Usuario",
    apellidos: "Vendedor",
    correo: "vendedor@profesor.duoc.cl",
    rol: "Vendedor",
    region: "Región Metropolitana de Santiago",
    comuna: "Providencia",
    direccion: "Avenida Providencia 1208, Local 4",
    fechaNacimiento: "1992-02-02"
  },
  {
    run: "201234565",
    nombre: "Usuario",
    apellidos: "Cliente",
    correo: "cliente@gmail.com",
    rol: "Cliente",
    region: "Región Metropolitana de Santiago",
    comuna: "Ñuñoa",
    direccion: "Avenida Los Leones 1234",
    fechaNacimiento: "1995-03-03"
  }
];

// Inicializa los datos en el localStorage si es la primera vez que se abre la página o se actualizó el catálogo
function initializeData() {
  if (typeof localStorage !== "undefined") {
    const storedProds = localStorage.getItem("pms_products");
    if (!storedProds) {
      localStorage.setItem("pms_products", JSON.stringify(DEFAULT_PRODUCTS));
    } else {
      try {
        const parsed = JSON.parse(storedProds);
        // Si tiene la versión antigua de 8 productos o códigos TOR-, actualizamos al catálogo oficial de 16
        if (!Array.isArray(parsed) || parsed.length < 16 || (parsed[0] && parsed[0].codigo.startsWith("TOR-"))) {
          localStorage.setItem("pms_products", JSON.stringify(DEFAULT_PRODUCTS));
        }
      } catch (e) {
        localStorage.setItem("pms_products", JSON.stringify(DEFAULT_PRODUCTS));
      }
    }
    
    if (!localStorage.getItem("pms_users")) {
      localStorage.setItem("pms_users", JSON.stringify(DEFAULT_USERS));
    }

    if (!localStorage.getItem("pms_cart")) {
      localStorage.setItem("pms_cart", JSON.stringify([]));
    }
  }
}

initializeData();

// Función para poblar el selector de regiones y actualizar las comunas según lo que elija el usuario
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
