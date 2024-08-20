import { useContext, useState } from "react"
import { ProdutoContext } from "../../context/ProdutoContext"
import GenericTable from "../../components/genericTable";

function ListProduct() {
    const { products, setProductObject } = useContext(ProdutoContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
        setSelectedProduct(product.id);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleSaveClick = () => {
        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
        );
        setProductObject(updatedProducts);
        setSelectedProduct(null);
        setEditingProduct(null);
    };

    const handleCancelClick = () => {
        setSelectedProduct(null);
        setEditingProduct(null);
    };

    const columns = [
        {
            title: "Nome",
            key: 'name',
            render: (row) => selectedProduct === row.id ? (
                <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleInputChange}
                />
            ) : (
                row.name
            )
        },
        {
            title: "Unidade de Medida",
            key: 'unitMedid',
            render: (row) => selectedProduct === row.id ? (
                <input
                    type="text"
                    name="unitMedid"
                    value={editingProduct.unitMedid}
                    onChange={handleInputChange}
                />
            ) : (
                row.unitMedid
            )
        },
        {
            title: "Ação",
            key: "action",
            render: (row) => selectedProduct === row.id ? (
                <>
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </>
            ) : (
                <button onClick={() => handleEditClick(row)}>Editar</button>
            )
        }
    ];

    return (
        <div>
            <GenericTable columns={columns} data={products} />
        </div>
    );
}




export default ListProduct;
