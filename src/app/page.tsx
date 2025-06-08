import Image from "next/image";
import Logo from "../../public/oily_logo.png";
import TankstellenCard from "@/components/dashboardComponents/TankstellenCard";
import ExchangeCard from "@/components/dashboardComponents/ExchangeCard";
import WeatherCard from "@/components/dashboardComponents/WeatherCard";

export default function Home() {

  
  return (
    <div className="p-4">
      <Image src={Logo} width={150} height={100} alt="Oily Logo"/>
      <TankstellenCard/>
      <ExchangeCard/>
      <WeatherCard/>
    </div>
  );
}
