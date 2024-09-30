import { useContext } from "react";
import { Produto, ProdutoContext, UnidadeMedida } from "../context/ProdutoContext.ts";



export const fetchProdutos = async () => {
    try {
        const response = await fetch("http://localhost:8080/produtos");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Produto[] = await response.json();

        return data;
    } catch (error) {
        alert("Erro ao buscar produtos:" + error);
        return []
    }
};

export const updateProduto = async (produto: Produto) => {
    try {

        const response = await fetch("http://localhost:8080/produtos/" + produto.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(produto),
        });
        if (!response.ok) {
            throw new Error("Erro ao atualizar produto");
        }
        const updatedProduto: Produto = await response.json();

        // Atualiza o contexto com o produto atualizado
        return updatedProduto;
    } catch (error) {
        alert("Erro ao atualizar produto: " + error.message);
    }
}

export const createProduto = async (name: string, unidadeDeMedida: UnidadeMedida) => {
    try {
        const produto: Produto = { id: "0", name: name, unidadeDeMedida: unidadeDeMedida, quantidadeEstoque: 0 };
        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(produto)
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Produto[] = await response.json();
    } catch (error) {
        alert("Erro ao buscar produtos:" + error);
    }
}