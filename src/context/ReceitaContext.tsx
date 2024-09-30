import React, { createContext, useState, ReactNode, useContext } from "react";
import { Produto } from "./ProdutoContext";

// Interface para ProdutoSelecionado
export interface ProdutoSelecionado {
    produto: Produto | undefined;
    quantidade: number;
}

// Interface para Receita
export interface Receita {
    id?: string;
    name: string;
    ingredientes: ProdutoSelecionado[];
    preco: string;
    rendimento: number;
    imageBase64: string;
    precoUnitario?: number;
}

// Tipagem para o contexto de receitas
export interface ReceitaContextType {
    receitas: Receita[];
    setReceitas: React.Dispatch<React.SetStateAction<Receita[]>>;
}

// Criação do contexto com valores padrão
export const ReceitaContext = createContext<ReceitaContextType>({
    receitas: [],
    setReceitas: () => {},
});

// Provider para o ReceitaContext
export const ReceitaProvider = ({ children }: { children: ReactNode }) => {
    const [receitas, setReceitas] = useState<Receita[]>([]);

    return (
        <ReceitaContext.Provider value={{ receitas, setReceitas }}>
            {children}
        </ReceitaContext.Provider>
    );
};

// Hook personalizado para usar o ReceitaContext
export const useReceitaContext = () => useContext(ReceitaContext);
