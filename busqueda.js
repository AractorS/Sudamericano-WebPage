document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.carrera-card');
  
    // Escuchamos el evento "input" para que se actualice en tiempo real
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
  
      cards.forEach(card => {
        // Obtenemos el contenido del título y la descripción de cada tarjeta
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
  
        // Si el término buscado aparece en el título o la descripción, mostramos la tarjeta
        if (title.includes(query) || description.includes(query)) {
          card.style.display = ""; // Se muestra la tarjeta (usa el display original)
        } else {
          card.style.display = "none"; // Se oculta la tarjeta
        }
      });
    });
  });
  