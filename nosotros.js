/**
 * Instituto Tecnológico Sudamericano - Efectos profesionales
 * Archivo JavaScript principal para la página "Sobre Nosotros"
 * 
 * Este script implementa efectos interactivos avanzados, animaciones,
 * y mejoras de experiencia de usuario para el sitio web institucional.
 */

// Aplicamos un patrón de módulo IIFE para evitar contaminar el espacio global
(function() {
    'use strict';
    
    // Objeto principal para manejar todas las funcionalidades
    const ITSudamericano = {
        // Configuración centralizada
        config: {
            selectors: {
                header: 'header',
                navItems: 'nav ul li a',
                navUnderline: '.nav-underline',
                nav: 'nav',
                sections: 'section',
                infoSection: '.info-adicional',
                infoBackground: '.info-adicional img',
                mainTitle: '.about h1',
                mainText: '.about p',
                listItems: '.info-adicional ul li',
                internalLinks: 'a[href^="#"]',
                scrollThreshold: 100
            },
            classes: {
                visible: 'visible',
                fadeIn: 'fade-in',
                animated: 'animated',
                headerScrolled: 'header-scrolled'
            },
            animations: {
                titleDelay: 500,
                textDelay: 300,
                listBaseDelay: 1000,
                listItemDelay: 200
            },
            observer: {
                threshold: 0.1,
                rootMargin: '0px'
            },
            parallax: {
                factor: 0.3
            }
        },
        
        /**
         * Inicializa todas las funcionalidades
         */
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.initNavHighlight();
            this.initSectionObserver();
            this.animateHeroElements();
            this.animateListItems();
        },
        
        /**
         * Almacena en caché los elementos DOM para optimizar rendimiento
         */
        cacheDom: function() {
            this.dom = {};
            const s = this.config.selectors;
            
            // Obtener referencias a los elementos del DOM
            this.dom.header = document.querySelector(s.header);
            this.dom.navItems = document.querySelectorAll(s.navItems);
            this.dom.navUnderline = document.querySelector(s.navUnderline);
            this.dom.nav = document.querySelector(s.nav);
            this.dom.sections = document.querySelectorAll(s.sections);
            this.dom.infoSection = document.querySelector(s.infoSection);
            this.dom.infoBackground = document.querySelector(s.infoBackground);
            this.dom.mainTitle = document.querySelector(s.mainTitle);
            this.dom.mainText = document.querySelector(s.mainText);
            this.dom.listItems = document.querySelectorAll(s.listItems);
            this.dom.internalLinks = document.querySelectorAll(s.internalLinks);
        },
        
        /**
         * Vincula todos los eventos
         */
        bindEvents: function() {
            // Event binding con comprobación de existencia
            this.dom.navItems.forEach(item => {
                item.addEventListener('mouseenter', this.handleNavHover.bind(this, item));
            });
            
            if (this.dom.nav) {
                this.dom.nav.addEventListener('mouseleave', this.resetActiveNav.bind(this));
            }
            
            this.dom.internalLinks.forEach(link => {
                link.addEventListener('click', this.handleSmoothScroll.bind(this));
            });
            
            // Debounce para mejorar el rendimiento en eventos de scroll
            window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 10));
        },
        
        /**
         * Función debounce para optimizar eventos frecuentes
         */
        debounce: function(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        },
        
        /**
         * Inicializa la configuración del subrayado en la navegación
         */
        initNavHighlight: function() {
            const currentPage = window.location.pathname.split('/').pop();
            
            this.dom.navItems.forEach(item => {
                if (item.getAttribute('href') === currentPage) {
                    this.updateNavUnderline(item);
                }
            });
        },
        
        /**
         * Maneja el evento hover en los elementos de navegación
         */
        handleNavHover: function(item) {
            this.updateNavUnderline(item);
        },
        
        /**
         * Actualiza la posición y ancho del subrayado
         */
        updateNavUnderline: function(item) {
            if (!this.dom.navUnderline) return;
            
            const width = item.offsetWidth;
            const left = item.offsetLeft;
            
            // Aplicamos transformación con requestAnimationFrame para mejor rendimiento
            requestAnimationFrame(() => {
                this.dom.navUnderline.style.width = `${width}px`;
                this.dom.navUnderline.style.left = `${left}px`;
            });
        },
        
        /**
         * Restaura el subrayado al elemento activo
         */
        resetActiveNav: function() {
            const currentPage = window.location.pathname.split('/').pop();
            
            this.dom.navItems.forEach(item => {
                if (item.getAttribute('href') === currentPage) {
                    this.updateNavUnderline(item);
                }
            });
        },
        
        /**
         * Gestiona el desplazamiento suave para enlaces internos
         */
        handleSmoothScroll: function(e) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },
        
        /**
         * Inicializa el observador de intersección para las secciones
         */
        initSectionObserver: function() {
            const options = {
                root: null,
                rootMargin: this.config.observer.rootMargin,
                threshold: this.config.observer.threshold
            };
            
            const observer = new IntersectionObserver(this.handleSectionIntersection.bind(this), options);
            
            this.dom.sections.forEach(section => {
                section.classList.add(this.config.classes.fadeIn);
                observer.observe(section);
            });
        },
        
        /**
         * Maneja la intersección de secciones
         */
        handleSectionIntersection: function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.config.classes.visible);
                } else {
                    // Opcional: remover la clase visible cuando sale del viewport
                    // entry.target.classList.remove(this.config.classes.visible);
                }
            });
        },
        
        /**
         * Maneja eventos de scroll
         */
        handleScroll: function() {
            this.updateHeaderOnScroll();
            this.updateParallaxEffect();
        },
        
        /**
         * Actualiza el encabezado al hacer scroll
         */
        updateHeaderOnScroll: function() {
            if (!this.dom.header) return;
            
            if (window.scrollY > this.config.selectors.scrollThreshold) {
                this.dom.header.classList.add(this.config.classes.headerScrolled);
            } else {
                this.dom.header.classList.remove(this.config.classes.headerScrolled);
            }
        },
        
        /**
         * Actualiza el efecto parallax en la sección de información
         */
        updateParallaxEffect: function() {
            if (!this.dom.infoSection || !this.dom.infoBackground) return;
            
            const scrollPosition = window.scrollY;
            const sectionTop = this.dom.infoSection.offsetTop;
            const sectionHeight = this.dom.infoSection.offsetHeight;
            const distance = scrollPosition - sectionTop;
            
            // Solo aplicamos el efecto cuando la sección está visible
            if (distance > -window.innerHeight && distance < sectionHeight) {
                const translateY = distance * this.config.parallax.factor;
                
                // Usamos transformación hardware-accelerated para mejor rendimiento
                requestAnimationFrame(() => {
                    this.dom.infoBackground.style.transform = `translate3d(0, ${translateY}px, 0)`;
                });
            }
        },
        
        /**
         * Anima los elementos principales
         */
        animateHeroElements: function() {
            if (!this.dom.mainTitle && !this.dom.mainText) return;
            
            const { titleDelay, textDelay } = this.config.animations;
            
            setTimeout(() => {
                if (this.dom.mainTitle) {
                    this.dom.mainTitle.classList.add(this.config.classes.animated);
                }
                
                setTimeout(() => {
                    if (this.dom.mainText) {
                        this.dom.mainText.classList.add(this.config.classes.animated);
                    }
                }, textDelay);
            }, titleDelay);
        },
        
        /**
         * Anima los elementos de lista secuencialmente
         */
        animateListItems: function() {
            if (!this.dom.listItems.length) return;
            
            const { listBaseDelay, listItemDelay } = this.config.animations;
            
            this.dom.listItems.forEach((item, index) => {
                // Configuración inicial de estilos
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // Animación con retraso escalonado
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, listBaseDelay + (index * listItemDelay));
            });
        }
    };
    
    // Ejecutar inicialización cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', () => {
        ITSudamericano.init();
    });
    
    // Exponer API pública si es necesario
    window.ITSudamericano = ITSudamericano;
})();