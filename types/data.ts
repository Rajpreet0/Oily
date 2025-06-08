export type WeatherData = {
    name: string;
    humidity: number;
    feelsLike: number;
    temp: number;
    tempMax: number;
    tempMin: number;
    description: string;
    weatherMain: string;
    icon: string;
}

export type TankstelleData = {
    name: string;
    brand: string;
    place: string; 
    postCode: string;
    isOpen: boolean;    
    diesel: string;
    e5: string;
    e10: string;
    [key: string]: any; 
}

export type ExchangeData = {
    usdToEur: number;
    eurToUsd: number;
    date: string;
}