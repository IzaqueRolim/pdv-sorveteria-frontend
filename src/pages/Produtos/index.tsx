import React, { useState } from "react";
import FormProduct from "./components/formProduct/index.tsx";
import ListProduct from "./components/listProduct/index.tsx";
function Produtos() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div>
            <h1>Produtos</h1>
                <button onClick={()=>setModalIsOpen(true)}>Cadastrar Novo Produto</button>
            <div style={{ display: 'flex', margin: '20px' }}>
                <FormProduct isModalOpen={modalIsOpen} close={() => setModalIsOpen(false)} />
                <ListProduct />
            </div>
        </div>
    );
}

export default Produtos
