Supercell Universe — Fan Site
Bem-vindo ao Supercell Universe, um fan-site totalmente responsivo e interativo dedicado a explorar os jogos da Supercell. Este projeto foi construído como uma Single Page Application (SPA), utilizando HTML5, CSS3 e JavaScript puro (ES6+), sem o uso de frameworks.

O site apresenta um design moderno (com tema claro e escuro), animações de entrada suaves, e funcionalidades interativas como um sistema de "curtidas" persistente, tudo controlado por um roteador SPA customizado.

🚀 Screenshots do Projeto
Veja o design do site em ação (modo escuro):

Página Inicial (Home)

Página Sobre a Supercell

Página de Jogo (Clash Royale)

Página de Jogo (Squad Busters)

Página de Jogo (Mo.co)

Página de Jogo (Boom Beach)

🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica para todas as 9 páginas de conteúdo.

CSS3 (Puro): Estilização customizada, animações (@keyframes), e design responsivo.

TailwindCSS (via CDN): Classes utilitárias para prototipagem rápida e layout responsivo.

JavaScript (ES6+): Lógica da SPA, manipulação do DOM e todas as funcionalidades interativas.

Font Awesome (via CDN): Ícones (menu, botões de tema, links sociais, etc.).

LocalStorage API: Utilizada para persistir os dados de "curtidas" no navegador do usuário.

IntersectionObserver API: Utilizada para animações de scroll eficientes.

✨ Funcionalidades Principais (Deep Dive)
Este projeto vai além de um site estático. Ele implementa diversas funcionalidades modernas de JavaScript e CSS.

1. script.js - Lógica e Interatividade
O arquivo script.js é o cérebro da aplicação, orquestrando a navegação, estado e eventos.

Roteador de Single Page Application (SPA)
Função Principal: showPage(pageId)

Como funciona:

Esconde a página atual (.page.active) removendo a classe active.

Mostra a nova página (<section id="pageId">) adicionando a classe active.

Atualiza a variável global currentPage.

Realiza um window.scrollTo({ top: 0, behavior: 'smooth' }) para levar o usuário ao topo da nova página.

Atualização de Navegação Ativa: A função também percorre todos os links [data-page] e adiciona a classe .nav-active apenas ao link que corresponde à página recém-aberta, fornecendo feedback visual ao usuário (visto em style.css).

JavaScript

// Exemplo da lógica de navegação ativa
document.querySelectorAll('[data-page]').forEach(link => {
    link.classList.remove('nav-active');
    if (link.dataset.page === pageId) {
        link.classList.add('nav-active');
    }
});
Event Delegation: Para otimizar a performance, apenas um listener de clique é adicionado ao document.body. Ele captura cliques em qualquer elemento-filho que possua o atributo [data-page], prevenindo o comportamento padrão e chamando showPage().

Sistema de "Curtidas" Persistente
Tecnologia: localStorage

Como funciona:

Chaves de Armazenamento:

supercellFanLikes: Armazena um JSON com a contagem de curtidas (ex: {"like-cr": 10, "like-coc": 5}).

supercellFanLikedButtons: Armazena um JSON com o estado "curtido" (ex: {"like-cr": true}).

loadLikes(): Chamada no DOMContentLoaded, esta função lê os dados do localStorage e os carrega nas variáveis likeCounts e likedButtons. Em seguida, atualiza a UI (contagens e estado visual dos botões) antes mesmo do usuário interagir.

Lógica de Clique: Ao clicar em .like-button:

O estado isLiked é invertido.

A contagem (currentCount) é incrementada ou decrementada.

A classe .liked é adicionada ou removida (ativando a animação like-pop do CSS).

O texto do botão é alterado (ex: "Favoritar" ↔ "Remover").

A contagem no <span> é atualizada.

saveLikes(): Após qualquer clique, esta função é chamada para salvar os objetos likeCounts e likedButtons de volta no localStorage, garantindo que os dados persistam se o usuário recarregar a página.

Animações de Scroll (IntersectionObserver)
Tecnologia: IntersectionObserver API.

Por que: Esta API é muito mais performática do que usar window.onscroll para animações de "revelar ao rolar".

Como funciona:

Um observer é criado para observar elementos.

Todos os elementos-alvo (listados abaixo) recebem a classe .scroll-hidden (que os define como opacity: 0 e transform: translateY(30px) via CSS).

Quando um elemento entra na tela (limiar de 10%), o callback do observador é disparado.

O callback adiciona a classe .scroll-visible (que anima para opacity: 1 e transform: translateY(0)).

O observer.unobserve(entry.target) é chamado para que a animação ocorra apenas uma vez.

Elementos Animados:

.game-card

.gallery-image

.accordion-item

.home-hero

.game-hero

Elementos do grid na página "Sobre" (.supercell-hero .grid > *)

JavaScript

// Configuração do Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); // Dispara 50px antes de chegar
Efeitos de Scroll (Header e "Back to Top")
Tecnologia: window.onscroll

Header Dinâmico: Quando scrollPosition > 50, a classe .scrolled é adicionada ao <header>. O CSS (style.css) usa isso para aplicar um fundo mais sólido e uma sombra, criando um efeito de "blur" que se solidifica.

