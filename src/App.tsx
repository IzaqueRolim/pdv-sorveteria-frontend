import React, { useState } from "react";
import { ProdutoContext } from "./context/ProdutoContext";
import FormProduct from "./components/formProduct";
import ListProduct from "./pages/listProduct";
import FormReceita from "./components/formReceita";
import ListReceitas from "./components/listReceitas";
import { ReceitaContext } from "./context/ReceitaContext";
import { LoteContext } from "./context/LoteContext";

import { VendaContext } from "./context/VendaContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Produtos from "./pages/Produtos";
import Receitas from "./pages/Receitas";
import Lotes from "./pages/Lotes";
import Vendas from "./pages/Vendas";
import Home from "./pages/Home";
function App() {

    const [products, setProductObject] = useState([]);
    const [receitas, setReceitas] = useState([])
    const [lotes, setLotes] = useState([])
    const [vendas, setVendas] = useState([])


    return (
        <Router>
            <ProdutoContext.Provider value={{ products, setProductObject }}>
                <ReceitaContext.Provider value={{ receitas, setReceitas }}>
                    <LoteContext.Provider value={{ lotes, setLotes }}>
                        <VendaContext.Provider value={{ vendas, setVendas }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/produtos" element={<Produtos />} />
                                <Route path="/receitas" element={<Receitas />} />
                                <Route path="/lotes" element={<Lotes />} />
                                <Route path="/vendas" element={<Vendas />} />
                            </Routes>
                        </VendaContext.Provider>
                    </LoteContext.Provider>
                </ReceitaContext.Provider>
            </ProdutoContext.Provider>
        </Router>
    );
}

export default App;
