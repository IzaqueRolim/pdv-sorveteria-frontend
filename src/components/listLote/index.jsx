import React, { useContext } from 'react';
import { ProdutoContext } from '../../context/ProdutoContext';
import { LoteContext } from '../../context/LoteContext';
import GenericTable from '../genericTable';

function ListLote() {
    const { products } = useContext(ProdutoContext);
    const { lotes, setLotes } = useContext(LoteContext)

    const columns = [
        { title: "Produto", key: 'produto' },
        { title: "Quantidade", key: 'quantidade' },
        { title: "Preço Unitário", key: 'precoUnitario' },
        { title: "Dia de Compra", key: 'diaCompra' }
    ];

    return (
        <div style={styles.container}>
            <h2>Lista de Lotes</h2>
            <GenericTable columns={columns} data={lotes} />
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
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
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

export default ListLote;
