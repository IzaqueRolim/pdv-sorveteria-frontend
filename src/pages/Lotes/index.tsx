import React, { useState } from "react";
import FormLote from "./components/formLote/index.tsx";
import ListLote from "./components/listLote/index.tsx";
function Lotes() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div>
            <h1>Lotes</h1>
            <button onClick={() => setModalIsOpen(true)}>Nova Compra</button>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormLote isOpen={modalIsOpen} close={() => setModalIsOpen(false)} />
                <ListLote />
            </div>
        </div>
    );
}

export default Lotes

