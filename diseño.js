document.addEventListener("DOMContentLoaded", function () {
    console.log("Página de Diseño Gráfico cargada correctamente");
  
    // Efecto de desplazamiento en los elementos de detalles
    const detalles = document.querySelectorAll(".detalle-item");
  
    const mostrarDetalles = () => {
      detalles.forEach((detalle, index) => {
        setTimeout(() => {
          detalle.classList.add("visible");
        }, index * 300); // Agrega un pequeño retraso entre cada uno
      });
    };
  
    window.addEventListener("scroll", function () {
      const posicion = document.querySelector(".carrera-detalles").offsetTop;
      if (window.scrollY > posicion - window.innerHeight / 1.2) {
        mostrarDetalles();
      }
    });
  
    // Menú de navegación responsivo
    const nav = document.querySelector("nav ul");
    const menuBtn = document.createElement("button");
    menuBtn.textContent = "☰";
    menuBtn.classList.add("menu-btn");
    document.querySelector("header").appendChild(menuBtn);
  
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  });
