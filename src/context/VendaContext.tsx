import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Receita } from "./ReceitaContext";
import { fetchVenda, createVenda } from "../api/vendaApi.ts";

export interface SubVenda {
    quantidade: number;
    subtotal: number;
    receita: Receita;
}

export interface Venda {
    id?: string;
    precoTotal: number;
    diaVenda: string;
    subVendas: SubVenda[];
    formaPagamento: PaymentMethod
}

export enum PaymentMethod {
    PIX = "PIX",
    Dinheiro = "DINHEIRO_EM_PAPEL",
    Credito = "CREDITO",
    Debito = "DEBITO",
}


export interface VendaContextType {
    vendas: Venda[];
    setVendas: React.Dispatch<React.SetStateAction<Venda[]>>;
    addVenda: (venda: Venda) => Promise<void>;
}

export const VendaContext = createContext<VendaContextType>({
    vendas: [],
    setVendas: () => { },
    addVenda: async () => { },
});

export const VendaProvider = ({ children }: { children: ReactNode }) => {
    const [vendas, setVendas] = useState<Venda[]>([]);

    useEffect(() => {
        const loadVendas = async () => {
            const vendasFromBackend = await fetchVenda();
            setVendas(vendasFromBackend);
        };

        loadVendas();
    }, []);

    const addVenda = async (newVenda: Venda) => {
        await createVenda(newVenda);
        const updatedVendas = await fetchVenda();
        setVendas(updatedVendas);
    };

    return (
        <VendaContext.Provider value={{ vendas, setVendas, addVenda }}>
            {children}
        </VendaContext.Provider>
    );
};

export const useVendaContext = () => useContext(VendaContext);
