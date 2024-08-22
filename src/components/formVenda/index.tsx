import { ChangeEvent, CSSProperties, FormEvent, useContext, useState } from "react";
import { ProdutoContext, ProdutoContextType } from "../../context/ProdutoContext.ts";
import { Receita, ReceitaContext, ReceitaContextType } from "../../context/ReceitaContext.ts";
import { VendaContext, VendaContextType } from "../../context/VendaContext.ts";
import React from "react";

function FormVenda() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null);
    const [quantidadeVendida, setQuantidadeVendida] = useState<string>("");

    const { receitas } = useContext(ReceitaContext) as ReceitaContextType;
    const { vendas, setVendas } = useContext(VendaContext) as VendaContextType;
    const { products, setProductObject } = useContext(ProdutoContext) as ProdutoContextType;

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleReceitaSelect = (receita: Receita) => {
        setSelectedReceita(receita);
        setQuantidadeVendida("");
    };

    const handleQuantidadeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantidadeVendida(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedReceita || !quantidadeVendida) {
            alert('Selecione uma receita e defina a quantidade.');
            return;
        }

        // Atualiza o estoque dos produtos usados na receita
        const novaListaProdutos = products.map(produto => {
            const produtoNaReceita = selectedReceita.produtos.find(p => p.produto.id === produto.id);

            if (produtoNaReceita) {
                return {
                    ...produto,
                    quantidadeEmEstoque: produto.quantidadeEmEstoque - (produtoNaReceita.quantidade * parseInt(quantidadeVendida)),
                };
            }

            return produto;
        });

        setProductObject(novaListaProdutos);

        // Registra a venda
        setVendas([
            ...vendas,
            {
                receita: selectedReceita.name,
                quantidade: quantidadeVendida,
                dataVenda: new Date().toLocaleDateString(),
                total: Number(quantidadeVendida) * Number(selectedReceita.preco)
            }
        ]);

        setSearchTerm('');
        setSelectedReceita(null);
        setQuantidadeVendida('');
    };



    return (
        <div style={styles.pdvContainer}>
            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Pesquisar Receita:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Digite o nome da receita"
                            style={styles.input}
                        />
                    </div>
                    {receitas
                        .filter(receita => receita.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(receita => (
                            <div
                                key={receita.name}
                                style={styles.receitaOption}
                                onClick={() => handleReceitaSelect(receita)}
                            >
                                {receita.name}
                            </div>
                        ))}
                    {selectedReceita && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Receita Selecionada:</label>
                                <div style={styles.selectedReceita}>{selectedReceita.name}</div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Quantidade Vendida:</label>
                                <input
                                    type="number"
                                    value={quantidadeVendida}
                                    onChange={handleQuantidadeChange}
                                    placeholder="Quantidade"
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Total:</label>
                                <div style={styles.total}>
                                    R$ {(Number(quantidadeVendida) * Number(selectedReceita.preco)).toFixed(2)}
                                </div>
                            </div>
                            <button type="submit" style={styles.button}>
                                Registrar Venda
                            </button>
                        </>
                    )}
                </form>
            </div>
       
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    pdvContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: '#f3f3f3',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formContainer: {
        flex: 1,
        marginRight: '20px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    vendasContainer: {
        flex: 2,
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
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
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px',
    },
    receitaOption: {
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        marginBottom: '5px',
    },
    selectedReceita: {
        padding: '10px',
        backgroundColor: '#d4edda',
        borderRadius: '4px',
    },
    total: {
        padding: '10px',
        backgroundColor: '#ffeeba',
        borderRadius: '4px',
    },
    vendasTitle: {
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
};

export default FormVenda;
