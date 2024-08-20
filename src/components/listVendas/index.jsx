import React, { useContext } from 'react';
import { VendaContext } from '../../context/VendaContext';

function ListVendas() {
    const { vendas } = useContext(VendaContext);

    return (
        <div style={styles.container}>
            <h2>Lista de Vendas</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Receita</th>
                        <th style={styles.th}>Quantidade Vendida</th>
                        <th style={styles.th}>Data da Venda</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{venda.receita}</td>
                            <td style={styles.td}>{venda.quantidade}</td>
                            <td style={styles.td}>{venda.dataVenda}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};

export default ListVendas;
