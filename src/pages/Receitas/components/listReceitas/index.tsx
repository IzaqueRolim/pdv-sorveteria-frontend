import React, { CSSProperties, useContext } from "react";
import { ReceitaContextType, ReceitaContext, useReceitaContext } from "../../../../context/ReceitaContext.tsx";

function ListReceitas() {
    const { receitas } = useReceitaContext();
    return (
        <div style={styles.list}>
            <h3 style={styles.title}>Receitas</h3>
            {receitas.map((receita, index) => (
                <div key={index} style={styles.receitaItem}>
                    <img src={receita.imageBase64} style={{ width: "100px", height: "auto" }} />
                    <h4 style={styles.receitaHeader}>
                        {receita.name}
                    </h4>
                    <p style={styles.precoRendimento}>
                        Preço: <span style={styles.preco}>R$ {receita.preco}</span> |
                        Rendimento: <span style={styles.rendimento}>{receita.rendimento} unidades</span>
                    </p>
                    <ul style={styles.produtosList}>
                        {receita.ingredientes.map((produto, i) => (
                            <li key={i} style={styles.produtoItem}>
                                {produto.produto?.name} - {produto.quantidade} {produto.produto?.unidadeDeMedida}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    list: {
        margin: '20px auto',
        width: '80%',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '24px',
        color: '#333',
        fontWeight: 'bold',
    },
    receitaItem: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    receitaHeader: {
        fontSize: '20px',
        marginBottom: '10px',
        color: '#4CAF50',
    },
    precoRendimento: {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#555',
    },
    preco: {
        color: '#E91E63',
        fontWeight: 'bold',
    },
    rendimento: {
        color: '#03A9F4',
        fontWeight: 'bold',
    },
    produtosList: {
        paddingLeft: '20px',
        listStyleType: 'circle',
    },
    produtoItem: {
        fontSize: '16px',
        marginBottom: '5px',
        color: '#555',
    },
};

export default ListReceitas;
