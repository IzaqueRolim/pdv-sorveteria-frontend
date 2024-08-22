import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { ProdutoContext, Produto, UnidadeMedida } from "../../context/ProdutoContext.ts";
import React from "react";

function FormProduct() {
    const { products, setProductObject } = useContext(ProdutoContext);

    const [product, setProduct] = useState<Produto>({
        id: Date.now().toString(),
        name: "",
        unitMedid: UnidadeMedida.Grama,
        quantidadeEmEstoque: 0,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProductObject([...products, { ...product, id: Date.now().toString() }]);

        setProduct({
            id: Date.now().toString(),
            name: "",
            unitMedid: UnidadeMedida.Grama,
            quantidadeEmEstoque: 0,
        });
    };

    const [medidUnit] = useState<UnidadeMedida[]>([
        UnidadeMedida.Grama,
        UnidadeMedida.Litro,
        UnidadeMedida.Kilo
    ]);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };



    return (
        <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Nome do Produto:</label>
                <input
                    type="text"
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
                    name="unitMedid"
                    value={product.unitMedid}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    {medidUnit.map((unit, index) => (
                        <option key={index} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" style={styles.button}>
                {product.id !== null ? "Atualizar Produto" : "Adicionar Produto"}
            </button>
        </form>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    label: {
        marginBottom: "5px",
        fontSize: "14px",
        fontWeight: "bold",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
};

export default FormProduct;
