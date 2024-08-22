import React, { useContext } from "react";
import { Receita, ReceitaContext, ReceitaContextType } from "../../context/ReceitaContext.ts";

function ListReceitas() {
    const { receitas } = useContext<ReceitaContextType>(ReceitaContext);
    return (
        <div style={styles.list}>
            <h3 style={{
                textAlign: 'center',
                marginBottom: '20px',
            }}>Receitas</h3>
            {receitas.map((receita, index) => (
                <div key={index} style={styles.receitaItem}>
                    <h4>{receita.name} - Preço: R$ {receita.preco}</h4>
                    <ul>
                        {receita.produtos.map((produto, i) => (
                            <li key={i}>
                                {produto.produto.name} - {produto.quantidade} {produto.produto.unitMedid}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

const styles = {
    list: {
        margin: '20px auto',
        width: '80%',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #ccc',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    receitaItem: {
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ccc',
    },
};

export default ListReceitas;
