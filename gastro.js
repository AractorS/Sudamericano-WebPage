document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  // Desactivamos la animación automática para evitar conflictos
  sliderContainer.style.animation = 'none';

  const totalSlides = slides.length;
  const visibleSlides = 3; // Número de imágenes visibles al mismo tiempo
  const totalGroups = Math.ceil(totalSlides / visibleSlides);
  let currentGroup = 0;

  function updateSlider() {
    // Se traslada el contenedor un 100% del ancho del slider por cada grupo
    sliderContainer.style.transform = `translateX(-${currentGroup * 100}%)`;
  }

  nextBtn.addEventListener('click', function() {
    if (currentGroup < totalGroups - 1) {
      currentGroup++;
    } else {
      currentGroup = 0; // Volver al inicio
    }
    updateSlider();
  });

  prevBtn.addEventListener('click', function() {
    if (currentGroup > 0) {
      currentGroup--;
    } else {
      currentGroup = totalGroups - 1; // Ir al último grupo
    }
    updateSlider();
  });
});
