// Funcionalidades JavaScript para Cable a Tierra

// Variables globales
let chatbotOpen = false;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollAnimations();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeChatbot();
});

// Funcionalidad de la barra de navegación
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.plan-card, .contact-card, .feature-item, .why-choose-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Scroll suave para enlaces internos
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Manejo del formulario de contratación
function initializeFormHandling() {
    const form = document.getElementById('contractForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                servicio: document.getElementById('servicio').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Validar campos requeridos
            if (!formData.nombre || !formData.telefono || !formData.direccion || !formData.servicio) {
                showAlert('Por favor, completa todos los campos requeridos.', 'warning');
                return;
            }
            
            // Simular envío del formulario
            showAlert('¡Gracias! Hemos recibido tu solicitud. Nos contactaremos contigo pronto.', 'success');
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = createWhatsAppMessage(formData);
            
            // Mostrar opción de enviar por WhatsApp
            setTimeout(() => {
                if (confirm('¿Te gustaría enviar esta información directamente por WhatsApp?')) {
                    window.open(`https://wa.me/543756438933?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }
            }, 2000);
            
            // Limpiar formulario
            form.reset();
        });
    }
}

// Crear mensaje para WhatsApp
function createWhatsAppMessage(data) {
    return `¡Hola! Me interesa contratar sus servicios.

*Datos de contacto:*
• Nombre: ${data.nombre}
• Teléfono: ${data.telefono}
• Dirección: ${data.direccion}
• Servicio deseado: ${getServiceName(data.servicio)}

${data.mensaje ? `*Mensaje adicional:*\n${data.mensaje}` : ''}

¡Espero su contacto!`;
}

// Obtener nombre del servicio
function getServiceName(serviceValue) {
    const services = {
        'fibra-100': 'Internet Fibra Óptica 100MB',
        'fibra-150': 'Internet Fibra Óptica 150MB',
        'fibra-200': 'Internet Fibra Óptica 200MB',
        'fibra-300': 'Internet Fibra Óptica 300MB',
        'wireless-2': 'Internet Inalámbrico 2MB',
        'wireless-4': 'Internet Inalámbrico 4MB',
        'wireless-6': 'Internet Inalámbrico 6MB',
        'tv-basico': 'TV Digital Básico',
        'tv-full': 'TV Digital Full',
        'camaras': 'Cámaras IP / Videovigilancia',
        'combo': 'Combo (Internet + TV)'
    };
    
    return services[serviceValue] || serviceValue;
}

// Mostrar alertas
function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; max-width: 400px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al DOM
    document.body.appendChild(alertDiv);
    
    // Remover automáticamente después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Funcionalidad del chatbot
function initializeChatbot() {
    // El chatbot ya está inicializado en el HTML
    console.log('Chatbot inicializado');
}

// Toggle del chatbot
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
    } else {
        chatbotWindow.classList.remove('active');
    }
}

// Seleccionar opción del chatbot
function selectOption(option) {
    const chatbotBody = document.querySelector('.chatbot-body');
    
    // Agregar mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user-message';
    
    let userText = '';
    let botResponse = '';
    
    switch(option) {
        case 'planes':
            userText = 'Quiero ver los planes de internet';
            botResponse = 'Tenemos planes de Fibra Óptica desde 100MB ($24.200) hasta 300MB ($45.200) y planes Inalámbricos desde 2MB ($17.200). ¿Te interesa alguno en particular?';
            break;
        case 'tv':
            userText = 'Información sobre TV Digital';
            botResponse = 'Ofrecemos TV Digital DGO con Plan Básico (59 canales - $12.480) y Plan Full (95 canales - $15.890). También tenemos packs adicionales como Fútbol, Universal y Paramount.';
            break;
        case 'camaras':
            userText = 'Me interesan las cámaras de seguridad';
            botResponse = 'Nuestras cámaras IP incluyen monitoreo 24/7, app móvil, instalación profesional y almacenamiento en la nube. ¿Te gustaría que te contactemos para una cotización personalizada?';
            break;
        case 'contacto':
            userText = 'Quiero hablar con un humano';
            botResponse = 'Perfecto. Puedes contactarnos por WhatsApp al +54 3756 438933 o completar el formulario de contratación. ¡Nuestro equipo te atenderá personalmente!';
            break;
    }
    
    userMessage.textContent = userText;
    chatbotBody.appendChild(userMessage);
    
    // Agregar respuesta del bot después de un delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot-message';
        botMessage.textContent = botResponse;
        chatbotBody.appendChild(botMessage);
        
        // Scroll al final
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        // Agregar botones de acción
        setTimeout(() => {
            const actionButtons = document.createElement('div');
            actionButtons.className = 'chatbot-options mt-2';
            actionButtons.innerHTML = `
                <button class="chatbot-option" onclick="window.open('https://wa.me/543756438933', '_blank')">
                    <i class="fab fa-whatsapp me-1"></i> Contactar por WhatsApp
                </button>
                <button class="chatbot-option" onclick="document.querySelector('#contratar').scrollIntoView({behavior: 'smooth'}); toggleChatbot();">
                    <i class="fas fa-edit me-1"></i> Ir al formulario
                </button>
            `;
            chatbotBody.appendChild(actionButtons);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 1000);
        
    }, 1000);
    
    // Scroll al final
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Funciones de utilidad
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

// Validación de formulario en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Validación según el tipo de campo
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Por favor, ingresa un email válido';
            break;
        case 'tel':
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            isValid = phoneRegex.test(value) && value.length >= 8;
            errorMessage = 'Por favor, ingresa un teléfono válido';
            break;
        default:
            if (field.hasAttribute('required')) {
                isValid = value.length > 0;
                errorMessage = 'Este campo es requerido';
            }
    }
    
    // Aplicar estilos de validación
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
    
    // Mostrar/ocultar mensaje de error
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (!isValid && !feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = errorMessage;
        field.parentNode.appendChild(feedback);
    } else if (isValid && feedback) {
        feedback.remove();
    }
    
    return isValid;
}

// Efecto parallax sutil en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador animado para estadísticas (si se agregan en el futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('¡Copiado al portapapeles!', 'success');
    }).catch(() => {
        showAlert('Error al copiar', 'danger');
    });
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimizaciones para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor rendimiento
    document.documentElement.style.setProperty('--animation-duration', '0.2s');
}

console.log('Cable a Tierra - Website loaded successfully!');

