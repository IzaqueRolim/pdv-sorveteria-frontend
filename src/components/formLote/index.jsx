import { useContext, useState } from "react"
import { ProdutoContext } from "../../context/ProdutoContext"
import { LoteContext } from "../../context/LoteContext";


function FormLote() {
    const [lote, setLote] = useState({ produto: "", quantidade: "", precoUnitario: "", diaCompra: "" });
    const { products } = useContext(ProdutoContext);
    const { lotes, setLotes } = useContext(LoteContext)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLote({ ...lote, [name]: value });
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDate = formatDate(new Date());
        setLotes([...lotes, { ...lote, diaCompra: formattedDate }]);
        setLote({ produto: "", quantidade: "", precoUnitario: "" });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Produto:</label>
                <select
                    style={styles.input}
                    name="produto"
                    value={lote.produto}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>Selecione um produto</option>
                    {products.map((product, index) => (
                        <option key={index} value={product.name}>{product.name}</option>
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
