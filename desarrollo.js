document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  let items = Array.from(track.children); // Ítems originales
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  // Cantidad de ítems que se muestran simultáneamente
  const slidesToShow = 3;
  const itemWidth = 330;

  // Calculamos el ancho de un ítem (300px + 20px de margen)
  // Ajusta si cambias el CSS

  // 1) Clonamos los últimos 3 ítems y los ponemos al inicio
  for (let i = items.length - slidesToShow; i < items.length; i++) {
    const clone = items[i].cloneNode(true);
    track.insertBefore(clone, items[0]);
  }

  // 2) Clonamos los primeros 3 ítems y los ponemos al final
  for (let i = 0; i < slidesToShow; i++) {
    const clone = items[i].cloneNode(true);
    track.appendChild(clone);
  }

  // Actualizamos la lista con los clones incluidos
  items = Array.from(track.children);

  // Iniciamos el índice en "3" para ver los ítems originales
  let currentIndex = slidesToShow;

  // Posicionamos cada ítem en fila
  items.forEach((item, index) => {
    item.style.left = (index * itemWidth) + 'px';
  });

  // Ajustamos la posición inicial para mostrar los ítems originales
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Función para moverse a un índice específico
  function goToIndex(index) {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    currentIndex = index;
  }

  // Evento "Next"
  nextButton.addEventListener('click', () => {
    const oldSlide = items[currentIndex];
    oldSlide.classList.add('shrink-out');
  
    goToIndex(currentIndex + 1);

    setTimeout(() => {
      oldSlide.classList.remove('shrink-out');
      newSlide.classList.remove('grow-in');
    }, 300);
  });

  // Evento "Prev"
  prevButton.addEventListener('click', () => {
    goToIndex(currentIndex - 1);
  });

  // Al terminar la animación, detectamos si estamos fuera de rango y saltamos
  track.addEventListener('transitionend', () => {
    if (currentIndex >= (items.length - slidesToShow)) {
      // Te pasaste del final, vuelve a la posición original sin transición
      currentIndex = slidesToShow;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    } else if (currentIndex < slidesToShow) {
      // Te pasaste del inicio, salta al final
      currentIndex = items.length - slidesToShow - 1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  });
});
