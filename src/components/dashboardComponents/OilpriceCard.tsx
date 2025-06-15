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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/rawOilPrice')
            .then((res) => {
                const rawData = res.data.response?.data || [];

                const chartData = rawData.map((entry: any) => ({
                    date: entry.period,
                    price: parseFloat(entry.value),
                })).reverse();

                setData(chartData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

  return (
    <Card className="w-full  bg-grey text-white mt-8">
        <CardHeader>
            <CardTitle>Brent Crude Oil Price (USD/Barrel)</CardTitle>
        </CardHeader>
        <CardContent className="h-[385px] w-full">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow border-t-transparent" />
                </div>
            ) : (
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
            )}
        </CardContent>
    </Card>
  )
}

export default OilpriceCard