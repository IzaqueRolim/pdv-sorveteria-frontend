import FormVenda from "./components/cadastrarVendas/index.tsx";
import ListVendas from './components/listVendas/index.tsx'
import React from "react";

function Vendas() {
    return (
        <div>
            <h1>Vendas</h1>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormVenda />
                
            </div>
        </div>
    );
}

export default Vendas;
