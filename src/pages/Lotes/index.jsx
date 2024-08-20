import FormLote from "../../components/formLote";
import ListLote from "../../components/listLote";

function Lotes() {
    return (
        <div>
            <h1>Lotes</h1>
            <div style={{ display: 'flex', margin: '20px', gap: '50px' }}>
                <FormLote />
                <ListLote />
            </div>
        </div>
    );
}

export default Lotes

