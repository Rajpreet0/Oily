"use client";
import axios from "axios";
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeftRight, CoinsIcon } from "lucide-react";


interface ExchangeData {
    usdToEur: number;
    eurToUsd: number;
    date: string;
}


const ExchangeCard = () => {

    const [rate, setRate] = useState<ExchangeData | null>(null);
    const [error, setError] = useState("");
    const [usdToEur, setUsdToEur] = useState(true);

    useEffect(() => {
        axios.get('/api/exchangeRates')
            .then((res) => {
                setRate(res.data);
            }) 
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch exchange rate");
            })
    }, []);

    const handleChange = () => {
        setUsdToEur(!usdToEur);
    }

  return (
    <div className="p-2 w-full flex flex-col items-center justify-center mt-6">
        <Card className="min-w-lg bg-grey text-white">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><CoinsIcon size={30}/>Exchange Rates</CardTitle>
            </CardHeader>
            <CardContent>
                {usdToEur ? (
                    <div className="flex items-center w-full justify-center  gap-4">
                        <p className="text-4xl font-bold">1 USD</p>
                        <ArrowLeftRight size={25} onClick={handleChange} className="cursor-pointer text-yellow hover:scale-105 transition-all"/>
                        <p className="text-4xl font-bold">{rate?.usdToEur?.toFixed(2)} EUR</p>
                    </div>
                ) : (
                    <div className="flex items-center w-full justify-center gap-4">
                        <p className="text-4xl font-bold">1 EUR</p>
                        <ArrowLeftRight size={25} onClick={handleChange} className="cursor-pointer text-yellow hover:scale-105 transition-all"/>
                        <p className="text-4xl font-bold">{rate?.eurToUsd?.toFixed(2)} USD</p>
                    </div>
                )}
                <div className="text-sm mt-6">
                    <p>
                        ECB Rate Date:{' '}
                        {rate?.date ? new Date(rate.date).toLocaleDateString() : '—'}
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default ExchangeCard

/*
        <h2>Exchange Rates</h2>
        <p>1 USD = {rate?.usdToEur} €</p>
        <p>
        ECB Rate Date:{' '}
        {rate?.date ? new Date(rate.date).toLocaleDateString() : '—'}
        </p>

*/