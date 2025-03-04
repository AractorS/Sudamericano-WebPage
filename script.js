// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos DOM
  const navItems = document.querySelectorAll('nav ul li a');
  const navUnderline = document.querySelector('.nav-underline');
  const heroText = document.querySelector('.hero-text');
  const heroImg = document.querySelector('.hero-img img');
  const misionArticle = document.querySelector('.mision');
  const visionArticle = document.querySelector('.vision');
  const logo = document.querySelector('.logo');
  
  // Función para actualizar el subrayado de navegación
  function updateNavUnderline(target) {
    if (!target || !navUnderline) return;
    
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.parentElement.getBoundingClientRect();
    
    navUnderline.style.width = `${rect.width}px`;
    navUnderline.style.left = `${rect.left - parentRect.left + target.parentElement.parentElement.scrollLeft}px`;
  }
  
  // Configurar eventos para los elementos de navegación
  navItems.forEach(item => {
    // Al pasar el ratón sobre un elemento de navegación
    item.addEventListener('mouseenter', function() {
      updateNavUnderline(this);
    });
    
    // Al hacer clic en un elemento de navegación
    item.addEventListener('click', function() {
      updateNavUnderline(this);
    });
  });
  
  // Cuando el ratón sale del área de navegación, ocultar el subrayado
  document.querySelector('nav ul').addEventListener('mouseleave', function() {
    navUnderline.style.width = '0';
  });
  
  // Animación de entrada para el texto del hero
  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateX(30px)';
    
    setTimeout(() => {
      heroText.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateX(0)';
    }, 300);
  }
  
  // Animación de entrada para la imagen del hero
  if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroImg.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'translateY(0)';
    }, 500);
  }
  
  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Función para animar elementos cuando son visibles
  function animateOnScroll() {
    [misionArticle, visionArticle].forEach(article => {
      if (article && !article.classList.contains('animated') && isInViewport(article)) {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.6s ease-out';
        article.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';

        setTimeout(() => {
          article.style.opacity = '1';
          article.style.transform = 'translateY(0)';
          article.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
          article.classList.add('animated');
        }, 200);
      }
    });
  }
  
  // Comprobar las animaciones al cargar la página
  animateOnScroll();
  
  // Comprobar las animaciones durante el scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Mejorar el botón "VER CARRERAS"
  const mainBtn = document.querySelector('.btn');
  if (mainBtn) {
    mainBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });
    
    mainBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
  }

  // Agregar efecto de zoom al pasar el cursor sobre Misión y Visión
  [misionArticle, visionArticle].forEach(article => {
    if (article) {
      article.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease-out';
      });
      
      article.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  });

  // Hacer que el logo redirija al inicio al hacer clic (sin zoom)
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function() {
      window.location.href = '/'; // Ajusta la URL según sea necesario
    });
  }
});
