import { useContext, useState } from "react"
import { ProdutoContext } from "../../context/ProdutoContext"
import { ReceitaContext } from "../../context/ReceitaContext";
import { VendaContext } from "../../context/VendaContext";
function FormVenda() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReceita, setSelectedReceita] = useState(null);
    const [quantidadeVendida, setQuantidadeVendida] = useState("");
    const { receitas } = useContext(ReceitaContext);
    const { products, setProductObject } = useContext(ProdutoContext);
    const { setVendas } = useContext(VendaContext);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleReceitaSelect = (event) => {
        const receita = receitas.find(r => r.name === event.target.value);
        setSelectedReceita(receita);
    };

    const handlePrecoChange = (event) => {
        setQuantidadeVendida(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedReceita) {
            alert('Selecione uma receita');
            return;
        }

        // Atualizar o estoque
        const updatedProducts = products.map(product => {
            const receitaProduto = selectedReceita.produtos.find(p => p.produto === product.name);
            if (receitaProduto) {
                return {
                    ...product,
                    quantidade: product.quantidade - receitaProduto.quantidade
                };
            }
            return product;
        });

        setProductObject(updatedProducts);

        // Adicionar venda
        setVendas(prevVendas => [
            ...prevVendas,
            {
                receita: selectedReceita.name,
                quantidade: selectedReceita.quantidade,
                dataVenda: new Date().toLocaleDateString()
            }
        ]);

        // Resetar formulário
        setSearchTerm('');
        setSelectedReceita(null);
        setQuantidadeVendida('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Escolha o Produto:</label>
              
                <select
                    value={selectedReceita ? selectedReceita.name : ''}
                    onChange={handleReceitaSelect}
                    style={styles.input}
                >
                    <option value="" disabled>Selecione uma receita</option>
                    {receitas
                        .filter(receita => receita.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(receita => (
                            <option key={receita.name} value={receita.name}>
                                {receita.name}
                            </option>
                        ))}
                </select>
            </div>
            {selectedReceita && (
                <>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Quantidade Vendida:</label>
                        <input
                            type="number"
                            value={quantidadeVendida}
                            onChange={handlePrecoChange}
                            placeholder="Quantidade"
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Registrar Venda
                    </button>
                </>
            )}
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
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

export default FormVenda;
