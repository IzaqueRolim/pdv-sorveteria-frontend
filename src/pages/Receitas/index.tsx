import React, { useState } from "react";
import FormReceita from "./components/formReceita/index.tsx";
import ListReceitas from "./components/listReceitas/index.tsx";
function Receitas() {

    const [isModalOpen, setModalIsOpen] = useState(false)
    return (
        <div>
            <h1>Receitas</h1>
                <button onClick={() => setModalIsOpen(true)}>Adicionar Receita</button>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormReceita isModalOpen={isModalOpen} close={() => setModalIsOpen(false)} />
                <ListReceitas />
            </div>
        </div>
    );
}

export default Receitas;