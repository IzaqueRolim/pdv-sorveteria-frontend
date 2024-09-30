import React, { createContext, useState, ReactNode, useContext } from 'react';

export enum UnidadeMedida {
    Grama = "Grama",
    Litro = "Litro",
    Kilo = "Kilo"
}

export interface Produto {
    id: string;
    name: string;
    quantidadeEstoque: number;
    unidadeDeMedida: UnidadeMedida;
}

export interface ProdutoContextType {
    products: Produto[];
    setProductObject: (newProducts: Produto[]) => void;
}

export const ProdutoContext = createContext<ProdutoContextType>({
    products: [],
    setProductObject: () => { },
});

export const ProdutoProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Produto[]>([]);

    const setProductObject = (newProducts: Produto[]) => {
        setProducts(newProducts);
    };

    return (
        <ProdutoContext.Provider value={{ products, setProductObject }}>
            {children}
        </ProdutoContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useProdutoContext = () => useContext(ProdutoContext);