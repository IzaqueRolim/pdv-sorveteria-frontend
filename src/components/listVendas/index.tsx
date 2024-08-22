import React, { CSSProperties, useContext } from 'react';
import { Venda, VendaContext, VendaContextType } from '../../context/VendaContext.ts';

function ListVendas() {
    const { vendas } = useContext<VendaContextType>(VendaContext);

    return (
        <div style={styles.vendasContainer}>
        <h2 style={styles.vendasTitle}>Vendas Registradas</h2>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Receita</th>
                    <th style={styles.th}>Quantidade</th>
                    <th style={styles.th}>Data</th>
                    <th style={styles.th}>Total</th>
                </tr>
            </thead>
            <tbody>
                {vendas.map((venda, index) => (
                    <tr key={index}>
                        <td style={styles.td}>{venda.receita}</td>
                        <td style={styles.td}>{venda.quantidade}</td>
                        <td style={styles.td}>{venda.dataVenda}</td>
                        <td style={styles.td}>R$ {venda.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
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

export default ListVendas;
