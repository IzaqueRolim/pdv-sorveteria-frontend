import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export function AreaGraphic({ data, width, height }: { data: any, width: number, height: number }) {

    return (
        <div style={{ width: '100%' }}>

            <ResponsiveContainer width={width} height={height}>
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line connectNulls type="monotone" dataKey="totalVenda" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
