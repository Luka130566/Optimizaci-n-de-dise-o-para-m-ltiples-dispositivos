
const themeContainer = document.querySelector('.theme-container');
const themeToggle = document.getElementById('themeToggle');
const THEME_STORAGE_KEY = 'user-theme-preference';

/**
 true para tema oscuro, false para claro
 */
function applyTheme(isDark) {
  if (isDark) {
    themeContainer.classList.add('dark-theme');
  } else {
    themeContainer.classList.remove('dark-theme');
  }
  
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
}

/**
 * Función para alternar el tema
 */
function toggleTheme() {
  const isDark = themeContainer.classList.contains('dark-theme');
  applyTheme(!isDark);
}

/**
 * Función para detectar la preferencia del sistema
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Función para generar tarjetas 
 */
function generateCards() {
  const cardGrid = document.getElementById('cardGrid');
  const cardData = [
    { type: 'primary', title: 'Tema Claro/Oscuro', content: 'Reduce la fatiga visual y mejora la visualizacion en diferentes condiciones de luz.' },
    { type: 'secondary', title: 'CSS Variables', content: 'Variables personalizadas permiten cambiar todos los colores de forma centralizada.' },
    { type: 'success', title: 'Transiciones Suaves', content: 'Cambios animados para una experiencia de usuario más agradable.' },
    { type: 'danger', title: 'Persistencia', content: 'Tu elección se guarda automáticamente para futuras visitas.' },
    { type: 'warning', title: 'Sistema Operativo', content: 'Detecta automáticamente tu preferencia de sistema si no hay una guardada.' }
  ];

  // CICLO: Genera cada tarjeta
  cardData.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = `card-${card.type}`;
    cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.content}</p>
      <button class="btn btn-${card.type}">Acción</button>
    `;
    cardGrid.appendChild(cardElement);
  });
}

// Cargar tema guardado o usar preferencia del sistema
document.addEventListener('DOMContentLoaded', () => {
  // Generar tarjetas al cargar
  generateCards();

  // Verificar si hay una preferencia guardada
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  if (savedTheme) {
    // CONDICIONAL: Aplicar tema guardado
    applyTheme(savedTheme === 'dark');
  } else {
    // Si no hay preferencia, usar la del sistema
    applyTheme(getSystemTheme());
  }

  // Escuchar el botón de cambio
  themeToggle.addEventListener('click', toggleTheme);

  // Opcional: Escuchar cambios en el tema del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Solo aplica si el usuario no ha guardado preferencia manual
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches);
    }
  });
});
