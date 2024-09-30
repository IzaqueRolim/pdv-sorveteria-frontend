import React, { useEffect, useState } from "react";
import { Produto, ProdutoContext, UnidadeMedida } from "./context/ProdutoContext.tsx";
import { Receita, ReceitaContext } from "./context/ReceitaContext.tsx";
import { Lote, LoteContext, LoteProvider } from "./context/LoteContext.tsx";
import { Venda, VendaContext, VendaProvider } from "./context/VendaContext.tsx";
import Home from "./pages/Home/index.tsx";
import { fetchProdutos } from "./api/produtosApi.ts";
import { fetchReceitas } from "./api/receitasApi.ts";
import { fetchVenda } from "./api/vendaApi.ts";
import { fetchLotes } from "./api/loteApi.ts";

function App() {
    const [products, setProductObject] = useState<Produto[]>([
    ]);

    const [receitas, setReceitas] = useState<Receita[]>([
    ]);

    const [lotes, setLotes] = useState<Lote[]>([])
    const [vendas, setVendas] = useState<Venda[]>([])

    const atualizarDados = async () => {

        const produtos = await fetchProdutos();
        const receitas = await fetchReceitas();
        const vendas = await fetchVenda();
        const lotes = await fetchLotes();

        setProductObject(produtos);
        setReceitas(receitas)
        setVendas(vendas)
        setLotes(lotes);
    }

    // useEffect(() => {
    //     atualizarDados();
    // }, [fetchProdutos, setReceitas, setLotes, setVendas]);


    return (

        <ProdutoContext.Provider value={{ products, setProductObject }}>
            <ReceitaContext.Provider value={{ receitas, setReceitas }}>
                <VendaProvider>
                    <LoteProvider>
                        <Home />
                    </LoteProvider>
                </VendaProvider>
            </ReceitaContext.Provider>
        </ProdutoContext.Provider>

    );
}

export default App;
