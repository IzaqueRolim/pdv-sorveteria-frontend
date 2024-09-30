import { Lote } from './../context/LoteContext';
import { Produto } from '../context/ProdutoContext';

export const fetchLotes = async () => {
    try {
        const response = await fetch("http://localhost:8080/lotes");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Lote[] = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao buscar receitas:" + error);
        return []
    }
};

export const createLote = async (lote: Lote) => {
    try {

        const formatData = {
            quantidade: lote.quantidade,
            precoUnitario: lote.precoUnitario,
            produtoId:lote.produto?.id
        }
        
        //     const receita: Receita = { name: name, preco: preco, rendimento: rendimento, produtos: produtos };
        const response = await fetch("http://localhost:8080/lotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData)
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Produto[] = await response.json();
    } catch (error) {
        alert("Erro ao buscar produtos:" + error);
    }
}