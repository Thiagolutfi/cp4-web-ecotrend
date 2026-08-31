function Header({ totalItensCarrinho, onAbrirCarrinho }) {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-2xl font-extrabold">EcoTrend</h1>
          <p className="text-green-100 text-sm">Produtos sustentáveis para um estilo de vida consciente</p>
        </div>

        {/* Botão que abre/fecha o carrinho (evento de clique, manipulação do DOM) */}
        <button
          onClick={onAbrirCarrinho}
          className="relative bg-white text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
        >
           Carrinho
          {totalItensCarrinho > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {totalItensCarrinho}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
