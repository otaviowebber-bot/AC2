# Supercell Universe - Fan Site

## 1. Sobre o Projeto

Este projeto é um site de fã dinâmico e responsivo dedicado ao universo de jogos da Supercell. Ele foi construído como uma **Single Page Application (SPA)**, o que significa que o conteúdo é carregado dinamicamente sem a necessidade de recarregar a página inteira, proporcionando uma experiência de usuário fluida e rápida.

O site apresenta informações sobre a empresa Supercell e seus principais jogos, incluindo:
* Clash Royale
* Clash of Clans
* Brawl Stars
* Squad Busters
* Mo.co
* Hay Day
* Boom Beach

Ele é totalmente responsivo, adaptando-se a desktops, tablets e dispositivos móveis, e inclui recursos modernos como um seletor de tema (dark/light), animações e componentes interativos.

---

## 2. Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto de tecnologias web front-end padrão:

* **HTML5 (`index.htm`):** Para a estrutura semântica e o conteúdo do site.
* **CSS3 (`style.css`):** Para estilizações personalizadas, animações e para complementar o framework CSS.
* **JavaScript (ES6+) (`script.js`):** Para toda a interatividade, manipulação do DOM, navegação da SPA e gerenciamento de estado (como tema e curtidas).
* **Tailwind CSS:** Um framework CSS "utility-first" usado para a maior parte da estilização, layout e responsividade.
* **Font Awesome:** Para os ícones utilizados em todo o site (como o menu mobile, seletor de tema, botões de curtida, etc.).
* **Google Fonts:** Utilizando a fonte 'Inter' para a tipografia geral do site.

---

## 3. Estrutura de Arquivos

/ │ ├── index.htm # O arquivo HTML principal que contém toda a estrutura da página. ├── style.css # A folha de estilos personalizada. ├── script.js # O arquivo JavaScript que controla toda a lógica do site. │ └── IMAGENS/ # (Pasta não fornecida, mas referenciada no HTML) ├── clash royale.jpg ├── clash of clans.jpg ├── bralw stars.jpg ├── squad buster.jpg ├── moco.jpg ├── hay day.jpg ├── boom beach.jpg ├── ... (e todas as outras imagens do jogo)


---

## 4. Funcionalidades Principais

O site inclui um conjunto robusto de funcionalidades para criar uma experiência de usuário moderna:

* **Navegação de Página Única (SPA):** Clicar nos links de navegação não recarrega a página; em vez disso, o JavaScript exibe a seção de conteúdo relevante.
* **Design Responsivo:** O layout se adapta perfeitamente a todos os tamanhos de tela, com um menu de navegação de desktop e um menu "hambúrguer" para dispositivos móveis.
* **Seletor de Tema (Dark/Light):** Os usuários podem alternar entre um tema escuro (padrão) e um tema claro. A escolha é aplicada instantaneamente e afeta todos os componentes, incluindo a barra de rolagem.
* **Botão "Voltar ao Topo":** Um botão que aparece suavemente quando o usuário rola a página para baixo, permitindo um retorno rápido ao topo com uma animação de rolagem suave.
* **Componentes de Acordeão:** Nas páginas de detalhes dos jogos, o conteúdo é organizado em seções recolhíveis (acordeões) que o usuário pode expandir para ler mais.
* **Botões de "Curtir" Interativos:** Cada página de jogo possui um botão de "curtir" que mantém o estado. Ele atualiza a contagem, muda o texto (ex: "Favoritar" para "Remover") e aplica um estilo visual (`.liked`) quando ativado.
* **Animações Sutis:**
    * `fadeIn` na transição de páginas.
    * Efeitos de `hover` em cartões de jogo, imagens de galeria e links de navegação.
    * Animação de "slide/fade" no botão "Voltar ao Topo".

---

## 5. Análise Detalhada dos Arquivos

Esta seção detalha a implementação de cada arquivo.

### 5.1. `index.htm` (A Estrutura)

O HTML é o esqueleto do site. Ele usa Tailwind CSS para classes de utilidade e `id`s/`data-attributes` para serem alvo do JavaScript.

#### `<head>`
* Importa o Tailwind CSS via CDN.
* Importa a fonte 'Inter' do Google Fonts.
* Importa o Font Awesome via CDN.
* Linka a folha de estilos local `style.css`.
* Define a classe padrão `dark` no `<html>` para que o tema escuro seja o padrão.

