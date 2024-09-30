import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Produtos from "../Produtos/index.tsx";
import Receitas from "../Receitas/index.tsx";
import Lotes from "../Lotes/index.tsx";
import Vendas from "../Vendas/index.tsx";
import Card from "../../components/genericCard/index.tsx";
import Modal from "../../components/genericModal/index.tsx";
import ListVendas from "../Vendas/components/listVendas/index.tsx";
import { fetchProdutos } from "../../api/produtosApi.ts";
import QRCodePix from "../../components/qrCodePix/index.tsx";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarGraphic } from "../../components/barGraphic/index.tsx";
import { AreaGraphic } from "../../components/areaGraphic/index.tsx";
import { DashboardCard } from "../../components/dashboardCard/index.tsx";
import PizzaGraphic from "../../components/pizzaGraphic/index.tsx";

function Home() {
    const [indexScreen, setIndexScreen] = useState(0);

    // useEffect(() => {
    //     fetchProdutos();
    // }, [indexScreen])

    const data = [
        // Milkshakes
        { name: 'Milkshake de Nutella', quantidadeVendida: 150 },
        { name: 'Milkshake de Morango', quantidadeVendida: 100 },
        { name: 'Milkshake de Ovomaltine', quantidadeVendida: 120 },
        { name: 'Milkshake de Chocolate', quantidadeVendida: 130 },
        { name: 'Milkshake de Baunilha', quantidadeVendida: 90 },
        { name: 'Milkshake de Cookies & Cream', quantidadeVendida: 110 },
    
        // Sorvetes
        { name: 'Sorvete de Chocolate', quantidadeVendida: 80 },
        { name: 'Sorvete de Morango', quantidadeVendida: 75 },
        { name: 'Sorvete de Baunilha', quantidadeVendida: 85 },
        { name: 'Sorvete de Pistache', quantidadeVendida: 60 },
        { name: 'Sorvete de Menta com Chocolate', quantidadeVendida: 55 },
    
        // Dindins (geladinhos)
        { name: 'Dindin de Manga', quantidadeVendida: 45 },
        { name: 'Dindin de Coco', quantidadeVendida: 50 },
        { name: 'Dindin de Uva', quantidadeVendida: 40 },
        { name: 'Dindin de Abacaxi', quantidadeVendida: 35 },
        { name: 'Dindin de Morango', quantidadeVendida: 70 },
        { name: 'Dindin de Limão', quantidadeVendida: 65 },
    ];
    
    const dataResumoVenda = [
        { name: 'Segunda', totalVenda: 4000 },
        { name: 'Terça', totalVenda: 3000 },
        { name: 'Quarta', totalVenda: 2000 },
        { name: 'Quinta', totalVenda: 2000 },
        { name: 'Sexta', totalVenda: 1890 },
        { name: 'Sabado', totalVenda: 2390 },
        { name: 'Domingo', totalVenda: 3490 },
    ];


    return (
        <div style={styles.wrapper}>
            <nav style={styles.sidebar}>
                <h2 style={styles.navTitle}>Menu</h2>
                <button style={styles.navButton} onClick={() => setIndexScreen(0)}>Dashboard</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(1)}>Gerenciar Produtos</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(2)}>Gerenciar Receitas</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(3)}>Gerenciar Lotes</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(4)}>Cadastrar Venda</button>
                <button style={styles.navButton} onClick={() => setIndexScreen(5)}>Ver Vendas</button>
            </nav>


            <div style={styles.container}>
                {indexScreen === 0 && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DashboardCard title="Faturamento:" textFocus="R$ 10000,00" />
                            <DashboardCard title="Despesas:" textFocus="R$ 6000,00" />
                            <DashboardCard title="Lucro" textFocus="R$ 4000,00" />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <PizzaGraphic />
                            <BarGraphic data={data} />
                        </div>
                        <AreaGraphic data={dataResumoVenda} width={1100} height={200} />
                    </div>
                )}
                {indexScreen === 1 && <Produtos />}
                {indexScreen === 2 && <Receitas />}
                {indexScreen === 3 && <Lotes />}
                {indexScreen === 4 && <Vendas />}
                {indexScreen === 5 && <ListVendas />}
            </div>
        </div >
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
        marginLeft: '250px',
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
