
import React, { CSSProperties } from "react";
import { ProdutoContext, ProdutoContextType } from "../../context/ProdutoContext.ts"
import { ProdutoSelecionado, ReceitaContext, Receita, ReceitaContextType } from "../../context/ReceitaContext.ts";

import { useContext, useState, ChangeEvent, FormEvent } from "react";

function FormReceita() {
    const [receita, setReceita] = useState<Receita>({ name: "", produtos: [], preco: "" });
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoSelecionado>({ produto: null, quantidade: 0 });

    const { products } = useContext(ProdutoContext) as ProdutoContextType;
    const { receitas, setReceitas } = useContext(ReceitaContext) as ReceitaContextType;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setReceita({ ...receita, [name]: value });
    };

    const handleProdutoChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === "produto") {
            const produtoSelecionado = products.find((product) => product.id === value);
            setProdutoSelecionado({ ...produtoSelecionado, produto: produtoSelecionado });
        } else {
            setProdutoSelecionado({ ...produtoSelecionado, [name]: value });
        }
    };

    const adicionarProduto = () => {
        if (produtoSelecionado.produto) {
            setReceita({
                ...receita,
                produtos: [...receita.produtos, produtoSelecionado]
            });
            setProdutoSelecionado({ produto: null, quantidade: 0 });
        } else {
            alert("Selecione um produto válido");
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (receita.produtos.length > 0) {
            setReceitas([...receitas, receita]);
            setReceita({ name: "", produtos: [], preco: "" });
            return;
        }
        alert("Insira pelo menos um ingrediente");
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formStyles}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Nome da Receita:</label>
                <input
                    type='text'
                    name="name"
                    value={receita.name}
                    placeholder="Nome da Receita"
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Preço da Receita:</label>
                <input
                    type='number'
                    name="preco"
                    value={receita.preco}
                    placeholder="Preço de Venda da Receita"
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Produto:</label>
                <select
                    style={styles.input}
                    name="produto"
                    onChange={handleProdutoChange}
                    value={produtoSelecionado.produto ? produtoSelecionado.produto.id : ""}
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
                    type="number"
                    name="quantidade"
                    value={produtoSelecionado.quantidade}
                    placeholder="Quantidade"
                    onChange={handleProdutoChange}
                    style={styles.input}
                />
            </div>
            <button
                type="button"
                onClick={adicionarProduto}
                style={{ ...styles.button, width: "148px", margin: 'auto' }}
            >
                Adicionar Produto
            </button>

            <div>
                <h4>Produtos na Receita:</h4>
                {receita.produtos.map((produto, index) => (
                    <div key={index}>
                        <span>{produto.produto?.name} - {produto.quantidade} {produto.produto?.unitMedid}</span>
                    </div>
                ))}
            </div>

            <button type="submit" style={styles.button}>
                Adicionar Receita
            </button>
        </form>
    );
}



const styles: { [key: string]: CSSProperties     } = {

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

export default FormReceita;