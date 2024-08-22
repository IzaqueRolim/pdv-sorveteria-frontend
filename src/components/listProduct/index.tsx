import React, { useContext, useState, ChangeEvent } from "react";
import { ProdutoContext, Produto, ProdutoContextType, UnidadeMedida } from "../../context/ProdutoContext.ts";
import GenericTable from "../genericTable/index.tsx";

// Definindo o tipo do produto editado
interface EditingProduct extends Produto {
    name: string;
    unitMedid: UnidadeMedida;
}

function ListProduct() {
    const { products, setProductObject } = useContext(ProdutoContext) as ProdutoContextType;
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
    const [medidUnit] = useState<UnidadeMedida[]>([
        UnidadeMedida.Grama,
        UnidadeMedida.Litro,
        UnidadeMedida.Kilo
    ]);
    const handleEditClick = (product: Produto) => {
        setEditingProduct({ ...product });
        setSelectedProduct(product.id);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, [name]: value });
        }
    };

    const handleSaveClick = () => {
        if (editingProduct) {
            const updatedProducts = products.map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            );
            setProductObject(updatedProducts);
            setSelectedProduct(null);
            setEditingProduct(null);
        }
    };

    const handleCancelClick = () => {
        setSelectedProduct(null);
        setEditingProduct(null);
    };
    const columns: any[] = [
        {
            title: "Nome",
            key: 'name',
            render: (row: Produto) => selectedProduct === row.id ? (
                <input
                    type="text"
                    name="name"
                    value={editingProduct?.name || ''}
                    onChange={handleInputChange}
                />
            ) : (
                row.name
            )
        },
        {
            title: "Unidade de Medida",
            key: 'unitMedid',
            render: (row: Produto) => selectedProduct === row.id ? (
                <select
                    value={editingProduct?.unitMedid || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e)}
                    name="unitMedid"
                >
                    {medidUnit.map((unit, index) => (
                        <option key={index}>{unit}</option>
                    ))}
                </select>
            ) : (
                row.unitMedid
            )
        },
        {
            title: "Estoque",
            key: "quantidadeEmEstoque",
            render: (row: Produto) => row.quantidadeEmEstoque
        },
        {
            title: "Ação",
            key: "action",
            render: (row: Produto) => selectedProduct === row.id ? (
                <>
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </>
            ) : (
                <button onClick={() => handleEditClick(row)}>Editar</button>
            )
        }
    ];

    const getRowStyle = (row: any) => {
        return {
            backgroundColor: row.quantidadeEmEstoque > 24 
            ? '#d4edda' // Verde claro
            : row.quantidadeEmEstoque >= 12 
            ? '#fff3cd' // Amarelo claro
            : '#f8d7da' // Vermelho claro
        };
    };



    return (
        <div>
            <GenericTable columns={columns} data={products} getRowStyle={getRowStyle} />
        </div>
    );
}

export default ListProduct;
