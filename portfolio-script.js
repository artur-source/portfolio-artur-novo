/* ====================================================================
   PORTFÓLIO PROFISSIONAL - SCRIPT JAVASCRIPT
   Autor: PortfolioPro | Versão: 1.0.0
   ==================================================================== */

// ====================================================================
// 1. MENU HAMBURGER MOBILE
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// ====================================================================
// 2. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            // Simulação de envio (em produção, usar fetch com backend)
            console.log('Formulário enviado:', { name, email, subject, message });
            
            // Feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mensagem Enviada! ✓';
            submitBtn.disabled = true;

            // Resetar formulário
            contactForm.reset();

            // Restaurar botão após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});

// ====================================================================
// 3. SCROLL REVEAL - ANIMAÇÕES AO ROLAR A PÁGINA
// ====================================================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar aos cards e seções
    const elementsToReveal = document.querySelectorAll(
        '.skill-card, .project-card, .about-text, .contact-item'
    );

    elementsToReveal.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Executar ao carregar
document.addEventListener('DOMContentLoaded', initScrollReveal);

// ====================================================================
// 4. INDICADOR DE SEÇÃO ATIVA NA NAVEGAÇÃO
// ====================================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ====================================================================
// 5. SUPORTE A MODO ESCURO (Preferência do Sistema)
// ====================================================================

function initDarkModeSupport() {
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Aplicar tema baseado na preferência
    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    }

    // Aplicar ao carregar
    applyTheme(prefersDark.matches);

    // Ouvir mudanças na preferência do sistema
    prefersDark.addEventListener('change', (e) => {
        applyTheme(e.matches);
    });
}

document.addEventListener('DOMContentLoaded', initDarkModeSupport);

// ====================================================================
// 6. SMOOTH SCROLL PARA ÂNCORAS (Fallback para navegadores antigos)
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Scroll suave (fallback para navegadores sem suporte nativo)
                if (!CSS.supports('scroll-behavior', 'smooth')) {
                    const targetPosition = target.offsetTop - 80; // Offset para header fixo
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ====================================================================
// 7. LAZY LOADING DE IMAGENS (Se houver)
// ====================================================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ====================================================================
// 8. PERFORMANCE: Debounce para eventos de scroll
// ====================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemplo de uso com scroll
const handleScroll = debounce(() => {
    // Lógica de scroll aqui
}, 150);

window.addEventListener('scroll', handleScroll);

// ====================================================================
// 9. FEEDBACK VISUAL DE CLIQUE EM BOTÕES
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Criar ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            // Remover ripple após animação
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ====================================================================
// 10. ANALYTICS SIMPLES (Opcional)
// ====================================================================

function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Rastrear quando seções são visualizadas
function trackSectionViews() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && typeof gtag !== 'undefined') {
                gtag('event', 'view_section', {
                    section_name: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    trackSectionViews();
});

// ====================================================================
// 11. FUNCIONALIDADES DE WHATSAPP
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Número do WhatsApp (sem formatação)
    const whatsappNumber = '5511940572858';
    
    // Botão "Entrar em Contato" (Hero CTA)
    const contactCTAButton = document.querySelector('.hero-cta .btn-secondary');
    if (contactCTAButton) {
        contactCTAButton.addEventListener('click', function(e) {
            e.preventDefault();
            const message = 'Olá! Estou visitando seu portfólio e gostaria de conversar sobre um projeto.';
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }
    
    // Os links dos projetos agora seguem as URLs definidas no HTML
    // (Removida a interceptação que redirecionava para o WhatsApp)
    
    // Botão "Vamos Trabalhar Juntos?" (Seção de Contato)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Enviar via WhatsApp
            const whatsappMessage = `*Novo Contato do Portfólio*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n*Mensagem:* ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Abrir WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Feedback visual
            submitBtn.textContent = 'Redirecionando para WhatsApp... ✓';
            submitBtn.disabled = true;
            
            // Resetar formulário
            contactForm.reset();
            
            // Restaurar botão após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});

// ====================================================================
// 12. CONSOLE LOG DE INICIALIZAÇÃO (Para Debug)
// ====================================================================

console.log('%c🚀 PortfolioPro Inicializado', 'color: #2563EB; font-size: 14px; font-weight: bold;');
console.log('%cVersão: 1.0.0', 'color: #4B5563; font-size: 12px;');