#### `<header>` (Navegação)
* **Navegação Desktop:** Contida em um `div` com a classe `hidden md:flex`.
* **Navegação Mobile:** Um botão (`#mobile-menu-button`) e um `div` (`#mobile-menu`) que é `hidden` por padrão.
* **Links de Navegação:** Todos os links (`<a>`) que devem acionar a navegação da SPA possuem o atributo `data-page="ID_DA_PAGINA"`.
    * Ex: `<a href="#" data-page="clash-royale">Clash Royale</a>`
* **Seletores de Tema:** Existem dois botões de tema, um para desktop (`#theme-toggle`) e um para mobile (`#theme-toggle-mobile`), para garantir a funcionalidade em ambos os layouts.

#### `<main>` (Conteúdo das Páginas)
* Este é o contêiner principal para todas as "páginas" do site.
* Cada página é, na verdade, uma tag `<section>` com uma `id` única e a classe `.page`.
    * A classe `.page` (do `style.css`) define `display: none` por padrão.
    * A classe `.page.active` (do `style.css`) define `display: block` e aplica a animação `fadeIn`.
* **Páginas Implementadas:**
    * `id="home"`: A página inicial com cartões de jogo (`.game-card`).
    * `id="supercell"`: Página "Sobre" a empresa.
    * `id="clash-royale"`: Página de detalhes do Clash Royale.
    * `id="clash-of-clans"`: Página de detalhes do Clash of Clans.
    * `id="brawl-stars"`: Página de detalhes do Brawl Stars.
    * `id="squad-busters"`: Página de detalhes do Squad Busters.
    * `id="mo-co"`: Página de detalhes do Mo.co.
    * `id="hay-day"`: Página de detalhes do Hay Day.
    * `id="boom-beach"`: Página de detalhes do Boom Beach.

* **Componentes nas Páginas:**
    * **`.game-card`:** Cartões na página inicial que também funcionam como gatilhos de navegação (`data-page="..."`).
    * **`.accordion-header`:** Botões clicáveis para expandir o conteúdo (`.accordion-content`) abaixo deles.
    * **`.like-button`:** Botões de "curtir" específicos para cada jogo (ex: `#like-cr`, `#like-coc`).

#### `<footer>`
* Contém links de rodapé padrão, informações de direitos autorais e links de mídia social.

#### Botão Flutuante
* Um botão (`#back-to-top`) posicionado de forma fixa (`fixed`) que é controlado pelo `script.js`.

---

### 5.2. `style.css` (A Estilização Personalizada)

Este arquivo complementa o Tailwind com estilos que são difíceis ou repetitivos de se fazer apenas com classes de utilidade.

#### Estilos Globais
* **`body`**: Define a fonte padrão (`Inter`) e uma transição suave para `background-color` e `color`, que é usada na troca de tema.

#### Barra de Rolagem Personalizada
* Utiliza pseudo-elementos `::-webkit-scrollbar` para estilizar a barra de rolagem.
* `::-webkit-scrollbar-track`: Define a cor de fundo do trilho.
* `::-webkit-scrollbar-thumb`: Define a cor do "polegar" (a parte que se move).
* **Suporte ao Tema Claro:** Usa `html.light ::-webkit-scrollbar-track` para inverter a cor do trilho quando o tema claro está ativo.

