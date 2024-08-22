import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Produto, ProdutoContext, ProdutoContextType } from "../../context/ProdutoContext.ts"
import { Lote, LoteContext, LoteContextType } from "../../context/LoteContext.ts";
import React from "react";


function FormLote() {
    const [lote, setLote] = useState<Lote>({ produto: null, quantidade: "", precoUnitario: "", diaCompra: "" });

    const { products, setProductObject } = useContext(ProdutoContext) as ProdutoContextType;
    const { lotes, setLotes } = useContext(LoteContext) as LoteContextType;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setLote({ ...lote, [name]: value });
    };

    const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedProduct = products.find(p => p.id === (event.target.value));
        setLote({ ...lote, produto: selectedProduct || null });
    };

    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verifique se um produto foi selecionado
        if (!lote.produto) return;

        const produtoAtualizado: Produto = {
            ...lote.produto!,
            quantidadeEmEstoque: lote.produto!.quantidadeEmEstoque + parseInt(lote.quantidade)
        };
        
        // Atualiza o contexto de produtos
        const produtosAtualizados = products.map(produto =>
            produto.id === produtoAtualizado.id ? produtoAtualizado : produto
        );
        
        setProductObject(produtosAtualizados);
        

        // Formata a data e adiciona o lote
        const formattedDate = formatDate(new Date());
        setLotes([...lotes, { ...lote, diaCompra: formattedDate }]);

        // Limpa o formulário
        setLote({ produto: null, quantidade: "", precoUnitario: "", diaCompra: "" });
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        }}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Produto:</label>
                <select
                    style={styles.input}
                    name="produto"
                    value={lote.produto?.id || ""}
                    onChange={handleProductChange}
                    required
                >
                    <option value="" disabled>Selecione um produto</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Quantidade:</label>
                <input
                    type='number'
                    name="quantidade"
                    value={lote.quantidade}
                    placeholder="Quantidade"
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Preço Unitário:</label>
                <input
                    type='number'
                    name="precoUnitario"
                    value={lote.precoUnitario}
                    placeholder="Preço Unitário"
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
            </div>

            <button type="submit" style={styles.button}>
                Adicionar Produto
            </button>
        </form>
    );
}


const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    }
};

export default FormLote;
