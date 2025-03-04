// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const navItems = document.querySelectorAll('nav ul li a');
    const navUnderline = document.querySelector('.nav-underline');
    const heroText = document.querySelector('.hero-text');
    const heroImg = document.querySelector('.hero-img img');
    const misionArticle = document.querySelector('.mision');
    const visionArticle = document.querySelector('.vision');
    
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
    });
    
    // Cuando el ratón sale del área de navegación, ocultar el subrayado
    document.querySelector('nav ul').addEventListener('mouseleave', function() {
      navUnderline.style.width = '0';
    });
    
    // Animación de entrada para el texto del hero
    if (heroText) {
      // Ocultar inicialmente
      heroText.style.opacity = '0';
      heroText.style.transform = 'translateX(30px)';
      
      // Mostrar con animación después de un breve retraso
      setTimeout(() => {
        heroText.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
      }, 300);
    }
    
    // Animación de entrada para la imagen del hero
    if (heroImg) {
      // Ocultar inicialmente
      heroImg.style.opacity = '0';
      heroImg.style.transform = 'translateY(30px)';
      
      // Mostrar con animación después de un breve retraso
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
      // Animación para el artículo de Misión
      if (misionArticle && !misionArticle.classList.contains('animated') && isInViewport(misionArticle)) {
        misionArticle.style.opacity = '0';
        misionArticle.style.transform = 'translateY(30px)';
        misionArticle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
          misionArticle.style.opacity = '1';
          misionArticle.style.transform = 'translateY(0)';
          misionArticle.classList.add('animated');
        }, 100);
      }
      
      // Animación para el artículo de Visión
      if (visionArticle && !visionArticle.classList.contains('animated') && isInViewport(visionArticle)) {
        visionArticle.style.opacity = '0';
        visionArticle.style.transform = 'translateY(30px)';
        visionArticle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
          visionArticle.style.opacity = '1';
          visionArticle.style.transform = 'translateY(0)';
          visionArticle.classList.add('animated');
        }, 300);
      }
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
  });