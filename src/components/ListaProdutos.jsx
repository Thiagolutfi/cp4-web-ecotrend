import ProdutoCard from './ProdutoCard';

function ListaProdutos({ produtos, onAdicionarAoCarrinho }) {
  if (produtos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Nenhum produto encontrado com esses filtros. 
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          produto={produto}
          onAdicionarAoCarrinho={onAdicionarAoCarrinho}
        />
      ))}
    </div>
  );
}

export default ListaProdutos;
