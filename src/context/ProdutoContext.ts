import { createContext, useContext } from "react";

export enum UnidadeMedida {
    Grama = "Grama",
    Litro = "Litro",
    Kilo = "Kilo"
}

export interface Produto {
    id: string;
    name: string;
    quantidadeEmEstoque: number;
    unitMedid: UnidadeMedida;
}

export interface ProdutoContextType {
    products: Produto[];
    setProductObject: (products: Produto[]) => void;
}

export const ProdutoContext = createContext<ProdutoContextType>({
    products: [
       
    ],
    setProductObject: () => { }
});
