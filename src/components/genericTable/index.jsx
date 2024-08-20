import React from 'react';

function GenericTable({ columns, data }) {
    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} style={styles.th}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} style={styles.td}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
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

export default GenericTable;
