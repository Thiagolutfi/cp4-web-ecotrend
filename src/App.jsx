import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListaProdutos from './components/ListaProdutos';
import Carrinho from './components/Carrinho';
import Spinner from './components/Carregamento';
import './index.css';

function App() {
  // Estados dos produtos (vindos via fetch)
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //     Estados dos filtros
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [precoMax, setPrecoMax] = useState(200);

  //    Estado do carrinho 
  // Inicializando o estado já lendo o que estiver salvo no localStorage
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem('ecotrend_carrinho');
    return salvo ? JSON.parse(salvo) : [];
  });
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  //   Requisição assíncrona dos produtos (Fetch API + async/await + try/catch/finally)
  //    Simula a "Fake API" pedida no checkpoint, buscando o arquivo produtos.json
  useEffect(() => {
    async function carregarProdutos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/produtos.json');

        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status} ${response.statusText}`);
        }

        const dados = await response.json(); // JSON.parse feito internamente pelo fetch
        setProdutos(dados);
      } catch (err) {
        console.error('Falha ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []); // array vazio: executa só uma vez, ao montar o componente

  // Sempre que o carrinho muda, salva em JSON dentro do localStorage 
  useEffect(() => {
    localStorage.setItem('ecotrend_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  //     Funções de manipulação do carrinho 
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((atual) => {
      const jaExiste = atual.find((item) => item.id === produto.id);
      if (jaExiste) {
        // Se o produto já está no carrinho, apenas aumenta a quantidade
        return atual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      // Senão, adiciona o produto com quantidade 1
      return [...atual, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((atual) => atual.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho((atual) =>
      atual.map((item) => (item.id === id ? { ...item, quantidade: novaQuantidade } : item))
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  //    Filtragem dinâmica dos produtos (sem recarregar a página) 
  const produtosFiltrados = produtos.filter((produto) => {
    const passaCategoria = categoriaAtiva === 'Todas' || produto.categoria === categoriaAtiva;
    const passaPreco = produto.preco <= precoMax;
    return passaCategoria && passaPreco;
  });

  const categorias = [...new Set(produtos.map((p) => p.categoria))];
  const totalItensCarrinho = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        totalItensCarrinho={totalItensCarrinho}
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading && <Spinner texto="Carregando produtos sustentáveis..." />}

        {!loading && error && (
          <p className="text-center text-red-600 font-semibold py-10">{error}</p>
        )}

        {!loading && !error && (
          <>
            <Filtros
              categorias={categorias}
              categoriaAtiva={categoriaAtiva}
              setCategoriaAtiva={setCategoriaAtiva}
              precoMax={precoMax}
              setPrecoMax={setPrecoMax}
            />
            <ListaProdutos
              produtos={produtosFiltrados}
              onAdicionarAoCarrinho={adicionarAoCarrinho}
            />
          </>
        )}
      </main>

      {carrinhoAberto && (
        <Carrinho
          itens={carrinho}
          onRemover={removerDoCarrinho}
          onAlterarQuantidade={alterarQuantidade}
          onFechar={() => setCarrinhoAberto(false)}
          onCompraConcluida={limparCarrinho}
        />
      )}
    </div>
  );
}

export default App;
