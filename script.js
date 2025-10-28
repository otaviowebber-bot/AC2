// --- Funções Globais ---

// Armazena o ID da página que está visível no momento.
let currentPage = 'home';

// Função para mostrar a página correta (o núcleo da SPA)
function showPage(pageId) {
    if (!pageId) return; // Se nenhum ID for fornecido, não faz nada.

    // 1. Encontra e esconde a página atual
    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }

    // 2. Encontra e mostra a nova página
    const newPageElement = document.getElementById(pageId);
    if (newPageElement) {
        newPageElement.classList.add('active'); // Adiciona 'active' (display: block)
        currentPage = pageId; // Atualiza a variável global
        // Rola a janela para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- MELHORIA: Atualiza links de navegação ativos ---
    // Percorre TODOS os links de navegação (desktop e mobile)
    document.querySelectorAll('[data-page]').forEach(link => {
        link.classList.remove('nav-active'); // Remove a classe ativa de todos
        // Adiciona a classe ativa apenas ao link que corresponde à página atual
        if (link.dataset.page === pageId) {
            link.classList.add('nav-active');
        }
    });
}


// Função para controlar o menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        // Alterna a classe 'hidden', fazendo o menu aparecer ou desaparecer
        mobileMenu.classList.toggle('hidden');
    }
}


