import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Produtos from "../Produtos/index.tsx";
import Receitas from "../Receitas/index.tsx";
import Lotes from "../Lotes/index.tsx";
import Vendas from "../Vendas/index.tsx";

function Home() {
    const [indexScreen, setIndexScreen] = useState(0);

    return (
        <div style={styles.wrapper}>
            <nav style={styles.sidebar}>
                <h2 style={styles.navTitle}>Menu</h2>
                <button style={styles.navButton} onClick={() => setIndexScreen(1)}>Gerenciar Produtos</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(2)}>Gerenciar Receitas</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(3)}>Gerenciar Lotes</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(4)}>Gerenciar Vendas</button>
            </nav>
            <div style={styles.container}>
                {indexScreen === 0 && (
                    <div>
                        <h1 style={styles.title}>Bem-vindo ao Sistema de Gerenciamento</h1>
                        <div style={styles.card}>
                            <span style={styles.cardTitle}>Total de Vendas</span>
                            <span style={styles.cardValue}>R$ 30.000,00</span>
                        </div>
                        <div style={styles.card}>
                            <span style={styles.cardTitle}>Total de Despesas</span>
                            <span style={styles.cardValue}>R$ 10.000,00</span>
                        </div>
                        <div style={styles.card}>
                            <span style={styles.cardTitle}>Lucro Líquido</span>
                            <span style={styles.cardValue}>R$ 20.000,00</span>
                        </div>
                    </div>
                )}
                {indexScreen === 1 && <Produtos />}
                {indexScreen === 2 && <Receitas />}
                {indexScreen === 3 && <Lotes />}
                {indexScreen === 4 && <Vendas />}
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {

    wrapper: {
        display: 'flex',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
    },
    navTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    navButton: {
        width: '100%',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0056b3',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '10px',
        textAlign: 'center',
    },
    container: {
        marginLeft: '250px', // Para empurrar o conteúdo para a direita
        padding: '40px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        width: '100%',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '30px',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    cardValue: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#007bff',
    },
};

export default Home;
