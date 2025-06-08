import TankstellenCard from "@/components/dashboardComponents/TankstellenCard";
import ExchangeCard from "@/components/dashboardComponents/ExchangeCard";
import WeatherCard from "@/components/dashboardComponents/WeatherCard";
import Header from "@/components/Header";

export default function Home() {

  
  return (
    <div className="p-4">
      <Header/>
      <TankstellenCard/>
      <ExchangeCard/>
      <WeatherCard/>
    </div>
  );
}
