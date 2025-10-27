// --- Funções Globais ---
let currentPage = 'home';

// Função para mostrar a página correta
function showPage(pageId) {
    if (!pageId) return; // Se não houver pageId, não faz nada
    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }

    const newPageElement = document.getElementById(pageId);
    if (newPageElement) {
        newPageElement.classList.add('active');
        currentPage = pageId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Função para controlar o menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// --- Event Listeners (Executado quando o DOM está pronto) ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidade 1: Navegação Única (Event Delegation) ---
    document.body.addEventListener('click', (event) => {
        // Encontra o elemento clicável mais próximo que tenha o atributo data-page
        const navTrigger = event.target.closest('[data-page]');

        // Se encontrou um, executa a navegação
        if (navTrigger) {
            event.preventDefault(); // Previne a ação padrão (ex: seguir um link '#')
            const pageId = navTrigger.dataset.page;
            showPage(pageId);

            // Fecha o menu mobile se ele estiver aberto
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Mostra a página inicial por padrão
    showPage('home');

    // --- Funcionalidade 2: Botão do Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMobileMenu();
        });
    }

    // --- Funcionalidade 3: Tema Light/Dark ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    function handleThemeToggle() {
        html.classList.toggle('dark');
        html.classList.toggle('light');
        const isDark = html.classList.contains('dark');
        const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
        const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;

        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        if (themeIconMobile) {
            themeIconMobile.className = isDark ? 'fas fa-sun mr-2' : 'fas fa-moon mr-2';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', handleThemeToggle);
    }
    
    // --- Funcionalidade 4: Botão "Voltar ao Topo" ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = "flex";
                backToTopButton.style.opacity = "1";
                backToTopButton.style.transform = "translateY(0)";
            } else {
                backToTopButton.style.opacity = "0";
                backToTopButton.style.transform = "translateY(0.5rem)";
                setTimeout(() => { 
                    if(window.scrollY <= 100) {
                        backToTopButton.style.display = "none"; 
                    }
                }, 300);
            }
        };
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Funcionalidade 5: Acordeão (Melhorado com Animação) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        // Remove a classe 'hidden' que o HTML possa ter por padrão (da implementação antiga)
        const content = header.nextElementSibling;
        if (content && content.classList.contains('accordion-content')) {
             content.classList.remove('hidden');
        }

        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                // Alterna a classe 'open' para disparar a transição CSS
                header.classList.toggle('open');
                content.classList.toggle('open');
            }
        });
    });


    // --- Funcionalidade 6: Botão de Curtir (com Toggle) ---
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const icon = button.querySelector('i');
        const textNode = icon.nextSibling;
        const originalText = textNode.textContent;
        const countSpan = button.querySelector('span');
        let isLiked = false;

        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede o clique de navegar na página
            
            isLiked = !isLiked; // Inverte o estado (curtido/não curtido)

            if (isLiked) {
                // Ação: Curtir
                countSpan.textContent = parseInt(countSpan.textContent) + 1;
                button.classList.add('liked');
                textNode.textContent = ' Remover ';
            } else {
                // Ação: Remover curtida
                countSpan.textContent = parseInt(countSpan.textContent) - 1;
                button.classList.remove('liked');
                textNode.textContent = originalText;
            }
        });
    });
    
    // --- (NOVO) Funcionalidade 7: Animação de Scroll (IntersectionObserver) ---
    // Esta função observa elementos e adiciona uma classe 'scroll-visible' quando
    // eles entram na tela, disparando a animação CSS.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // Anima só uma vez
            }
        });
    }, { 
        threshold: 0.1, // Dispara quando 10% do item está visível
        rootMargin: '0px 0px -50px 0px' // Começa a animar 50px antes do fundo da tela
    });

    // Seleciona os elementos que queremos animar ao rolar
    const elementsToAnimate = document.querySelectorAll(
        '.game-card, .gallery-image, .accordion-item, .home-hero, .game-hero, .supercell-hero .grid > *'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-hidden'); // Adiciona estado inicial (escondido)
        observer.observe(el); // Começa a observar o elemento
    });

});