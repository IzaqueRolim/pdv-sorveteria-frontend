import React, { useState } from 'react';
import { Chart } from "react-google-charts";


function PizzaGraphic() {
    const [options, setOptions] = useState({
        title: 'Formas de Pagamento'
    })
    const [data, setData] = useState([
        ['Forma de Pagamento', 'Quantidade'],
        ['Pix', 100],
        ['Dinheiro Em Papel', 80],
        ['Cartão de Crédito', 50],
        ['Cartão de Debito', 50],
    ])
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        data={data}
                        options={options}
                    />
                </div>
            </header>
        </div>
    );
}

export default PizzaGraphic;
