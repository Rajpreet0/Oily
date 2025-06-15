"use client";
import Image from "next/image"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import AviaLogo from "../../../public/avia_logo.png"
import { useEffect, useState } from "react"
import axios from "axios"
import TankstellenDetailInformation from "./TankstellenDetailInformation";
import { Circle, Droplet, Flag, Fuel, MapPinIcon, Signpost, Text } from "lucide-react";
import { TankstelleData } from "../../../types/data";
import CardSkeleton from "../CardSkeleton";


const TankstellenCard = () => {

    const [data, setData] = useState<TankstelleData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get("/api/tankstelle")
        .then((res) => {
            setData(res.data.station);
            setLoading(false);
        })
        .catch((err) => {
            setError("Fehler beim Laden der Tankstelle.")
            console.log(err);
        })
        .finally(() => setLoading(false));
    }, []);

  return (
    <div className="p-2 flex flex-col items-center justify-center mt-6">
        <Card className="w-full max-w-xl bg-grey text-white">
            <CardHeader>
                <CardTitle className="text-lg">Tankstellen Details</CardTitle>
                <CardDescription className="text-white">Here you can find the Data of the Gas Station</CardDescription>
                <CardAction>
                    {data?.brand === "AVIA" && (
                        <Image src={AviaLogo} width={70} height={70} alt="Avia Logo"/>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <CardSkeleton/>
                ) : data ? (
                    <div>
                        <TankstellenDetailInformation icon={Text} label="Name " value={data.name}/>
                        <TankstellenDetailInformation icon={Flag} label="Brand " value={data.brand}/>
                        <TankstellenDetailInformation icon={MapPinIcon} label="Place " value={data.place}/>
                        <TankstellenDetailInformation icon={Signpost} label="Postcode " value={data.postCode}/>
                        <div className="flex p-2 items-center">
                            <Circle size={20}/>
                            <div className="flex space-x-3 ml-2 items-center ">
                                {data?.isOpen ? (
                                    <>
                                        <p className="text-white font-semibold text-lg">Open</p>
                                        <div className="h-3 w-3  rounded-full bg-green-400"/>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-white font-semibold">Closed</p>
                                        <div className="h-3 w-3  rounded-full bg-red-400"/>
                                    </>
                                )}
                            </div>
                        </div>
                        <TankstellenDetailInformation icon={Droplet} label="Diesel " value={`${data.diesel} €`} isYellow/>
                        <TankstellenDetailInformation icon={Fuel} label="E5 " value={`${data.e5} €`} isYellow/>
                        <TankstellenDetailInformation icon={Fuel} label="E10 " value={`${data.e10} €`} isYellow/>
                    </div>
                ) : (
                    <p className="text-red-400">{error}</p>
                )}
            </CardContent>
        </Card>
    </div>
  )
}

export default TankstellenCard