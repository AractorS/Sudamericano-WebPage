// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // El header se mantiene sin animación según lo solicitado
    
    // Animación para el título y subtítulo principal
    const title = document.querySelector('.about h1');
    const subtitle = document.querySelector('.about p');
    
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            subtitle.style.transition = 'opacity 1s ease, transform 1s ease';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 300);
    }, 800);

    // Animación para la flecha de desplazamiento
    const scrollArrow = document.querySelector('.scroll-down');
    if (scrollArrow) {
        scrollArrow.style.opacity = '0';
        
        setTimeout(() => {
            scrollArrow.style.transition = 'opacity 1s ease';
            scrollArrow.style.opacity = '1';
            
            // Animación pulsante para la flecha
            setInterval(() => {
                scrollArrow.style.animation = 'pulse 2s infinite';
            }, 2000);
        }, 1500);
    }

    // Efecto de navegación - subrayado en hover
    const navLinks = document.querySelectorAll('nav ul li a');
    const navUnderline = document.querySelector('.nav-underline');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const linkRect = this.getBoundingClientRect();
            const navRect = document.querySelector('nav').getBoundingClientRect();
            
            navUnderline.style.width = `${linkRect.width}px`;
            navUnderline.style.left = `${linkRect.left - navRect.left}px`;
            navUnderline.style.opacity = '1';
        });
        
        link.addEventListener('mouseleave', function() {
            navUnderline.style.opacity = '0';
        });
    });

    // Mejorar la sección del medio con una animación única y suave
    const infoSection = document.querySelector('.info-adicional');
    const infoContent = document.querySelector('.info-content');
    const listItems = document.querySelectorAll('.info-content ul li');
    
    // Inicializar la sección del medio con estado de invisibilidad
    if (infoContent) {
        infoContent.style.opacity = '0';
        infoContent.style.transform = 'translateY(30px)';
        
        // Inicializar los elementos de la lista
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
        });
    }
    
    // Verificar una sola vez cuando la sección entre en el viewport
    let infoSectionAnimated = false;
    
    // Animación al desplazarse (scroll)
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax suave para el video de fondo
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Animación única y suave para la sección de información adicional
        if (!infoSectionAnimated && infoSection && isElementInViewport(infoSection)) {
            infoSectionAnimated = true; // Marca que ya se ha animado
            
            // Animación suave para el contenido principal
            setTimeout(() => {
                infoContent.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
                infoContent.style.opacity = '1';
                infoContent.style.transform = 'translateY(0)';
                
                // Animar todos los elementos de la lista juntos con un pequeño retraso
                setTimeout(() => {
                    listItems.forEach(item => {
                        item.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, 300);
            }, 200);
        }
        
        // Efecto sutil para la tercera sección (sin zoom)
        const seccion3 = document.querySelector('.seccion-3');
        if (seccion3 && isElementInViewport(seccion3) && !seccion3.classList.contains('animated')) {
            seccion3.style.opacity = '0';
            setTimeout(() => {
                seccion3.style.transition = 'opacity 1.5s ease';
                seccion3.style.opacity = '1';
                seccion3.classList.add('animated');
            }, 200);
        }
    });

    // Comprobar si los elementos ya están visibles al cargar la página
    if (isElementInViewport(infoSection) && !infoSectionAnimated) {
        infoSectionAnimated = true;
        setTimeout(() => {
            infoContent.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            infoContent.style.opacity = '1';
            infoContent.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                listItems.forEach(item => {
                    item.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }, 300);
        }, 200);
    }
});

// Función auxiliar para verificar si un elemento es visible en el viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Añadir estilos de animación al DOM
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        50% {
            transform: translateY(10px);
            opacity: 0.7;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .scroll-down {
        display: block;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 24px;
        color: white;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    }
    
    .scroll-down:hover {
        transform: translateX(-50%) scale(1.2);
    }
    
    /* Animación suave para la sección 3 */
    .seccion-3 {
        opacity: 0;
        transition: opacity 1.5s ease;
    }
    
    .seccion-3.animated {
        opacity: 1;
    }
    
    /* Transiciones para info-adicional */
    .info-content {
        transition: opacity 1.5s ease, transform 1.5s ease;
    }
    
    /* Estilo de transición para los elementos de navegación */
    nav ul li a {
        transition: color 0.3s ease, transform 0.3s ease;
    }
    
    nav ul li a:hover {
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);