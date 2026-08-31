# EcoTrend — Check-point 04

E-commerce fictício de produtos sustentáveis, desenvolvido para o Check-point 04 da disciplina de Web Development with JS (Prof. Lucas Sousa).

## Integrantes do grupo
- **RM:** 573415  **Nome:** Daniel Lopes
- **RM:** 573531  **Nome:** Thiago Lutfi
- **RM:** 573001   **Nome:** João Mello
- **RM:** 572043  **Nome:** Arthur Kazuo
- **RM:** 573232  **Nome:** Bruno Muzzi

## Descrição
A EcoTrend é uma loja virtual especializada em produtos sustentáveis e ecológicos (roupas, beleza, casa e tecnologia verde). O projeto implementa funcionalidades interativas com React, sem uso de bibliotecas externas de gerenciamento de estado, aplicando os conceitos vistos em aula:

- **Manipulação do DOM (via React):** carrinho de compras dinâmico e filtragem de produtos por categoria/preço, sem recarregar a página.
- **Storage e JSON:** persistência do carrinho em `localStorage`, salvando/lendo os dados em formato JSON.
- **Requisições assíncronas com Fetch:** os produtos são carregados de um arquivo `produtos.json` (simulando uma Fake API) usando `fetch` + `async/await`.
- **Promises:** o checkout é simulado com uma `Promise` (`resolve`/`reject`) dentro de um `setTimeout`, tratada com `.then/.catch/.finally` via `async/await`, exibindo um spinner de carregamento durante o processo.

## Tecnologias
- React + Vite
- Tailwind CSS
- Fetch API / async-await
- Promises
- localStorage

## Estrutura do projeto
```
ecotrend-cp4/
├── public/
│   ├── produtos.json      -> "banco de dados" de produtos buscado via fetch
│   └── leaf.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Filtros.jsx
│   │   ├── ListaProdutos.jsx
│   │   ├── ProdutoCard.jsx
│   │   ├── Carrinho.jsx
│   │   ├── Checkout.jsx    -> simulação de compra com Promises
│   │   └── Spinner.jsx
│   ├── App.jsx             -> estado global, fetch e localStorage
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Como rodar o projeto

```bash
npm install
npm run dev
```

Depois acesse `http://localhost:5173`.

## Como funciona

### Carregamento dos produtos (Fetch + JSON)
No `App.jsx`, dentro de um `useEffect` executado apenas uma vez (`[]`), a função `carregarProdutos` usa `await fetch('/produtos.json')` para buscar a lista de produtos, trata erros com `try/catch/finally` e mostra um spinner enquanto `loading` é `true`.

### Carrinho persistente (localStorage)
O estado `carrinho` é inicializado lendo `localStorage.getItem('ecotrend_carrinho')` (com `JSON.parse`). Um segundo `useEffect`, que "escuta" mudanças em `carrinho`, salva o estado atualizado com `localStorage.setItem(..., JSON.stringify(carrinho))` sempre que o carrinho muda — assim os itens permanecem mesmo após fechar o navegador.

### Filtros dinâmicos
`Filtros.jsx` controla dois estados no `App.jsx` (`categoriaAtiva` e `precoMax`). A lista de produtos exibida é recalculada a cada renderização com `.filter()`, sem precisar recarregar a página.

### Checkout com Promises
Em `Checkout.jsx`, a função `finalizarCompra` retorna uma `new Promise((resolve, reject) => {...})` que, após um `setTimeout` de 2 segundos (simulando o processamento do pedido), resolve com uma mensagem de sucesso ou rejeita com uma mensagem de erro (simulando falha no pagamento). O componente chama essa função com `await` dentro de um `try/catch/finally`, controlando o estado `processando` para exibir o `Spinner` durante a espera.

## Deploy
Sugestão: publicar via Vercel ou GitHub Pages, conforme orientado no checkpoint.

## Próximos passos possíveis
- Trocar o `fetch('/produtos.json')` por uma API real (ex: JSON Server local ou JSONPlaceholder).
- Adicionar autenticação simples de usuário (como visto na Aula 15, com JWT).