Botão Voltar ao Topo: Quando scrollPosition > 100, o botão (#back-to-top) tem seu display e opacity alterados para aparecer suavemente (animado via CSS). Clicar nele aciona window.scrollTo({ top: 0, behavior: 'smooth' }).

Acordeões Animados
Como funciona: A lógica JS é simples: ao clicar em .accordion-header, ele alterna (toggle) a classe .open no próprio header e no seu irmão (.accordion-content).

O CSS faz todo o trabalho de animação:

.accordion-content tem max-height: 0 e overflow: hidden.

.accordion-content.open tem max-height: 1000px (ou um valor grande o suficiente).

Uma transition: max-height 0.4s ease-out no style.css cria a animação de "deslizar" suavemente.

O ícone de seta (::after) também é animado no CSS, rotacionando 180 graus quando o header tem a classe .open.

Tema Light/Dark
A função handleThemeToggle alterna as classes dark e light na tag <html>.

O CSS (incluindo o Tailwind) usa seletores como html.light ... ou dark:... (do Tailwind) para estilizar tudo.

O script também atualiza os ícones (Sol/Lua) nos botões de tema (desktop e mobile).

2. style.css - Estilização e Animações
O style.css complementa o TailwindCSS com estilos customizados e animações.

Barra de Rolagem Customizada: Estiliza a barra de rolagem (::-webkit-scrollbar) e muda sua cor de fundo baseada no tema (html.light ::-webkit-scrollbar-track).

Animações de Keyframe:

@keyframes fadeIn: Usado pelas páginas .page.active para um fade-in suave ao navegar.

@keyframes like-pop: Usado pelo .like-button.liked para dar um "pulo" ao ser clicado.

Banners de Jogo (Hero Sections):

.game-hero define o estilo base (padding, sombra no texto, overlay escuro com ::before para legibilidade).

Classes específicas definem a imagem de fundo para cada página:

.clash-royale-hero

.clash-of-clans-hero

.brawl-stars-hero

.squad-busters-hero

.mo-co-hero

.hay-day-hero

.boom-beach-hero

Transições Suaves: Uma transição global (background-color 0.3s ease, color 0.3s ease) é aplicada ao body e outros elementos principais para garantir que a troca de tema seja suave.

Efeitos de Hover:

.game-card:hover: Aumenta (scale(1.05)) e adiciona um "glow" (box-shadow).

.nav-link:hover: Levanta levemente (transform: translateY(-2px)).

Texto Ultra Lendário: A classe .ultra-legendary-text (usada na página do Brawl Stars) usa linear-gradient e background-clip: text para criar um efeito de texto em gradiente animado.

3. index.htm - Estrutura e Conteúdo
O arquivo HTML define a estrutura de todas as "páginas" (seções) do site.

Páginas (Seções): O conteúdo é dividido em <section> com IDs:

#home

#supercell

#clash-royale

#clash-of-clans

#brawl-stars

#squad-busters

#mo-co

#hay-day

#boom-beach

Assets e Imagens: O HTML referencia imagens da pasta IMAGENS/ para os cards e galerias. As imagens de fundo dos heróis (listadas acima) são referenciadas no style.css.

Exemplos de Imagens de Card:

IMAGENS/clash royale.jpg

IMAGENS/clash of clans.jpg

IMAGENS/bralw stars.jpg

IMAGENS/squad buster.jpg

IMAGENS/moco.jpg

IMAGENS/hay day.jpg

IMAGENS/boom beach.jpg

Exemplos de Imagens de Galeria:

IMAGENS/Arena clash royale.1.jpg

IMAGENS/vila clash clan.jpg

IMAGENS/bralw godizilla evento.jpg

IMAGENS/squad buster motando os time .jpg

IMAGENS/mo.co matando monstros .jpg

IMAGENS/hay day. sua fazenda .jpg

IMAGENS/boom beach ataque a praia.jpg

Exemplos de Imagens de Fundo (Hero):

IMAGENS/titulo clash royale 3d-render-luz-de-fundo-azul-e-vermelho-hexagono_.jpg

IMAGENS/titulo brawl star 3d img de fundo.jpg

IMAGENS/mo.co titulu 3d img de fundo .jpg

(e assim por diante para todos os 7 jogos)

📂 Estrutura de Arquivos
/
├── index.htm               # Arquivo HTML principal com todas as seções/páginas
├── style.css               # Folha de estilo customizada, animações e temas
├── script.js               # Lógica da SPA, listeners de evento e interatividade
├── README.md               # Este arquivo
├── IMAGENS/                  # Pasta contendo todas as imagens de jogos, cards e fundos
│   ├── clash royale.jpg
│   ├── titulo clash royale...
│   ├── ... (e todas as outras imagens)
├── audio/                    # Pasta para arquivos de áudio
│   ├── Sneak golem.m4a
└── .vscode/
    └── settings.json       # (Opcional) Configurações do Live Server
🏃 Como Executar Localmente
Clone ou baixe este repositório.

Como o projeto usa TailwindCSS e Font Awesome via CDN, você não precisa instalar dependências (npm install).

Para a melhor experiência (e para evitar problemas de CORS com alguns navegadores), rode o projeto usando um servidor local.

Se você usa o VS Code, a extensão Live Server é recomendada.

Clique com o botão direito em index.htm e selecione "Open with Live Server".

O projeto está configurado no .vscode/settings.json para tentar usar a porta 5501, mas qualquer porta funcionará.

Se não tiver o Live Server, você pode simplesmente abrir o arquivo index.htm diretamente no seu navegador.

📈 Melhorias Futuras
Persistir Tema: Salvar a preferência de tema (light/dark) do usuário no localStorage.

Otimização de Performance:

Otimizar imagens (converter para .webp).

Adicionar loading="lazy" às imagens da galeria.

Modal de Galeria: Fazer com que as imagens da galeria (.gallery-image) abram em um modal "lightbox" ao serem clicadas.

Refatoração: Mover o conteúdo de texto do HTML para um arquivo content.json e carregá-lo dinamicamente, tornando o index.htm mais limpo.