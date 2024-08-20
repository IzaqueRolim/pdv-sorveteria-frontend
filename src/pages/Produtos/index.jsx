import FormProduct from "../../components/formProduct";
import ListProduct from "../../components/listProduct";

function Produtos() {
    return (
        <div>
            <h1>Produtos</h1>
            <div style={{ display: 'flex', margin: '20px' }}>
                <FormProduct />
                <ListProduct />
            </div>
        </div>
    );
}

export default Produtos
