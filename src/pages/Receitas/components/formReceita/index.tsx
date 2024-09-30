import React, { ChangeEvent, CSSProperties, FormEvent, useReducer } from "react";
import { createReceita } from "../../../../api/receitasApi.ts";
import { Produto, useProdutoContext } from "../../../../context/ProdutoContext.tsx";
import { useReceitaContext } from "../../../../context/ReceitaContext.tsx";
import Modal from "../../../../components/genericModal/index.tsx";

// Ações do Reducer
const ACTIONS = {
    SET_FIELD: "SET_FIELD",
    ADD_INGREDIENTE: "ADD_INGREDIENTE",
    RESET_FORM: "RESET_FORM",
    SET_IMAGE: "SET_IMAGE",
    SET_PRODUTO_SELECIONADO: "SET_PRODUTO_SELECIONADO"
};

// Reducer para gerenciar o estado do formulário
const formReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_FIELD:
            return {
                ...state,
                receita: {
                    ...state.receita,
                    [action.payload.name]: action.payload.value,
                },
            };
        case ACTIONS.ADD_INGREDIENTE:
            return {
                ...state,
                receita: {
                    ...state.receita,
                    ingredientes: [...state.receita.ingredientes, action.payload],
                },
                produtoSelecionado: { produto: undefined, quantidade: 0 },
            };
        case ACTIONS.RESET_FORM:
            return {
                ...state,
                receita: { name: "", ingredientes: [], preco: "", imageBase64: "", rendimento: 0 },
                produtoSelecionado: { produto: undefined, quantidade: 0 },
                image: null,
            };
        case ACTIONS.SET_IMAGE:
            return {
                ...state,
                receita: {
                    ...state.receita,
                    imageBase64: action.payload,
                },
                image: action.payload,
            };
        case ACTIONS.SET_PRODUTO_SELECIONADO:
            return {
                ...state,
                produtoSelecionado: {
                    ...state.produtoSelecionado,
                    [action.payload.name]: action.payload.value,
                },
            };
        default:
            return state;
    }
};

function FormReceita({ isModalOpen, close }) {
    const { products } = useProdutoContext();
    const { receitas, setReceitas } = useReceitaContext();


    const [state, dispatch] = useReducer(formReducer, {
        receita: { name: "", ingredientes: [], preco: "", imageBase64: "", rendimento: 0 },
        produtoSelecionado: { produto: undefined, quantidade: 0 },
        image: null,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;

        if (name === "imageBase64" && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch({ type: ACTIONS.SET_IMAGE, payload: reader.result as string });
            };
            reader.readAsDataURL(file);
        } else {
            dispatch({ type: ACTIONS.SET_FIELD, payload: { name, value } });
        }
    };

    const handleProdutoChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === "produto") {
            const produtoSelecionado: Produto | undefined = products.find((product) => Number(product.id) === Number(value));

            dispatch({
                type: ACTIONS.SET_PRODUTO_SELECIONADO,
                payload: { name: "produto", value: produtoSelecionado }
            });
        } else {
            dispatch({ type: ACTIONS.SET_PRODUTO_SELECIONADO, payload: { name, value } });
        }
    };

    const adicionarProduto = () => {
        if (state.produtoSelecionado.produto) {
            dispatch({ type: ACTIONS.ADD_INGREDIENTE, payload: state.produtoSelecionado });
        } else {
            alert("Selecione um produto válido");
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.receita.ingredientes.length > 0) {
            createReceita(state.receita);
            setReceitas([...receitas, state.receita]);
            dispatch({ type: ACTIONS.RESET_FORM });
            close();
            return;
        }
        alert("Insira pelo menos um ingrediente");
    };

    return (
        <Modal title="Cadastrar Receita" isOpen={isModalOpen} onClose={close}>
            <form onSubmit={handleSubmit} style={styles.formStyles}>
                <div>
                    <input name="imageBase64" type="file" accept="image/*" onChange={handleInputChange} />
                    {state.image && (
                        <div>
                            <img src={state.image} alt="Uploaded" style={{ maxWidth: '100px', height: 'auto' }} />
                        </div>
                    )}
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome da Receita:</label>
                    <input
                        type='text'
                        name="name"
                        value={state.receita.name}
                        placeholder="Nome da Receita"
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                    <label style={styles.label}>Preço da Receita:</label>
                    <input
                        type='number'
                        name="preco"
                        value={state.receita.preco === "" ? "" : state.receita.preco}
                        placeholder="Preço de Venda da Receita"
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                    <label style={styles.label}>Rendimento da Receita por Unidade:</label>
                    <input
                        type='number'
                        name="rendimento"
                        value={state.receita.rendimento === 0 ? "" : state.receita.rendimento}
                        placeholder="Rendimento"
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
                        value={state.produtoSelecionado.produto ? state.produtoSelecionado.produto.id : ""}
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
                        value={state.produtoSelecionado.quantidade === 0 ? "" : state.produtoSelecionado.quantidade}
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
                    {state.receita.ingredientes.map((produto, index) => (
                        <div key={index}>
                            <span>{produto.produto?.name} - {produto.quantidade} {produto.produto?.unidadeDeMedida}</span>
                        </div>
                    ))}
                </div>

                <button type="submit" style={styles.button}>
                    Adicionar Receita
                </button>
            </form>
        </Modal>
    );
}

const styles: { [key: string]: CSSProperties } = {
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
