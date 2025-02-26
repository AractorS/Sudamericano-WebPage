document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  // Desactivamos la animación automática para evitar conflictos
  sliderContainer.style.animation = 'none';

  const totalSlides = slides.length;
  const visibleSlides = 3; // Número de imágenes visibles al mismo tiempo
  const totalGroups = Math.ceil(totalSlides / visibleSlides); // Número total de grupos
  let currentGroup = 0; // Grupo actual

  function updateSlider() {
    // Se traslada el contenedor un 100% del ancho del slider por cada grupo
    sliderContainer.style.transform = `translateX(-${currentGroup * (100 / visibleSlides)}%)`;
  }

  nextBtn.addEventListener('click', function() {
    if (currentGroup < totalGroups - 1) {
      currentGroup++; // Avanzar al siguiente grupo
    } else {
      currentGroup = 0; // Volver al primer grupo
    }
    updateSlider(); // Actualizar el desplazamiento
  });

  prevBtn.addEventListener('click', function() {
    if (currentGroup > 0) {
      currentGroup--; // Retroceder al grupo anterior
    } else {
      currentGroup = totalGroups - 1; // Ir al último grupo
    }
    updateSlider(); // Actualizar el desplazamiento
  });
});
