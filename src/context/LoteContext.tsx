import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Produto } from "./ProdutoContext";
import { createLote, fetchLotes } from "../api/loteApi.ts";

export interface Lote {
    produto: Produto | null;
    quantidade: string;
    precoUnitario: string;
    diaCompra: string;
}

export interface LoteContextType {
    lotes: Lote[];
    setLotes: React.Dispatch<React.SetStateAction<Lote[]>>;
    addLote: (lote: Lote) => Promise<void>;

}

export const LoteContext = createContext<LoteContextType>({
    lotes: [],
    setLotes: () => { },
    addLote: async () => { },
});

export const LoteProvider = ({ children }: { children: ReactNode }) => {
    const [lotes, setLotes] = useState<Lote[]>([]);

    // Carrega os lotes ao montar o componente
    useEffect(() => {
        const loadLotes = async () => {
            const fetchedLotes = await fetchLotes();
            setLotes(fetchedLotes);
        };
        loadLotes();
    }, []);

    // Função para adicionar um novo lote
    const addLote = async (lote: Lote) => {
        await createLote(lote);
        const updatedLotes = await fetchLotes();
        setLotes(updatedLotes);
    };

    return (
        <LoteContext.Provider value={{ lotes, setLotes, addLote }}>
            {children}
        </LoteContext.Provider>
    );
};

// Hook para usar o contexto em outros componentes
export const useLoteContext = () => useContext(LoteContext);
