import FormProduct from "../../components/formProduct/index.tsx";
import React from "react";
import ListProduct from "../../components/listProduct/index.tsx";
function Produtos() {
    return (
        <div>
            <h1>Produtos</h1>
            <div style={{ display: 'flex', margin: '20px' }}>
                <FormProduct />
                <ListProduct />
            </div>
        </div>
    );
}

export default Produtos
