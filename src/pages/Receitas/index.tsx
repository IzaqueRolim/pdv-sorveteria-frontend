import FormReceita from "../../components/formReceita/index.tsx";
import React from "react";
import ListReceitas from "../../components/listReceitas/index.tsx";
function Receitas() {
    return (
        <div>
            <h1>Receitas</h1>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormReceita />
                <ListReceitas />
            </div>
        </div>
    );
}

export default Receitas;