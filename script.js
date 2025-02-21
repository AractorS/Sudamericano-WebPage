document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const underline = document.querySelector(".nav-underline");
  
    // Función para mover el subrayado
    function moveUnderline(link) {
      const linkCoords = link.getBoundingClientRect();
      const navCoords = link.closest("nav").getBoundingClientRect();
  
      underline.style.width = `${linkCoords.width}px`;
      underline.style.left = `${linkCoords.left - navCoords.left}px`;
    }
  
    // Inicializar el subrayado en el enlace activo
    navLinks.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("active");
        moveUnderline(link);
      }
  
      // Mover el subrayado al pasar el cursor
      link.addEventListener("mouseenter", () => moveUnderline(link));
    });
  
    // Resetear el subrayado al salir del menú
    document.querySelector("nav").addEventListener("mouseleave", () => {
      const activeLink = document.querySelector("nav ul li a.active");
      if (activeLink) moveUnderline(activeLink);
      else underline.style.width = '0';
    });
  
    // Si no hay enlace activo, ocultar subrayado
    if (!document.querySelector("nav ul li a.active")) {
      underline.style.width = '0';
    }
  });
  