```css
/* Estilo para a barra de rolagem */
::-webkit-scrollbar-track {
    background: #1e293b; /* slate-800 */
}
html.light ::-webkit-scrollbar-track {
    background: #e2e8f0; /* slate-200 */
}
Classes de Tipografia
.font-supercell: Uma classe de fonte personalizada para títulos, tornando-os font-weight: 900 e text-transform: uppercase.

.ultra-legendary-text: Um efeito de texto em gradiente avançado, usado na lista de Brawlers.

CSS

.ultra-legendary-text {
    background: linear-gradient(...);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
Sistema de Página (SPA)
.page: Oculta todas as seções de página por padrão.

.page.active: Mostra a página ativa e aplica a animação fadeIn.

CSS

.page {
    display: none;
    animation: fadeIn 0.5s ease-in-out;
}
.page.active {
    display: block;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
Estilos de Componentes e Hover
.nav-link:hover: Muda a cor do link e o move ligeiramente para cima (transform: translateY(-2px)).

.game-card:hover: Aumenta o tamanho do cartão (scale(1.05)) e adiciona uma sombra mais pronunciada.

.gallery-image:hover: Aumenta ligeiramente a imagem e aumenta seu brilho (filter: brightness(1.1)).

.like-button.liked: Adiciona um contorno branco ao botão de curtir quando ele está no estado "curtido".

#back-to-top: Define a transição para opacidade e transformação, permitindo que o JS o mostre e oculte suavemente.

5.3. script.js (A Lógica e Interatividade)
Este arquivo dá vida ao site. Ele é envolvido por um listener DOMContentLoaded para garantir que o script só seja executado após o HTML estar totalmente carregado.

Funções Globais
showPage(pageId): A função central da SPA.

Remove a classe .active da página atual (armazenada na variável currentPage).

Adiciona a classe .active à nova página (cujo id foi passado como pageId).

Atualiza a variável currentPage.

Rola a janela para o topo suavemente (window.scrollTo).

toggleMobileMenu(): Simplesmente alterna (adiciona/remove) a classe hidden no elemento #mobile-menu.

Funcionalidade 1: Navegação Única (Event Delegation)
Em vez de adicionar um EventListener a cada link de navegação, usamos delegação de eventos.

Um único EventListener de clique é adicionado ao document.body.

Quando um clique ocorre, ele usa event.target.closest('[data-page]') para verificar se o clique (ou um de seus pais) é um elemento com o atributo data-page.

Vantagens:

Eficiência: Apenas um listener para dezenas de links.

Dinamismo: Funciona até para links adicionados dinamicamente no futuro.

Se um gatilho de navegação for encontrado, ele chama showPage() e também fecha o menu mobile (se estiver aberto).

JavaScript

// --- Funcionalidade 1: Navegação Única (Event Delegation) ---
document.body.addEventListener('click', (event) => {
    const navTrigger = event.target.closest('[data-page]');
    if (navTrigger) {
        event.preventDefault(); // Previne a ação padrão do link
        const pageId = navTrigger.dataset.page;
        showPage(pageId);
        // ... (lógica para fechar o menu mobile)
    }
});
Funcionalidade 3: Tema Light/Dark
Adiciona listeners de clique aos dois botões de tema (#theme-toggle e #theme-toggle-mobile).

Ambos chamam a função handleThemeToggle.

Esta função alterna as classes .dark e .light no elemento <html>.

Em seguida, ela atualiza o ícone do Font Awesome dentro dos botões para refletir o novo estado (de fa-sun para fa-moon e vice-versa).

Funcionalidade 4: Botão "Voltar ao Topo"
Define uma função window.onscroll.

Esta função verifica a posição de rolagem (document.documentElement.scrollTop).

Se a rolagem for > 100px, ele altera o CSS do botão para display: "flex", opacity: "1" e transform: "translateY(0)".

Se a rolagem for <= 100px, ele reverte a opacidade e a transformação.

Um setTimeout é usado para definir display: "none" após a animação de desaparecimento (300ms) para remover o elemento do fluxo.

Adiciona um listener de clique ao botão que chama window.scrollTo({ top: 0, behavior: 'smooth' }).

Funcionalidade 5: Acordeão
Seleciona todos os elementos com a classe .accordion-header.

Itera sobre cada um (forEach) e adiciona um listener de clique.

Quando um cabeçalho é clicado, ele encontra o próximo elemento irmão (header.nextElementSibling, que é o .accordion-content).

Ele então alterna a classe hidden nesse elemento de conteúdo, fazendo-o aparecer ou desaparecer.

Funcionalidade 6: Botão de Curtir (com Toggle)
Esta é a lógica mais complexa de gerenciamento de estado.

Seleciona todos os .like-button e itera sobre eles.

Para cada botão, ele cria um estado local (let isLiked = false).

Adiciona um listener de clique:

Chama event.stopPropagation(): Isso é crucial. Se o botão de curtir estiver dentro de um .game-card (que também é clicável), isso impede que o clique "borbulhe" para o card e acione a navegação da página.

Inverte o estado: isLiked = !isLiked.

Usa um if (isLiked) para determinar a ação:

Se curtiu: Incrementa o contador (<span>), adiciona a classe .liked (para o CSS) e muda o texto para "Remover".

Se removeu a curtida: Decrementa o contador, remove a classe .liked e restaura o texto original.

JavaScript

// --- Funcionalidade 6: Botão de Curtir (com Toggle) ---
likeButtons.forEach(button => {
    // ... (configuração inicial)
    let isLiked = false;

    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede o clique de navegar na página
        isLiked = !isLiked; // Inverte o estado

        if (isLiked) {
            // Ação: Curtir
            countSpan.textContent = parseInt(countSpan.textContent) + 1;
            button.classList.add('liked');
            textNode.textContent = ' Remover ';
        } else {
            // Ação: Remover curtida
            // ... (lógica inversa)
        }
    });
});
