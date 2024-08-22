import { createContext } from "react";
export interface Venda {
    receita: string;
    quantidade: string;
    total: number;
    dataVenda: string;
}

export interface VendaContextType {
    vendas: Venda[];
    setVendas: React.Dispatch<React.SetStateAction<Venda[]>>;
}

export const VendaContext = createContext<VendaContextType>({ vendas: [], setVendas: () => { } });
