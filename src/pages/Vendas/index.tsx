import FormVenda from "../../components/formVenda/index.tsx";
import React from "react";
import ListVendas from "../../components/listVendas/index.tsx";
function Vendas() {
    return (
        <div>
            <h1>Vendas</h1>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormVenda />
                <ListVendas/>
            </div>
        </div>
    );
}

export default Vendas;
