import { useContext, useState } from "react"
import { ProdutoContext } from "../../context/ProdutoContext"


function FormProduct() {
    const { products, setProductObject } = useContext(ProdutoContext);
    const [product, setProduct] = useState({ id: null, name: "", unitMedid: "Grama" });
    const [medidUnit, setMedidUnit] = useState(["Grama", "Litro", "Kilo"]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (product.id !== null) {
            // Editar produto existente
            const updatedProducts = products.map(p =>
                p.id === product.id ? product : p
            );
            setProductObject(updatedProducts);
        } else {
            // Adicionar novo produto
            setProductObject([...products, { ...product, id: Date.now() }]);
        }
        setProduct({ id: null, name: "", unitMedid: "Grama" });
    };

    const handleEdit = (productToEdit) => {
        setProduct(productToEdit);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Nome do Produto:</label>
                <input
                    type='text'
                    name="name"
                    value={product.name}
                    placeholder="Nome do Produto"
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Unidade de Medida:</label>
                <select
                    style={styles.input}
                    name="unitMedid"
                    onChange={handleInputChange}
                    value={product.unitMedid}
                >
                    {medidUnit.map((unit, index) => (
                        <option key={index} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" style={styles.button}>
                {product.id !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
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

export default FormProduct;