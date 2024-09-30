import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";

export function BarGraphic({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width={500} height={300}>

            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidadeVendida" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}