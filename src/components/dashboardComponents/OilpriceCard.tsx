"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OilDataEntry {
    period: string;
    value: string; 
}

const OilpriceCard = () => {
  
    const [data, setData] = useState<OilDataEntry[]>([]);

    useEffect(() => {
        axios.get('/api/rawOilPrice')
            .then((res) => {
                const rawData = res.data.response?.data || [];

                const chartData = rawData.map((entry: any) => ({
                    date: entry.period,
                    price: parseFloat(entry.value),
                })).reverse();

                setData(chartData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

  return (
    <Card className="w-full bg-grey text-white">
        <CardHeader>
            <CardTitle>Brent Crude Oil Price (USD/Barrel)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)}/>
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#FFD369"
                    dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}

export default OilpriceCard