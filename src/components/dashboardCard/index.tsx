import React from "react"

export function DashboardCard({ title, textFocus }: { title: string, textFocus: string }) {
    return (
        <div style={styles.cardContainer}>
            <span style={styles.cardTitle}>{title}</span>
            <span style={styles.cardTextFocus}>{textFocus}</span>
        </div>
    );
}

const styles = {
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '220px',
        height: '100px',
        backgroundColor: '#f0f0f0',  // Cor de fundo mais clara
        borderRadius: '12px',
        padding: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Sombra suave
        transition: 'transform 0.2s, box-shadow 0.2s',  // Animação de hover
    } as React.CSSProperties,
    cardTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#666',  // Cor mais suave para o título
        marginBottom: '5px',
    } as React.CSSProperties,
    cardTextFocus: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',  // Cor mais forte para o texto principal
    } as React.CSSProperties,
};

// CSS para efeito de hover (opcional)
const cardContainerHover = {
    transform: 'scale(1.05)',  // Aumenta o tamanho levemente no hover
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',  // Sombra mais intensa no hover
};
