import React, { useContext } from 'react';
import { ProdutoContext, ProdutoContextType } from '../../context/ProdutoContext.ts';
import { LoteContext, LoteContextType, Lote } from '../../context/LoteContext.ts';
import GenericTable from '../genericTable/index.tsx';

// Defina o tipo das colunas da tabela
interface ColumnType {
    title: string;
    key: keyof Lote;
}

function ListLote() {
    const { products } = useContext<ProdutoContextType>(ProdutoContext);
    const { lotes } = useContext<LoteContextType>(LoteContext);

    const columns: any[] = [
        {
            title: "Produto", key: 'produto.name', render: (lote: Lote) => (
                <span>{lote.produto?.name || 'Produto não encontrado'}</span>
            )
        },
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
        borderCollapse: 'collapse' as 'collapse',
    },
    th: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'left' as 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};

export default ListLote;
