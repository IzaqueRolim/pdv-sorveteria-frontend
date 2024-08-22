import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { Produto, ProdutoContext, UnidadeMedida } from "./context/ProdutoContext.ts";
import { Receita, ReceitaContext } from "./context/ReceitaContext.ts";
import { Lote, LoteContext } from "./context/LoteContext.ts";
import { Venda, VendaContext } from "./context/VendaContext.ts";
import Home from "./pages/Home/index.tsx";

function App() {

    const [products, setProductObject] = useState<Produto[]>([
        {
            id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
            quantidadeEmEstoque: 0
        },
        {
            id: "2", name: "Leite Condensado(Mistura)", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "3", name: "Creme de Leite(Mistura)", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "4", name: "Nutella", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "5", name: "Liga Neutra", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "6", name: "Frisco Morango", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "7", name: "Frisco Maracuja", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "8", name: "Ovomaltine", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "9", name: "Chocolate em Pó", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "10", name: "Açúcar", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
        {
            id: "11", name: "Café Solúvel", unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0
        },
    ]);

    const [receitas, setReceitas] = useState<Receita[]>([
        {
            name: "Dindin de Morango com Nutella",
            preco: "4",
            produtos: [
                {
                    produto: {
                        id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
                        quantidadeEmEstoque: 0
                    }, quantidade: 1
                },
                {
                    produto: {
                        id: "4", name: "Nutella", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 100
                },
                {
                    produto: {
                        id: "6", name: "Frisco Morango", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 50
                }
            ]
        },
        {
            name: "Dindin de Maracujá com Leite Condensado",
            preco: "5",
            produtos: [
                {
                    produto: {
                        id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
                        quantidadeEmEstoque: 0
                    }, quantidade: 1
                },
                {
                    produto: {
                        id: "2", name: "Leite Condensado(Mistura)", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 200
                },
                {
                    produto: {
                        id: "7", name: "Frisco Maracuja", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 50
                }
            ]
        },
        {
            name: "Dindin de Chocolate com Ovomaltine",
            preco: "6",
            produtos: [
                {
                    produto: {
                        id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
                        quantidadeEmEstoque: 0
                    }, quantidade: 1
                },
                {
                    produto: {
                        id: "9", name: "Chocolate em Pó", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 100
                },
                {
                    produto: {
                        id: "8", name: "Ovomaltine", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 50
                }
            ]
        },
        {
            name: "Dindin de Café com Leite",
            preco: "3",
            produtos: [
                {
                    produto: {
                        id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
                        quantidadeEmEstoque: 0
                    }, quantidade: 1
                },
                {
                    produto: {
                        id: "11", name: "Café Solúvel", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 10
                },
                {
                    produto: {
                        id: "10", name: "Açúcar", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 30
                }
            ]
        },
        {
            name: "Dindin de Leite Condensado com Creme de Leite",
            preco: "7",
            produtos: [
                {
                    produto: {
                        id: "1", name: "Leite", unitMedid: UnidadeMedida.Litro,
                        quantidadeEmEstoque: 0
                    }, quantidade: 2
                },
                {
                    produto: {
                        id: "2", name: "Leite Condensado(Mistura)", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 200
                },
                {
                    produto: {
                        id: "3", name: "Creme de Leite(Mistura)", unitMedid: UnidadeMedida.Grama,
                        quantidadeEmEstoque: 0
                    }, quantidade: 100
                }
            ]
        }
    ]);

    const [lotes, setLotes] = useState<Lote[]>([])
    const [vendas, setVendas] = useState<Venda[]>([])

    useEffect(() => { console.log(products) }, [setProductObject])


    return (

        <ProdutoContext.Provider value={{ products, setProductObject }}>
            <ReceitaContext.Provider value={{ receitas, setReceitas }}>
                <LoteContext.Provider value={{ lotes, setLotes }}>
                    <VendaContext.Provider value={{ vendas, setVendas }}>
                        <Home />
                    </VendaContext.Provider>
                </LoteContext.Provider>
            </ReceitaContext.Provider>
        </ProdutoContext.Provider>

    );
}

export default App;
