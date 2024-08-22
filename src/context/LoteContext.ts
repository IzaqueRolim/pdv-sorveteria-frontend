import { createContext } from "react";
import { Produto } from "./ProdutoContext";

export interface Lote {
    produto: Produto | null;
    quantidade: string;
    precoUnitario: string;
    diaCompra: string;
}

// Tipagem para o contexto de lotes
export interface LoteContextType {
    lotes: Lote[];
    setLotes: React.Dispatch<React.SetStateAction<Lote[]>>;
}

export const LoteContext = createContext<LoteContextType>({ lotes: [], setLotes: () => { } });
