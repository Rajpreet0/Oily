"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "../../../types/data";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Bubbles, ThermometerSnowflake, ThermometerSun, Users } from "lucide-react";
import TooltipComponent from "../TooltipComponent";
import CardSkeleton from "../CardSkeleton";


const WeatherCard = () => {

    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("/api/weather")
        .then((res) => {
            const api = res.data;
            const transformed: WeatherData = {
                name: api.name,
                humidity: api.main.humidity,
                feelsLike: api.main.feels_like,
                temp: api.main.temp,
                tempMax: api.main.temp_max,
                tempMin: api.main.temp_min,
                description: api.weather[0].description,
                weatherMain: api.weather[0].main,
                icon: api.weather[0].icon
            };
            setData(transformed);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false))
    }, []);
  
  return (
    <div className="p-1 w-full flex flex-col items-center justify-center mt-6">
        <Card className="w-full max-w-md bg-grey text-white">
            <CardHeader>
                <CardTitle className="flex items-center">
                    {data?.icon && (
                        <img
                            className="w-12 h-12"
                            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                            alt={data.description}
                        />
                    )}
                    <div>
                        <p className="text-xl">{data?.weatherMain}</p>
                        <p className="text-sm text-gray-400">{data?.name}</p>
                    </div>
                </CardTitle>
                <CardAction>
                    <p className="text-4xl font-bold mt-8">{data?.temp} °C</p>
                </CardAction>    
            </CardHeader>
            <CardContent className="-mt-6">
                {loading ? (
                    <CardSkeleton/>
                ) : data ? (
                    <>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="cursor-pointer">See Details</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
                                            <TooltipComponent content="Minimum Temperature">
                                                <div className="flex gap-2 items-center ">
                                                    <ThermometerSnowflake size={22}/>
                                                    <p className="text-lg font-semibold">{data?.tempMin} °C</p>
                                                </div>
                                            </TooltipComponent>
                                            <TooltipComponent content="Maximum Temperature">
                                                <div className="flex gap-2 items-center ">
                                                    <ThermometerSun size={22}/>
                                                    <p className="text-lg font-semibold">{data?.tempMax} °C</p>
                                                </div>
                                            </TooltipComponent>
                                            <TooltipComponent content="Humiditiy">
                                                <div className="flex gap-2 items-center">
                                                    <Bubbles size={22}/>
                                                    <p className="text-lg font-semibold">{data?.humidity} %</p>
                                                </div>
                                            </TooltipComponent>
                                            <TooltipComponent content="Feels Like Temperature">
                                                <div className="flex gap-2 items-center">
                                                    <Users size={22}/>
                                                    <p className="text-lg font-semibold">{data?.feelsLike} °C</p>
                                                </div>
                                            </TooltipComponent>
                                        </div>
                                    </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </>
                ) : (
                    <p className="text-red-400">Failed to load weather data.</p>
                )}
            </CardContent>
        </Card>
    </div>
  )
}

export default WeatherCard