// --- Event Listeners (Executado quando o DOM está pronto) ---
// Garante que o script só rode depois que o HTML foi totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidade 1: Navegação Única (Event Delegation) ---
    // Adiciona UM listener de clique ao <body> inteiro.
    document.body.addEventListener('click', (event) => {
        
        // Verifica se o elemento clicado (ou um de seus pais) tem o atributo 'data-page'
        const navTrigger = event.target.closest('[data-page]');

        // Se encontrou um elemento de navegação
        if (navTrigger) {
            event.preventDefault(); // Previne a ação padrão (ex: seguir um link '#')
            const pageId = navTrigger.dataset.page; // Pega o ID da página (ex: "clash-royale")
            showPage(pageId); // Chama a função para trocar de página

            // Fecha o menu mobile se ele estiver aberto (útil em celulares)
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Mostra a página inicial e define o link "Início" como ativo
    showPage('home');

    // --- Funcionalidade 2: Botão do Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        // Adiciona o clique no botão "hamburguer"
        mobileMenuButton.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMobileMenu(); // Chama a função que mostra/esconde o menu
        });
    }

    // --- Funcionalidade 3: Tema Light/Dark ---
    const themeToggle = document.getElementById('theme-toggle'); // Botão desktop
    const themeToggleMobile = document.getElementById('theme-toggle-mobile'); // Botão mobile
    const html = document.documentElement; // A tag <html>

    // Função que faz a troca de tema
    function handleThemeToggle() {
        // Alterna as classes 'dark' e 'light' na tag <html>
        html.classList.toggle('dark');
        html.classList.toggle('light');
        
        // Verifica qual tema está ativo agora
        const isDark = html.classList.contains('dark');
        
        // Seleciona os ícones dos dois botões
        const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
        const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;

        // Atualiza o ícone do botão desktop
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon'; // Sol (escuro) ou Lua (claro)
        }
        // Atualiza o ícone do botão mobile
        if (themeIconMobile) {
            themeIconMobile.className = isDark ? 'fas fa-sun mr-2' : 'fas fa-moon mr-2';
        }
    }

    // Adiciona o listener de clique aos dois botões
    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', handleThemeToggle);
    }
    
    // --- Funcionalidade 4: Botão "Voltar ao Topo" e Header Dinâmico ---
    const backToTopButton = document.getElementById('back-to-top');
    const header = document.querySelector('header');

    // Executa esta função a cada vez que o usuário rola a página
    window.onscroll = function() {
        // Pega a posição vertical da rolagem
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

        // Lógica do Botão "Voltar ao Topo"
        if (backToTopButton) {
            if (scrollPosition > 100) {
                // Se rolou mais de 100px, mostra o botão com animação
                backToTopButton.style.display = "flex";
                backToTopButton.style.opacity = "1";
                backToTopButton.style.transform = "translateY(0)";
            } else {
                // Se está perto do topo, esconde o botão com animação
                backToTopButton.style.opacity = "0";
                backToTopButton.style.transform = "translateY(0.5rem)";
                // Espera a animação de fade-out (300ms) terminar para aplicar 'display: none'
                setTimeout(() => { 
                    if(window.scrollY <= 100) { // Checa de novo para o caso do usuário ter voltado
                        backToTopButton.style.display = "none"; 
                    }
                }, 300);
            }
        }
        
        // --- MELHORIA: Lógica do Header Dinâmico ---
        if (header) {
            if (scrollPosition > 50) {
                // Adiciona a classe 'scrolled' (definida no style.css) ao header
                header.classList.add('scrolled');
            } else {
                // Remove a classe 'scrolled'
                header.classList.remove('scrolled');
            }
        }
    };
    
    // Adiciona o clique ao botão "Voltar ao Topo"
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            // Rola a página para o topo suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- (REVERTIDO) Funcionalidade 5: Acordeão (Melhorado com Animação) ---
    // Esta nova versão usa 'max-height' (definido no style.css) em vez de 'hidden'.
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        // Esta parte remove a classe 'hidden' que o HTML antigo poderia ter
        const content = header.nextElementSibling;
        if (content && content.classList.contains('accordion-content')) {
             content.classList.remove('hidden'); // Limpa o estado antigo
        }

        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                // Simplesmente alterna a classe 'open' no cabeçalho (para girar a seta)
                header.classList.toggle('open');
                // E alterna a classe 'open' no conteúdo (para animar o max-height)
                content.classList.toggle('open');
            }
        });
    });

    // --- (REFEITO) Funcionalidade 6: Botão de Curtir (com Toggle e localStorage) ---
    // Esta versão salva os likes no navegador do usuário!
    
    // Objetos para guardar o estado (contagens e quais botões foram curtidos)
    let likeCounts = {};
    let likedButtons = {};

    // Função para salvar os likes no localStorage
    function saveLikes() {
        // 'JSON.stringify' converte o objeto JS em uma string para salvar
        localStorage.setItem('supercellFanLikes', JSON.stringify(likeCounts));
        localStorage.setItem('supercellFanLikedButtons', JSON.stringify(likedButtons));
    }

    // Função para carregar os likes do localStorage
    function loadLikes() {
        // 'JSON.parse' converte a string salva de volta em um objeto JS
        // '|| {}' define um objeto vazio como padrão se nada for encontrado
        likeCounts = JSON.parse(localStorage.getItem('supercellFanLikes')) || {};
        likedButtons = JSON.parse(localStorage.getItem('supercellFanLikedButtons')) || {};
    }

    // Carrega os likes salvos assim que a página é iniciada
    loadLikes();
    
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const buttonId = button.id; // Pega o ID (ex: "like-cr")
        if (!buttonId) return; // Pula botões sem ID

        // Pega os elementos internos do botão
        const icon = button.querySelector('i');
        const textNode = icon.nextSibling; // O nó de texto (ex: " Favoritar ")
        const originalText = textNode.textContent; // Salva o texto original
        const countSpan = button.querySelector('span'); // O <span> da contagem
        
        // Pega o valor inicial do HTML (como fallback, caso não haja nada salvo)
        const initialCount = parseInt(countSpan.textContent) || 0;
        
        // Define o estado inicial a partir do localStorage
        let isLiked = likedButtons[buttonId] || false; // O botão está curtido?
        // A contagem é o valor salvo (likeCounts[buttonId]) OU o valor inicial do HTML
        let currentCount = likeCounts[buttonId] === undefined ? initialCount : likeCounts[buttonId];
        countSpan.textContent = currentCount; // Atualiza a contagem na tela

        // Aplica o estado visual correto no carregamento da página
        if (isLiked) {
            button.classList.add('liked');
        
            textNode.textContent = ' Remover '; // Altera o texto
        }

        // Adiciona o listener de clique ao botão
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede o clique de "borbulhar" (ex: fechar um card)
            
            isLiked = !isLiked; // Inverte o estado (curtir -> descurtir)

            if (isLiked) {
                // Ação: Curtir
                currentCount++;
                button.classList.add('liked');
                textNode.textContent = ' Remover ';
                likedButtons[buttonId] = true; // Salva no objeto de estado
            } else {
                // Ação: Remover curtida
                currentCount--;
                button.classList.remove('liked');
                textNode.textContent = originalText; // Restaura o texto original
                likedButtons[buttonId] = false; // Salva no objeto de estado
            }
            
            // Atualiza o contador na tela e no nosso objeto
            countSpan.textContent = currentCount;
            likeCounts[buttonId] = currentCount;
            
            // Salva o novo estado no localStorage
            saveLikes();
        });
    });
    
    // --- (NOVO) Funcionalidade 7: Animação de Scroll (IntersectionObserver) ---
    // Esta API é muito mais eficiente do que 'window.onscroll' para animações.
    // Ela "observa" elementos e dispara uma função quando eles entram na tela.
    const observer = new IntersectionObserver((entries, observer) => {
        // 'entries' é uma lista de elementos que mudaram de estado
        entries.forEach(entry => {
            // 'entry.isIntersecting' é true se o elemento está visível
            if (entry.isIntersecting) {
                // Adiciona a classe '.scroll-visible' (definida no style.css)
                entry.target.classList.add('scroll-visible');
                // Para de observar o elemento para que a animação só ocorra uma vez
                observer.unobserve(entry.target);
            }
        });

    }, { 
        threshold: 0.1, // Dispara quando 10% do item está visível
        rootMargin: '0px 0px -50px 0px' // Começa a animar 50px *antes* de chegar ao fundo da tela
    });

    // Seleciona TODOS os elementos que queremos animar ao rolar
    const elementsToAnimate = document.querySelectorAll(
        '.game-card, .gallery-image, .accordion-item, .home-hero, .game-hero, .supercell-hero .grid > *'
    );
    
    // Itera sobre cada elemento
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-hidden'); // Adiciona o estado inicial (escondido)
        observer.observe(el); // Começa a observar o elemento
    });
});