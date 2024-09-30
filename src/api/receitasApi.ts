import { Produto } from '../context/ProdutoContext';
import { ProdutoSelecionado, Receita } from './../context/ReceitaContext';

export const fetchReceitas = async () => {
    try {
        const response = await fetch("http://localhost:8080/receitas");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Receita[] = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao buscar receitas:" + error);
        return []
    }
};

// export const updateReceita = async (receita: Receita) => {
//     try {
//         const response = await fetch("http://localhost:8080/produtos/" + receita.id, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(receita),
//         });
//         if (!response.ok) {
//             throw new Error("Erro ao atualizar produto");
//         }
//         const updatedProduto: Receita = await response.json();


//         return updatedProduto;
//     } catch (error) {
//         alert("Erro ao atualizar produto: " + error.message);
//     }
// }

export const createReceita = async (receita: Receita) => {
    try {
        const formattedReceita = {
            name: receita.name,
            preco: parseFloat(receita.preco), // Convertendo para número, se necessário
            rendimento: Number(receita.rendimento),
            imageBase64: receita.imageBase64,
            produtosList: receita.ingredientes.map((ingrediente) => ({
                produtoId: ingrediente.produto?.id, // Obtendo o ID do produto
                quantidade: Number(ingrediente.quantidade)
            }))
        };

      

        const response = await fetch("http://localhost:8080/receitas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedReceita)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: Produto[] = await response.json();
    } catch (error) {
        alert("Erro ao criar receitas:" + error);
    }
}