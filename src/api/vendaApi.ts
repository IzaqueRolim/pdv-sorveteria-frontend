import { Venda } from "../context/VendaContext";

export const fetchVenda = async () => {
    try {
        const response = await fetch("http://localhost:8080/vendas");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Venda[] = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao buscar receitas:" + error);
        return []
    }
};

export const createVenda = async (venda: Venda) => {
    try {
        const convertedObject = {
            diaVenda: venda.diaVenda,  // Formato da data atualizado
            precoTotal: venda.precoTotal,  // Valor atualizado
            subVendasDto: venda.subVendas.map((subvenda) => ({
                receitaId: subvenda.receita.id,  // Atualize conforme necessário
                quantidade: subvenda.quantidade,
                subTotal: subvenda.subtotal
            })),
            formaPagamento: venda.formaPagamento
        };

        console.log(JSON.stringify(convertedObject))

        const response = await fetch("http://localhost:8080/vendas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(convertedObject)
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data: Venda[] = await response.json();
    } catch (error) {
        alert("Erro ao criar receitas:" + error);
    }
}