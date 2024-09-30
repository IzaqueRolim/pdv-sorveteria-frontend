import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { ProdutoContext, Produto, UnidadeMedida, useProdutoContext } from "../../../../context/ProdutoContext.tsx";
import React from "react";
import { createProduto } from "../../../../api/produtosApi.ts";
import Modal from '../../../../components/genericModal/index.tsx'

function FormProduct({ isModalOpen, close }) {
    const { products, setProductObject } = useProdutoContext();

    const [product, setProduct] = useState<Produto>({
        id: "",
        name: "",
        unidadeDeMedida: UnidadeMedida.Grama,
        quantidadeEstoque: 0,
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o produto");
            }

            const novoProduto = await response.json();


            setProductObject([...products, novoProduto]);
            setProduct({
                id: "",
                name: "",
                unidadeDeMedida: UnidadeMedida.Grama,
                quantidadeEstoque: 0,
            })


            close();
        } catch (error) {
            alert("Erro ao criar o produto: " + error);
        }
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
        <Modal title="Cadastrar Produto" isOpen={isModalOpen} onClose={close} >
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
                        name="unidadeDeMedida"
                        value={product.unidadeDeMedida}
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
                    Adicionar Produto
                </button>
            </form>
        </Modal>
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
