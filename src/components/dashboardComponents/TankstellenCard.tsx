"use client";
import Image from "next/image"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import AviaLogo from "../../../public/avia_logo.png"
import { useEffect, useState } from "react"
import axios from "axios"
import TankstellenDetailInformation from "./TankstellenDetailInformation";
import { Circle, Droplet, Flag, Fuel, MapPinIcon, Signpost, Text } from "lucide-react";
import { TankstelleData } from "../../../types/data";


const TankstellenCard = () => {

    const [data, setData] = useState<TankstelleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("/api/tankstelle")
        .then((res) => {
            setData(res.data.station);
            setLoading(false);
        })
        .catch((err) => {
            setError("Fehler beim Laden der Tankstelle.")
            setLoading(false);
            console.log(err);
        })
    }, []);

  return (
    <div className="p-2 w-full flex flex-col items-center justify-center mt-6">
        <Card className="min-w-lg bg-grey text-white">
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
                {!loading && data && (
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
                )}
            </CardContent>
        </Card>
    </div>
  )
}

export default TankstellenCard