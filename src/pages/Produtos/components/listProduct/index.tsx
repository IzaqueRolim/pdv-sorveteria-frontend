import React, { useContext, useState, ChangeEvent } from "react";
import GenericTable from "../../../../components/genericTable/index.tsx";
import { Produto, UnidadeMedida, useProdutoContext } from "../../../../context/ProdutoContext.tsx";

import { updateProduto, fetchProdutos } from '../../../../api/produtosApi.ts'
// Definindo o tipo do produto editado
interface EditingProduct extends Produto {
    name: string;
    unidadeDeMedida: UnidadeMedida;
}

function ListProduct() {
    const { products, setProductObject } = useProdutoContext();
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

    const handleSaveClick = async () => {
        if (editingProduct) {
            updateProduto(editingProduct)
            const produto = await fetchProdutos()
            setProductObject(produto)
            setSelectedProduct(null);
            setEditingProduct(null);
        }
    };

    const handleCancelClick = () => {
        setSelectedProduct(null);
        setEditingProduct(null);
    };
    const columns: any[] = [
        { title: "Id", key: "id" },
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
            key: 'unidadeDeMedida',
            render: (row: Produto) => selectedProduct === row.id ? (
                <select
                    value={editingProduct?.unidadeDeMedida || ''}
                    onChange={(e: any) => handleInputChange(e)}
                    name="unidadeDeMedida"
                >
                    {medidUnit.map((unit, index) => (
                        <option key={index}>{unit}</option>
                    ))}
                </select>
            ) : (
                row.unidadeDeMedida
            )
        },
        {
            title: "Estoque",
            key: "quantidadeEmEstoque",
            render: (row: Produto) => row.quantidadeEstoque
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

    const getRowStyle = (row: Produto) => {
        return {
            backgroundColor: row.quantidadeEstoque > 24
                ? '#d4edda' // Verde claro
                : row.quantidadeEstoque >= 12
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
