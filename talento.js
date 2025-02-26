document.addEventListener('DOMContentLoaded', function() {
    const tarjetas = document.querySelectorAll('.tarjeta');
    tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener('mousemove', (e) => {
        const rect = tarjeta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        tarjeta.style.transform = `rotateY(${deltaX * 10}deg) rotateX(${-deltaY * 10}deg) scale(1.05)`;
      });
      tarjeta.addEventListener('mouseleave', () => {
        tarjeta.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        tarjeta.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          tarjeta.style.transition = '';
        }, 500);
      });
    });
  });
  