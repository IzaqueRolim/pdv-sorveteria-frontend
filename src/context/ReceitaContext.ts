import { createContext } from "react";
import { Produto } from "./ProdutoContext";
export interface Receita {
    name: string;
    produtos: ProdutoSelecionado[];
    preco: string;
}
export interface ProdutoSelecionado {
    produto: Produto;
    quantidade: number;
}

export interface ReceitaContextType {
    receitas: Receita[];
    setReceitas: (receitas: Receita[]) => void;
}

export const ReceitaContext = createContext<ReceitaContextType>({ receitas: [], setReceitas: () => { } });
